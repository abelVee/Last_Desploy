// Escenario.tsx
import { useState } from "react";
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
import GatoProgramador from "./GatoProgramador";
import PinguinoProgramador from "./PinguinoProgramador";
import GatoSuelto from "./GatoSuelto";
import PatoSuelto from "./PatoSuelto";
import Donacion from "./Donacion";
import MusicaFondo from "./MusicaFondo";
import Agradecimiento from "./Agradecimiento";

const Escenario = () => {
  const [celebrando, setCelebrando] = useState(false);

  return (
    <div className="escenario-container">
      <img
        src={fondoEscenario}
        alt="Escenario de trabajo"
        className="escenario-fondo"
      />

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

      <div className={`oficina-grid ${celebrando ? "oficina-celebrando" : ""}`}>
        <div className="puesto">
          <Personaje />
        </div>
        <div className="puesto">
          <Programadora />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
        <div className="puesto">
          <GatoProgramador variante="negro" />
        </div>

        <div className="puesto">
          <EscritorioVacio />
        </div>
        <div className="puesto">
          <PinguinoProgramador />
        </div>
        <div className="puesto">
          <GatoProgramador />
        </div>
        <div className="puesto">
          <EscritorioVacio />
        </div>
      </div>

      <GatoSuelto />
      <PatoSuelto />
      <Donacion />
      <MusicaFondo />
      <Agradecimiento onCelebrar={setCelebrando} />
    </div>
  );
};

export default Escenario;