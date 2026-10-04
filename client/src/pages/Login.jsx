import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const submit = async e => {
    e.preventDefault();
    try {
      const { token, user } = await api('/login', { method: 'POST', body: f });
      localStorage.setItem('token', token); localStorage.setItem('user', JSON.stringify(user));
      nav('/home');
    } catch (e) { setErr(e.message); }
  };
  return (
    <div className="login-wrap">
      <form className="login-box" onSubmit={submit}>
        <img className="login-logo" src="/logo.png" alt="Green Builders" />
        <h1>Green Builders</h1>
        <p className="muted">Society management – sign in to continue</p>
        <input placeholder="Email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        <input type="password" placeholder="Password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} />
        {err && <p className="error">{err}</p>}
        <button>Sign in</button>
      </form>
    </div>
  );
}
