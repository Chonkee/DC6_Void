import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout, { useToast } from '@/Layouts/AppLayout';

const STATUS_COLORS = {
    pending:   { bg: 'rgba(255,180,50,0.12)',  text: '#FFB432', label: 'Pending' },
    confirmed: { bg: 'rgba(100,150,255,0.12)', text: '#6496FF', label: 'Confirmed' },
    shipped:   { bg: 'rgba(100,200,255,0.12)', text: '#64C8FF', label: 'Shipped' },
    delivered: { bg: 'rgba(200,255,100,0.12)', text: '#C8FF64', label: 'Delivered' },
};

function PhoneSVG({ accent = '#C8FF64' }) {
    return (
        <svg viewBox="0 0 80 160" width={40} height={80}>
            <rect x="5" y="3" width="70" height="154" rx="16" fill="rgba(10,10,18,0.95)" stroke={`${accent}40`} strokeWidth="1.5" />
            <rect x="8" y="6" width="64" height="148" rx="13" fill="rgba(5,4,14,1)" />
            <line x1="40" y1="102" x2="40" y2="110" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function OrderIndex({ orders, success }) {
    const toast = useToast();

    useEffect(() => {
        if (success) toast.show(`Order #${success} placed! 🎉`);
    }, []);

    return (
        <AppLayout toast={toast}>
            <div style={{ paddingTop: 64, minHeight: '100vh' }}>
                {/* Header */}
                <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--border)', padding: '48px 40px 40px' }}>
                    <div style={{ maxWidth: 900, margin: '0 auto' }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>My Account</div>
                        <h1 style={{ fontSize: 'clamp(32px,4vw,56px)', fontWeight: 900, color: '#fff', letterSpacing: -2 }}>Your Orders</h1>
                    </div>
                </div>

                <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 40px' }}>
                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <div style={{ fontSize: 48, marginBottom: 20 }}>📦</div>
                            <h2 style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 12 }}>No orders yet</h2>
                            <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Figtree', marginBottom: 28 }}>You haven't ordered any VOID devices yet.</p>
                            <Link href="/phones" className="btn-primary">Browse Phones</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {orders.map((order) => {
                                const status = STATUS_COLORS[order.status] || STATUS_COLORS.pending;
                                const accent = order.product?.color_accent || '#C8FF64';
                                return (
                                    <div key={order.id} style={{ border: '1px solid var(--border)', borderRadius: 20, padding: '24px 28px', background: 'var(--card)', display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 20, alignItems: 'center', transition: 'border-color 0.2s' }}
                                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                                        {/* Phone thumb */}
                                        <PhoneSVG accent={accent} />

                                        {/* Details */}
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>VOID {order.product?.name}</span>
                                                <span style={{ fontFamily: 'Space Mono', fontSize: 9, background: status.bg, color: status.text, padding: '2px 10px', borderRadius: 100, fontWeight: 700 }}>{status.label}</span>
                                            </div>
                                            <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', marginBottom: 4 }}>
                                                {order.storage_variant} · {order.color} · Qty {order.quantity}
                                            </div>
                                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)' }}>
                                                {order.order_number} · {new Date(order.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                            {order.accessories?.length > 0 && (
                                                <div style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Figtree', marginTop: 4 }}>
                                                    + {order.accessories.join(', ')}
                                                </div>
                                            )}
                                        </div>

                                        {/* Price & payment */}
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 4 }}>
                                                ₱{order.subtotal.toLocaleString()}
                                            </div>
                                            <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', textTransform: 'uppercase' }}>
                                                {order.payment_method}
                                                {order.installment_months ? ` · ${order.installment_months}mo` : ''}
                                            </div>
                                            {order.discount > 0 && (
                                                <div style={{ fontSize: 11, color: '#C8FF64', fontFamily: 'Space Mono', marginTop: 2 }}>
                                                    Saved ₱{order.discount.toLocaleString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Back link */}
                    <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/" style={{ fontSize: 13, color: 'var(--muted2)', textDecoration: 'none', fontFamily: 'Figtree' }}>← Back to home</Link>
                        <Link href="/order" className="btn-primary" style={{ fontSize: 13, textDecoration: 'none', padding: '12px 24px' }}>Order Again</Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
