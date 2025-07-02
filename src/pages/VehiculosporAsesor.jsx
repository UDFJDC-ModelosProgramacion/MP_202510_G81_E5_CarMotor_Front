// src/pages/VehiculosPorAsesor.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../estilos/Vehiculos.css';

export default function VehiculosPorAsesor() {
  const { id } = useParams(); // ID del asesor desde la URL
  const [asesor, setAsesor] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    // Obtener todos los asesores
    axios.get('http://localhost:8080/api/asesores')
      .then((res) => {
        const encontrado = res.data.find((a) => a.id?.toString() === id);
        setAsesor(encontrado);
      })
      .catch((err) => console.error('Error al obtener asesores:', err));

    // Obtener todos los vehículos
    axios.get('http://localhost:8080/api/vehiculos')
      .then((res) => {
        const filtrados = res.data.filter((v) => v.asesorVehiculo?.id?.toString() === id);
        setVehiculos(filtrados);
      })
      .catch((err) => console.error('Error al obtener vehículos:', err));
  }, [id]);

  if (!asesor) return <div className="vehiculos-container"><h2>Cargando asesor...</h2></div>;

  return (
    <div className="vehiculos-container">
      <h1>Vehículos de {asesor.nombre}</h1>

      <div className="vehiculos-grid">
        {vehiculos.length === 0 ? (
          <p>No hay vehículos asignados a este asesor.</p>
        ) : (
          vehiculos.map((v) => (
            <div key={v.id} className="vehiculo-card">
              <h2>{v.marca} - {v.modelo}</h2>
              <p><strong>Tipo:</strong> {v.tipo}</p>
              <p><strong>Capacidad:</strong> {v.capacidadPasajeros} pasajeros</p>
              <p><strong>Precio:</strong> ${v.precio.toLocaleString()}</p>

              {v.imagenes && (
                <div className="fotos">
                  {v.imagenes.exterior && <img src={v.imagenes.exterior} alt="Exterior" />}
                  {v.imagenes.interior && <img src={v.imagenes.interior} alt="Interior" />}
                  {v.imagenes.motor && <img src={v.imagenes.motor} alt="Motor" />}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
