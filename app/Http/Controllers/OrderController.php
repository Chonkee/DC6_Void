<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function create(Request $request): Response
    {
        $product = null;
        if ($request->query('model')) {
            $product = Product::where('slug', $request->query('model'))->first();
        }
        $products = Product::select(['id', 'name', 'slug', 'base_price', 'color_accent', 'variants', 'colors', 'accessories'])->get();

        return Inertia::render('Order/Create', [
            'selectedProduct' => $product,
            'products'        => $products,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_id'        => 'required|exists:products,id',
            'color'             => 'required|string|max:60',
            'storage_variant'   => 'required|string|max:60',
            'quantity'          => 'required|integer|min:1|max:5',
            'accessories'       => 'nullable|array',
            'payment_method'    => 'required|in:card,gcash,maya,installment,cod',
            'installment_months'=> 'nullable|integer|in:3,6,12,24',
            'promo_code'        => 'nullable|string|max:20',
            'subtotal'          => 'required|integer|min:0',
            'discount'          => 'nullable|integer|min:0',
            'shipping_address'  => 'required|array',
        ]);

        $order = Order::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'status'  => 'pending',
        ]);

        return redirect()->route('orders.index')->with('success', $order->order_number);
    }

    public function index(Request $request): Response
    {
        $orders = Order::with('product:id,name,slug,color_accent')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return Inertia::render('Order/Index', [
            'orders'  => $orders,
            'success' => session('success'),
        ]);
    }
}
