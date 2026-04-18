import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout, { useToast } from '@/Layouts/AppLayout';

// ─────────────────────────────────────────────────────────────────────────────
// Scroll reveal
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// Per-product phone SVGs
// ─────────────────────────────────────────────────────────────────────────────
function NovaSVG() {
    return (
        <svg viewBox="0 0 320 680" style={{ width: '100%', maxWidth: 300, filter: 'drop-shadow(0 40px 80px rgba(0,50,150,0.5))' }}>
            <defs>
                <radialGradient id="novaScreenGlow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="rgba(0,80,200,0.2)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <radialGradient id="novaAurora" cx="50%" cy="70%" r="55%">
                    <stop offset="0%" stopColor="rgba(100,200,255,0.25)" /><stop offset="50%" stopColor="rgba(0,100,255,0.1)" /><stop offset="100%" stopColor="rgba(100,200,255,0)" />
                </radialGradient>
                <filter id="novaGlow"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <linearGradient id="novaChassis" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(12,16,30,1)" /><stop offset="100%" stopColor="rgba(6,8,20,1)" />
                </linearGradient>
            </defs>
            <rect x="18" y="8" width="284" height="664" rx="46" fill="url(#novaChassis)" stroke="rgba(100,200,255,0.2)" strokeWidth="1.5" />
            <rect x="26" y="16" width="268" height="648" rx="40" fill="rgba(4,6,18,1)" />
            <rect x="26" y="16" width="268" height="648" rx="40" fill="url(#novaScreenGlow)" />
            <path d="M18 60 Q18 8 64 8" stroke="rgba(100,200,255,0.15)" strokeWidth="1.5" fill="none" />
            <path d="M256 8 Q302 8 302 60" stroke="rgba(100,200,255,0.15)" strokeWidth="1.5" fill="none" />
            <circle cx="160" cy="34" r="8" fill="rgba(0,0,0,0.95)" stroke="rgba(100,200,255,0.15)" strokeWidth="1" />
            <circle cx="160" cy="34" r="4" fill="rgba(5,10,30,1)" />
            <circle cx="158" cy="32" r="1.5" fill="rgba(100,200,255,0.3)" />
            <text x="80" y="130" fill="rgba(255,255,255,0.92)" fontSize="34" fontWeight="800" fontFamily="monospace">11:47</text>
            <text x="106" y="158" fill="rgba(100,200,255,0.5)" fontSize="12" fontFamily="monospace">Mon, March 6</text>
            <rect x="40" y="178" width="240" height="52" rx="16" fill="rgba(100,200,255,0.04)" stroke="rgba(100,200,255,0.08)" strokeWidth="0.5" />
            <rect x="40" y="240" width="240" height="52" rx="16" fill="rgba(100,200,255,0.025)" stroke="rgba(100,200,255,0.05)" strokeWidth="0.5" />
            <rect x="42" y="312" width="50" height="50" rx="15" fill="rgba(100,200,255,0.12)" />
            <rect x="106" y="312" width="50" height="50" rx="15" fill="rgba(0,80,200,0.1)" />
            <rect x="170" y="312" width="50" height="50" rx="15" fill="rgba(100,200,255,0.06)" />
            <rect x="234" y="312" width="46" height="50" rx="15" fill="rgba(255,255,255,0.04)" />
            <rect x="88" y="458" width="144" height="88" rx="28" fill="rgba(6,10,24,0.98)" stroke="rgba(100,200,255,0.1)" strokeWidth="1" />
            <circle cx="150" cy="490" r="28" fill="rgba(3,5,15,1)" stroke="rgba(100,200,255,0.2)" strokeWidth="1" />
            <circle cx="150" cy="490" r="20" fill="rgba(2,4,12,1)" />
            <circle cx="150" cy="490" r="13" fill="rgba(5,8,22,1)" />
            <circle cx="150" cy="490" r="6" fill="rgba(10,20,50,1)" />
            <circle cx="210" cy="490" r="18" fill="rgba(3,5,15,1)" stroke="rgba(100,200,255,0.12)" strokeWidth="1" />
            <circle cx="210" cy="490" r="11" fill="rgba(2,4,12,1)" />
            <circle cx="160" cy="440" r="3.5" fill="rgba(100,200,255,0.9)" filter="url(#novaGlow)" />
            <circle cx="192" cy="450" r="2.5" fill="rgba(100,200,255,0.6)" filter="url(#novaGlow)" />
            <circle cx="218" cy="470" r="2" fill="rgba(100,200,255,0.5)" filter="url(#novaGlow)" />
            <ellipse cx="160" cy="490" rx="110" ry="80" fill="url(#novaAurora)" opacity="0.4" />
            <rect x="110" y="628" width="100" height="4" rx="2" fill="rgba(100,200,255,0.15)" />
        </svg>
    );
}

