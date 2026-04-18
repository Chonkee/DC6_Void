import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout, { StatusBadge } from '@/Layouts/AdminLayout';

const fmt = (n) => `₱${Number(n || 0).toLocaleString()}`;

export default function OrderShow({ order }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        status: order.status,
    });

    const handleStatusChange = (e) => {
        setData('status', e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(`/admin/orders/${order.id}`);
    };

    return (
        <AdminLayout title={`Order ${order.order_number}`}>
            <Head title={`Order ${order.order_number} - Admin`} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, margin: 0 }}>Order {order.order_number}</h1>
                    <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', marginTop: 4 }}>
                        Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                    </div>
                </div>
                <Link href="/admin/orders" style={{
                    fontSize: 13, fontWeight: 600, color: '#C8FF64', textDecoration: 'none',
                    padding: '12px 24px', border: '1px solid rgba(200,255,100,0.3)', borderRadius: 12,
                    background: 'rgba(200,255,100,0.05)',
                }}>
                    ← Back to orders
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
                {/* Order Details */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: -0.5 }}>Order Details</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                        <div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Order Number</div>
                            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'Space Mono' }}>{order.order_number}</div>
                        </div>
                        <div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Status</div>
                            <StatusBadge status={order.status} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                        <div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Subtotal</div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: '#C8FF64', letterSpacing: -1 }}>{fmt(order.subtotal)}</div>
                        </div>
                        <div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Total</div>
                            <div style={{ fontSize: 28, fontWeight: 900, color: '#C8FF64', letterSpacing: -1 }}>{fmt(order.subtotal)}</div>
                        </div>
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, padding: 24, marginBottom: 32 }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 16, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Product Details</div>
                        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                            <div style={{ width: 80, height: 80, borderRadius: 16, background: `${order.product.color_accent}18`, border: `1px solid ${order.product.color_accent}20`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontFamily: 'Space Mono', fontSize: 28, fontWeight: 900, color: order.product.color_accent }}>V</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 4 }}>VOID {order.product.name}</div>
                                <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.6)' }}>{order.product.tagline}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Notes</div>
                    <p style={{ fontSize: 13, color: 'rgba(240,237,232,0.6)', lineHeight: 1.6 }}>{order.notes || 'No notes for this order.'}</p>
                </div>

                {/* Update Status */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: -0.5 }}>Update Status</h2>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Status
                            </label>
                            <select
                                value={data.status}
                                onChange={handleStatusChange}
                                disabled={processing}
                                style={{
                                    width: '100%', padding: '12px 16px', background: 'rgba(110, 71, 71, 0.02)', border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 12, color: '#fff', fontSize: 13, fontFamily: 'Syne',
                                }}
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && <div style={{ fontSize: 11, color: '#FF5A5A', marginTop: 6 }}>{errors.status}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            style={{
                                width: '100%', padding: '14px 24px', background: 'linear-gradient(135deg, #C8FF64 0%, #A8E045 100%)',
                                border: 'none', borderRadius: 12, color: '#000', fontSize: 13, fontWeight: 700, fontFamily: 'Space Mono',
                                cursor: processing ? 'not-allowed' : 'pointer', opacity: processing ? 0.7 : 1,
                            }}
                        >
                            {processing ? 'Updating...' : 'Update Status'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Customer Info */}
            <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28, marginTop: 24 }}>
                <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(200,255,100,0.15)', border: '2px solid rgba(200,255,100,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 24, fontWeight: 700, color: '#C8FF64' }}>{order.user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{order.user.name}</div>
                        <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.6)', marginBottom: 4 }}>{order.user.email}</div>
                        <Link href={`/admin/users/${order.user.id}`} style={{ fontSize: 12, color: '#C8FF64', textDecoration: 'none' }}>View customer profile →</Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
