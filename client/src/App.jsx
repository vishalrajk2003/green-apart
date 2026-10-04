import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Section from './pages/Section';
import Announcements from './pages/Announcements';
import Parking from './pages/Parking';
import Payments from './pages/Payments';
import Brand from './components/Brand';
import { getUser } from './api';

const Private = ({ children }) => (getUser() ? children : <Navigate to="/" />);
// Simple list modules share the generic Section page
const simple = {
  complaints: { title: 'Complaints', fields: [['title', 'Issue'], ['flat', 'Flat no.'], ['message', 'Details']], resolvable: true },
  residents: { title: 'Residents', adminAdd: true, fields: [['name', 'Name'], ['email', 'Email'], ['flat', 'Flat no.'], ['phone', 'Phone']] },
};

export default function App() {
  return (
    <>
    <Brand />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Private><Dashboard /></Private>} />
      <Route path="/announcements" element={<Private><Announcements /></Private>} />
      <Route path="/parking" element={<Private><Parking /></Private>} />
      <Route path="/payments" element={<Private><Payments /></Private>} />
      {Object.entries(simple).map(([key, cfg]) => (
        <Route key={key} path={'/' + key} element={<Private><Section endpoint={key} {...cfg} /></Private>} />
      ))}
    </Routes>
    </>
  );
}
