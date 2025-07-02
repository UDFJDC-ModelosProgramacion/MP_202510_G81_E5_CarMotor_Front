// src/context/AsesorContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AsesorContext = createContext();

export function AsesorProvider({ children }) {
  const [asesores] = useState([
    {
      id: 1,
      nombre: 'Laura Gómez',
      foto: '/fotos/laura.jpg',
      telefono: '3101234567',
      email: 'laura@carmotor.com',
    },
    {
      id: 2,
      nombre: 'Carlos Ruiz',
      foto: '/fotos/carlos.jpg',
      telefono: '3109876543',
      email: 'carlos@carmotor.com',
    },
  ]);

  return (
    <AsesorContext.Provider value={asesores}>
      {children}
    </AsesorContext.Provider>
  );
}

export function useAsesores() {
  return useContext(AsesorContext);
}
