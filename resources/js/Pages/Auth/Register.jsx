import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

const S = {
    page: {
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#06060A',
        position: 'relative', overflow: 'hidden', padding: '100px 20px 40px',
    },
    card: {
        position: 'relative', zIndex: 2, width: '100%', maxWidth: 440,
        background: 'rgba(10,10,18,0.9)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 28, padding: 44, backdropFilter: 'blur(20px)',
    },
    label: {
        fontFamily: 'Space Mono', fontSize: 10,
        color: 'rgba(240,237,232,0.25)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        marginBottom: 8, display: 'block',
    },
    input: {
        width: '100%', padding: '13px 16px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12, color: '#fff', fontSize: 14,
        fontFamily: 'Syne', outline: 'none', transition: 'all 0.2s',
        boxSizing: 'border-box',
    },
};

function useInputFocus() {
    return {
        onFocus: (e) => { e.target.style.borderColor = 'rgba(200,255,100,0.4)'; e.target.style.background = 'rgba(200,255,100,0.03)'; },
        onBlur:  (e) => { e.target.style.borderColor = 'rgba(255,255,255,0.07)'; e.target.style.background = 'rgba(255,255,255,0.04)'; },
    };
}

function PasswordStrength({ password }) {
    if (!password) return null;
    const score = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;
    const color = score <= 1 ? '#FF5A5A' : score <= 2 ? '#FFB432' : '#C8FF64';
    const label = ['', 'Weak', 'Fair', 'Good', 'Strong'][score];
    return (
        <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= score ? color : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />
                ))}
            </div>
            <div style={{ fontSize: 11, color, fontFamily: 'Space Mono' }}>{label}</div>
        </div>
    );
}

function PasswordInput({ value, onChange, placeholder = 'Minimum 8 characters', autoComplete = 'new-password' }) {
    const [show, setShow] = useState(false);
    const focus = useInputFocus();
    return (
        <div style={{ position: 'relative' }}>
            <input type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} autoComplete={autoComplete}
                style={{ ...S.input, paddingRight: 48 }} {...focus} />
            <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(240,237,232,0.3)', cursor: 'pointer', fontSize: 15, padding: 0 }}>
                {show ? '🙈' : '👁'}
            </button>
        </div>
    );
}

