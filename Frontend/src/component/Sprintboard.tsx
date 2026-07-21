import React from "react";
import "./Sprintboard.css";

// Paleta de colores del Sprint Board
const PALETTE: Record<string, string> = {
  ".": "transparent",
  F: "#b9bcc2", // marco exterior gris
  H: "#0d0d0d", // cabecera negra
  S: "#5fd9a0", // texto de cabecera (sugerido)
  B: "#eceae4", // fondo del panel (crema)
  T: "#5b5b5b", // etiquetas de columna (sugeridas)
  L: "#c9c7c0", // borde fino de columna
  W: "#f4f3ef", // fondo interior de columna
  R: "#cf5c4c", // tarjeta "por hacer"
  O: "#d99a3f", // tarjeta "haciendo"
  G: "#69c795", // tarjeta "hecho"
  E: "#d8d6d1", // tarjeta vacía / placeholder
};

const GRID: string[] = [
  "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
  "FHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHF",
  "FHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHF",
  "FHHHHHHHHHHHHSSSSSSSSSSSSSSHHHHHHHHHHHHF",
  "FHHHHHHHHHHHHSSSSSSSSSSSSSSHHHHHHHHHHHHF",
  "FHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHF",
  "FHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHF",
  "FBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBF",
  "FBBBTTTTTTTBBBBBTTTTTTTBBBBBTTTTTTBBBBBF",
  "FBBBTTTTTTTBBBBBTTTTTTTBBBBBTTTTTTBBBBBF",
  "FBBLLLLLLLLLLLBLLLLLLLLLLLBLLLLLLLLLLLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWWWWWWWWWLBF",
  "FBBLWRRRRRRRWLBLWOOOOOOOWLBLWGGGGGGGWLBF",
  "FBBLWRRRRRRRWLBLWOOOOOOOWLBLWGGGGGGGWLBF",
  "FBBLWRRRRRRRWLBLWOOOOOOOWLBLWGGGGGGGWLBF",
  "FBBLWRRRRRRRWLBLWOOOOOOOWLBLWGGGGGGGWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWWWWWWWWWLBF",
  "FBBLWEEEEEEEWLBLWEEEEEEEWLBLWEEEEEEEWLBF",
  "FBBLWEEEEEEEWLBLWEEEEEEEWLBLWEEEEEEEWLBF",
  "FBBLWEEEEEEEWLBLWEEEEEEEWLBLWEEEEEEEWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWWWWWWWWWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWGGGGGGGWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWGGGGGGGWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWGGGGGGGWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWGGGGGGGWLBF",
  "FBBLWWWWWWWWWLBLWWWWWWWWWLBLWWWWWWWWWLBF",
  "FBBLLLLLLLLLLLBLLLLLLLLLLLBLLLLLLLLLLLBF",
  "FBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBF",
  "FBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBF",
  "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

export default function SprintBoard() {
  return (
    <div className="sprint-board-escena">
      <div
        className="sprint-board-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Sprint board con columnas por hacer, haciendo y hecho, pixel art"
      >
        {GRID.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            const color = PALETTE[cell] ?? "transparent";
            return (
              <div
                key={`${x}-${y}`}
                className="pixel"
                style={{ backgroundColor: color }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}