import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getUser } from '../api';

export default function Payments() {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ flat: '', month: '', amount: '' });
  const [err, setErr] = useState('');
  const nav = useNavigate(); const isAdmin = getUser().role === 'admin';
  const load = () => api('/payments').then(setBills).catch(e => setErr(e.message));
  useEffect(() => { load(); }, []);
  const send = async (path, body) => {
    setErr('');
    try { await api(path, { method: 'POST', body }); setForm({ flat: '', month: '', amount: '' }); load(); }
    catch (e) { setErr(e.message); } };
  const billOne = e => { e.preventDefault(); send('/payments', { ...form, amount: Number(form.amount) }); };
  const billAll = () => {
    if (!form.month || !form.amount) return setErr('Enter month and amount first');
    send('/payments/generate', { month: form.month, amount: Number(form.amount) }); };
  const pay = id => api(`/payments/${id}/pay`, { method: 'PUT' }).then(load).catch(e => setErr(e.message));
  const due = bills.filter(b => b.status === 'Pending').reduce((t, b) => t + b.amount, 0);

  return (
    <div className="page">
      <header className="bar"><button className="ghost" onClick={() => nav('/home')}>← Back to home</button><h2>Maintenance payments</h2></header>
      {isAdmin && (
        <form className="card form" onSubmit={billOne}>
          <input placeholder="Flat no. (needed for a single bill)" value={form.flat} onChange={e => setForm({ ...form, flat: e.target.value })} />
          <input placeholder="Month (e.g. October 2026)" required value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} />
          <input type="number" placeholder="Amount (₹)" required value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
          <button>Bill this flat</button>
          <button type="button" className="ghost" onClick={billAll}>Bill all residents</button>
        </form>
      )}
      <div className="card"><strong>Total pending: ₹{due}</strong></div>
      {err && <p className="error">{err}</p>}
      {bills.length === 0 && <p className="muted">No bills yet.</p>}
      {bills.map(b => (
        <div key={b._id} className="card row">
          <div><strong>{b.month}</strong> <span className="muted">· Flat {b.flat}</span>
            <p className="muted">₹{b.amount}{b.paidOn && ' · paid on ' + new Date(b.paidOn).toLocaleDateString()}</p></div>
          <div><span className={'tag ' + b.status}>{b.status}</span>
            {b.status === 'Pending' && <button className="small-btn" onClick={() => pay(b._id)}>Pay now</button>}</div>
        </div>
      ))}
    </div>
  );
}
