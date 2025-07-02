import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../estilos/vehiculosPorSede.css';

export default function VehiculosPorSede() {
  const { nombre } = useParams();
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/vehiculos')
      .then((res) => {
        const filtrados = res.data.filter(v =>
          v.sede && v.sede.nombre.toLowerCase() === decodeURIComponent(nombre).toLowerCase()
        );
        setVehiculos(filtrados);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [nombre]);

  if (loading) return <p>Cargando vehículos...</p>;
  if (vehiculos.length === 0) return <p>No hay vehículos registrados para la sede "{decodeURIComponent(nombre)}".</p>;

  return (
    <div className="vehiculos-container">
      <h2>Vehículos de {decodeURIComponent(nombre)}</h2>
      <ul className="vehiculo-lista">
        {vehiculos.map(v => (
          <li key={v.id} className="vehiculo-item">
            <strong>{v.marca} {v.modelo}</strong>
            <span>📍 Placa: {v.placa}</span>
            <span>🚗 Tipo: {v.tipo}</span>
            <span>💰 Precio: ${v.precio.toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
