import { useEffect, useRef, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout, { useToast } from '@/Layouts/AppLayout';

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal() {
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('vis'); }),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.f-card, .sg, .reveal').forEach((el) => obs.observe(el));
        return () => obs.disconnect();
    }, []);
}

// ── Hero Phone SVG ────────────────────────────────────────────────────────────
function HeroPhone() {
    return (
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', animation: 'float 6s ease-in-out infinite' }}>
            <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}} @keyframes pulseAnim{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}`}</style>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(200,255,100,0.07), transparent 65%)', borderRadius: '50%', filter: 'blur(40px)' }} />
            <svg viewBox="0 0 320 660" style={{ width: '100%', maxWidth: 320, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.8))' }}>
                <defs>
                    <radialGradient id="sg" cx="50%" cy="35%" r="50%"><stop offset="0%" stopColor="rgba(120,70,255,0.18)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
                    <radialGradient id="ag" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="rgba(200,255,100,0.3)" /><stop offset="100%" stopColor="rgba(200,255,100,0)" /></radialGradient>
                    <filter id="gf2"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <linearGradient id="sh" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0.07)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" /></linearGradient>
                </defs>
                <rect x="20" y="10" width="280" height="640" rx="42" fill="rgba(10,10,18,0.93)" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5" />
                <rect x="28" y="18" width="264" height="624" rx="35" fill="rgba(5,4,14,1)" />
                <rect x="28" y="18" width="264" height="624" rx="35" fill="url(#sg)" />
                <rect x="125" y="28" width="70" height="24" rx="12" fill="rgba(0,0,0,0.95)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                <text x="85" y="135" fill="rgba(255,255,255,0.9)" fontSize="32" fontWeight="800" fontFamily="monospace">11:47</text>
                <text x="108" y="162" fill="rgba(255,255,255,0.35)" fontSize="12" fontFamily="monospace">Mon, March 6</text>
                <rect x="44" y="185" width="232" height="50" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <rect x="44" y="247" width="232" height="50" rx="14" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <rect x="95" y="454" width="130" height="72" rx="22" fill="rgba(12,12,22,0.97)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <circle cx="138" cy="476" r="21" fill="rgba(6,6,14,1)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="138" cy="476" r="13" fill="rgba(4,4,12,1)" />
                <circle cx="196" cy="476" r="17" fill="rgba(6,6,14,1)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                <circle cx="196" cy="476" r="10" fill="rgba(4,4,12,1)" />
                <circle cx="160" cy="484" r="68" fill="none" stroke="rgba(200,255,100,0.05)" strokeWidth="1.5" strokeDasharray="5,4" />
                <line x1="160" y1="416" x2="160" y2="432" stroke="rgba(200,255,100,0.7)" strokeWidth="2.5" strokeLinecap="round" filter="url(#gf2)" />
                <line x1="228" y1="484" x2="212" y2="484" stroke="rgba(200,255,100,0.5)" strokeWidth="2.5" strokeLinecap="round" filter="url(#gf2)" />
                <line x1="160" y1="552" x2="160" y2="536" stroke="rgba(200,255,100,0.4)" strokeWidth="2.5" strokeLinecap="round" filter="url(#gf2)" />
                <line x1="92" y1="484" x2="108" y2="484" stroke="rgba(200,255,100,0.45)" strokeWidth="2.5" strokeLinecap="round" filter="url(#gf2)" />
                <ellipse cx="160" cy="484" rx="95" ry="95" fill="url(#ag)" opacity="0.2" />
                <rect x="110" y="604" width="100" height="4" rx="2" fill="rgba(255,255,255,0.13)" />
                <rect x="28" y="18" width="264" height="624" rx="35" fill="url(#sh)" />
            </svg>
            <div style={{ position: 'absolute', left: -20, top: '40%', background: 'rgba(10,10,18,0.9)', border: '1px solid var(--border)', borderRadius: 14, padding: '10px 16px', backdropFilter: 'blur(20px)' }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: 16, fontWeight: 700, color: '#fff' }}>5G</div>
                <div style={{ fontSize: 10, color: 'var(--muted2)', fontFamily: 'Space Mono' }}>Ultra-Wide</div>
            </div>
            <div style={{ position: 'absolute', right: -20, top: '40%', background: 'rgba(10,10,18,0.9)', border: '1px solid var(--border)', borderRadius: 14, padding: '10px 16px', backdropFilter: 'blur(20px)' }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: 16, fontWeight: 700, color: '#fff' }}>IP68</div>
                <div style={{ fontSize: 10, color: 'var(--muted2)', fontFamily: 'Space Mono' }}>Waterproof</div>
            </div>
        </div>
    );
}

// ── Features data ─────────────────────────────────────────────────────────────
const FEATURES = [
    { tag: 'DISPLAY', title: 'Glyph Matrix 2.0', desc: 'A 6.7″ ProAMOLED panel that doubles as a programmable notification surface. 120Hz adaptive, 2600 nits peak.', color: 'var(--accent)' },
    { tag: 'CAMERA', title: 'See everything', desc: 'Triple 50MP array with periscope telephoto. Night mode so advanced it rewrites what "dark" means.', color: 'var(--blue)' },
    { tag: 'PERFORMANCE', title: 'Voidcore X1 chip', desc: 'Our first in-house silicon. 4nm architecture, 12-core CPU, Neural Engine 3.0 — 40% faster than last gen.', color: 'var(--amber)' },
    { tag: 'BATTERY', title: '5100mAh, all day', desc: '45W wired, 30W wireless, 5W reverse charge. Charge to 80% in 36 minutes. Built for those who never stop.', color: 'var(--nova)' },
];

const SPECS = [
    { label: 'Display', rows: [['Size', '6.7" AMOLED'], ['Resolution', '2772×1248'], ['Refresh', '1–120Hz LTPO'], ['Brightness', '2600 nits peak']] },
    { label: 'Performance', rows: [['Chip', 'Voidcore X1'], ['CPU', '12-core 4nm'], ['RAM', '12 / 16GB'], ['Storage', '256 / 512GB']] },
    { label: 'Camera', rows: [['Main', '50MP f/1.6'], ['Ultra Wide', '50MP 120°'], ['Telephoto', '50MP 5× OIS'], ['Front', '32MP AF']] },
    { label: 'Battery', rows: [['Capacity', '5100mAh'], ['Wired', '45W fast'], ['Wireless', '30W Qi2'], ['Reverse', '5W share']] },
    { label: 'Connectivity', rows: [['Network', '5G Sub-6 + mmW'], ['WiFi', 'Wi-Fi 7'], ['Bluetooth', '5.4'], ['NFC', 'Ultra-wideband']] },
    { label: 'Build', rows: [['Protection', 'IP68 certified'], ['Glass', 'Ceramic Shield v2'], ['Frame', 'Aerospace alloy'], ['Colors', '5 options']] },
];

const PLANS = [
    { name: 'ZERO', sub: 'Base model — most popular', price: '₱49,990', usd: '≈ $870 USD', features: ['12GB RAM · 256GB Storage', 'Voidcore X1 chip', 'Triple 50MP camera system', '5100mAh · 45W charge', '12-month warranty'], hot: false, slug: 'zero' },
    { name: 'ZERO+', sub: 'Maximum performance', price: '₱59,990', usd: '≈ $1,050 USD', features: ['16GB RAM · 512GB Storage', 'Voidcore X1 Pro binning', 'All Zero features', '15-month priority warranty', 'Free VOID Case included'], hot: true, slug: 'zero-plus' },
];

// ── Home Page ─────────────────────────────────────────────────────────────────
export default function Home() {
    useReveal();
    const { auth } = usePage().props;
    const toast = useToast();
    const [selectedPlan, setSelectedPlan] = useState('zero-plus');

    return (
        <AppLayout transparent toast={toast}>
            {/* ── HERO ── */}
            <section className="hero">
                <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
                <div style={{ position: 'absolute', top: -100, left: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(100,50,255,0.12),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
                <div className="hero-inner">
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulseAnim 2s ease-in-out infinite' }} />
                            <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Space Mono' }}>New Release — 2025</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, color: '#fff', letterSpacing: -4, lineHeight: 1, marginBottom: 24 }}>
                            VOID<br /><span style={{ color: 'var(--accent)' }}>ZERO</span><span style={{ color: 'rgba(255,255,255,0.2)' }}>.</span>
                        </h1>
                        <p style={{ fontSize: 16, color: 'var(--muted)', fontFamily: 'Figtree', lineHeight: 1.7, maxWidth: 400, marginBottom: 36 }}>
                            See through the noise. The first truly transparent smartphone with Glyph Matrix 2.0 — where hardware becomes interface.
                        </p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                            <Link href={auth?.user ? '/order' : '/login'} className="btn-primary">
                                Order Now — ₱49,990
                            </Link>
                            <a href="#features" className="btn-ghost">Explore →</a>
                        </div>
                        <div style={{ display: 'flex', gap: 36 }}>
                            {[['50MP', 'Triple Camera'], ['5100', 'mAh Battery'], ['45W', 'Fast Charge']].map(([val, lbl]) => (
                                <div key={lbl}>
                                    <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>{val}</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Space Mono' }}>{lbl}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <HeroPhone />
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="sec" id="features">
                <div className="sec-inner">
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Features</div>
                        <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05 }}>
                            Built different.<br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>By design.</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {FEATURES.map((f, i) => (
                            <div key={f.tag} className="f-card" style={{ transitionDelay: `${i * 0.1}s` }}>
                                <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <svg viewBox="0 0 200 200" width="140" height="140">
                                        <circle cx="100" cy="100" r="78" fill="none" stroke={`${f.color}10`} strokeWidth="1" strokeDasharray="6,4" />
                                        <circle cx="100" cy="100" r="58" fill="none" stroke={`${f.color}20`} strokeWidth="1.5" />
                                        <circle cx="100" cy="100" r="38" fill={`${f.color}10`} />
                                        <text x="100" y="108" fill={f.color} fontSize="28" fontWeight="800" textAnchor="middle" fontFamily="Space Mono">{f.tag[0]}</text>
                                    </svg>
                                </div>
                                <div style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, color: f.color }}>{f.tag}</div>
                                <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1.18, letterSpacing: -0.8, marginBottom: 12 }}>{f.title}</h3>
                                <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree', lineHeight: 1.7 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SPECS ── */}
            <section className="sec" id="specs" style={{ background: 'var(--dark)' }}>
                <div className="sec-inner">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, gap: 24, flexWrap: 'wrap' }}>
                        <div>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Specs</div>
                            <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05, marginTop: 14 }}>
                                Under the<br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>surface.</span>
                            </h2>
                        </div>
                        <p style={{ color: 'var(--muted)', fontSize: 14, fontFamily: 'Figtree', maxWidth: 280, lineHeight: 1.7 }}>
                            Every component chosen for performance, not spec-sheet marketing.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                        {SPECS.map((s, i) => (
                            <div key={s.label} className="sg" style={{ transitionDelay: `${i * 0.08}s` }}>
                                <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ fontSize: 11, color: 'var(--accent)', opacity: 0.6 }}>◆</span>
                                    <span style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted2)' }}>{s.label}</span>
                                </div>
                                {s.rows.map(([lbl, val]) => (
                                    <div key={lbl} style={{ padding: '11px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.025)' }}>
                                        <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(255,255,255,0.32)' }}>{lbl}</span>
                                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontWeight: 500, textAlign: 'right', maxWidth: '58%' }}>{val}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY / COLORS ── */}
            <section className="sec" id="gallery">
                <div className="sec-inner">
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Gallery</div>
                        <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05 }}>
                            Five colors.<br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>One identity.</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
                        {[
                            { name: 'Obsidian', hex: '#06060A', border: 'rgba(255,255,255,0.15)' },
                            { name: 'Glacier', hex: '#E8F4FF', border: 'rgba(200,230,255,0.3)' },
                            { name: 'Void Green', hex: '#C8FF64', border: 'rgba(200,255,100,0.4)' },
                            { name: 'Nova Blue', hex: '#64C8FF', border: 'rgba(100,200,255,0.4)' },
                            { name: 'Flip Purple', hex: '#C864FF', border: 'rgba(200,100,255,0.4)' },
                        ].map((c) => (
                            <div key={c.name} className="reveal" style={{ border: `1px solid ${c.border}`, borderRadius: 20, padding: 24, textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: c.hex, border: `2px solid ${c.border}`, margin: '0 auto 16px' }} />
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{c.name}</div>
                                <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)' }}>{c.hex}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <section className="sec" id="pricing" style={{ background: 'var(--dark)' }}>
                <div className="sec-inner">
                    <div style={{ textAlign: 'center', marginBottom: 52 }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Pricing</div>
                        <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05 }}>
                            Simple pricing.<br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>No surprises.</span>
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 780, margin: '0 auto 40px' }}>
                        {PLANS.map((plan) => (
                            <div key={plan.slug} className={`plan${plan.hot ? ' hot' : ''}${selectedPlan === plan.slug ? ' sel' : ''}`} onClick={() => setSelectedPlan(plan.slug)}>
                                {plan.hot && (
                                    <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', fontSize: 9, fontWeight: 700, padding: '3px 12px', borderRadius: 100, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>MOST POPULAR</div>
                                )}
                                <div style={{ fontFamily: 'Space Mono', fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{plan.name}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Space Mono', marginBottom: 22 }}>{plan.sub}</div>
                                <div style={{ fontSize: 40, fontWeight: 900, color: '#fff', letterSpacing: -2, marginBottom: 3 }}>{plan.price}</div>
                                <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Space Mono', marginBottom: 26 }}>{plan.usd}</div>
                                <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 9 }}>
                                    {plan.features.map((f) => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree' }}>
                                            <span style={{ color: 'var(--accent)', fontSize: 10, fontWeight: 700, marginTop: 2 }}>✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={auth?.user ? `/order?model=${plan.slug}` : `/login`}
                                    style={{ display: 'block', width: '100%', padding: 13, borderRadius: 14, fontWeight: 700, fontSize: 13, textAlign: 'center', textDecoration: 'none', background: plan.hot ? 'var(--accent)' : 'rgba(255,255,255,0.06)', color: plan.hot ? '#000' : 'rgba(255,255,255,0.75)', border: plan.hot ? 'none' : '1px solid var(--border)', transition: 'all 0.2s' }}>
                                    Order {plan.name}
                                </Link>
                            </div>
                        ))}
                    </div>
                    {/* Guarantee bar */}
                    <div style={{ maxWidth: 780, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 22, padding: '18px 32px', display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
                        {[['🔒', '2-Year Warranty'], ['↩', '30-Day Returns'], ['🚚', 'Free Nationwide Shipping'], ['💳', '0% Installment']].map(([icon, label]) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree' }}>
                                <span>{icon}</span>{label}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 40px', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700 }}>V<span style={{ color: 'var(--accent)' }}>O</span>ID</div>
                <div style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Figtree' }}>© 2025 VOID Technologies. All rights reserved.</div>
                <div style={{ display: 'flex', gap: 24 }}>
                    {['Privacy', 'Terms', 'Support'].map((l) => (
                        <a key={l} href="#" style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Figtree', textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
            </footer>
        </AppLayout>
    );
}
