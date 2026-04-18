<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $query = User::withCount('orders')->latest();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(fn ($q) =>
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
            );
        }

        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        $users = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users'   => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function show(User $user): Response
    {
        $user->load(['orders.product:id,name,color_accent']);
        return Inertia::render('Admin/Users/Show', ['user' => $user]);
    }

    public function toggleAdmin(User $user, Request $request): RedirectResponse
    {
        // Prevent demoting yourself
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot change your own admin status.');
        }

        $user->update([
            'is_admin' => ! $user->is_admin,
            'role'     => ! $user->is_admin ? 'admin' : 'customer',
        ]);

        $label = $user->is_admin ? 'granted admin' : 'revoked admin';
        return back()->with('success', "{$user->name} has been {$label}.");
    }

    public function destroy(User $user, Request $request): RedirectResponse
    {
        if ($user->id === $request->user()->id) {
            return back()->with('error', 'You cannot delete your own account here.');
        }

        $user->delete();
        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted.');
    }
}