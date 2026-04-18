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

function PasswordInput({ value, onChange, placeholder = '••••••••', autoComplete = 'current-password' }) {
    const [show, setShow] = useState(false);
    const focus = useInputFocus();
    return (
        <div style={{ position: 'relative' }}>
            <input
                type={show ? 'text' : 'password'}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                style={{ ...S.input, paddingRight: 48 }}
                {...focus}
            />
            <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(240,237,232,0.3)', cursor: 'pointer', fontSize: 15, padding: 0 }}>
                {show ? '🙈' : '👁'}
            </button>
        </div>
    );
}

export default function Login({ status, canResetPassword }) {
    const focus = useInputFocus();
    const { data, setData, post, processing, errors } = useForm({
        email: '', password: '', remember: false,
    });

    const submit = (e) => { e.preventDefault(); post(route('login')); };

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
                    Welcome back
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree', textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>
                    Sign in to your VOID account to continue your order and access exclusive member pricing.
                </p>

                {/* Status */}
                {status && (
                    <div style={{ background: 'rgba(200,255,100,0.08)', border: '1px solid rgba(200,255,100,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#C8FF64', fontFamily: 'Figtree', marginBottom: 18 }}>
                        {status}
                    </div>
                )}

                {/* Error */}
                {(errors.email || errors.password) && (
                    <div style={{ background: 'rgba(255,90,90,0.1)', border: '1px solid rgba(255,90,90,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#FF8888', fontFamily: 'Figtree', marginBottom: 18 }}>
                        {errors.email || errors.password}
                    </div>
                )}

                <form onSubmit={submit}>
                    {/* Email */}
                    <div style={{ marginBottom: 18 }}>
                        <label style={S.label}>Email Address</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com" autoComplete="email" required style={S.input} {...focus} />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 4 }}>
                        <label style={S.label}>Password</label>
                        <PasswordInput value={data.password} onChange={(v) => setData('password', v)} />
                    </div>
                    {canResetPassword && (
                        <Link href={route('password.request')} style={{ display: 'block', textAlign: 'right', fontSize: 12, color: '#C8FF64', marginBottom: 4, marginTop: 6, textDecoration: 'none', fontFamily: 'Figtree' }}>
                            Forgot password?
                        </Link>
                    )}

                    {/* Remember */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 24px', cursor: 'pointer', fontSize: 13, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree' }}>
                        <input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)}
                            style={{ accentColor: '#C8FF64', width: 14, height: 14, cursor: 'pointer' }} />
                        Remember me for 30 days
                    </label>

                    {/* Submit */}
                    <button type="submit" disabled={processing}
                        style={{ width: '100%', padding: 14, borderRadius: 12, background: '#C8FF64', color: '#000', fontWeight: 700, fontSize: 14, border: 'none', cursor: processing ? 'not-allowed' : 'pointer', fontFamily: 'Syne', transition: 'background 0.2s', opacity: processing ? 0.7 : 1, marginBottom: 20 }}
                        onMouseEnter={e => { if (!processing) e.currentTarget.style.background = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#C8FF64'; }}>
                        {processing ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                    <span style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'rgba(240,237,232,0.25)', whiteSpace: 'nowrap' }}>OR CONTINUE WITH</span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                </div>

                {/* Google (UI only) */}
                <button type="button" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10, cursor: 'pointer', fontFamily: 'Syne', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                    <svg width="16" height="16" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/><path d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                    Continue with Google
                </button>

                {/* Apple (UI only) */}
                <button type="button" style={{ width: '100%', padding: 12, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8, cursor: 'pointer', fontFamily: 'Syne', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                    <svg width="16" height="16" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-37.8-155.5-127.4C46 790.8 0 663 0 541.8c0-207.2 135.4-316.9 268.1-316.9 63.3 0 116.1 41.4 155.6 41.4 37.8 0 97.8-44.1 166.9-44.1 24.6 0 108.4 3.2 170.5 99.6zm-234.5-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/></svg>
                    Continue with Apple
                </button>

                {/* Switch */}
                <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(240,237,232,0.45)', fontFamily: 'Figtree', marginTop: 8 }}>
                    Don't have an account?{' '}
                    <Link href={route('register')} style={{ color: '#C8FF64', fontWeight: 600, textDecoration: 'none' }}>
                        Create one →
                    </Link>
                </div>
            </div>
        </div>
    );
}
