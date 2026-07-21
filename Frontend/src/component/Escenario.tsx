// Escenario.tsx
import Personaje from "./Personaje";
import fondoEscenario from "../assets/escenario.png";
import "./Escenario.css";
import PuertaSalida from "../assets/puerta_salida.png";
import EscritorioVacio from "./EscritorioVacio";
import VentanaCiudad from "./VentanaCiudad";
import TeamWins from "./TeamWins";
import MaquinaExpendedora from "./MaquinaExpendedora";
import RelojPared from "./RelojPared";
import MesaPlanta from "./MesaPlanta";
import SprintBoard from "./Sprintboard";
import Programadora from "./Programadora";

const Escenario = () => {
  return (
    <div className="escenario-container">
      {/* Capa de fondo */}
      <img
        src={fondoEscenario}
        alt="Escenario de trabajo"
        className="escenario-fondo"
      />

      {/* Objetos superpuestos sobre el fondo */}
      <img
        src={PuertaSalida}
        alt="Puerta de salida"
        className="escenario-puerta"
      />

      <div className="objetos-decorativos">
        <VentanaCiudad />
        <TeamWins />
        <MaquinaExpendedora />
        <RelojPared />
        <MesaPlanta />
        <SprintBoard />
      </div>

      {/* Capa de personajes y escritorios, en grilla de 4 columnas x 2 filas
          (en mobile pasa a 2 columnas x 4 filas, ver media query en el css) */}
      <div className="oficina-grid">
        {/* Fila de arriba: 4 personajes */}
        <div className="puesto">
          <Personaje />
        </div>
        <div className="puesto">
          <Personaje variante="joven" />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
        <div className="puesto">
          <Personaje variante="mujer-rubia" />
        </div>

        {/* Fila de abajo */}
        <div className="puesto">
          <Personaje variante="encapuchado" />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
        <div className="puesto">
          <Programadora />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
      </div>
    </div>
  );
};

export default Escenario;