import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/sedes.css';

export default function Sedes() {
  const [sedes, setSedes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/sedes')
      .then((res) => {
        setSedes(res.data);
      })
      .catch((err) => {
        console.error('Error al traer las sedes:', err);
      });
  }, []);

  const irAVehiculos = (nombreSede) => {
  navigate(`/sedes/${encodeURIComponent(nombreSede)}/vehiculos`);
};


  return (
    <div className="sedes-container">
      <h1>Nuestras Sedes</h1>
      <div className="sedes-grid">
        {sedes.map((sede) => (
          <div
            key={sede.id}
            className="sede-card"
           onClick={() => irAVehiculos(sede.nombre)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') irAVehiculos(sede.id);
            }}
          >
            <h2>{sede.nombre}</h2>
            <p>📍 Dirección: {sede.direccion}</p>
            <p>📞 Teléfono: {sede.telefono}</p>
            <p>🕒 Horario: {sede.horario}</p>
            <p>🚗 Capacidad máxima: {sede.capacidadMaxima}</p>
            <p>✅ Activa: {sede.activa ? 'Sí' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
