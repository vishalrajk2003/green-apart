import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getUser } from '../api';

export default function Section({ endpoint, title, fields, adminAdd, resolvable }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const isAdmin = getUser().role === 'admin';
  const canAdd = !adminAdd || isAdmin;
  const load = () => api('/' + endpoint).then(setItems).catch(e => setErr(e.message));
  useEffect(() => { load(); }, [endpoint]);

  const add = async e => {
    e.preventDefault(); setErr('');
    try { await api('/' + endpoint, { method: 'POST', body: form }); setForm({}); load(); }
    catch (e) { setErr(e.message); }
  };
  const resolve = id => api(`/${endpoint}/${id}/resolve`, { method: 'PUT' }).then(load);

  return (
    <div className="page">
      <header className="bar">
        <button className="ghost" onClick={() => nav('/home')}>← Back to home</button>
        <h2>{title}</h2>
      </header>
      {canAdd && (
        <form className="card form" onSubmit={add}>
          {fields.map(([k, label]) => (
            <input key={k} placeholder={label} value={form[k] || ''} onChange={e => setForm({ ...form, [k]: e.target.value })} required />
          ))}
          <button>Add</button>
        </form>
      )}
      {err && <p className="error">{err}</p>}
      {items.length === 0 && <p className="muted">Nothing here yet.</p>}
      {items.map(it => (
        <div key={it._id} className="card row">
          <div>
            <strong>{it.title || it.name}</strong>
            <p className="muted">{[it.message, it.flat && 'Flat ' + it.flat, it.email, it.phone].filter(Boolean).join(' • ')}</p>
          </div>
          {resolvable && (
            <div>
              <span className={'tag ' + it.status}>{it.status}</span>
              {isAdmin && it.status === 'Open' && <button className="small-btn" onClick={() => resolve(it._id)}>Mark resolved</button>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
