<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('tagline')->nullable();
            $table->unsignedInteger('base_price');
            $table->string('color_accent')->default('#C8FF64'); // CSS color for per-product theming
            $table->string('badge')->nullable();                // 'TOP', 'NEW', etc.
            $table->boolean('is_featured')->default(false);
            $table->json('variants');       // [{storage:"128GB", ram:"8GB", price:29990}]
            $table->json('colors');         // [{name:"Obsidian", hex:"#06060A"}]
            $table->json('accessories');    // [{name:"Case", price:990}]
            $table->json('specs');          // {display:{...}, chip:{...}, ...}
            $table->json('features');       // [{tag:"Display", title:"...", desc:"..."}]
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
