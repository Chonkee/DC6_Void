import { Link } from '@inertiajs/react';
import AdminLayout, { StatusBadge } from '@/Layouts/AdminLayout';

function StatCard({ label, value, sub, accent = '#C8FF64', icon }) {
    return (
        <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent }}>
                    {icon}
                </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree' }}>{label}</div>
            {sub && <div style={{ fontSize: 11, color: accent, fontFamily: 'Space Mono', marginTop: 6 }}>{sub}</div>}
        </div>
    );
}

function MiniBarChart({ data }) {
    if (!data?.length) return null;
    const max = Math.max(...data.map(d => d.total), 1);
    return (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 80 }}>
            {data.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: '100%', background: i === data.length - 1 ? '#C8FF64' : 'rgba(200,255,100,0.25)', borderRadius: '4px 4px 0 0', height: `${Math.max(4, (d.total / max) * 72)}px`, transition: 'height 0.4s ease', minHeight: 4 }} />
                    <span style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'rgba(240,237,232,0.3)', whiteSpace: 'nowrap' }}>{d.date}</span>
                </div>
            ))}
        </div>
    );
}

export default function Dashboard({ stats, ordersByStatus, recentOrders, revenueByDay, topProducts }) {
    const fmt = (n) => `₱${Number(n || 0).toLocaleString()}`;

    return (
        <AdminLayout title="Dashboard">
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
                <StatCard label="Total Revenue" value={fmt(stats.revenue)} accent="#C8FF64"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>} />
                <StatCard label="Total Orders" value={stats.orders} accent="#64C8FF"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>} />
                <StatCard label="Customers" value={stats.users} accent="#C864FF"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>} />
                <StatCard label="Products" value={stats.products} accent="#FFB432"
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginBottom: 20 }}>
                {/* Revenue chart */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Revenue — Last 7 Days</div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.3)' }}>
                                Total: {fmt(revenueByDay?.reduce((s, d) => s + Number(d.total), 0))}
                            </div>
                        </div>
                        <Link href="/admin/orders" style={{ fontSize: 12, color: '#C8FF64', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
                    </div>
                    <MiniBarChart data={revenueByDay} />
                </div>

                {/* Orders by status */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Orders by Status</div>
                    {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => {
                        const count = ordersByStatus?.[status] || 0;
                        const total = stats.orders || 1;
                        const pct = Math.round((count / total) * 100);
                        const colors = { pending: '#FFB432', confirmed: '#6496FF', shipped: '#64C8FF', delivered: '#C8FF64', cancelled: '#FF5A5A' };
                        return (
                            <div key={status} style={{ marginBottom: 14 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: 12, color: 'rgba(240,237,232,0.5)', textTransform: 'capitalize' }}>{status}</span>
                                    <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: colors[status] }}>{count}</span>
                                </div>
                                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                                    <div style={{ height: '100%', width: `${pct}%`, background: colors[status], borderRadius: 2, transition: 'width 0.4s ease' }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
                {/* Recent orders */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Recent Orders</div>
                        <Link href="/admin/orders" style={{ fontSize: 12, color: '#C8FF64', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                {['Order', 'Customer', 'Product', 'Amount', 'Status'].map((h) => (
                                    <th key={h} style={{ fontFamily: 'Space Mono', fontSize: 9, color: 'rgba(240,237,232,0.3)', textAlign: 'left', paddingBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders?.map((order) => (
                                <tr key={order.id}>
                                    {[
                                        <Link href={`/admin/orders/${order.id}`} style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#C8FF64', textDecoration: 'none' }}>{order.order_number}</Link>,
                                        <span style={{ fontSize: 13, color: '#fff' }}>{order.user?.name}</span>,
                                        <span style={{ fontSize: 12, color: 'rgba(240,237,232,0.5)' }}>VOID {order.product?.name}</span>,
                                        <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: '#fff' }}>{fmt(order.subtotal)}</span>,
                                        <StatusBadge status={order.status} />,
                                    ].map((cell, i) => (
                                        <td key={i} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Top products */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 20 }}>Top Products</div>
                    {topProducts?.map((p, i) => (
                        <div key={p.product_id} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                            <div style={{ width: 32, height: 32, borderRadius: 10, background: `${p.product?.color_accent || '#C8FF64'}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Space Mono', fontSize: 12, fontWeight: 700, color: p.product?.color_accent || '#C8FF64', flexShrink: 0 }}>
                                {i + 1}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>VOID {p.product?.name}</div>
                                <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(240,237,232,0.3)' }}>{p.orders} orders</div>
                            </div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: p.product?.color_accent || '#C8FF64', flexShrink: 0 }}>{fmt(p.revenue)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}