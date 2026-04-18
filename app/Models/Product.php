<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'tagline',
        'base_price',
        'color_accent',
        'badge',
        'is_featured',
        'variants',       // JSON: [{storage, ram, price}]
        'colors',         // JSON: [{name, hex}]
        'accessories',    // JSON: [{name, price}]
        'specs',          // JSON: {display, chip, battery, camera, ...}
        'features',       // JSON: [{tag, title, desc}]
    ];

    protected $casts = [
        'variants'    => 'array',
        'colors'      => 'array',
        'accessories' => 'array',
        'specs'       => 'array',
        'features'    => 'array',
        'is_featured' => 'boolean',
        'base_price'  => 'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function orders(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function getFormattedPriceAttribute(): string
    {
        return '₱' . number_format($this->base_price);
    }
}
