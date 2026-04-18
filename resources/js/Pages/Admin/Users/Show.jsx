import { Head, Link, router } from '@inertiajs/react';
import AdminLayout, { StatusBadge } from '@/Layouts/AdminLayout';
import { router as inertiaRouter } from '@inertiajs/react';

const fmt = (n) => `₱${Number(n || 0).toLocaleString()}`;

export default function UserShow({ user }) {
    const handleToggleAdmin = (e) => {
        e.preventDefault();
        if (confirm(`Are you sure you want to ${user.is_admin ? 'revoke admin access' : 'grant admin access'} for ${user.name}?`)) {
            inertiaRouter.patch(`/admin/users/${user.id}/toggle-admin`);
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirm(`Are you sure you want to delete ${user.name}? This cannot be undone.`)) {
            inertiaRouter.delete(`/admin/users/${user.id}`);
        }
    };

    return (
        <AdminLayout title={user.name}>
            <Head title={`${user.name} - Admin`} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, margin: 0 }}>{user.name}</h1>
                    <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', marginTop: 4 }}>
                        ID: {user.id} • Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                </div>
                <Link href="/admin/users" style={{
                    fontSize: 13, fontWeight: 600, color: '#C8FF64', textDecoration: 'none',
                    padding: '12px 24px', border: '1px solid rgba(200,255,100,0.3)', borderRadius: 12,
                    background: 'rgba(200,255,100,0.05)',
                }}>
                    ← Back to users
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24, marginBottom: 24 }}>
                {/* User Card */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <div style={{ textAlign: 'center', marginBottom: 24 }}>
                        <div style={{
                            width: 96, height: 96, borderRadius: '50%', margin: '0 auto 20px',
                            background: user.is_admin ? 'rgba(64,200,255,0.15)' : 'rgba(200,255,100,0.15)',
                            border: `3px solid ${user.is_admin ? '#64C8FF' : '#C8FF64'}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: 36, fontWeight: 900, color: user.is_admin ? '#64C8FF' : '#C8FF64' }}>
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{user.name}</div>
                        <div style={{
                            fontFamily: 'Space Mono', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 20,
                            background: user.role === 'admin' ? 'rgba(64,200,255,0.15)' : 'rgba(200,255,100,0.15)',
                            color: user.role === 'admin' ? '#64C8FF' : '#C8FF64', textTransform: 'uppercase', display: 'inline-block'
                        }}>
                            {user.role}
                        </div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 12, letterSpacing: '0.1em' }}>Email</div>
                        <div style={{ fontSize: 15, color: '#fff', wordBreak: 'break-all' }}>{user.email}</div>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'rgba(240,237,232,0.4)', marginBottom: 12, letterSpacing: '0.1em' }}>Stats</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Space Mono', fontSize: 13 }}>
                            <span>Total Orders: <span style={{ color: '#C8FF64' }}>{user.orders_count}</span></span>
                            <span>Total Spent: <span style={{ color: '#C8FF64' }}>₱{Number(user.total_spent || 0).toLocaleString()}</span></span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 12 }}>
                        <button
                            onClick={handleToggleAdmin}
                            style={{
                                flex: 1, padding: '14px 20px', background: user.is_admin ? 'rgba(255,90,90,0.15)' : 'rgba(200,255,100,0.15)',
                                border: `1px solid ${user.is_admin ? '#FF5A5A' : '#C8FF64'}`, borderRadius: 12,
                                color: user.is_admin ? '#FF5A5A' : '#C8FF64', fontSize: 13, fontWeight: 700, fontFamily: 'Space Mono',
                                cursor: 'pointer', transition: 'all 0.15s'
                            }}
                        >
                            {user.is_admin ? 'Revoke Admin' : 'Make Admin'}
                        </button>
                        {user.orders_count === 0 && (
                            <button
                                onClick={handleDelete}
                                style={{
                                    flex: 1, padding: '14px 20px', background: 'rgba(255,90,90,0.15)', border: '1px solid #FF5A5A',
                                    borderRadius: 12, color: '#FF5A5A', fontSize: 13, fontWeight: 700, fontFamily: 'Space Mono',
                                    cursor: 'pointer', transition: 'all 0.15s'
                                }}
                            >
                                Delete User
                            </button>
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: 0 }}>Recent Orders</h2>
                            <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)' }}>{user.orders_count} total</div>
                        </div>
                        <Link href={`/admin/orders?search=${encodeURIComponent(user.email)}`} style={{ fontSize: 12, color: '#C8FF64', textDecoration: 'none' }}>View all →</Link>
                    </div>

                    {user.orders?.length > 0 ? (
                        <div style={{ maxHeight: 400, overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        {['Order #', 'Product', 'Amount', 'Status'].map((h) => (
                                            <th key={h} style={{
                                                fontFamily: 'Space Mono', fontSize: 9, color: 'rgba(240,237,232,0.3)',
                                                textAlign: 'left', paddingBottom: 12, letterSpacing: '0.1em', textTransform: 'uppercase'
                                            }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.orders.slice(0, 5).map((order) => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                            <td style={{ padding: '12px 0' }}>
                                                <Link href={`/admin/orders/${order.id}`} style={{ fontFamily: 'Space Mono', fontSize: 11, color: '#C8FF64' }}>
                                                    {order.order_number}
                                                </Link>
                                            </td>
                                            <td style={{ padding: '12px 0', fontSize: 12, color: 'rgba(240,237,232,0.7)' }}>VOID {order.product.name}</td>
                                            <td style={{ padding: '12px 0 12px 20px', fontFamily: 'Space Mono', fontSize: 11, color: '#fff' }}>{fmt(order.subtotal)}</td>
                                            <td style={{ padding: '12px 0' }}><StatusBadge status={order.status} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px 20px', color: 'rgba(240,237,232,0.3)' }}>
                            <div style={{ fontSize: 13, marginBottom: 8 }}>No orders yet</div>
                            <div style={{ fontSize: 11 }}>This customer hasn't placed any orders</div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
