import React from "react";
import "./PatoSuelto.css";

// Sprite chiquito (12 x 8), pato de perfil caminando/anadeando. El pico
// sobresale claramente de la cabeza (no solo cambia de color en el mismo
// ancho) para que se lea bien incluso chiquito. Guiño al "rubber duck
// debugging". Mira hacia la derecha por defecto; el propio componente
// se encarga de espejarlo al caminar hacia la izquierda.
const GRID: string[] = [
  ".....HH.....",
  "....HHHH....",
  "....HEHH....",
  "....HHNNN...",
  "....HHHH....",
  ".HHHHHHHHHH.",
  "THHHHHHHHHH.",
  ".NN....NN...",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

const CELL_VAR: Record<string, string> = {
  H: "--c-plumaje",
  E: "--c-ojos",
  N: "--c-pico", // también se reusa para las patas
  T: "--c-plumaje",
};

export interface PatoSueltoProps {
  /** Variante de color, ver PatoSuelto.css (default: amarillo clásico). */
  variante?: string;
  className?: string;
}

export default function PatoSuelto({
  variante,
  className = "",
}: PatoSueltoProps) {
  const clases = [
    "pato-suelto-escena",
    variante ? `pato-suelto--${variante}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clases} aria-hidden="true">
      <div className="pato-suelto-anadeo">
        <div
          className="pato-suelto-sprite"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            aspectRatio: `${COLS} / ${ROWS}`,
          }}
        >
          {GRID.flatMap((row, y) =>
            row.split("").map((cell, x) => {
              if (cell === ".") return null;
              const varName = CELL_VAR[cell];
              const isPata = y === ROWS - 1; // fila de las patas
              return (
                <div
                  key={`${x}-${y}`}
                  className={`ps-pixel${isPata ? " ps-pixel--pata" : ""}`}
                  style={{
                    gridColumn: x + 1,
                    gridRow: y + 1,
                    backgroundColor: `var(${varName})`,
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}