import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Home from './pages/Home';
import Vehiculos from './pages/Vehiculos';
import Sedes from './pages/Sedes';
import Asesores from './pages/Asesores';
import Seguros from './pages/Seguros';
import TestDrive from './pages/TestDrive';
import Financiacion from './pages/Financiacion';
import VehiculosPorAsesor from './pages/VehiculosporAsesor';
import VehiculoDetalle from './pages/VehiculoDetalle';
import VehiculosPorSede from './pages/VehiculosporSede';
import './index.css';
import { AsesorProvider } from './DatosPrueba/AsesorContext';

function App() {
  return (
    <Router>
      <AsesorProvider>
        <div className="flex flex-col min-h-screen">
          <Topbar />
          <div className="flex flex-1">
            <Sidebar />
            <div className="flex-1 p-4 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sedes" element={<Sedes />} />
<Route path="/sedes/:nombre/vehiculos" element={<VehiculosPorSede />} />
                <Route path="/vehiculos" element={<Vehiculos />} />
                <Route path="/vehiculos/:vehiculoId" element={<VehiculoDetalle />} />
                <Route path="/asesores" element={<Asesores />} />
                <Route path="/asesores/:id/vehiculos" element={<VehiculosPorAsesor />} />
                <Route path="/seguros" element={<Seguros />} />
                <Route path="/testdrive" element={<TestDrive />} />
                <Route path="/financiacion" element={<Financiacion />} />
              </Routes>
            </div>
          </div>
        </div>
      </AsesorProvider>
    </Router>
  );
}

export default App;
