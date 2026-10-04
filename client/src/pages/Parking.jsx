import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getUser } from '../api';

export default function Parking() {
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ slotNo: '', type: 'Car' });
  const [err, setErr] = useState('');
  const nav = useNavigate(); const isAdmin = getUser().role === 'admin';
  const load = () => api('/parking').then(setSlots).catch(e => setErr(e.message));
  useEffect(() => { load(); }, []);
  const addSlot = async e => {
    e.preventDefault(); setErr('');
    try { await api('/parking', { method: 'POST', body: form }); setForm({ slotNo: '', type: 'Car' }); load(); }
    catch (e) { setErr(e.message); } };
  const assign = id => {
    const flat = prompt('Flat number (e.g. A-101)'); if (!flat) return;
    const vehicleNo = prompt('Vehicle number'); if (!vehicleNo) return;
    api(`/parking/${id}/assign`, { method: 'PUT', body: { flat, vehicleNo } }).then(load); };
  const release = id => api(`/parking/${id}/release`, { method: 'PUT' }).then(load);
  const remove = id => api('/parking/' + id, { method: 'DELETE' }).then(load);

  return (
    <div className="page">
      <header className="bar"><button className="ghost" onClick={() => nav('/home')}>← Back to home</button><h2>Parking</h2></header>
      {isAdmin && (
        <form className="card form" onSubmit={addSlot}>
          <input placeholder="Slot number (e.g. P-01)" required value={form.slotNo} onChange={e => setForm({ ...form, slotNo: e.target.value })} />
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Car</option><option>Bike</option></select>
          <button>Add slot</button>
        </form>
      )}
      {err && <p className="error">{err}</p>}
      {slots.length === 0 && <p className="muted">No parking slots yet.</p>}
      <div className="grid">
        {slots.map(s => (
          <div key={s._id} className="card">
            <div className="row"><strong>{s.slotNo} · {s.type}</strong><span className={'tag ' + s.status}>{s.status}</span></div>
            <p className="muted">{s.status === 'Occupied' ? `Flat ${s.flat} · ${s.vehicleNo}` : 'Available'}</p>
            {isAdmin && (
              <div className="actions">
                {s.status === 'Free' ? <button className="small-btn" onClick={() => assign(s._id)}>Assign</button>
                                     : <button className="small-btn" onClick={() => release(s._id)}>Release</button>}
                <button className="small-btn ghost" onClick={() => remove(s._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
