import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });
    const [showPass, setShowPass] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--black)', position: 'relative', overflow: 'hidden', padding: '100px 20px 40px' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

            <div className="auth-box">
                <Link href="/" style={{ display: 'block', textAlign: 'center', marginBottom: 8, fontFamily: 'Space Mono', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
                    V<span style={{ color: 'var(--accent)' }}>O</span>ID
                </Link>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', textAlign: 'center', letterSpacing: -1, marginBottom: 6 }}>New password</h1>
                <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'Figtree', textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>Choose a strong password for your account.</p>

                <form onSubmit={submit}>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email</label>
                        <input type="email" className="form-input" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                        {errors.email && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.email}</div>}
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>New Password</label>
                        <div style={{ position: 'relative' }}>
                            <input type={showPass ? 'text' : 'password'} className="form-input" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Min. 8 characters" style={{ paddingRight: 48 }} required />
                            <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted2)', cursor: 'pointer', fontSize: 16 }}>
                                {showPass ? '🙈' : '👁'}
                            </button>
                        </div>
                        {errors.password && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.password}</div>}
                    </div>
                    <div style={{ marginBottom: 28 }}>
                        <label style={{ fontFamily: 'Space Mono', fontSize: 10, color: 'var(--muted2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Confirm Password</label>
                        <input type="password" className="form-input" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} placeholder="Repeat password" required />
                        {errors.password_confirmation && <div style={{ color: '#FF8888', fontSize: 12, marginTop: 6, fontFamily: 'Figtree' }}>{errors.password_confirmation}</div>}
                    </div>
                    <button type="submit" className="btn-form" disabled={processing} style={{ opacity: processing ? 0.7 : 1 }}>
                        {processing ? 'Resetting…' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}
