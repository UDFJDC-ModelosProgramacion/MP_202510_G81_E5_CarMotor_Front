import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/Vehiculos.css';

export default function Vehiculos() {
  const { sedeId } = useParams();
  const [vehiculos, setVehiculos] = useState([]);
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ultimoDigitoPlaca, setUltimoDigitoPlaca] = useState('');
  const [orden, setOrden] = useState(''); // 'precio-asc', 'modelo-desc', etc.
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/vehiculos')
      .then((res) => {
        setVehiculos(res.data);
      })
      .catch((err) => console.error('Error al obtener vehículos:', err));
  }, []);

  // Filtro base por sede
  let vehiculosFiltrados = sedeId
    ? vehiculos.filter(v => v.sede && v.sede.id?.toString() === sedeId)
    : [...vehiculos];

  // Filtros adicionales
  if (filtroMarca) {
    vehiculosFiltrados = vehiculosFiltrados.filter(v => v.marca === filtroMarca);
  }
  if (filtroTipo) {
    vehiculosFiltrados = vehiculosFiltrados.filter(v => v.tipo === filtroTipo);
  }
  if (ultimoDigitoPlaca) {
    vehiculosFiltrados = vehiculosFiltrados.filter(v =>
      v.placa?.slice(-1) === ultimoDigitoPlaca
    );
  }

  // Ordenamiento
  if (orden === 'precio-asc') {
    vehiculosFiltrados.sort((a, b) => a.precio - b.precio);
  } else if (orden === 'precio-desc') {
    vehiculosFiltrados.sort((a, b) => b.precio - a.precio);
  } else if (orden === 'modelo-asc') {
    vehiculosFiltrados.sort((a, b) => a.modelo.localeCompare(b.modelo));
  } else if (orden === 'modelo-desc') {
    vehiculosFiltrados.sort((a, b) => b.modelo.localeCompare(a.modelo));
  }

  // Obtener marcas y tipos únicos para dropdown
  const marcasUnicas = [...new Set(vehiculos.map(v => v.marca))];
  const tiposUnicos = [...new Set(vehiculos.map(v => v.tipo))];

  return (
    <div className="vehiculos-container">
      <h1 style={{ color: '#ffffff' }}>
        Vehículos {sedeId && `en la sede ${sedeId}`}
      </h1>

      {/* Filtros y orden */}
      <div className="filtros">
        <select onChange={(e) => setFiltroMarca(e.target.value)} value={filtroMarca}>
          <option value="">Todas las marcas</option>
          {marcasUnicas.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select onChange={(e) => setFiltroTipo(e.target.value)} value={filtroTipo}>
          <option value="">Todos los tipos</option>
          {tiposUnicos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <input
          type="text"
          placeholder="Último dígito placa"
          value={ultimoDigitoPlaca}
          onChange={(e) => setUltimoDigitoPlaca(e.target.value.replace(/\D/g, '').slice(-1))}
          maxLength={1}
        />

        <select onChange={(e) => setOrden(e.target.value)} value={orden}>
          <option value="">Ordenar por</option>
          <option value="precio-asc">Precio ↑</option>
          <option value="precio-desc">Precio ↓</option>
          <option value="modelo-asc">Modelo A-Z</option>
          <option value="modelo-desc">Modelo Z-A</option>
        </select>
      </div>

      <div className="vehiculos-grid">
        {vehiculosFiltrados.map((v) => (
          <div
            key={v.id}
            className="vehiculo-card"
            onClick={() => navigate(`/vehiculos/${v.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <h2>{v.marca} - {v.modelo}</h2>
            <p><strong>Tipo:</strong> {v.tipo}</p>
            <p><strong>Placa:</strong> {v.placa}</p>
            <p><strong>Capacidad:</strong> {v.capacidadPasajeros} pasajeros</p>
            <p><strong>Precio:</strong> ${v.precio?.toLocaleString()}</p>

            {v.imagenes && (
              <div className="fotos">
                {v.imagenes.exterior && <img src={v.imagenes.exterior} alt="Exterior" />}
                {v.imagenes.interior && <img src={v.imagenes.interior} alt="Interior" />}
                {v.imagenes.motor && <img src={v.imagenes.motor} alt="Motor" />}
              </div>
            )}

            {v.seguro && (
              <div className="asegurado-info">
                <span className="asegurado-texto">💼 Asegurado</span>
              </div>
            )}

            {v.asesorVehiculo && (
              <div className="asesor-info">
                <div className="asesor-text">
                  <h3>{v.asesorVehiculo.nombre}</h3>
                  <p>{v.asesorVehiculo.numeroContacto}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