function FlipSVG() {
    return (
        <svg viewBox="0 0 280 440" style={{ width: 260, filter: 'drop-shadow(0 30px 80px rgba(150,0,200,0.4))' }}>
            <defs>
                <radialGradient id="flipScreenGlow" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="rgba(150,0,255,0.15)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <linearGradient id="flipChassis" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgba(20,8,32,1)" /><stop offset="100%" stopColor="rgba(10,4,18,1)" />
                </linearGradient>
                <filter id="flipGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <linearGradient id="hingeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(200,100,255,0.4)" /><stop offset="50%" stopColor="rgba(200,100,255,0.1)" /><stop offset="100%" stopColor="rgba(200,100,255,0.4)" />
                </linearGradient>
            </defs>
            {/* Top half */}
            <rect x="15" y="8" width="250" height="196" rx="32" fill="url(#flipChassis)" stroke="rgba(200,100,255,0.25)" strokeWidth="1.5" />
            <rect x="22" y="15" width="236" height="182" rx="26" fill="rgba(8,3,16,1)" />
            <rect x="22" y="15" width="236" height="182" rx="26" fill="url(#flipScreenGlow)" />
            <circle cx="140" cy="30" r="7" fill="rgba(0,0,0,0.9)" stroke="rgba(200,100,255,0.15)" strokeWidth="1" />
            <circle cx="140" cy="30" r="3.5" fill="rgba(10,4,18,1)" />
            <text x="70" y="90" fill="rgba(255,255,255,0.88)" fontSize="28" fontWeight="800" fontFamily="monospace">11:47</text>
            <text x="90" y="112" fill="rgba(200,100,255,0.5)" fontSize="11" fontFamily="monospace">Mon, March 6</text>
            <rect x="30" y="130" width="220" height="40" rx="12" fill="rgba(200,100,255,0.05)" stroke="rgba(200,100,255,0.08)" strokeWidth="0.5" />
            {/* Hinge */}
            <rect x="15" y="204" width="250" height="32" rx="0" fill="url(#hingeGrad)" />
            <rect x="25" y="210" width="230" height="20" rx="10" fill="rgba(25,10,40,0.8)" stroke="rgba(200,100,255,0.15)" strokeWidth="1" />
            <circle cx="60" cy="220" r="5" fill="rgba(200,100,255,0.15)" />
            <circle cx="140" cy="220" r="7" fill="rgba(200,100,255,0.1)" stroke="rgba(200,100,255,0.25)" strokeWidth="1" />
            <circle cx="220" cy="220" r="5" fill="rgba(200,100,255,0.15)" />
            <text x="133" y="224" fill="rgba(200,100,255,0.5)" fontSize="8" fontFamily="monospace" fontWeight="700">∞</text>
            {/* Bottom half */}
            <rect x="15" y="236" width="250" height="196" rx="32" fill="url(#flipChassis)" stroke="rgba(200,100,255,0.25)" strokeWidth="1.5" />
            <rect x="22" y="243" width="236" height="182" rx="26" fill="rgba(6,2,12,1)" />
            <rect x="30" y="255" width="220" height="80" rx="14" fill="rgba(12,4,22,0.9)" stroke="rgba(200,100,255,0.08)" strokeWidth="0.5" />
            <rect x="30" y="348" width="110" height="62" rx="18" fill="rgba(10,4,20,0.97)" stroke="rgba(200,100,255,0.1)" strokeWidth="1" />
            <circle cx="68" cy="368" r="20" fill="rgba(4,2,10,1)" stroke="rgba(200,100,255,0.2)" strokeWidth="1" />
            <circle cx="68" cy="368" r="13" fill="rgba(3,1,8,1)" />
            <circle cx="68" cy="368" r="7" fill="rgba(8,3,18,1)" />
            <circle cx="112" cy="368" r="15" fill="rgba(4,2,10,1)" stroke="rgba(200,100,255,0.15)" strokeWidth="1" />
            <circle cx="112" cy="368" r="8" fill="rgba(3,1,8,1)" />
            <circle cx="68" cy="332" r="3" fill="rgba(200,100,255,0.7)" filter="url(#flipGlow)" />
            <circle cx="104" cy="332" r="2.5" fill="rgba(200,100,255,0.5)" filter="url(#flipGlow)" />
            <rect x="90" y="416" width="100" height="4" rx="2" fill="rgba(200,100,255,0.15)" />
        </svg>
    );
}

