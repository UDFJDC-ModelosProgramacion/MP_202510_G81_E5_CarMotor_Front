// src/components/Sidebar.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/sedes', label: 'Sedes' },
    { to: '/vehiculos', label: 'Vehículos' },
    { to: '/asesores', label: 'Asesores' },
    { to: '/seguros', label: 'Seguros' },
    { to: '/testdrive', label: 'Test Drive' },
    { to: '/financiacion', label: 'Financiación' }
  ];

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h2>CarMotor</h2>
        <nav>
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
