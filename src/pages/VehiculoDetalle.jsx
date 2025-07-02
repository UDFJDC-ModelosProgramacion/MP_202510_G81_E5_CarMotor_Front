import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../estilos/VehiculoDetalle.css';

export default function VehiculoDetalle() {
  const [mostrarHistorial, setMostrarHistorial] = useState(false);

  const { vehiculoId } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [imagenIndex, setImagenIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/vehiculos/${vehiculoId}`)
      .then(res => {
        setVehiculo(res.data);
        setImagenIndex(0);
      })
      .catch(err => {
        console.error("Error al cargar el vehículo:", err);
        navigate('/vehiculos');
      });
  }, [vehiculoId, navigate]);

  if (!vehiculo) return <div className="cargando">Cargando información del vehículo...</div>;

  const imagenActual = vehiculo.imagenes?.[imagenIndex];

  const siguienteImagen = () => {
    setImagenIndex(prev => (prev + 1) % vehiculo.imagenes.length);
  };

  const anteriorImagen = () => {
    setImagenIndex(prev => (prev - 1 + vehiculo.imagenes.length) % vehiculo.imagenes.length);
  };

  return (
    <div className="detalle-container">
      
      {}
      <nav className="breadcrumb">
        <Link to="/">Inicio</Link> / <Link to="/vehiculos">Vehículos</Link> / <span>{vehiculo.marca} {vehiculo.modelo}</span>
      </nav>

      <div className="detalle-contenido">
        
        {}
        {vehiculo.imagenes?.length > 0 && (
          <div className="detalle-imagen">
            <button className="arrow left" onClick={anteriorImagen}>‹</button>

            <div className="imagen-contenedor">
              <img src={imagenActual?.url} alt={`Imagen de ${vehiculo.marca}`} />
              <p className="imagen-titulo">
           {["Exterior", "Interior", "Motor"][imagenIndex] || `Imagen ${imagenIndex + 1}`}
</p>

            </div>

            <button className="arrow right" onClick={siguienteImagen}>›</button>
          </div>
        )}

        {}
        <div className="detalle-texto">
          <h1>{vehiculo.marca} {vehiculo.modelo}</h1>
          <p><strong>Placa:</strong> {vehiculo.placa}</p>
          <p><strong>Tipo:</strong> {vehiculo.tipo}</p>
          <p><strong>Serie:</strong> {vehiculo.serie}</p>
          <p><strong>Capacidad:</strong> {vehiculo.capacidadPasajeros} pasajeros</p>
          <p><strong>Precio:</strong> ${vehiculo.precio?.toLocaleString()}</p>

          {vehiculo.seguro && (
  <>
    <p className="asegurado">💼 <strong>Asegurado</strong></p>
    <p><strong>Empresa aseguradora:</strong> {vehiculo.seguro.entidadAseguradora}</p>
    <p><strong>Valor del seguro:</strong> ${vehiculo.seguro.valorAnual?.toLocaleString()}</p>
  </>
)}


          {vehiculo.asesorVehiculo && (
            <>
              <p><strong>Asesor:</strong> {vehiculo.asesorVehiculo.nombre}</p>
              <p><strong>Contacto:</strong> {vehiculo.asesorVehiculo.numeroContacto}</p>
            </>
          )}

          {vehiculo.sede && (
            <>
              <p><strong>Sede:</strong> {vehiculo.sede.nombre}</p>
              <p><strong>Dirección:</strong> {vehiculo.sede.direccion}</p>
            </>
          )}
        </div>
 
{vehiculo.mantenimientos && vehiculo.mantenimientos.length > 0 && (
  <div className="mantenimientos-toggle">
    <button onClick={() => setMostrarHistorial(!mostrarHistorial)} className="historial-link">
      {mostrarHistorial ? 'Ocultar historial de mantenimiento ▲' : 'Ver historial de mantenimiento ▼'}
    </button>

    {mostrarHistorial && (
      <div className="mantenimientos-section">
        {vehiculo.mantenimientos.map((m, index) => (
          <div key={index} className="mantenimiento-item">
            <p><strong>Fecha:</strong> {m.fechaDeServicio}</p>
            <p><strong>Servicio:</strong> {m.tipoDeServicio}</p>
            {m.taller && (
              <>
                <p><strong>Taller:</strong></p>
                <ul>
                  <li><strong>Dirección:</strong> {m.taller.direccion}</li>
                  <li><strong>Teléfono:</strong> {m.taller.numero}</li>
                  <li><strong>Horario:</strong> {m.taller.horario}</li>
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
)}


      </div>
    </div>
  );
}