function StandardSVG({ accent = '#C8FF64' }) {
    return (
        <svg viewBox="0 0 320 660" style={{ width: '100%', maxWidth: 300, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.8))' }}>
            <defs>
                <radialGradient id="stdGlow" cx="50%" cy="35%" r="50%">
                    <stop offset="0%" stopColor="rgba(120,70,255,0.18)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" />
                </radialGradient>
                <linearGradient id="stdSheen" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.07)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
            </defs>
            <rect x="20" y="10" width="280" height="640" rx="42" fill="rgba(10,10,18,0.93)" stroke={`${accent}22`} strokeWidth="1.5" />
            <rect x="28" y="18" width="264" height="624" rx="35" fill="rgba(5,4,14,1)" />
            <rect x="28" y="18" width="264" height="624" rx="35" fill="url(#stdGlow)" />
            <rect x="125" y="28" width="70" height="24" rx="12" fill="rgba(0,0,0,0.95)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x="85" y="135" fill="rgba(255,255,255,0.9)" fontSize="32" fontWeight="800" fontFamily="monospace">11:47</text>
            <text x="108" y="162" fill="rgba(255,255,255,0.35)" fontSize="12" fontFamily="monospace">Mon, March 6</text>
            <rect x="44" y="185" width="232" height="50" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            <rect x="44" y="247" width="232" height="50" rx="14" fill="rgba(255,255,255,0.025)" />
            <rect x="95" y="454" width="130" height="72" rx="22" fill="rgba(12,12,22,0.97)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            <circle cx="138" cy="476" r="21" fill="rgba(6,6,14,1)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="138" cy="476" r="13" fill="rgba(4,4,12,1)" />
            <circle cx="196" cy="476" r="17" fill="rgba(6,6,14,1)" />
            <circle cx="196" cy="476" r="10" fill="rgba(4,4,12,1)" />
            <line x1="160" y1="416" x2="160" y2="432" stroke={accent} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="228" y1="484" x2="212" y2="484" stroke={`${accent}80`} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="160" y1="552" x2="160" y2="536" stroke={`${accent}66`} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="92" y1="484" x2="108" y2="484" stroke={`${accent}70`} strokeWidth="2.5" strokeLinecap="round" />
            <rect x="110" y="604" width="100" height="4" rx="2" fill="rgba(255,255,255,0.13)" />
            <rect x="28" y="18" width="264" height="624" rx="35" fill="url(#stdSheen)" />
        </svg>
    );
}

