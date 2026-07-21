// Arbol.tsx
import "./Arbol.css";

const Arbol = () => {
  return (
    <svg
      className="escenario-arbol"
      viewBox="0 0 40 40"
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tronco */}
      <rect x="16" y="26" width="8" height="12" fill="#6b4226" />
      {/* Copa */}
      <circle cx="20" cy="16" r="14" fill="#3f7d4a" />
      <circle cx="20" cy="14" r="11" fill="#4f9c5c" />
    </svg>
  );
};

export default Arbol;