import { Link, useLocation } from 'react-router-dom';
import { getUser } from '../api';

// Shown at the top of every page: logo + site name (links to home when logged in)
export default function Brand() {
  if (useLocation().pathname === '/') return null; // login page shows the big logo instead
  return (
    <div className="brand-bar">
      <Link to={getUser() ? '/home' : '/'} className="brand">
        <img src="/logo.png" alt="Green Builders logo" />
        <span>Green Builders</span>
      </Link>
    </div>
  );
}
