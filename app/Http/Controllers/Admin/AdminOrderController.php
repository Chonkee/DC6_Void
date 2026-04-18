<?php
 
namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
 
class AdminOrderController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Order::with(['user:id,name,email', 'product:id,name,color_accent,slug'])
            ->latest();
 
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
 
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhereHas('user', fn ($u) => $u->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%"));
            });
        }
 
        $orders = $query->paginate(15)->withQueryString();
 
        return Inertia::render('Admin/Orders/Index', [
            'orders'  => $orders,
            'filters' => $request->only(['status', 'search']),
        ]);
    }
 
    public function show(Order $order): Response
    {
        $order->load(['user:id,name,email', 'product']);
        return Inertia::render('Admin/Orders/Show', ['order' => $order]);
    }
 
    public function update(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,shipped,delivered,cancelled',
        ]);
 
        $order->update($validated);
 
        return back()->with('success', "Order {$order->order_number} updated to {$order->status}.");
    }
}