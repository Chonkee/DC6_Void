import { Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)', position: 'relative', overflow: 'hidden', padding: '100px 20px 40px' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

            <div className="auth-box">
                <Link href="/" style={{ display: 'block', textAlign: 'center', marginBottom: 8, fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
                    V<span style={{ color: 'var(--accent)' }}>O</span>ID
                </Link>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', textAlign: 'center', letterSpacing: -1, marginBottom: 6 }}>Reset password</h1>
                <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Figtree', textAlign: 'center', marginBottom: 28, lineHeight: 1.6 }}>
                    Enter your email and we'll send a reset link.
                </p>

                {status && (
                    <div style={{ background: 'rgba(200,255,100,0.08)', border: '1px solid rgba(200,255,100,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--accent)', fontFamily: 'Figtree', marginBottom: 18 }}>
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email Address</label>
                        <input type="email" className="form-input" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="you@example.com" autoFocus required />
                        {errors.email && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.email}</div>}
                    </div>
                    <button type="submit" className="btn-form" disabled={processing} style={{ opacity: processing ? 0.7 : 1 }}>
                        {processing ? 'Sending…' : 'Send Reset Link'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', fontFamily: 'Figtree', marginTop: 16 }}>
                    <Link href={route('login')} style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>← Back to sign in</Link>
                </div>
            </div>
        </div>
    );
}
