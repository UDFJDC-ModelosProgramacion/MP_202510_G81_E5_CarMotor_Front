export default function VehicleCard({ vehicle }) {
  return (
    <div className="border rounded shadow p-4 w-72 bg-white">
      <img src={vehicle.image} alt="Vehículo" className="h-40 w-full object-cover mb-2 rounded" />
      <h2 className="text-xl font-bold">{vehicle.brand} - {vehicle.model}</h2>
      <p>Tipo: {vehicle.type}</p>
      <p>Placa: ***{vehicle.plateLastDigit}</p>
      <p className="text-green-600 font-semibold">${vehicle.price}</p>
    </div>
  );
}
