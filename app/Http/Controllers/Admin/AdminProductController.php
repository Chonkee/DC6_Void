<?php
 
namespace App\Http\Controllers\Admin;
 
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
 
class AdminProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::withCount('orders')
            ->latest()
            ->get();
 
        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }
 
    public function create(): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => null,
        ]);
    }
 
    public function store(Request $request): RedirectResponse
    {
        $validated = $this->validateProduct($request);
        Product::create($validated);
 
        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }
 
    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Form', [
            'product' => $product,
        ]);
    }
 
    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $this->validateProduct($request);
        $product->update($validated);
 
        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }
 
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();
 
        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted.');
    }
 
    private function validateProduct(Request $request): array
    {
        return $request->validate([
            'name'         => 'required|string|max:80',
            'slug'         => 'required|string|max:80',
            'tagline'      => 'nullable|string|max:200',
            'base_price'   => 'required|integer|min:0',
            'color_accent' => 'required|string|max:20',
            'badge'        => 'nullable|string|max:20',
            'is_featured'  => 'boolean',
            'variants'     => 'required|array|min:1',
            'colors'       => 'required|array|min:1',
            'accessories'  => 'nullable|array',
            'specs'        => 'nullable|array',
            'features'     => 'nullable|array',
        ]);
    }
}
 