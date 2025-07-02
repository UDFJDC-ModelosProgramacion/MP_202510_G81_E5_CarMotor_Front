import { useState } from 'react';

export default function Filters({ onFilter }) {
  const [brand, setBrand] = useState('');
  const [plateDigit, setPlateDigit] = useState('');
  const [type, setType] = useState('');

  const handleSearch = () => {
    onFilter({ brand, plateDigit, type });
  };

  return (
    <div className="p-4 bg-gray-100 flex gap-4 flex-wrap">
      <input
        type="text"
        placeholder="Marca"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Último dígito placa"
        value={plateDigit}
        onChange={(e) => setPlateDigit(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tipo (SUV, 4x4...)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded">
        Buscar
      </button>
    </div>
  );
}
