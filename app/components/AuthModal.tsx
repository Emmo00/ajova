'use client';

type AuthModalProps = {
  mode: 'signup' | 'login';
  setMode: (mode: 'signup' | 'login') => void;
  onClose: () => void;
  onEnter: () => void;
};

export default function AuthModal({ mode, setMode, onClose, onEnter }: AuthModalProps) {
  return <div className="modal-backdrop" onClick={onClose}><section className="auth-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><div className="auth-mark" aria-label="Ajova" /><p className="eyebrow">Welcome to Ajova</p><h2>{mode === 'signup' ? "Let's grow your money." : 'Welcome back, Jessica.'}</h2><p className="modal-copy">{mode === 'signup' ? 'Create your account and take the first step with your circle.' : 'Sign in to pick up where you left off.'}</p><label>Email address<input type="email" placeholder="you@example.com" /></label>{mode === 'signup' && <label>Full name<input type="text" placeholder="Jessica Mensah" /></label>}<label>Password<input type="password" placeholder="••••••••" /></label><button className="primary-button full-button" onClick={onEnter}>{mode === 'signup' ? 'Create my account' : 'Sign in'} <span>↗</span></button><p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : 'New to Ajova?'} <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}>{mode === 'signup' ? 'Sign in' : 'Create an account'}</button></p><small className="demo-note">Demo mode · no real account required</small></section></div>;
}