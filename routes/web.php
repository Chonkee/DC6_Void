<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(['auth', 'verified', 'admin'])
    ->group(function () {

        // Dashboard
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Orders
        Route::get('/orders',              [AdminOrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}',      [AdminOrderController::class, 'show'])->name('orders.show');
        Route::patch('/orders/{order}',    [AdminOrderController::class, 'update'])->name('orders.update');

        // Products
        Route::get('/products',            [AdminProductController::class, 'index'])->name('products.index');
        Route::get('/products/create',     [AdminProductController::class, 'create'])->name('products.create');
        Route::post('/products',           [AdminProductController::class, 'store'])->name('products.store');
        Route::get('/products/{product}/edit', [AdminProductController::class, 'edit'])->name('products.edit');
        Route::patch('/products/{product}',    [AdminProductController::class, 'update'])->name('products.update');
        Route::delete('/products/{product}',   [AdminProductController::class, 'destroy'])->name('products.destroy');

        // Users
        Route::get('/users',                        [UserController::class, 'index'])->name('users.index');
        Route::get('/users/{user}',                 [UserController::class, 'show'])->name('users.show');
        Route::patch('/users/{user}/toggle-admin',  [UserController::class, 'toggleAdmin'])->name('users.toggle-admin');
        Route::delete('/users/{user}',              [UserController::class, 'destroy'])->name('users.destroy');
    });

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/phones', [ProductController::class, 'index'])->name('phones');
// Individual product pages — /phones/nova, /phones/flip, /phones/zero, etc.
Route::get('/phones/{product:slug}', [ProductController::class, 'show'])->name('phones.show');

// Auth-required routes (Breeze provides /login, /register, /logout)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/order', [OrderController::class, 'create'])->name('order.create');
    Route::post('/order', [OrderController::class, 'store'])->name('order.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
});


require __DIR__.'/auth.php';
