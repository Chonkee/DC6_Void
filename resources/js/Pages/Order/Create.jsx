import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import AppLayout, { useToast } from '@/Layouts/AppLayout';

// ── Phone SVG ─────────────────────────────────────────────────────────────────
function PhoneSVG({ accent = '#C8FF64' }) {
    return (
        <svg viewBox="0 0 80 160" width={72} height={144}>
            <rect x="5" y="3" width="70" height="154" rx="16" fill="rgba(10,10,18,0.95)" stroke={`${accent}40`} strokeWidth="1.5" />
            <rect x="8" y="6" width="64" height="148" rx="13" fill="rgba(5,4,14,1)" />
            <rect x="28" y="8" width="24" height="7" rx="3.5" fill="rgba(0,0,0,0.9)" />
            <rect x="10" y="110" width="60" height="28" rx="9" fill="rgba(12,12,22,0.97)" />
            <circle cx="32" cy="124" r="9" fill="rgba(6,6,14,1)" />
            <circle cx="32" cy="124" r="5" fill="rgba(4,4,12,1)" />
            <circle cx="52" cy="124" r="7" fill="rgba(6,6,14,1)" />
            <circle cx="52" cy="124" r="3.5" fill="rgba(4,4,12,1)" />
            <line x1="40" y1="102" x2="40" y2="110" stroke={accent} strokeWidth="2" strokeLinecap="round" />
            <rect x="28" y="148" width="24" height="2" rx="1" fill={`${accent}40`} />
        </svg>
    );
}

// ── Promo codes ───────────────────────────────────────────────────────────────
const PROMO_CODES = { VOID10: 0.10, VOID15: 0.15, LAUNCH: 0.20 };

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, children }) {
    return (
        <div style={{ border: '1px solid var(--border)', borderRadius: 20, padding: 28, marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.4, marginBottom: 20 }}>{title}</h3>
            {children}
        </div>
    );
}