export default function Register() {
    const focus = useInputFocus();
    const { data, setData, post, processing, errors } = useForm({
        name: '',          // will be combined from first+last
        email: '',
        password: '',
        password_confirmation: '',
    });

    // Local state for split name fields & extra UI fields
    const [firstName, setFirstName] = useState('');
    const [lastName,  setLastName]  = useState('');
    const [phone,     setPhone]     = useState('');
    const [agreeTerms, setAgreeTerms]   = useState(false);
    const [newsletter, setNewsletter]   = useState(false);

    const submit = (e) => {
        e.preventDefault();
        if (!agreeTerms) return;
        // Combine first + last into `name` field that Breeze expects
        setData('name', `${firstName} ${lastName}`.trim());
        post(route('register'));
    };

    // Sync name whenever first/last changes
    const handleFirstName = (v) => {
        setFirstName(v);
        setData('name', `${v} ${lastName}`.trim());
    };
    const handleLastName = (v) => {
        setLastName(v);
        setData('name', `${firstName} ${v}`.trim());
    };

    return (
        <div style={S.page}>
            {/* Grid */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
            {/* Blobs */}
            <div style={{ position: 'absolute', top: -100, left: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(100,50,255,0.1),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,255,100,0.06),transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

            <div style={S.card}>
                {/* Logo */}
                <Link href="/" style={{ display: 'block', textAlign: 'center', marginBottom: 8, fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: -1 }}>
                    V<span style={{ color: '#C8FF64' }}>O</span>ID
                </Link>

                <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', textAlign: 'center', letterSpacing: -1, marginBottom: 6, fontFamily: 'Syne' }}>
                    Join VOID.
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree', textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>
                    Create your account for exclusive access, member pricing, and order tracking.
                </p>

                {/* Errors */}
                {Object.values(errors).length > 0 && (
                    <div style={{ background: 'rgba(255,90,90,0.1)', border: '1px solid rgba(255,90,90,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#FF8888', fontFamily: 'Figtree', marginBottom: 18 }}>
                        {Object.values(errors)[0]}
                    </div>
                )}

                <form onSubmit={submit}>
                    {/* First + Last name row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
                        <div>
                            <label style={S.label}>First Name</label>
                            <input type="text" value={firstName} onChange={(e) => handleFirstName(e.target.value)}
                                placeholder="Juan" autoComplete="given-name" required style={S.input} {...focus} />
                        </div>
                        <div>
                            <label style={S.label}>Last Name</label>
                            <input type="text" value={lastName} onChange={(e) => handleLastName(e.target.value)}
                                placeholder="dela Cruz" autoComplete="family-name" required style={S.input} {...focus} />
                        </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={S.label}>Email Address</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com" autoComplete="email" required style={S.input} {...focus} />
                        {errors.email && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={S.label}>Password</label>
                        <PasswordInput value={data.password} onChange={(v) => setData('password', v)} />
                        <PasswordStrength password={data.password} />
                        {errors.password && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.password}</div>}
                    </div>

                    {/* Confirm */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={S.label}>Confirm Password</label>
                        <PasswordInput value={data.password_confirmation} onChange={(v) => setData('password_confirmation', v)} placeholder="Repeat your password" />
                        {errors.password_confirmation && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.password_confirmation}</div>}
                    </div>

                    {/* Phone (UI only — not sent to backend) */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={S.label}>Phone Number</label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                            placeholder="+63 9XX XXX XXXX" autoComplete="tel" style={S.input} {...focus} />
                    </div>

                    {/* Terms */}
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, cursor: 'pointer', fontSize: 13, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree', lineHeight: 1.5 }}>
                        <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}
                            required style={{ accentColor: '#C8FF64', width: 14, height: 14, cursor: 'pointer', marginTop: 2, flexShrink: 0 }} />
                        <span>
                            I agree to the{' '}
                            <a href="#" style={{ color: '#C8FF64', textDecoration: 'none', fontWeight: 600 }}>Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" style={{ color: '#C8FF64', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a>
                        </span>
                    </label>

                    {/* Newsletter */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, cursor: 'pointer', fontSize: 13, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree' }}>
                        <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
                            style={{ accentColor: '#C8FF64', width: 14, height: 14, cursor: 'pointer' }} />
                        Send me exclusive deals and product updates
                    </label>

                    {/* Submit */}
                    <button type="submit" disabled={processing || !agreeTerms}
                        style={{ width: '100%', padding: 14, borderRadius: 12, background: '#C8FF64', color: '#000', fontWeight: 700, fontSize: 14, border: 'none', cursor: (processing || !agreeTerms) ? 'not-allowed' : 'pointer', fontFamily: 'Syne', transition: 'background 0.2s', opacity: (processing || !agreeTerms) ? 0.6 : 1, marginBottom: 20 }}
                        onMouseEnter={e => { if (!processing && agreeTerms) e.currentTarget.style.background = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#C8FF64'; }}>
                        {processing ? 'Creating account…' : 'Create Account'}
                    </button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                    <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(240,237,232,0.25)', whiteSpace: 'nowrap' }}>OR SIGN UP WITH</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                </div>

                {/* Google (UI only) */}
                <button type="button" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8, cursor: 'pointer', fontFamily: 'Syne', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                    <svg width="16" height="16" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                    Continue with Google
                </button>

                {/* Switch */}
                <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree', marginTop: 8 }}>
                    Already have an account?{' '}
                    <Link href={route('login')} style={{ color: '#C8FF64', fontWeight: 600, textDecoration: 'none' }}>
                        Sign in →
                    </Link>
                </div>
            </div>
        </div>
    );
}
