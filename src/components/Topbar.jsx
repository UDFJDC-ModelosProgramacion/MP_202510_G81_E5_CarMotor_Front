import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // o '../assets/f0df986d-f928-4146-852c-c247ee6d7679.png'
import '../estilos/topbar.css';

export default function Topbar({ onMenuClick }) {
  return (
    <div className="topbar">


      <div className="logo">
        <img src={logo} alt="CarMotor logo" />
        <span>CarMotor</span>
      </div>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/sedes">Sedes</Link>
        <Link to="/vehiculos">Vehículos</Link>
        <Link to="/asesores">Asesores</Link>

        <Link to="/financiacion">Financiación</Link>
      </nav>
    </div>
  );
}
