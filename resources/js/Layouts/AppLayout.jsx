import { useState, useEffect, useRef } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

// ── Phone SVG thumbnails ──────────────────────────────────────────────────────
function PhoneSVG({ accent = 'rgba(200,255,100,0.7)', size = 40 }) {
    return (
        <svg viewBox="0 0 80 160" width={size} height={size * 2} style={{ display: 'block' }}>
            <rect x="5" y="3" width="70" height="154" rx="16"
                fill="rgba(10,10,18,0.95)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <rect x="8" y="6" width="64" height="148" rx="13" fill="rgba(5,4,14,1)" />
            <rect x="28" y="8" width="24" height="7" rx="3.5" fill="rgba(0,0,0,0.9)" />
            <rect x="10" y="110" width="60" height="28" rx="9" fill="rgba(12,12,22,0.97)" />
            <circle cx="32" cy="124" r="9" fill="rgba(6,6,14,1)" />
            <circle cx="32" cy="124" r="5" fill="rgba(4,4,12,1)" />
            <circle cx="52" cy="124" r="7" fill="rgba(6,6,14,1)" />
            <circle cx="52" cy="124" r="3.5" fill="rgba(4,4,12,1)" />
            <line x1="40" y1="102" x2="40" y2="110" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="28" y="148" width="24" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
        </svg>
    );
}

// ── Toast ─────────────────────────────────────────────────────────────────────
export function useToast() {
    const [msg, setMsg] = useState('');
    const [visible, setVisible] = useState(false);
    const timer = useRef(null);
    const show = (m) => {
        setMsg(m); setVisible(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setVisible(false), 3000);
    };
    return { msg, visible, show };
}

// ── MegaMenu ──────────────────────────────────────────────────────────────────
const PHONES = [
    { name: 'Zero+', slug: 'zero-plus', spec: '16GB · 512GB', price: '₱59,990', badge: 'TOP', accent: '#C8FF64', featured: true },
    { name: 'Zero',  slug: 'zero',      spec: '12GB · 256GB', price: '₱49,990', badge: null,  accent: '#C8FF64' },
    { name: 'Nova',  slug: 'nova',      spec: '12GB · 256GB', price: '₱54,990', badge: 'NEW', accent: '#64C8FF' },
    { name: 'Flip',  slug: 'flip',      spec: '8GB · 256GB',  price: '₱44,990', badge: 'NEW', accent: '#C864FF' },
    { name: 'Lite',  slug: 'lite',      spec: '8GB · 128GB',  price: '₱29,990', badge: null,  accent: '#C8FF64' },
];

function MegaMenu() {
    return (
        <div className="mega-menu">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>VOID Lineup — 2025</span>
                <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'Space Mono' }}>5 devices</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
                {PHONES.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/order?model=${p.slug}`}
                        style={{
                            border: `1px solid ${p.featured ? 'rgba(200,255,100,0.25)' : p.accent !== '#C8FF64' ? `${p.accent}33` : 'var(--border)'}`,
                            background: p.featured ? 'rgba(200,255,100,0.03)' : p.accent !== '#C8FF64' ? `${p.accent}08` : 'transparent',
                            borderRadius: 14, padding: 16, position: 'relative', overflow: 'hidden',
                            cursor: 'pointer', transition: 'all 0.2s', display: 'block',
                            textDecoration: 'none',
                        }}
                    >
                        {p.badge && (
                            <span style={{ position: 'absolute', top: 10, right: 10, fontFamily: 'Space Mono', fontSize: 9, background: p.accent, color: p.accent === '#C864FF' ? '#fff' : '#000', padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>{p.badge}</span>
                        )}
                        <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <PhoneSVG accent={p.accent} size={32} />
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{p.name}</div>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)' }}>{p.spec}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: p.accent, marginTop: 8 }}>{p.price}</div>
                    </Link>
                ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <Link href="/phones" style={{ fontSize: 12, color: 'var(--muted)', transition: 'color 0.2s' }}>Compare all models</Link>
                <Link href="/phones" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>View all phones →</Link>
            </div>
        </div>
    );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ transparent, auth }) {
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        if (!transparent) return;
        const handler = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handler, { passive: true });
        return () => window.removeEventListener('scroll', handler);
    }, [transparent]);

    const navClass = `nav${!transparent || scrolled ? ' scrolled' : ''}`;

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <nav className={navClass}>
            {/* Logo */}
            <Link href="/" style={{ fontFamily: 'Space Mono', fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: -1, textDecoration: 'none' }}>
                V<span style={{ color: 'var(--accent)' }}>O</span>ID
            </Link>

            {/* Center links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {/* Phones dropdown */}
                <div className="nav-item" style={{ position: 'relative' }}>
                    <Link href="/phones" style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: url.startsWith('/phones') ? '#fff' : 'var(--muted)', transition: 'all 0.2s', background: url.startsWith('/phones') ? 'rgba(255,255,255,0.05)' : 'none', textDecoration: 'none' }}>
                        Phones
                        <svg viewBox="0 0 10 6" fill="none" width={10} height={6} style={{ opacity: 0.5 }}>
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <MegaMenu />
                </div>
                {['Features', 'Specs', 'Gallery', 'Pricing'].map((item) => (
                    <Link key={item} href={`/#${item.toLowerCase()}`} style={{ padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--muted)', transition: 'all 0.2s', textDecoration: 'none' }}>
                        {item}
                    </Link>
                ))}
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {auth?.user ? (
                    <>
                        <Link href="/orders" style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none' }}>
                            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                        </Link>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-dim)', border: '1px solid rgba(200,255,100,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--accent)', cursor: 'pointer' }}>
                            {auth.user.name.charAt(0).toUpperCase()}
                        </div>
                        <button onClick={handleLogout} style={{ padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Syne' }}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" style={{ padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', transition: 'all 0.2s', textDecoration: 'none' }}>
                            Sign In
                        </Link>
                        <Link href="/order" style={{ padding: '8px 18px', borderRadius: 100, fontSize: 13, fontWeight: 600, background: 'var(--accent)', color: '#000', textDecoration: 'none', transition: 'background 0.2s' }}>
                            Order Now
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

// ── AppLayout ─────────────────────────────────────────────────────────────────
export default function AppLayout({ children, transparent = false, toast }) {
    const { auth } = usePage().props;

    return (
        <div style={{ minHeight: '100vh', background: 'var(--black)' }}>
            <Navbar transparent={transparent} auth={auth} />
            <main>{children}</main>

            {/* Toast */}
            {toast && (
                <div className={`toast${toast.visible ? ' show' : ''}`}>
                    <div className="toast-dot" />
                    {toast.msg}
                </div>
            )}
        </div>
    );
}
