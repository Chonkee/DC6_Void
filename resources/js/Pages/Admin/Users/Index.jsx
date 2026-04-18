import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';


export default function UsersIndex({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    const debouncedSearch = ((value) => {
        const url = new URL(window.location);
        if (value) url.searchParams.set('search', value); else url.searchParams.delete('search');
        router.visit(url.pathname + url.search, { preserveState: true, replace: true });
    }).bind(null);

    const handleRoleFilter = (newRole) => {
        setRole(newRole);
        const url = new URL(window.location);
        if (newRole) url.searchParams.set('role', newRole); else url.searchParams.delete('role');
        router.visit(url.pathname + url.search, { preserveState: true, replace: true });
    };

    const ROLES = [
        { value: '', label: 'All Roles' },
        { value: 'customer', label: 'Customers' },
        { value: 'admin', label: 'Admins' },
    ];

    return (
        <AdminLayout title="Users">
            <Head title="Users - Admin" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: -1, margin: 0 }}>Users</h1>
                    <div style={{ fontSize: 13, color: 'rgba(240,237,232,0.45)', marginTop: 4 }}>Manage customer accounts & permissions</div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ background: '#0F0F1A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: 24, marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                        <input
                            type="text"
                            placeholder="Search by name or email..."
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
                        {ROLES.map(({ value, label }) => (
                            <button
                                key={value}
                                onClick={() => handleRoleFilter(value === role ? '' : value)}
                                style={{
                                    fontSize: 11, fontFamily: 'Space Mono', fontWeight: 700, textTransform: 'uppercase',
                                    padding: '8px 14px', borderRadius: 8,
                                    background: value === role ? '#C8FF641A' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${value === role ? '#C8FF64' : 'rgba(255,255,255,0.07)'}`,
                                    color: value === role ? '#C8FF64' : 'rgba(240,237,232,0.4)',
                                    cursor: 'pointer', transition: 'all 0.15s',
                                }}
                            >
                                {label}
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
                                {['User', 'Email', 'Role', 'Orders', 'Joined', 'Last Seen', ''].map((h) => (
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
                            {users.data.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 48, height: 48, borderRadius: '50%', background: user.is_admin ? 'rgba(64,200,255,0.15)' : 'rgba(200,255,100,0.15)',
                                                border: `2px solid ${user.is_admin ? '#64C8FF' : '#C8FF64'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                            }}>
                                                <span style={{ fontSize: 16, fontWeight: 700, color: user.is_admin ? '#64C8FF' : '#C8FF64' }}>
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: 13, color: 'rgba(240,237,232,0.8)' }}>{user.email}</td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <span style={{
                                            fontFamily: 'Space Mono', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20,
                                            background: user.role === 'admin' ? 'rgba(64,200,255,0.15)' : 'rgba(200,255,100,0.15)',
                                            color: user.role === 'admin' ? '#64C8FF' : '#C8FF64', textTransform: 'uppercase'
                                        }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: user.orders_count > 0 ? '#C8FF64' : 'rgba(240,237,232,0.4)' }}>
                                            {user.orders_count} orders
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: 11, color: 'rgba(240,237,232,0.4)', fontFamily: 'Space Mono' }}>
                                        {new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td style={{ padding: '20px 24px', fontSize: 11, color: 'rgba(240,237,232,0.4)', fontFamily: 'Space Mono' }}>
                                        {user.last_login_at ? new Date(user.last_login_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Never'}
                                    </td>
                                    <td style={{ padding: '20px 24px' }}>
                                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <Link href={`/admin/users/${user.id}`} style={{
                                                fontSize: 11, color: 'rgba(240,237,232,0.6)', textDecoration: 'none', fontFamily: 'Space Mono'
                                            }}>
                                                View
                                            </Link>
                                            {user.orders_count > 0 && (
                                                <Link href={`/admin/orders?search=${encodeURIComponent(user.email)}`} style={{
                                                    fontSize: 11, color: 'rgba(240,237,232,0.4)', textDecoration: 'none', fontFamily: 'Space Mono'
                                                }}>
                                                    Orders →
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {users.links && (
                    <div style={{ padding: '24px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', gap: 2 }}>
                            {users.links.map((link, i) => (
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

            {users.data.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 40px', color: 'rgba(240,237,232,0.3)' }}>
                    <svg style={{ width: 64, height: 64, margin: '0 auto 24px', opacity: 0.5 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    </svg>
                    <h3 style={{ fontSize: 18, margin: '0 0 8px', color: 'rgba(240,237,232,0.6)' }}>No users found</h3>
                    <p style={{ fontSize: 13, margin: 0 }}>Try adjusting your search or role filters.</p>
                </div>
            )}
        </AdminLayout>
    );
}
