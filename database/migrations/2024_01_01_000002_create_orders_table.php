<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('order_number')->unique();
            $table->string('color');
            $table->string('storage_variant');
            $table->unsignedTinyInteger('quantity')->default(1);
            $table->json('accessories')->nullable();
            $table->string('payment_method');
            $table->unsignedTinyInteger('installment_months')->nullable();
            $table->string('promo_code')->nullable();
            $table->unsignedInteger('discount')->default(0);
            $table->unsignedInteger('subtotal');
            $table->string('status')->default('pending');
            $table->json('shipping_address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
