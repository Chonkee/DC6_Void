<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'         => 'Zero',
                'slug'         => 'zero',
                'tagline'      => 'The original transparent smartphone. Glyph Matrix 2.0, Voidcore X1, triple 50MP.',
                'base_price'   => 49990,
                'color_accent' => '#C8FF64',
                'badge'        => null,
                'is_featured'  => false,
                'variants'     => [
                    ['storage' => '256GB', 'ram' => '12GB', 'price' => 49990],
                    ['storage' => '512GB', 'ram' => '12GB', 'price' => 54990],
                ],
                'colors'       => [
                    ['name' => 'Obsidian',   'hex' => '#06060A'],
                    ['name' => 'Glacier',    'hex' => '#E8F4FF'],
                    ['name' => 'Void Green', 'hex' => '#C8FF64'],
                ],
                'accessories'  => [
                    ['name' => 'VOID Clear Case',        'price' => 990,  'desc' => 'Slim hard-shell protection'],
                    ['name' => 'VOID 65W GaN Charger',   'price' => 1490, 'desc' => 'USB-C PD, fold-flat prongs'],
                    ['name' => 'Glyph Screen Protector', 'price' => 590,  'desc' => 'Self-healing nano glass'],
                    ['name' => 'VOID Buds Pro',          'price' => 3990, 'desc' => 'ANC, 36hr total battery'],
                ],
                'specs'        => [
                    'display'  => ['size' => '6.7"', 'type' => 'ProAMOLED', 'refresh' => '1–120Hz LTPO', 'brightness' => '2600 nits'],
                    'chip'     => ['name' => 'Voidcore X1', 'process' => '4nm', 'cpu' => '12-core', 'gpu' => 'Hex-9 GPU'],
                    'camera'   => ['main' => '50MP f/1.6 OIS', 'ultra' => '50MP 120°', 'tele' => '50MP 5× OIS', 'front' => '32MP AF'],
                    'battery'  => ['capacity' => '5100mAh', 'wired' => '45W', 'wireless' => '30W Qi2', 'reverse' => '5W'],
                    'build'    => ['protection' => 'IP68', 'glass' => 'Ceramic Shield v2', 'frame' => 'Aerospace alloy'],
                ],
                'features'     => [
                    ['tag' => 'DISPLAY',     'title' => 'Glyph Matrix 2.0',   'desc' => 'A 6.7″ ProAMOLED panel that doubles as a programmable notification surface. 120Hz adaptive, 2600 nits peak.'],
                    ['tag' => 'CAMERA',      'title' => 'Triple 50MP system', 'desc' => 'Periscope telephoto, ultra-wide and main with f/1.6 aperture — the full picture in any light.'],
                    ['tag' => 'PERFORMANCE', 'title' => 'Voidcore X1',        'desc' => 'Our first in-house silicon. 4nm, 12-core CPU, Neural Engine 3.0 — 40% faster than last gen.'],
                    ['tag' => 'BATTERY',     'title' => '5100mAh all day',    'desc' => '45W wired, 30W wireless, 5W reverse. Charge to 80% in 36 minutes.'],
                ],
            ],

            [
                'name'         => 'Zero+',
                'slug'         => 'zero-plus',
                'tagline'      => 'Maximum performance. Pro-binned Voidcore X1, 16GB RAM, 512GB storage.',
                'base_price'   => 59990,
                'color_accent' => '#C8FF64',
                'badge'        => 'TOP',
                'is_featured'  => true,
                'variants'     => [
                    ['storage' => '512GB', 'ram' => '16GB', 'price' => 59990],
                    ['storage' => '1TB',   'ram' => '16GB', 'price' => 69990],
                ],
                'colors'       => [
                    ['name' => 'Obsidian',   'hex' => '#06060A'],
                    ['name' => 'Glacier',    'hex' => '#E8F4FF'],
                    ['name' => 'Void Green', 'hex' => '#C8FF64'],
                    ['name' => 'Midnight',   'hex' => '#12103A'],
                ],
                'accessories'  => [
                    ['name' => 'VOID Clear Case',        'price' => 990,  'desc' => 'Slim hard-shell protection'],
                    ['name' => 'VOID 65W GaN Charger',   'price' => 1490, 'desc' => 'USB-C PD, fold-flat prongs'],
                    ['name' => 'Glyph Screen Protector', 'price' => 590,  'desc' => 'Self-healing nano glass'],
                    ['name' => 'VOID Buds Pro',          'price' => 3990, 'desc' => 'ANC, 36hr total battery'],
                    ['name' => 'VOID Watch SE',          'price' => 8990, 'desc' => 'Pairs with Zero+, AMOLED'],
                ],
                'specs'        => [
                    'display'  => ['size' => '6.7"', 'type' => 'ProAMOLED', 'refresh' => '1–120Hz LTPO', 'brightness' => '2800 nits'],
                    'chip'     => ['name' => 'Voidcore X1 Pro', 'process' => '4nm Pro-bin', 'cpu' => '12-core', 'gpu' => 'Hex-9 Ultra GPU'],
                    'camera'   => ['main' => '50MP f/1.6 OIS', 'ultra' => '50MP 120°', 'tele' => '50MP 5× OIS', 'front' => '32MP AF'],
                    'battery'  => ['capacity' => '5100mAh', 'wired' => '65W', 'wireless' => '30W Qi2', 'reverse' => '10W'],
                    'build'    => ['protection' => 'IP68+', 'glass' => 'Ceramic Shield v2 Pro', 'frame' => 'Ti aerospace alloy'],
                ],
                'features'     => [
                    ['tag' => 'PERFORMANCE', 'title' => 'Pro-binned silicon', 'desc' => 'Every X1 Pro chip is individually performance-verified. Top 10% of wafer yield. Guaranteed.'],
                    ['tag' => 'DISPLAY',     'title' => '2800 nits',          'desc' => 'Sunlight-visible, HDR10+ certified. Brighter than any VOID to date.'],
                    ['tag' => 'BATTERY',     'title' => '65W ultra charge',   'desc' => '0 to full in under 50 minutes. 10W reverse charging for your earbuds.'],
                    ['tag' => 'BUILD',       'title' => 'Titanium frame',     'desc' => 'Aerospace-grade Ti alloy. Stronger, lighter than any previous VOID.'],
                ],
            ],

            [
                'name'         => 'Nova',
                'slug'         => 'nova',
                'tagline'      => 'The AI-first VOID. Redesigned camera AI, Nova Intelligence, periscope macro.',
                'base_price'   => 54990,
                'color_accent' => '#64C8FF',
                'badge'        => 'NEW',
                'is_featured'  => false,
                'variants'     => [
                    ['storage' => '256GB', 'ram' => '12GB', 'price' => 54990],
                    ['storage' => '512GB', 'ram' => '16GB', 'price' => 62990],
                ],
                'colors'       => [
                    ['name' => 'Nova Blue',  'hex' => '#64C8FF'],
                    ['name' => 'Obsidian',   'hex' => '#06060A'],
                    ['name' => 'Star White', 'hex' => '#F8F4FF'],
                ],
                'accessories'  => [
                    ['name' => 'Nova Silicone Case',   'price' => 1290, 'desc' => 'Nova Blue colorway match'],
                    ['name' => 'VOID 65W GaN Charger', 'price' => 1490, 'desc' => 'USB-C PD'],
                    ['name' => 'Nova Screen Guard',    'price' => 690,  'desc' => 'Anti-blue-light coating'],
                    ['name' => 'VOID Buds Nova',       'price' => 3490, 'desc' => 'Nova Blue colorway, ANC'],
                ],
                'specs'        => [
                    'display'  => ['size' => '6.67"', 'type' => 'AMOLED', 'refresh' => '1–144Hz', 'brightness' => '2400 nits'],
                    'chip'     => ['name' => 'Voidcore X1', 'process' => '4nm', 'cpu' => '12-core', 'gpu' => 'Hex-9 GPU'],
                    'camera'   => ['main' => '50MP AI f/1.6', 'ultra' => '50MP 120°', 'tele' => '50MP 5× + macro', 'front' => '50MP 4K'],
                    'battery'  => ['capacity' => '4800mAh', 'wired' => '67W', 'wireless' => '30W', 'reverse' => '5W'],
                    'build'    => ['protection' => 'IP68', 'glass' => 'Gorilla Glass Victus 2', 'frame' => 'Anodized 6013 alloy'],
                ],
                'features'     => [
                    ['tag' => 'AI',      'title' => 'Nova Intelligence',  'desc' => 'Real-time scene AI, smart composition, one-tap cinematic video. The camera thinks with you.'],
                    ['tag' => 'DISPLAY', 'title' => '144Hz edge-to-edge', 'desc' => 'Ultra-narrow 1.5mm bezel, 144Hz for gaming and scroll. Punch-hole disappears in use.'],
                    ['tag' => 'CAMERA',  'title' => 'Periscope macro',    'desc' => 'World\'s first periscope macro lens. Get 2.5cm closer than any competitor.'],
                    ['tag' => 'CHARGE',  'title' => '67W HyperCharge',   'desc' => '0–100% in 42 minutes. The fastest charging VOID ever built.'],
                ],
            ],

            [
                'name'         => 'Flip',
                'slug'         => 'flip',
                'tagline'      => "VOID's first foldable. Ultra-thin hinge, 6.8 inch inner display, dual cameras.",
                'base_price'   => 44990,
                'color_accent' => '#C864FF',
                'badge'        => 'NEW',
                'is_featured'  => false,
                'variants'     => [
                    ['storage' => '256GB', 'ram' => '8GB', 'price' => 44990],
                    ['storage' => '512GB', 'ram' => '12GB', 'price' => 52990],
                ],
                'colors'       => [
                    ['name' => 'Void Purple', 'hex' => '#C864FF'],
                    ['name' => 'Obsidian',    'hex' => '#06060A'],
                    ['name' => 'Rose Mist',   'hex' => '#FFB4CC'],
                ],
                'accessories'  => [
                    ['name' => 'Flip Hinge Guard',     'price' => 790,  'desc' => 'Protects the fold crease'],
                    ['name' => 'VOID 45W Charger',     'price' => 1190, 'desc' => 'Compact travel charger'],
                    ['name' => 'Flip MagCase',         'price' => 1490, 'desc' => 'Cover screen stand mode'],
                ],
                'specs'        => [
                    'display'  => ['inner' => '6.8" FHD+ AMOLED', 'outer' => '3.4" cover display', 'refresh' => '120Hz', 'hinge' => 'IPX4 hinge'],
                    'chip'     => ['name' => 'Voidcore X1', 'process' => '4nm', 'cpu' => '12-core', 'gpu' => 'Hex-9 GPU'],
                    'camera'   => ['main' => '50MP f/1.8', 'ultra' => '12MP 120°', 'front' => 'Under-display 10MP'],
                    'battery'  => ['capacity' => '3700mAh', 'wired' => '45W', 'wireless' => '15W', 'reverse' => '5W'],
                    'build'    => ['protection' => 'IPX4', 'glass' => 'Ultra-thin glass', 'hinge' => '400,000 fold cycles'],
                ],
                'features'     => [
                    ['tag' => 'FORM',    'title' => 'Flex hinge tech',   'desc' => 'Rated for 400,000 folds. Ultra-thin glass flexes without creasing. IPX4 hinge protection.'],
                    ['tag' => 'DISPLAY', 'title' => 'Cover screen pro',  'desc' => '3.4" outer display runs full apps. Check notifications, reply, shoot photos — without opening.'],
                    ['tag' => 'CAMERA',  'title' => 'Flex mode shots',   'desc' => 'Fold to 90° for hands-free shots. The hinge becomes your tripod.'],
                    ['tag' => 'DESIGN',  'title' => 'Pocket-sized',     'desc' => 'Folds to credit card size. Opens to a full 6.8" cinematic display.'],
                ],
            ],

            [
                'name'         => 'Lite',
                'slug'         => 'lite',
                'tagline'      => 'The essential VOID. Lightweight, long-lasting, and priced for everyone.',
                'base_price'   => 29990,
                'color_accent' => '#C8FF64',
                'badge'        => null,
                'is_featured'  => false,
                'variants'     => [
                    ['storage' => '128GB', 'ram' => '8GB',  'price' => 29990],
                    ['storage' => '256GB', 'ram' => '8GB',  'price' => 33990],
                ],
                'colors'       => [
                    ['name' => 'Obsidian', 'hex' => '#06060A'],
                    ['name' => 'Glacier',  'hex' => '#E8F4FF'],
                    ['name' => 'Olive',    'hex' => '#8AB060'],
                ],
                'accessories'  => [
                    ['name' => 'VOID Lite Case',     'price' => 690,  'desc' => 'Impact-resistant bumper'],
                    ['name' => 'VOID 33W Charger',   'price' => 890,  'desc' => 'Compact fast charger'],
                    ['name' => 'Screen Protector',   'price' => 390,  'desc' => 'Tempered glass, 9H'],
                ],
                'specs'        => [
                    'display'  => ['size' => '6.5"', 'type' => 'AMOLED', 'refresh' => '90Hz', 'brightness' => '1800 nits'],
                    'chip'     => ['name' => 'Voidcore Lite', 'process' => '6nm', 'cpu' => '8-core', 'gpu' => 'Quad GPU'],
                    'camera'   => ['main' => '50MP f/1.8', 'ultra' => '8MP', 'front' => '16MP'],
                    'battery'  => ['capacity' => '5000mAh', 'wired' => '33W', 'wireless' => 'Not supported'],
                    'build'    => ['protection' => 'IP53', 'glass' => 'Gorilla Glass 5', 'weight' => '189g'],
                ],
                'features'     => [
                    ['tag' => 'BATTERY', 'title' => '5000mAh giant',  'desc' => 'Two days of real use. 33W charging. The battery that outlasts your plans.'],
                    ['tag' => 'DISPLAY', 'title' => '6.5" bright',    'desc' => '1800 nits, 90Hz AMOLED. Everything looks great without emptying your wallet.'],
                    ['tag' => 'CAMERA',  'title' => '50MP main',      'desc' => 'The same 50MP sensor as the flagship Zero. Portrait mode, night mode — no compromises on photos.'],
                    ['tag' => 'PRICE',   'title' => '₱29,990',        'desc' => 'The best value smartphone VOID has ever made. 0% installment available.'],
                ],
            ],
        ];

        foreach ($products as $p) {
            Product::updateOrCreate(['slug' => $p['slug']], $p);
        }
    }
}
