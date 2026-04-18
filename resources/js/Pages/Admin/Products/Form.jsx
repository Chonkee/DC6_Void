import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ProductForm({ product }) {
    const { url } = usePage();

    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        slug: product?.slug || '',
        tagline: product?.tagline || '',
        base_price: product?.base_price || '',
        color_accent: product?.color_accent || '#C8FF64',
        badge: product?.badge || '',
        is_featured: product?.is_featured || false,
        variants: product?.variants || [{ storage: '256GB', ram: '8GB', price: 0 }, { storage: '512GB', ram: '12GB', price: 5000 }],
        colors: product?.colors || [{ name: 'Space Black', hex: '#06060A' }, { name: 'Starlight', hex: '#F0EDE8' }],
        accessories: product?.accessories || [{ name: 'Case', price: 990 }],
        specs: (Array.isArray(product?.specs) ? product.specs : []) || [],
        features: (Array.isArray(product?.features) ? product.features : []) || [],
    });

    const submit = () => {
        if (product?.id) {
            put(`/admin/products/${product.slug}`);
        } else {
            post('/admin/products');
        }
    };

    const addArrayItem = (field) => {
        if (field === 'variants') {
            setData(field, [...data[field], { storage: '128GB', ram: '8GB', price: 0 }]);
        } else if (field === 'colors') {
            setData(field, [...data[field], { name: 'New Color', hex: '#C8FF64' }]);
        } else if (field === 'accessories') {
            setData(field, [...data[field], { name: 'New Item', price: 0 }]);
        } else {
            setData(field, [...data[field], '']);
        }
    };

    const updateArrayItem = (field, index, key, value) => {
        const newData = [...data[field]];
        if (typeof newData[index] === 'object') {
            newData[index] = { ...newData[index], [key]: isNaN(value) ? value : parseInt(value) };
        } else {
            newData[index] = value;
        }
        setData(field, newData);
    };

    const removeArrayItem = (field, index) => {
        setData(field, data[field].filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (product) {
            Object.entries(product).forEach(([key, value]) => setData(key, value));
        }
    }, []);

    return (
        <AdminLayout title={product ? `Edit ${product.name}` : 'New Product'}>
            <Head title={(product ? `Edit ${product.name}` : 'New Product') + ' - Admin'} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, margin: 0 }}>
                        {product ? `Edit ${product.name}` : 'New Product'}
                    </h1>
                    <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', marginTop: 4 }}>
                        {product ? 'Update product details' : 'Add a new VOID phone to the lineup'}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button
                        onClick={() => router.visit('/admin/products')}
                        style={{
                            padding: '12px 24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12, color: 'rgba(240,237,232,0.6)', fontSize: 13, fontFamily: 'Space Mono',
                            textDecoration: 'none', cursor: 'pointer',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 32, maxWidth: 800 }}>
                    {/* Basic Info */}
                    <div style={{ marginBottom: 40 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 24 }}>Basic Information</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8 }}>Product Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors.name ? '#FF5A5A' : 'rgba(255,255,255,0.1)' }`, borderRadius: 12, color: '#fff', fontSize: 15, fontFamily: 'Syne' }}
                                    placeholder="VOID Nova Ultra"
                                />
                                {errors.name && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.name}</div>}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8 }}>Slug</label>
                                <input
                                    type="text"
                                    value={data.slug}
                                    onChange={(e) => setData('slug', e.target.value)}
                                    style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors.slug ? '#FF5A5A' : 'rgba(255,255,255,0.1)' }`, borderRadius: 12, color: '#fff', fontSize: 15, fontFamily: 'Syne' }}
                                    placeholder="nova-ultra"
                                />
                                {errors.slug && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.slug}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Design */}
                    <div style={{ marginBottom: 40 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 24 }}>Pricing & Design</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8 }}>Base Price</label>
                                <input
                                    type="number"
                                    value={data.base_price}
                                    onChange={(e) => setData('base_price', e.target.value)}
                                    style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors.base_price ? '#FF5A5A' : 'rgba(255,255,255,0.1)' }`, borderRadius: 12, color: '#fff', fontSize: 15 }}
                                    placeholder="59900"
                                />
                                {errors.base_price && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.base_price}</div>}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8 }}>Accent Color</label>
                                <input
                                    type="color"
                                    value={data.color_accent}
                                    onChange={(e) => setData('color_accent', e.target.value)}
                                    style={{ width: '100%', height: 56, border: `1px solid ${errors.color_accent ? '#FF5A5A' : 'rgba(255,255,255,0.1)' }`, borderRadius: 12, cursor: 'pointer' }}
                                />
                                {errors.color_accent && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.color_accent}</div>}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8 }}>Badge</label>
                                <input
                                    type="text"
                                    value={data.badge}
                                    onChange={(e) => setData('badge', e.target.value)}
                                    style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors.badge ? '#FF5A5A' : 'rgba(255,255,255,0.1)' }`, borderRadius: 12, color: '#fff', fontSize: 15, fontFamily: 'Syne' }}
                                    placeholder="Pro Max"
                                />
                                {errors.badge && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.badge}</div>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <input
                                    id="is_featured"
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    style={{ width: 18, height: 18, accentColor: '#C8FF64' }}
                                />
                                <label htmlFor="is_featured" style={{ fontSize: 13, color: 'rgba(240,237,232,0.8)', cursor: 'pointer', margin: 0 }}>Featured Product</label>
                            </div>
                        </div>
                    </div>

                    {/* Tagline */}
                    <div style={{ marginBottom: 40 }}>
                        <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 12 }}>Tagline</label>
                        <textarea
                            value={data.tagline}
                            onChange={(e) => setData('tagline', e.target.value)}
                            style={{ width: '100%', minHeight: 80, padding: '16px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${errors.tagline ? '#FF5A5A' : 'rgba(255,255,255,0.1)' }`, borderRadius: 16, color: '#fff', fontSize: 15, fontFamily: 'Syne', resize: 'vertical' }}
                            placeholder="The future of VOID smartphones"
                        />
                        {errors.tagline && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.tagline}</div>}
                    </div>

                    {/* Array Fields */}
                    {[
                        { key: 'variants', label: 'Storage Variants', icon: '💾' },
                        { key: 'colors', label: 'Colors', icon: '🎨' },
                        { key: 'accessories', label: 'Accessories (optional)', icon: '🔌' },
                    ].map(({ key, label, icon }) => (
                        <div key={key} style={{ marginBottom: 32 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <span style={{ fontSize: 16 }}>{icon}</span>
                                <label style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.8)', fontWeight: 600 }}>{label}</label>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {data[key]?.map?.((item, index) => (
                                    <div key={index} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {key === 'variants' && (
                                            <>
                                                <input
                                                    value={item?.storage || ''}
                                                    onChange={(e) => updateArrayItem(key, index, 'storage', e.target.value)}
                                                    style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13 }}
                                                    placeholder="Storage (e.g., 256GB)"
                                                />
                                                <input
                                                    value={item?.ram || ''}
                                                    onChange={(e) => updateArrayItem(key, index, 'ram', e.target.value)}
                                                    style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13 }}
                                                    placeholder="RAM (e.g., 8GB)"
                                                />
                                                <input
                                                    type="number"
                                                    value={item?.price || 0}
                                                    onChange={(e) => updateArrayItem(key, index, 'price', e.target.value)}
                                                    style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13 }}
                                                    placeholder="Price"
                                                />
                                            </>
                                        )}
                                        {key === 'colors' && (
                                            <>
                                                <input
                                                    value={item?.name || ''}
                                                    onChange={(e) => updateArrayItem(key, index, 'name', e.target.value)}
                                                    style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13 }}
                                                    placeholder="Color name"
                                                />
                                                <input
                                                    type="color"
                                                    value={item?.hex || '#C8FF64'}
                                                    onChange={(e) => updateArrayItem(key, index, 'hex', e.target.value)}
                                                    style={{ width: 100, height: 44, padding: '4px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, cursor: 'pointer' }}
                                                />
                                            </>
                                        )}
                                        {key === 'accessories' && (
                                            <>
                                                <input
                                                    value={item?.name || ''}
                                                    onChange={(e) => updateArrayItem(key, index, 'name', e.target.value)}
                                                    style={{ flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13 }}
                                                    placeholder="Accessory name"
                                                />
                                                <input
                                                    type="number"
                                                    value={item?.price || 0}
                                                    onChange={(e) => updateArrayItem(key, index, 'price', e.target.value)}
                                                    style={{ width: 100, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontSize: 13 }}
                                                    placeholder="Price"
                                                />
                                            </>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeArrayItem(key, index)}
                                            style={{
                                                padding: '12px 16px', background: 'rgba(255,90,90,0.15)', border: '1px solid rgba(255,90,90,0.3)',
                                                borderRadius: 10, color: '#FF5A5A', fontSize: 12, fontFamily: 'Space Mono', cursor: 'pointer', whiteSpace: 'nowrap'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayItem(key)}
                                    style={{
                                        padding: '12px 20px', background: 'rgba(200,255,100,0.1)', border: '1px solid rgba(200,255,100,0.3)',
                                        borderRadius: 10, color: '#C8FF64', fontSize: 13, fontFamily: 'Space Mono', fontWeight: 600, cursor: 'pointer'
                                    }}
                                >
                                    + Add {key === 'variants' ? 'Variant' : key === 'colors' ? 'Color' : 'Accessory'}
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Specs & Features */}
                    {[
                        { key: 'specs', label: 'Technical Specs (optional)' },
                        { key: 'features', label: 'Key Features (optional)' },
                    ].map(({ key, label }) => (
                        <div key={key} style={{ marginBottom: 32 }}>
                            <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 12 }}>{label}</label>
                            <textarea
                                value={(Array.isArray(data[key]) ? data[key] : []).join('\n')}
                                onChange={(e) => setData(key, e.target.value.split('\n').map(s => s.trim()).filter(Boolean))}
                                style={{ width: '100%', height: 120, padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, color: '#fff', fontSize: 13, fontFamily: 'Space Mono', resize: 'vertical' }}
                                placeholder="One entry per line..."
                            />
                        </div>
                    ))}

                    {/* Submit */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32, marginTop: 32 }}>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%', padding: '18px 32px', background: 'linear-gradient(135deg, #C8FF64 0%, #A8E045 100%)',
                                border: 'none', borderRadius: 16, color: '#000', fontSize: 15, fontWeight: 800, fontFamily: 'Space Mono',
                                cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.8 : 1,
                            }}
                        >
                            {processing ? 'Creating...' : product ? 'Update Product' : 'Create Product'}
                        </button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
