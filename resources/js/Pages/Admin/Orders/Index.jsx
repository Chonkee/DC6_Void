import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout, { StatusBadge } from '@/Layouts/AdminLayout';

const fmt = (n) => `₱${Number(n || 0).toLocaleString()}`;

export default function OrdersIndex({ orders, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    const debouncedSearch = ((value) => {
        const url = new URL(window.location);
        if (value) url.searchParams.set('search', value); else url.searchParams.delete('search');
        router.visit(url.pathname + url.search, { preserveState: true, replace: true });
    }).bind(null);

    const handleStatusFilter = (newStatus) => {
        setStatus(newStatus);
        const url = new URL(window.location);
        if (newStatus) url.searchParams.set('status', newStatus); else url.searchParams.delete('status');
        router.visit(url.pathname + url.search, { preserveState: true, replace: true });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        router.patch(`/admin/orders/${orderId}`, { status: newStatus }, {
            preserveState: true,
            onSuccess: () => {
                // Status updated successfully
            },
        });
    };

    return (
        <AdminLayout title="Orders">
            <Head title="Orders - Admin" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, margin: 0 }}>Orders</h1>
                    <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', marginTop: 4 }}>Manage all customer orders</div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                        <input
                            type="text"
                            placeholder="Search by order #, customer name or email..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setTimeout(() => debouncedSearch(e.target.value), 300);
                            }}
                            style={{
                                width: '100%', padding: '12px 16px 12px 44px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
                                borderRadius: 12, color: '#fff', fontSize: 13, fontFamily: 'Syne',
                            }}
                        />
                        <svg style={{ position: 'absolute', left: 16, top: 13, width: 16, height: 16, color: 'rgba(240,237,232,0.3)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {['', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((s) => (
                            <button
                                key={s}
                                onClick={() => handleStatusFilter(s === status ? '' : s)}
                                style={{
                                    fontSize: 11, fontFamily: 'Space Mono', fontWeight: 700, textTransform: 'uppercase',
                                    padding: '8px 14px', borderRadius: 8,
                                    background: s === status ? '#C8FF641A' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${s === status ? '#C8FF64' : 'rgba(255,255,255,0.07)'}`,
                                    color: s === status ? '#C8FF64' : 'rgba(240,237,232,0.4)',
                                    cursor: 'pointer', transition: 'all 0.15s',
                                }}
                            >
                                {s || 'All'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {['Order #', 'Customer', 'Product', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
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
                            {orders.data.map((order) => (
                                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <Link href={`/admin/orders/${order.id}`} style={{ fontFamily: 'Space Mono', fontSize: 13, color: '#C8FF64', textDecoration: 'none', fontWeight: 600 }}>
                                            {order.order_number}
                                        </Link>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: 13, color: '#fff' }}>{order.user.name}</td>
                                    <td style={{ padding: '20px 24px', fontSize: 12, color: 'rgba(240,237,232,0.6)' }}>VOID {order.product.name}</td>
                                    <td style={{ padding: '20px 24px', fontFamily: 'Space Mono', fontSize: 13, color: '#fff' }}>{fmt(order.subtotal)}</td>
                                    <td style={{ padding: '20px 24px 20px 24px' }}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            style={{
                                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 8, color: '#fff', fontSize: 11, fontFamily: 'Space Mono',
                                                padding: '4px 8px', minWidth: 100
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: 11, color: 'rgba(240,237,232,0.4)', fontFamily: 'Space Mono' }}>
                                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <Link href={`/admin/orders/${order.id}`} style={{
                                            fontSize: 11, color: '#C8FF64', textDecoration: 'none', fontFamily: 'Space Mono', fontWeight: 500,
                                        }}>
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {orders.links && (
                    <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {orders.links.map((link, i) => (
                                link.url ? (
                                    <Link key={i} href={link.url} style={{
                                        width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: link.active ? '#C8FF641A' : 'rgba(255,255,255,0.03)',
                                        border: `1px solid ${link.active ? '#C8FF64' : 'rgba(255,255,255,0.07)'}`,
                                        color: link.active ? '#C8FF64' : 'rgba(240,237,232,0.4)',
                                        textDecoration: 'none', fontFamily: 'Space Mono', fontSize: 12,
                                        transition: 'all 0.15s',
                                    }}>
                                        {link.label}
                                    </Link>
                                ) : (
                                    <div key={i} style={{ width: 36, height: 36 }} />
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {orders.data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 40px', color: 'rgba(240,237,232,0.3)' }}>
                    <svg style={{ width: 64, height: 64, margin: '0 auto 24px', opacity: 0.5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                    </svg>
                    <h3 style={{ fontSize: 18, margin: '0 0 8px', color: 'rgba(240,237,232,0.6)' }}>No orders found</h3>
                    <p style={{ fontSize: 13, margin: 0 }}>Try adjusting your search or status filters.</p>
                </div>
            )}
        </AdminLayout>
    );
}
