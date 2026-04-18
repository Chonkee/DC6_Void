<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'order_number',
        'color',
        'storage_variant',
        'quantity',
        'accessories',      // JSON array of chosen add-ons
        'payment_method',   // card | gcash | maya | installment
        'installment_months',
        'promo_code',
        'discount',
        'subtotal',
        'status',           // pending | confirmed | shipped | delivered
        'shipping_address', // JSON
    ];

    protected $casts = [
        'accessories'      => 'array',
        'shipping_address' => 'array',
        'quantity'         => 'integer',
        'installment_months' => 'integer',
        'discount'         => 'integer',
        'subtotal'         => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();
        static::creating(function (Order $order) {
            $order->order_number = 'VOID-' . date('Y') . '-' . str_pad(random_int(10000, 99999), 5, '0', STR_PAD_LEFT);
        });
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function product(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