// ── SuccessModal ──────────────────────────────────────────────────────────────
function SuccessModal({ orderNumber, onClose }) {
    return (
        <div className="modal-overlay open" onClick={onClose}>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 28, padding: 48, maxWidth: 440, width: '90%', textAlign: 'center', animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1)' }} onClick={(e) => e.stopPropagation()}>
                <style>{`@keyframes modalIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}`}</style>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent-dim)', border: '2px solid rgba(200,255,100,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32 }}>✅</div>
                <h2 style={{ fontSize: 26, fontWeight: 900, color: '#fff', letterSpacing: -1, marginBottom: 10 }}>Order placed!</h2>
                <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Figtree', lineHeight: 1.6, marginBottom: 16 }}>Your VOID device is being prepared. Expect delivery within 3–5 business days.</p>
                <div style={{ fontFamily: 'Space Mono', fontSize: 13, color: 'var(--accent)', marginBottom: 28 }}>{orderNumber}</div>
                <button className="btn-form" onClick={() => router.visit('/orders')} style={{ marginBottom: 10 }}>View My Orders</button>
                <button onClick={() => router.visit('/')} style={{ width: '100%', padding: 14, borderRadius: 12, background: 'none', border: '1px solid var(--border)', color: 'var(--muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'Syne', transition: 'all 0.2s' }}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function OrderCreate({ selectedProduct, products }) {
    const toast = useToast();

    // Default to first product or selectedProduct
    const defaultProduct = selectedProduct || products[0];
    const [product, setProduct] = useState(defaultProduct);
    const [variant, setVariant] = useState(product?.variants?.[0] || null);
    const [color, setColor] = useState(product?.colors?.[0]?.name || '');
    const [selectedAccs, setSelectedAccs] = useState([]);
    const [qty, setQty] = useState(1);
    const [payMethod, setPayMethod] = useState('card');
    const [installMonths, setInstallMonths] = useState(0);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoApplied, setPromoApplied] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState('configure');

    // Shipping address
    const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', province: '', zip: '' });

    const accTotal = selectedAccs.reduce((s, a) => s + (product?.accessories?.find(x => x.name === a)?.price || 0), 0);
    const basePrice = variant?.price || product?.base_price || 0;
    const subtotal = Math.max(0, basePrice * qty + accTotal - discount);
    const accent = product?.color_accent || '#C8FF64';

    useEffect(() => {
        if (product) {
            setVariant(product.variants?.[0] || null);
            setColor(product.colors?.[0]?.name || '');
            setSelectedAccs([]);
            setDiscount(0);
            setPromoApplied(false);
            setPromoCode('');
        }
    }, [product]);

    const applyPromo = () => {
        const code = promoCode.trim().toUpperCase();
        if (PROMO_CODES[code]) {
            const d = Math.floor(basePrice * qty * PROMO_CODES[code]);
            setDiscount(d);
            setPromoApplied(true);
            toast.show(`Promo applied! ${PROMO_CODES[code] * 100}% off 🎉`);
        } else {
            toast.show('Invalid promo code.');
            setDiscount(0);
            setPromoApplied(false);
        }
    };

    const placeOrder = async () => {
        if (!product || !variant || !color || !payMethod) {
            toast.show('Please complete your configuration.');
            return;
        }
        if (!address.name || !address.line1 || !address.city || !address.province) {
            setActiveTab('shipping');
            toast.show('Please fill in your shipping address.');
            return;
        }
        setSubmitting(true);
        router.post('/order', {
            product_id: product.id,
            color,
            storage_variant: `${variant.ram} · ${variant.storage}`,
            quantity: qty,
            accessories: selectedAccs,
            payment_method: payMethod,
            installment_months: installMonths || null,
            promo_code: promoApplied ? promoCode.toUpperCase() : null,
            discount,
            subtotal,
            shipping_address: address,
        }, {
            onSuccess: (page) => {
                const num = page.props.flash?.success || 'VOID-2025-' + Math.floor(Math.random() * 90000 + 10000);
                setOrderNumber(`Order #${num}`);
                setShowSuccess(true);
                setSubmitting(false);
            },
            onError: () => {
                toast.show('Something went wrong. Please try again.');
                setSubmitting(false);
            },
        });
    };

    const cardBorder = (sel) => sel ? `1px solid ${accent}` : '1px solid var(--border)';
    const cardBg = (sel) => sel ? `${accent}12` : 'transparent';

    return (
        <AppLayout toast={toast}>
            <div style={{ paddingTop: 64, minHeight: '100vh' }}>
                {/* Breadcrumb header */}
                <div style={{ borderBottom: '1px solid var(--border)', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <a href="/phones" style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Space Mono', textDecoration: 'none' }}>Phones</a>
                    <span style={{ color: 'var(--muted3)', fontSize: 12 }}>/</span>
                    <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Space Mono' }}>VOID {product?.name}</span>
                    <span style={{ color: 'var(--muted3)', fontSize: 12 }}>/</span>
                    <span style={{ fontSize: 12, color: '#fff', fontFamily: 'Space Mono' }}>Order</span>
                </div>

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
                    {/* ── LEFT COLUMN ── */}
                    <div>
                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                            {['configure', 'shipping', 'payment'].map((t) => (
                                <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '10px 20px', borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: 'Space Mono', cursor: 'pointer', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.05em', background: activeTab === t ? accent : 'rgba(255,255,255,0.05)', color: activeTab === t ? '#000' : 'var(--muted)', border: activeTab === t ? `1px solid ${accent}` : '1px solid var(--border)' }}>
                                    {t}
                                </button>
                            ))}
                        </div>

                        {/* ── CONFIGURE TAB ── */}
                        {activeTab === 'configure' && (
                            <>
                                {/* Product select */}
                                <Section title="Choose your VOID">
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                                        {products.map((p) => (
                                            <button key={p.id} onClick={() => setProduct(p)} style={{ border: cardBorder(product?.id === p.id), borderRadius: 14, background: cardBg(product?.id === p.id), padding: '14px 10px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: 'Syne' }}>
                                                <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                                                    <PhoneSVG accent={p.color_accent} />
                                                </div>
                                                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>VOID {p.name}</div>
                                                <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)' }}>from ₱{p.base_price.toLocaleString()}</div>
                                            </button>
                                        ))}
                                    </div>
                                </Section>

                                {/* Color */}
                                {product?.colors?.length > 0 && (
                                    <Section title="Color">
                                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                            {product.colors.map((c) => (
                                                <button key={c.name} onClick={() => setColor(c.name)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 16px', borderRadius: 14, border: cardBorder(color === c.name), background: cardBg(color === c.name), cursor: 'pointer', transition: 'all 0.2s', color: color === c.name ? '#fff' : 'var(--muted)', fontSize: 13, fontWeight: 500, fontFamily: 'Syne' }}>
                                                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.hex, border: '1px solid rgba(255,255,255,0.15)' }} />
                                                    {c.name}
                                                </button>
                                            ))}
                                        </div>
                                    </Section>
                                )}

                                {/* Storage variants */}
                                {product?.variants?.length > 0 && (
                                    <Section title="Storage">
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                                            {product.variants.map((v) => (
                                                <button key={v.storage} onClick={() => setVariant(v)} style={{ padding: 14, borderRadius: 14, border: cardBorder(variant?.storage === v.storage), background: cardBg(variant?.storage === v.storage), cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontFamily: 'Syne' }}>
                                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{v.storage}</div>
                                                    <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)' }}>{v.ram} RAM</div>
                                                    <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: accent, marginTop: 6 }}>₱{v.price.toLocaleString()}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </Section>
                                )}

                                {/* Accessories */}
                                {product?.accessories?.length > 0 && (
                                    <Section title="Accessories">
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                            {product.accessories.map((acc) => {
                                                const sel = selectedAccs.includes(acc.name);
                                                return (
                                                    <button key={acc.name} onClick={() => setSelectedAccs(sel ? selectedAccs.filter(a => a !== acc.name) : [...selectedAccs, acc.name])} style={{ padding: '12px 14px', borderRadius: 14, border: cardBorder(sel), background: sel ? 'rgba(200,255,100,0.03)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Syne' }}>
                                                        <div style={{ width: 18, height: 18, borderRadius: 5, border: sel ? `1.5px solid ${accent}` : '1.5px solid var(--border)', background: sel ? accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}>
                                                            {sel && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>}
                                                        </div>
                                                        <div style={{ flex: 1, textAlign: 'left' }}>
                                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{acc.name}</div>
                                                            {acc.desc && <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Figtree' }}>{acc.desc}</div>}
                                                        </div>
                                                        <div style={{ fontFamily: 'Space Mono', fontSize: 13, color: accent }}>+₱{acc.price.toLocaleString()}</div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </Section>
                                )}

                                {/* Quantity */}
                                <Section title="Quantity">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 12, width: 'fit-content' }}>
                                        <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 40, height: 40, background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', borderRadius: 12 }}>−</button>
                                        <span style={{ fontFamily: 'Space Mono', fontSize: 14, fontWeight: 700, color: '#fff', padding: '0 8px', minWidth: 32, textAlign: 'center' }}>{qty}</span>
                                        <button onClick={() => setQty(Math.min(5, qty + 1))} style={{ width: 40, height: 40, background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', borderRadius: 12 }}>+</button>
                                    </div>
                                </Section>

                                <button onClick={() => setActiveTab('shipping')} className="btn-primary" style={{ width: '100%', padding: 16, borderRadius: 14 }}>
                                    Continue to Shipping →
                                </button>
                            </>
                        )}

                        {/* ── SHIPPING TAB ── */}
                        {activeTab === 'shipping' && (
                            <Section title="Shipping Address">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                    {[
                                        { key: 'name', label: 'Full Name', placeholder: 'Juan dela Cruz', col: '1/-1' },
                                        { key: 'phone', label: 'Phone Number', placeholder: '09XX-XXX-XXXX', col: '1/-1' },
                                        { key: 'line1', label: 'Address Line', placeholder: 'Street, Barangay', col: '1/-1' },
                                        { key: 'city', label: 'City / Municipality', placeholder: 'Makati' },
                                        { key: 'province', label: 'Province', placeholder: 'Metro Manila' },
                                        { key: 'zip', label: 'ZIP Code', placeholder: '1200' },
                                    ].map(({ key, label, placeholder, col }) => (
                                        <div key={key} style={{ gridColumn: col }}>
                                            <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>{label}</label>
                                            <input className="form-input" value={address[key]} onChange={(e) => setAddress({ ...address, [key]: e.target.value })} placeholder={placeholder} required/>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <button onClick={() => setActiveTab('payment')} className="btn-primary" style={{ width: '100%', padding: 16, borderRadius: 14 }}>
                                        Continue to Payment →
                                    </button>
                                </div>
                            </Section>
                        )}

                        {/* ── PAYMENT TAB ── */}
                        {activeTab === 'payment' && (
                            <>
                                <Section title="Payment Method">
                                    {[
                                        { type: 'card', icon: '💳', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, JCB' },
                                        { type: 'gcash', icon: '📱', name: 'GCash', desc: 'Pay via GCash mobile wallet' },
                                        { type: 'maya', icon: '🔵', name: 'Maya', desc: 'Pay via Maya digital bank' },
                                        { type: 'installment', icon: '📅', name: '0% Installment', desc: 'Spread payments over 3–24 months' },
                                        { type: 'cod', icon: '📦', name: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                                    ].map(({ type, icon, name, desc }) => (
                                        <div key={type}>
                                            <button onClick={() => setPayMethod(type)} style={{ width: '100%', padding: 14, borderRadius: 14, border: cardBorder(payMethod === type), background: cardBg(payMethod === type), cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: 'Syne' }}>
                                                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
                                                <div style={{ textAlign: 'left', flex: 1 }}>
                                                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--muted2)', fontFamily: 'Figtree' }}>{desc}</div>
                                                </div>
                                                <div style={{ width: 16, height: 16, borderRadius: '50%', border: payMethod === type ? `4px solid ${accent}` : '2px solid var(--border)', transition: 'all 0.2s', flexShrink: 0 }} />
                                            </button>
                                            {/* Card fields */}
                                            {payMethod === 'card' && type === 'card' && (
                                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 8 }}>
                                                    <div style={{ marginBottom: 14 }}>
                                                        <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Card Number</label>
                                                        <input className="form-input" placeholder="0000 0000 0000 0000" maxLength={19} required/>
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                                        <div>
                                                            <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Expiry</label>
                                                            <input className="form-input" placeholder="MM / YY" maxLength={7} required/>
                                                        </div>
                                                        <div>
                                                            <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>CVV</label>
                                                            <input className="form-input" placeholder="•••" maxLength={4} type="password" required/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {/* GCash / Maya */}
                                            {((payMethod === 'gcash' && type === 'gcash') || (payMethod === 'maya' && type === 'maya')) && (
                                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 8, textAlign: 'center' }}>
                                                    <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Send to</div>
                                                    <div style={{ fontFamily: 'Space Mono', fontSize: 22, fontWeight: 700, color: accent, letterSpacing: 2 }}>0917-VOID-PH</div>
                                                    <div style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Figtree', marginTop: 6 }}>Reference: your order number</div>
                                                </div>
                                            )}
                                            {/* Installment */}
                                            {payMethod === 'installment' && type === 'installment' && (
                                                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 16, padding: 20, marginBottom: 8 }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                                        {[3, 6, 12, 24].map((m) => (
                                                            <button key={m} onClick={() => setInstallMonths(m)} style={{ padding: '12px 14px', border: installMonths === m ? `1px solid ${accent}` : '1px solid var(--border)', borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', fontFamily: 'Syne' }}>
                                                                <span style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>{m} months</span>
                                                                <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: accent }}>₱{Math.ceil(subtotal / m).toLocaleString()}/mo</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </Section>

                                <button onClick={placeOrder} disabled={submitting} className="btn-primary" style={{ width: '100%', padding: 16, borderRadius: 14, fontSize: 15, opacity: submitting ? 0.7 : 1 }}>
                                    {submitting ? 'Placing order…' : `Place Order — ₱${subtotal.toLocaleString()}`}
                                </button>
                            </>
                        )}
                    </div>

                    {/* ── ORDER SUMMARY ── */}
                    <div className="order-summary">
                        <h3 style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 24, letterSpacing: -0.5 }}>Order Summary</h3>

                        {/* Product */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
                            <div style={{ width: 64, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <PhoneSVG accent={accent} />
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: -0.5, marginBottom: 4 }}>VOID {product?.name}</div>
                                <div style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)' }}>
                                    {variant ? `${variant.ram} · ${variant.storage}` : '—'} · {color || '—'}
                                </div>
                                <div style={{ fontSize: 15, fontWeight: 800, color: accent, marginTop: 6 }}>₱{(variant?.price || product?.base_price || 0).toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Line items */}
                        {[
                            ['Phone', `₱${(variant?.price || product?.base_price || 0).toLocaleString()}`],
                            accTotal > 0 ? [`${selectedAccs.length} add-on(s)`, `₱${accTotal.toLocaleString()}`] : null,
                            qty > 1 ? ['Qty', `× ${qty}`] : null,
                            discount > 0 ? ['Promo discount', `-₱${discount.toLocaleString()}`] : null,
                            ['Shipping', 'Free'],
                        ].filter(Boolean).map(([label, val]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                <span style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree' }}>{label}</span>
                                <span style={{ fontSize: 13, color: label === 'Promo discount' ? '#FF8888' : label === 'Shipping' ? '#C8FF64' : '#fff', fontFamily: 'Space Mono' }}>{val}</span>
                            </div>
                        ))}

                        {installMonths > 0 && (
                            <div style={{ fontSize: 12, color: 'var(--muted2)', fontFamily: 'Space Mono', marginBottom: 12 }}>
                                ₱{Math.ceil(subtotal / installMonths).toLocaleString()}/mo × {installMonths} mos at 0% interest
                            </div>
                        )}

                        <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />

                        {/* Total */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Total</span>
                            <span style={{ fontSize: 22, fontWeight: 900, color: '#fff', letterSpacing: -1 }}>₱{subtotal.toLocaleString()}</span>
                        </div>

                        {/* Promo code */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                            <input className="form-input" style={{ flex: 1, fontSize: 13, padding: '10px 14px' }} placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && applyPromo()} />
                            <button onClick={applyPromo} style={{ padding: '10px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: 10, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Syne', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                                Apply
                            </button>
                        </div>
                        {promoApplied && <div style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'Figtree', marginBottom: 16 }}>✓ Promo code applied</div>}

                        {/* Guarantees */}
                        {[['🔒', '2-Year Warranty'], ['↩', '30-Day Returns'], ['🚚', 'Free Shipping']].map(([icon, lbl]) => (
                            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted2)', fontFamily: 'Figtree', marginBottom: 8 }}>
                                <span>{icon}</span>{lbl}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showSuccess && <SuccessModal orderNumber={orderNumber} onClose={() => setShowSuccess(false)} />}
        </AppLayout>
    );
}
