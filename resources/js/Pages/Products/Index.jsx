import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

function PhoneSVG({ accent = '#C8FF64', size = 60 }) {
    return (
        <svg viewBox="0 0 80 160" width={size} height={size * 2} style={{ display: 'block' }}>
            <rect x="5" y="3" width="70" height="154" rx="16" fill="rgba(10,10,18,0.95)" stroke={`${accent}30`} strokeWidth="1.5" />
            <rect x="8" y="6" width="64" height="148" rx="13" fill="rgba(5,4,14,1)" />
            <rect x="28" y="8" width="24" height="7" rx="3.5" fill="rgba(0,0,0,0.9)" />
            <rect x="10" y="110" width="60" height="28" rx="9" fill="rgba(12,12,22,0.97)" />
            <circle cx="32" cy="124" r="9" fill="rgba(6,6,14,1)" />
            <circle cx="32" cy="124" r="5" fill="rgba(4,4,12,1)" />
            <circle cx="52" cy="124" r="7" fill="rgba(6,6,14,1)" />
            <circle cx="52" cy="124" r="3.5" fill="rgba(4,4,12,1)" />
            <line x1="40" y1="102" x2="40" y2="110" stroke={accent} strokeWidth="2" strokeLinecap="round" />
            <rect x="28" y="148" width="24" height="2" rx="1" fill={`${accent}30`} />
        </svg>
    );
}

export default function ProductsIndex({ products }) {
    return (
        <AppLayout>
            <div style={{ paddingTop: 64 }}>
                {/* Header */}
                <div style={{ background: 'var(--dark)', borderBottom: '1px solid var(--border)', padding: '64px 40px 48px' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <div style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>Lineup 2025</div>
                        <h1 style={{ fontSize: 'clamp(38px,5vw,72px)', fontWeight: 900, color: '#fff', letterSpacing: -3, lineHeight: 1 }}>
                            Every VOID.<br /><span style={{ color: 'rgba(255,255,255,0.2)' }}>Find yours.</span>
                        </h1>
                    </div>
                </div>

                {/* Products grid */}
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
                        {products.map((product) => (
                            <div key={product.id} style={{ border: `1px solid ${product.is_featured ? 'rgba(200,255,100,0.2)' : 'var(--border)'}`, borderRadius: 24, background: 'var(--card)', padding: 32, transition: 'border-color 0.2s, transform 0.2s', cursor: 'pointer', position: 'relative' }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = product.color_accent + '40'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = product.is_featured ? 'rgba(200,255,100,0.2)' : 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                {product.badge && (
                                    <div style={{ position: 'absolute', top: 20, right: 20, fontFamily: 'Space Mono', fontSize: 9, background: product.color_accent, color: product.color_accent === '#C864FF' ? '#fff' : '#000', padding: '3px 10px', borderRadius: 100, fontWeight: 700 }}>
                                        {product.badge}
                                    </div>
                                )}
                                {/* Phone visual */}
                                <div style={{ height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                                    <PhoneSVG accent={product.color_accent} size={64} />
                                </div>
                                <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 6 }}>VOID {product.name}</h2>
                                <p style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree', lineHeight: 1.6, marginBottom: 20 }}>{product.tagline}</p>

                                {/* Variants quick view */}
                                {product.variants?.length > 0 && (
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                                        {product.variants.map((v) => (
                                            <span key={v.storage} style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', border: '1px solid var(--border)', borderRadius: 8, padding: '4px 10px' }}>
                                                {v.ram} · {v.storage}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Space Mono', marginBottom: 2 }}>Starting at</div>
                                        <div style={{ fontSize: 24, fontWeight: 900, color: product.color_accent, letterSpacing: -1 }}>
                                            ₱{product.base_price.toLocaleString()}
                                        </div>
                                    </div>
                                    <Link href={`/order?model=${product.slug}`} style={{ padding: '12px 22px', borderRadius: 100, background: product.color_accent, color: product.color_accent === '#C864FF' ? '#fff' : '#000', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'opacity 0.2s' }}>
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Compare banner */}
                <div style={{ borderTop: '1px solid var(--border)', padding: '48px 40px', textAlign: 'center' }}>
                    <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Figtree', marginBottom: 20 }}>Not sure which to pick? Every VOID comes with a 30-day return guarantee.</p>
                    <Link href="/#pricing" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>Compare models →</Link>
                </div>
            </div>
        </AppLayout>
    );
}
