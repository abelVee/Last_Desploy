// Donacion.tsx
import { useRef } from "react";
import "./Donacion.css";
import sonidoMoneda from "../assets/Moneda.mp3";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/eVq6oH3RncWr6pC3Ri83C00";

const Donacion = () => {
  const audioMonedaRef = useRef<HTMLAudioElement | null>(null);

  const handleDonar = () => {
    if (audioMonedaRef.current) {
      audioMonedaRef.current.currentTime = 0;
      audioMonedaRef.current.play().catch(() => {});
    }

    // Pequeña espera para que se alcance a escuchar la moneda
    // antes de salir de la página hacia Stripe.
    setTimeout(() => {
      window.location.href = STRIPE_PAYMENT_LINK;
    }, 350);
  };

  return (
    <div className="donacion-container">
      <audio ref={audioMonedaRef} src={sonidoMoneda} />
      <button className="donacion-boton" onClick={handleDonar}>
        💛 Apoyar el proyecto
      </button>
    </div>
  );
};

export default Donacion;