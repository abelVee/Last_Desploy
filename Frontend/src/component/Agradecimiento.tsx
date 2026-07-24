// Agradecimiento.tsx
import { useEffect } from "react";

interface Props {
  onCelebrar: (activo: boolean) => void;
}

const Agradecimiento = ({ onCelebrar }: Props) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("gracias") === "true") {
      onCelebrar(true);

      // Limpia el parámetro de la URL sin recargar la página
      const url = new URL(window.location.href);
      url.searchParams.delete("gracias");
      window.history.replaceState({}, "", url.toString());

      const timer = setTimeout(() => onCelebrar(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [onCelebrar]);

  return null;
};

export default Agradecimiento;