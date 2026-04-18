import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function ProductsIndex({ products }) {
    const handleDelete = (product) => {
        if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
            router.delete(`/admin/products/${product.slug}`, {
                onSuccess: () => {
                    // Success handled by flash messages
                },
            });
        }
    };
    return (
        <AdminLayout title="Products">
            <Head title="Products - Admin" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, margin: 0 }}>Products</h1>
                    <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', marginTop: 4 }}>Manage VOID phone lineup</div>
                </div>
                <Link href="/admin/products/create" style={{
                    padding: '14px 28px', background: 'linear-gradient(135deg, #C8FF64 0%, #A8E045 100%)',
                    border: 'none', borderRadius: 12, color: '#000', fontSize: 13, fontWeight: 700, fontFamily: 'Space Mono',
                    textDecoration: 'none', cursor: 'pointer',
                }}>
                    New Product
                </Link>
            </div>

            {/* Products Table */}
            <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {['Product', 'Slug', 'Price', 'Orders', 'Status', 'Actions'].map((h) => (
                                    <th key={h} style={{
                                        fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(240,237,232,0.3)',
                                        textAlign: 'left', padding: '20px 24px', letterSpacing: '0.1em', textTransform: 'uppercase',
                                        borderBottom: '1px solid rgba(255,255,255,0.07)',
                                    }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 48, height: 48, borderRadius: 14, background: `${product.color_accent}18`,
                                                border: `1px solid ${product.color_accent}20`, display: 'flex', alignItems: 'center',
                                                justifyContent: 'center', flexShrink: 0
                                            }}>
                                                <span style={{ fontFamily: 'Space Mono', fontSize: 16, fontWeight: 700, color: product.color_accent }}>V</span>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{product.name}</div>
                                                <div style={{ fontSize: 12, color: 'rgba(240,237,232,0.5)' }}>{product.badge || 'Standard'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: '#fff' }}>{product.slug}</div>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontFamily: 'Space Mono', fontSize: 13, color: '#C8FF64', fontWeight: 600 }}>
                                        ₱{Number(product.base_price).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: product.orders_count > 0 ? '#C8FF64' : 'rgba(240,237,232,0.4)' }}>
                                            {product.orders_count} orders
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <span style={{
                                            fontFamily: 'Space Mono', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20,
                                            background: product.is_featured ? 'rgba(200,255,100,0.15)' : 'rgba(64,200,255,0.15)',
                                            color: product.is_featured ? '#C8FF64' : '#64C8FF', textTransform: 'uppercase'
                                        }}>
                                            {product.is_featured ? 'Featured' : 'Active'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <Link href={`/admin/products/${product.slug}/edit`} style={{
                                                fontSize: 11, color: 'rgba(240,237,232,0.6)', textDecoration: 'none', fontFamily: 'Space Mono',
                                                padding: '6px 12px', border: '1px solid rgba(240,237,232,0.2)', borderRadius: 6, cursor: 'pointer'
                                            }}>
                                                Edit
                                            </Link>
                                            <Link href={`/phones/${product.slug}`} target="_blank" style={{
                                                fontSize: 11, color: 'rgba(240,237,232,0.4)', textDecoration: 'none', fontFamily: 'Space Mono',
                                                padding: '6px 12px', border: '1px solid rgba(240,237,232,0.1)', borderRadius: 6, cursor: 'pointer'
                                            }}>
                                                Preview
                                            </Link>
                                            <button onClick={() => handleDelete(product)} style={{
                                                fontSize: 11, color: '#FF5A5A', background: 'rgba(255,90,90,0.1)', border: '1px solid rgba(255,90,90,0.3)',
                                                fontFamily: 'Space Mono', padding: '6px 12px', borderRadius: 6, cursor: 'pointer'
                                            }}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {products.length === 0 && (
                <div style={{ textAlign: 'center', padding: '120px 40px', color: 'rgba(240,237,232,0.3)' }}>
                    <svg style={{ width: 80, height: 80, margin: '0 auto 32px', opacity: 0.5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                    </svg>
                    <h3 style={{ fontSize: 20, margin: '0 0 12px', color: 'rgba(240,237,232,0.6)' }}>No products yet</h3>
                    <Link href="/admin/products/create" style={{
                        padding: '14px 28px', background: 'linear-gradient(135deg, #C8FF64 0%, #A8E045 100%)',
                        borderRadius: 12, color: '#000', fontWeight: 700, fontFamily: 'Space Mono', textDecoration: 'none'
                    }}>
                        Create your first product
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}
