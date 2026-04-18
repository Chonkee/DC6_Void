<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalRevenue   = Order::where('status', '!=', 'cancelled')->sum('subtotal');
        $totalOrders    = Order::count();
        $totalUsers     = User::where('is_admin', false)->count();
        $totalProducts  = Product::count();

        // Orders by status
        $ordersByStatus = Order::selectRaw('status, count(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status');

        // Recent orders
        $recentOrders = Order::with(['user:id,name,email', 'product:id,name,color_accent'])
            ->latest()
            ->limit(8)
            ->get();

        // Revenue last 7 days (simple daily breakdown)
        $revenueByDay = Order::selectRaw("DATE(created_at) as date, SUM(subtotal) as total")
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->where('status', '!=', 'cancelled')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->keyBy('date');

        // Fill in missing days
        $days = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $days->push([
                'date'  => now()->subDays($i)->format('M d'),
                'total' => $revenueByDay->get($date)?->total ?? 0,
            ]);
        }

        // Top products by order count
        $topProducts = Order::selectRaw('product_id, count(*) as orders, sum(subtotal) as revenue')
            ->with('product:id,name,color_accent,slug')
            ->groupBy('product_id')
            ->orderByDesc('orders')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'revenue'  => $totalRevenue,
                'orders'   => $totalOrders,
                'users'    => $totalUsers,
                'products' => $totalProducts,
            ],
            'ordersByStatus' => $ordersByStatus,
            'recentOrders'   => $recentOrders,
            'revenueByDay'   => $days,
            'topProducts'    => $topProducts,
        ]);
    }
}