import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/Financiacion.css';

export default function Financiacion() {
  const [entidades, setEntidades] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/entidades-bancarias')
      .then(res => setEntidades(res.data))
      .catch(err => console.error('Error al cargar entidades bancarias:', err));
  }, []);

  return (
    <div className="financiacion-container">
      <h1>Opciones de Financiación</h1>
      <p className="intro">Estas son las entidades bancarias con las que tenemos convenio para financiar tu vehículo:</p>

      <div className="entidades-grid">
        {entidades.map(entidad => (
          <div key={entidad.nombre} className="entidad-card">
            {entidad.logo && (
              <img
                src={entidad.logo.url}
                alt={`Logo de ${entidad.nombre}`}
                className="entidad-logo"
              />
            )}
            <h3>{entidad.nombre}</h3>
            <p><strong>Asesor:</strong> {entidad.numeroTelefonoAsesor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
