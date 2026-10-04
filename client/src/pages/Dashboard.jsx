import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getUser, logout } from '../api';

export default function Dashboard() {
  const [s, setS] = useState({});
  const nav = useNavigate(); const user = getUser();
  useEffect(() => { api('/summary').then(setS).catch(() => { logout(); nav('/'); }); }, []);
  const cards = [
    { to: '/announcements', icon: '📢', label: 'Announcements', note: `${s.announcements ?? '–'} posted` },
    { to: '/payments', icon: '💰', label: 'Maintenance', note: `${s.payments ?? '–'} bills pending` },
    { to: '/parking', icon: '🚗', label: 'Parking', note: `${s.parking ?? '–'} slots free` },
    { to: '/complaints', icon: '🛠️', label: 'Complaints', note: `${s.complaints ?? '–'} open` },
    { to: '/residents', icon: '🏠', label: 'Residents', note: `${s.residents ?? '–'} registered` },
  ];
  return (
    <div className="page">
      <header className="bar">
        <h2>Welcome, {user.name}</h2>
        <button className="ghost" onClick={() => { logout(); nav('/'); }}>Log out</button>
      </header>
      <div className="grid">
        {cards.map(c => (
          <div key={c.to} className="card click" onClick={() => nav(c.to)}>
            <div className="icon">{c.icon}</div><h3>{c.label}</h3><p className="muted">{c.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
