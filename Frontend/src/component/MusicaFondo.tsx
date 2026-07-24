// MusicaFondo.tsx
import { useEffect, useRef } from "react";
import musicaFondo from "../assets/MusicaFondo.mp3";

const MusicaFondo = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const yaIntentado = useRef(false);

  useEffect(() => {
    const intentarIniciar = () => {
      if (yaIntentado.current || !audioRef.current) return;
      yaIntentado.current = true;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {
        // Si el navegador bloquea el autoplay, se reintenta apenas
        // el usuario haga cualquier interacción con la página.
        yaIntentado.current = false;
      });
    };

    // Intento inmediato al entrar a la página
    intentarIniciar();

    // Respaldo: si el navegador lo bloqueó, arranca en la primera
    // interacción del usuario (click, tecla o touch)
    window.addEventListener("click", intentarIniciar);
    window.addEventListener("keydown", intentarIniciar);
    window.addEventListener("touchstart", intentarIniciar);

    return () => {
      window.removeEventListener("click", intentarIniciar);
      window.removeEventListener("keydown", intentarIniciar);
      window.removeEventListener("touchstart", intentarIniciar);
    };
  }, []);

  // loop={false}: se reproduce una sola vez
  return <audio ref={audioRef} src={musicaFondo} />;
};

export default MusicaFondo;