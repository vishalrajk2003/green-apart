import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getUser } from '../api';

export default function Announcements() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', message: '', priority: 'Normal' });
  const [err, setErr] = useState('');
  const nav = useNavigate(); const isAdmin = getUser().role === 'admin';
  const load = () => api('/announcements').then(setItems).catch(e => setErr(e.message));
  useEffect(() => { load(); }, []);
  const post = async e => {
    e.preventDefault();
    try { await api('/announcements', { method: 'POST', body: form }); setForm({ title: '', message: '', priority: 'Normal' }); load(); }
    catch (e) { setErr(e.message); } };
  const remove = id => api('/announcements/' + id, { method: 'DELETE' }).then(load);

  return (
    <div className="page">
      <header className="bar"><button className="ghost" onClick={() => nav('/home')}>← Back to home</button><h2>Announcements</h2></header>
      {isAdmin && (
        <form className="card form" onSubmit={post}>
          <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Message" required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
            <option>Normal</option><option>Important</option><option>Urgent</option>
          </select>
          <button>Post announcement</button>
        </form>
      )}
      {err && <p className="error">{err}</p>}
      {items.length === 0 && <p className="muted">No announcements yet.</p>}
      {items.map(a => (
        <div key={a._id} className="card row">
          <div>
            <strong>{a.title}</strong> <span className={'tag ' + a.priority}>{a.priority}</span>
            <p className="muted">{a.message}</p>
            <p className="muted small">{new Date(a.createdAt).toLocaleDateString()}</p>
          </div>
          {isAdmin && <button className="small-btn" onClick={() => remove(a._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
}
