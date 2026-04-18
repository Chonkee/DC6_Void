import { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

const NAV = [
    {
        label: 'Dashboard',
        href: '/admin',
        match: (u) => u === '/admin',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
        ),
    },
    {
        label: 'Orders',
        href: '/admin/orders',
        match: (u) => u.startsWith('/admin/orders'),
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
        ),
    },
    {
        label: 'Products',
        href: '/admin/products',
        match: (u) => u.startsWith('/admin/products'),
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
        ),
    },
    {
        label: 'Users',
        href: '/admin/users',
        match: (u) => u.startsWith('/admin/users'),
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
        ),
    },
];

const STATUS_COLORS = {
    pending:   { bg: 'rgba(255,180,50,0.12)',  text: '#FFB432' },
    confirmed: { bg: 'rgba(100,150,255,0.12)', text: '#6496FF' },
    shipped:   { bg: 'rgba(100,200,255,0.12)', text: '#64C8FF' },
    delivered: { bg: 'rgba(200,255,100,0.12)', text: '#C8FF64' },
    cancelled: { bg: 'rgba(255,90,90,0.12)',   text: '#FF5A5A' },
};

export function StatusBadge({ status }) {
    const s = STATUS_COLORS[status] || STATUS_COLORS.pending;
    return (
        <span style={{ fontFamily: 'Space Mono', fontSize: 10, background: s.bg, color: s.text, padding: '3px 10px', borderRadius: 100, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {status}
        </span>
    );
}

export default function AdminLayout({ children, title }) {
    const { url, props } = usePage();
    const { auth } = props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const flash = props.flash || {};

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#06060A', color: '#F0EDE8', fontFamily: 'Syne, sans-serif' }}>

            {/* ── SIDEBAR ── */}
            <aside style={{
                width: sidebarOpen ? 240 : 64,
                background: '#0C0C14',
                borderRight: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', top: 0, left: 0, bottom: 0,
                transition: 'width 0.25s ease', zIndex: 100, overflow: 'hidden',
            }}>
                {/* Logo */}
                <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, minHeight: 64 }}>
                    <Link href="/admin" style={{ fontFamily: 'Space Mono', fontSize: 16, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: -1, whiteSpace: 'nowrap' }}>
                        V<span style={{ color: '#C8FF64' }}>O</span>ID
                        {sidebarOpen && <span style={{ fontSize: 10, color: 'rgba(240,237,232,0.3)', marginLeft: 8, fontWeight: 400, letterSpacing: '0.1em' }}>ADMIN</span>}
                    </Link>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(240,237,232,0.3)', cursor: 'pointer', padding: 4, borderRadius: 6, flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {sidebarOpen ? <path d="M15 18l-6-6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
                        </svg>
                    </button>
                </div>

                {/* Nav */}
                <nav style={{ padding: '12px 8px', flex: 1 }}>
                    {NAV.map((item) => {
                        const active = item.match(url);
                        return (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 12px', borderRadius: 10, marginBottom: 2,
                                color: active ? '#C8FF64' : 'rgba(240,237,232,0.45)',
                                background: active ? 'rgba(200,255,100,0.08)' : 'transparent',
                                textDecoration: 'none', transition: 'all 0.15s',
                                fontWeight: active ? 700 : 500, fontSize: 13,
                                whiteSpace: 'nowrap', overflow: 'hidden',
                                borderLeft: active ? '2px solid #C8FF64' : '2px solid transparent',
                            }}>
                                <span style={{ flexShrink: 0 }}>{item.icon}</span>
                                {sidebarOpen && item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom — user info + back to site */}
                <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, color: 'rgba(240,237,232,0.3)', textDecoration: 'none', fontSize: 12, marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                        {sidebarOpen && 'Back to site'}
                    </Link>
                    {sidebarOpen && auth?.user && (
                        <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{auth.user.name}</div>
                            <div style={{ fontSize: 10, color: 'rgba(240,237,232,0.3)', fontFamily: 'Space Mono', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{auth.user.email}</div>
                            <button onClick={handleLogout} style={{ marginTop: 8, fontSize: 11, color: '#FF5A5A', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Syne' }}>
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </aside>

            {/* ── MAIN ── */}
            <div style={{ marginLeft: sidebarOpen ? 240 : 64, flex: 1, transition: 'margin-left 0.25s ease', minWidth: 0 }}>
                {/* Top bar */}
                <header style={{ height: 64, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 32px', background: 'rgba(12,12,20,0.8)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 50 }}>
                    <h1 style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>{title}</h1>
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(200,255,100,0.15)', border: '1px solid rgba(200,255,100,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#C8FF64' }}>
                            {auth?.user?.name?.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Flash messages */}
                {(flash.success || flash.error) && (
                    <div style={{ margin: '16px 32px 0', padding: '12px 18px', borderRadius: 10, background: flash.success ? 'rgba(200,255,100,0.08)' : 'rgba(255,90,90,0.08)', border: `1px solid ${flash.success ? 'rgba(200,255,100,0.2)' : 'rgba(255,90,90,0.2)'}`, color: flash.success ? '#C8FF64' : '#FF8888', fontSize: 13, fontFamily: 'Figtree' }}>
                        {flash.success || flash.error}
                    </div>
                )}

                {/* Page content */}
                <main style={{ padding: 32 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}