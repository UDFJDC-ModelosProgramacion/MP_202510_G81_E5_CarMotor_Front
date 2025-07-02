import '../estilos/home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-background"></div>
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1 className="home-title">¡Bienvenido a CarMotor!</h1>
        <p className="home-subtitle">
          Vehículos usados certificados y financiación segura.
        </p>
      </div>
    </div>
  );
}
