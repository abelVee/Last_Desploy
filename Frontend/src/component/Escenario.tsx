// Escenario.tsx
import ProgramadorSenior from "./ProgramadorSenior";
import Joven from "./Joven";
import Morenito from "./Moreno";
import MujerRubia from "./MujerRubia";
import Encapuchado from "./Encapuchado";
import EscritorioVacio from "./EscritorioVacio";
import fondoEscenario from "../assets/escenario.png";
import "./Escenario.css";

const Escenario = () => {
  return (
    <div className="escenario-container">
      {/* Capa de fondo */}
      <img
        src={fondoEscenario}
        alt="Escenario de trabajo"
        className="escenario-fondo"
      />

      {/* Capa de personajes y escritorios, en grilla de 4 columnas x 2 filas */}
      <div className="oficina-grid">
        {/* Fila de arriba: 4 personajes */}
        <div className="puesto">
          <ProgramadorSenior />
        </div>
        <div className="puesto">
          <Joven />
        </div>
        <div className="puesto">
          <Morenito />
        </div>
        <div className="puesto">
          <MujerRubia />
        </div>

        {/* Fila de abajo: 1 personaje + 3 escritorios vacíos */}
        <div className="puesto">
          <Encapuchado />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
      </div>
    </div>
  );
};

export default Escenario;