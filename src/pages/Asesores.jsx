import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../estilos/asesores.css';

export default function Asesores() {
  const [asesores, setAsesores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/asesores')
      .then((res) => setAsesores(res.data))
      .catch((err) => console.error('Error al obtener asesores:', err));
  }, []);

  const irAVehiculosDelAsesor = (id) => {
    navigate(`/asesores/${id}/vehiculos`);
  };

  return (
    <div className="asesores-container">
      <h1>Nuestros Asesores</h1>
      <div className="asesores-grid">
        {asesores.map((asesor) => (
          <div
            key={asesor.id}
            className="asesor-card"
            onClick={() => irAVehiculosDelAsesor(asesor.id)}
          >
            <img
              src={
                asesor.imagen?.url ||
                (typeof asesor.imagen === 'string'
                  ? asesor.imagen
                  : '/fotos/asesor-default.jpg')
              }
              alt={asesor.nombre}
              className="asesor-foto"
            />
            <div>
              <h2>{asesor.nombre}</h2>
              <p>📞 {asesor.numeroContacto}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