function ProductHeroSVG({ slug, accent }) {
    if (slug === 'nova') return <NovaSVG />;
    if (slug === 'flip') return <FlipSVG />;
    return <StandardSVG accent={accent} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Specs table
// ─────────────────────────────────────────────────────────────────────────────
function SpecsGrid({ specs, accent }) {
    if (!specs) return null;
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            {Object.entries(specs).map(([group, rows], i) => (
                <div key={group} className="sg" style={{ transitionDelay: `${i * 0.08}s` }}>
                    <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: accent, opacity: 0.6 }}>◆</span>
                        <span style={{ fontFamily: 'Space Mono', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted2)' }}>{group}</span>
                    </div>
                    {Object.entries(rows).map(([k, v]) => (
                        <div key={k} style={{ padding: '11px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.025)' }}>
                            <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(255,255,255,0.32)' }}>{k}</span>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontWeight: 500, textAlign: 'right', maxWidth: '58%' }}>{v}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductShow({ product }) {
    useReveal();
    const { auth } = usePage().props;
    const toast = useToast();
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
    const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

    const accent = product.color_accent || '#C8FF64';
    const isLight = accent === '#F0EDE8' || accent === '#E8F4FF';
    const accentText = isLight ? '#000' : accent;

    // Hero badge label
    const heroBadge = product.slug === 'nova'
        ? 'NEW — Cosmic Series 2025'
        : product.slug === 'flip'
        ? 'NEW — Fold Series 2025'
        : product.badge
        ? `${product.badge} — Lineup 2025`
        : 'Lineup 2025';

    // Stats per product
    const heroStats = {
        nova: [['200MP', 'Main Sensor'], ['6.8"', 'Curved Display'], ['5500', 'mAh Battery']],
        flip: [['6.9"', 'Inner Screen'], ['3.8"', 'Cover Display'], ['200K', 'Fold Cycles']],
    }[product.slug] || [
        ['50MP', 'Triple Camera'],
        [`${product.variants?.[0]?.ram || '12GB'}`, 'RAM'],
        ['5100', 'mAh Battery'],
    ];

    return (
        <AppLayout transparent toast={toast}>
            {/* ── HERO ── */}
            <section style={{
                minHeight: '100vh', display: 'flex', alignItems: 'center',
                position: 'relative', overflow: 'hidden', paddingTop: 64,
                background: `radial-gradient(ellipse at 70% 50%, ${accent}08 0%, transparent 60%)`,
            }}>
                {/* Background grid */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
                {/* Ambient blobs */}
                <div style={{ position: 'absolute', top: -120, left: -120, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle,${accent}14,transparent 70%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: -100, right: '10%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle,${accent}08,transparent 70%)`, filter: 'blur(60px)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 64, width: '100%' }}>
                    {/* Left: copy */}
                    <div>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: `${accent}0d`, border: `1px solid ${accent}30`, borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: accent, animation: 'pulseAnim 2s ease-in-out infinite' }} />
                            <span style={{ fontSize: 12, color: `${accent}99`, fontFamily: 'Space Mono' }}>{heroBadge}</span>
                        </div>
                        <h1 style={{ fontSize: 'clamp(52px,8vw,96px)', fontWeight: 900, color: '#fff', letterSpacing: -4, lineHeight: 1, marginBottom: 24 }}>
                            VOID<br />
                            <span style={{ color: accent }}>{product.name.toUpperCase()}</span>
                            <span style={{ color: 'rgba(255,255,255,0.12)' }}>.</span>
                        </h1>
                        <p style={{ fontSize: 16, color: 'var(--muted)', fontFamily: 'Figtree', lineHeight: 1.7, maxWidth: 420, marginBottom: 36 }}>
                            {product.tagline}
                        </p>

                        {/* Flip-specific hinge callout */}
                        {product.slug === 'flip' && (
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: `${accent}0a`, border: `1px solid ${accent}20`, borderRadius: 100, padding: '8px 18px', marginBottom: 24 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, opacity: 0.6 }} />
                                <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Figtree' }}>Precision Hinge · 200,000 folds tested</span>
                            </div>
                        )}

                        {/* CTA */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
                            <Link href={auth?.user ? `/order?model=${product.slug}` : `/login`}
                                style={{ background: accent, color: isLight ? '#000' : (accent === '#C864FF' ? '#fff' : '#000'), padding: '14px 32px', borderRadius: 100, fontWeight: 700, fontSize: 14, textDecoration: 'none', transition: 'opacity 0.2s', fontFamily: 'Syne' }}>
                                Order Now — ₱{(selectedVariant?.price || product.base_price).toLocaleString()}
                            </Link>
                            <a href="#features" className="btn-ghost">Explore →</a>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'flex', gap: 36, paddingTop: 24, borderTop: `1px solid ${accent}18` }}>
                            {heroStats.map(([val, lbl]) => (
                                <div key={lbl}>
                                    <div style={{ fontSize: 28, fontWeight: 900, color: accent, letterSpacing: -1 }}>{val}</div>
                                    <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Space Mono' }}>{lbl}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: phone SVG */}
                    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                        <style>{`@keyframes floatPhone{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}} @keyframes pulseAnim{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}`}</style>
                        <div style={{ animation: 'floatPhone 6s ease-in-out infinite' }}>
                            <ProductHeroSVG slug={product.slug} accent={accent} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FEATURES ── */}
            {product.features?.length > 0 && (
                <section className="sec" id="features">
                    <div className="sec-inner">
                        <div style={{ textAlign: 'center', marginBottom: 52 }}>
                            <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Features</div>
                            <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05 }}>
                                Built for<br /><span style={{ color: accent }}>everything.</span>
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                            {product.features.map((f, i) => (
                                <div key={f.tag} className="f-card" style={{ transitionDelay: `${i * 0.1}s` }}>
                                    <div style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                        <svg viewBox="0 0 200 200" width="130" height="130">
                                            <circle cx="100" cy="100" r="78" fill="none" stroke={`${accent}10`} strokeWidth="1" strokeDasharray="6,4" />
                                            <circle cx="100" cy="100" r="55" fill="none" stroke={`${accent}20`} strokeWidth="1.5" />
                                            <circle cx="100" cy="100" r="36" fill={`${accent}10`} />
                                            <text x="100" y="108" fill={accent} fontSize="24" fontWeight="800" textAnchor="middle" fontFamily="Space Mono">{f.tag[0]}</text>
                                        </svg>
                                    </div>
                                    <div style={{ fontFamily: 'Space Mono', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10, color: accent }}>{f.tag}</div>
                                    <h3 style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.2, letterSpacing: -0.8, marginBottom: 12 }}>{f.title}</h3>
                                    <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree', lineHeight: 1.7 }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── SPECS ── */}
            {product.specs && (
                <section className="sec" id="specs" style={{ background: 'var(--dark)' }}>
                    <div className="sec-inner">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 52, gap: 24, flexWrap: 'wrap' }}>
                            <div>
                                <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Specifications</div>
                                <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05, marginTop: 14 }}>
                                    Under the<br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>surface.</span>
                                </h2>
                            </div>
                            <p style={{ color: 'var(--muted)', fontSize: 14, fontFamily: 'Figtree', maxWidth: 280, lineHeight: 1.7 }}>
                                Every component chosen for performance, not spec-sheet marketing.
                            </p>
                        </div>
                        <SpecsGrid specs={product.specs} accent={accent} />
                    </div>
                </section>
            )}

            {/* ── COLORS ── */}
            {product.colors?.length > 0 && (
                <section className="sec" id="gallery">
                    <div className="sec-inner">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                            <div>
                                <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Colors</div>
                                <h2 style={{ fontSize: 40, fontWeight: 900, color: '#fff', letterSpacing: -2, marginBottom: 8 }}>
                                    {product.colors.find(c => c.name === selectedColor)?.name || product.colors[0].name}
                                </h2>
                                <p style={{ color: 'var(--muted)', fontFamily: 'Figtree', fontSize: 15, marginBottom: 28 }}>
                                    Available in {product.colors.length} handcrafted colorways.
                                </p>
                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                                    {product.colors.map((c) => (
                                        <button key={c.name} onClick={() => setSelectedColor(c.name)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px', borderRadius: 14, border: selectedColor === c.name ? `1px solid ${accent}` : '1px solid var(--border)', background: 'none', cursor: 'pointer', transition: 'all 0.2s', color: selectedColor === c.name ? '#fff' : 'var(--muted)', fontSize: 13, fontWeight: 500, fontFamily: 'Syne' }}>
                                            <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.15)' }} />
                                            {c.name}
                                        </button>
                                    ))}
                                </div>
                                {/* Variant selector */}
                                {product.variants?.length > 0 && (
                                    <div style={{ borderTop: '1px solid var(--border)' }}>
                                        {product.variants.map((v) => (
                                            <div key={v.storage} onClick={() => setSelectedVariant(v)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer', transition: 'background 0.2s' }}>
                                                <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: selectedVariant?.storage === v.storage ? '#fff' : 'rgba(255,255,255,0.32)' }}>{v.ram} · {v.storage}</span>
                                                <span style={{ fontSize: 13, color: selectedVariant?.storage === v.storage ? accent : 'rgba(255,255,255,0.65)', fontWeight: 700 }}>₱{v.price.toLocaleString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* Color preview */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: 280, height: 280, borderRadius: '50%', background: `radial-gradient(circle, ${product.colors.find(c => c.name === selectedColor)?.hex || accent}30 0%, transparent 70%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${accent}20`, transition: 'all 0.4s ease' }}>
                                    <div style={{ width: 120, height: 120, borderRadius: '50%', background: product.colors.find(c => c.name === selectedColor)?.hex || accent, boxShadow: `0 20px 60px ${product.colors.find(c => c.name === selectedColor)?.hex || accent}60`, transition: 'all 0.4s ease' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── PRICING / CTA ── */}
            <section className="sec" style={{ background: 'var(--dark)' }} id="pricing">
                <div className="sec-inner" style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Pricing</div>
                    <h2 style={{ fontSize: 'clamp(38px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1.05, marginBottom: 48 }}>
                        Get yours today.
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, maxWidth: 780, margin: '0 auto 48px' }}>
                        {product.variants.map((v, i) => (
                            <div key={v.storage} className="reveal" style={{ border: i === 0 ? `1px solid ${accent}40` : '1px solid var(--border)', borderRadius: 26, padding: '32px 28px', background: i === 0 ? `${accent}04` : 'transparent', position: 'relative' }}>
                                {i === 0 && product.variants.length > 1 && (
                                    <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: accent, color: isLight ? '#000' : (accent === '#C864FF' ? '#fff' : '#000'), fontSize: 9, fontWeight: 700, padding: '3px 12px', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.08em' }}>BEST VALUE</div>
                                )}
                                <div style={{ fontFamily: 'Space Mono', fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{v.ram} · {v.storage}</div>
                                <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', letterSpacing: -2, marginBottom: 24 }}>₱{v.price.toLocaleString()}</div>
                                <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 9, textAlign: 'left' }}>
                                    {[
                                        `${v.ram} LPDDR5 RAM`,
                                        `${v.storage} UFS 4.0 Storage`,
                                        'All camera features',
                                        '2-Year warranty',
                                    ].map((f) => (
                                        <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree' }}>
                                            <span style={{ color: accent, fontSize: 10, marginTop: 2 }}>✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={auth?.user ? `/order?model=${product.slug}` : `/login`}
                                    style={{ display: 'block', padding: '13px', borderRadius: 14, fontWeight: 700, fontSize: 13, textAlign: 'center', textDecoration: 'none', background: i === 0 ? accent : 'rgba(255,255,255,0.06)', color: i === 0 ? (isLight ? '#000' : (accent === '#C864FF' ? '#fff' : '#000')) : 'rgba(255,255,255,0.75)', border: i === 0 ? 'none' : '1px solid var(--border)', transition: 'all 0.2s', fontFamily: 'Syne' }}>
                                    Order Now
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Guarantees */}
                    <div style={{ maxWidth: 780, margin: '0 auto', border: '1px solid var(--border)', borderRadius: 22, padding: '18px 32px', display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
                        {[['🔒', '2-Year Warranty'], ['↩', '30-Day Returns'], ['🚚', 'Free Shipping'], ['💳', '0% Installment']].map(([icon, lbl]) => (
                            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree' }}>
                                <span>{icon}</span>{lbl}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── "Also consider" ── */}
            <section style={{ borderTop: '1px solid var(--border)', padding: '64px 40px' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                    <div>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Also consider</div>
                        <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Figtree' }}>Explore the full VOID lineup</p>
                    </div>
                    <Link href="/phones" style={{ padding: '12px 28px', borderRadius: 100, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'Syne' }}>
                        Browse all phones →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 40px', maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700 }}>V<span style={{ color: accent }}>O</span>ID</div>
                <div style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Figtree' }}>© 2025 VOID Technologies. All rights reserved.</div>
            </footer>
        </AppLayout>
    );
}
