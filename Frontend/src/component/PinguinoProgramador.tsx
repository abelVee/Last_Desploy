import React from "react";
import "./PinguinoProgramador.css";

// Grid de 30 x 31 "pixeles". Mismo escritorio, monitor y silla que los
// personajes anteriores, con una silueta de pingüino (cabeza redonda,
// pancita blanca, pico, aletas) en vez de un cuerpo humano.
const GRID: string[] = [
  "..............................",
  ".....HHHHH....................",
  "...HHHHHHHHH..................",
  "..HHHHHHHHHHH..m..............",
  ".HHHHHHHHHHHHH.Mmmmmmmmmmmm...",
  ".HHFFFFFFFFFHH.MMMMMMMMMMMM...",
  ".HHFEFFFFFEFHH.MMMMMMMMMMMM...",
  ".HHFFFFFFFFFHH.MMMMMMMMMMMM...",
  ".HHFFFNNNFFFHH.MMMMmMMMMMMM...",
  "..HHFFFFFFFHH..MMMmMmMMMMMM...",
  "..CC.HHHHHHHHH.MMMMMMMMMMMM...",
  "..CC.HHFFFFFHH.MMMMMMMMMMMM...",
  "..CC.HFFFFFFFHHMMMMMMMMMMMM...",
  "..CC.HHFFFFHH..MMMMMMMMmMmM...",
  "..CC.HHHHHHHHHHgOmMMMmmmm.m...",
  "..CC.HHHHHHHHHHBS.mmmm........",
  "..CC.HHHHHHHHHHSMMMMMMMm......",
  ".ddddDDDOOOOOOODDdddddddd.ddd.",
  ".dddddddddddddddddddddddd.ddd.",
  ".ddCCCCGGGGGGGgm.CCCC......dd.",
  ".ddCCCCgRRRRRRRRdCCCC......dd.",
  ".dd.cc..rrRRrDrRR..cc......dd.",
  "ddddcc...drD...rRd.cc.....dddd",
  "....cc...dDRd..dRR.cc.........",
  "....cc...dDOOm.DDODcc.........",
  "....cc......d.....dcc.........",
  "....cc.............cc.........",
  "....cc.............cc.........",
  "....cc.............cc.........",
  "...cccc...........cccc........",
  "..............................",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

// Cada letra apunta a una variable CSS (color en PinguinoProgramador.css).
const CELL_VAR: Record<string, string> = {
  H: "--c-plumaje",
  F: "--c-pancita",
  B: "--c-pancita", // aleta apoyada sobre el teclado
  E: "--c-ojos",
  N: "--c-pico",
  G: "--c-hoodie",
  g: "--c-hoodie-sombra",
  R: "--c-plumaje",
  r: "--c-plumaje-sombra",
  O: "--c-pico",
  D: "--c-escritorio",
  d: "--c-escritorio-sombra",
  M: "--c-monitor",
  m: "--c-monitor-sombra",
  C: "--c-silla",
  c: "--c-silla-sombra",
};

// Letras que son "cuerpo" (no mobiliario) — se ocultan en modo `vacio`
const BODY_CHARS = new Set(["H", "F", "B", "E", "N", "G", "g", "R", "r", "O"]);

// Región rectangular del monitor (queda fijo, no respira con el cuerpo)
const isMonitor = (x: number, y: number) => y >= 4 && y <= 16 && x >= 15;

// Cuerpo (cabeza + torso): todo lo de arriba del escritorio, exceptuando
// el monitor y la silla. Esto es lo que "respira".
const isCuerpo = (x: number, y: number, cell: string) =>
  y <= 16 && !isMonitor(x, y) && cell !== "C" && cell !== "c";

// Un par de píxeles de ojos que parpadean
const ojos = [
  { x: 4, y: 6 },
  { x: 10, y: 6 },
];
const esOjo = (x: number, y: number) =>
  ojos.some((o) => o.x === x && o.y === y);

export interface PinguinoProgramadorProps {
  /** Variante de color: "default" (plumaje negro + hoodie azul), o
   *  cualquier otra que definas en el CSS. */
  variante?: string;
  /** Si es true, no dibuja a nadie: solo el escritorio, monitor y silla. */
  vacio?: boolean;
  className?: string;
}

export default function PinguinoProgramador({
  variante,
  vacio = false,
  className = "",
}: PinguinoProgramadorProps) {
  const clasesEscena = [
    "pinguino-escena",
    variante ? `pinguino--${variante}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clasesEscena}>
      <div
        className="pinguino-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label={
          vacio
            ? "Escritorio vacío con computadora, pixel art"
            : "Pingüino pixel art programando frente a una computadora, animado"
        }
      >
        {GRID.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            if (cell === ".") return null;
            if (vacio && BODY_CHARS.has(cell)) return null;

            const varName = CELL_VAR[cell];
            const classes = ["pixel"];

            if (!vacio) {
              if (esOjo(x, y)) {
                classes.push("pixel--ojo");
              } else if (isCuerpo(x, y, cell)) {
                classes.push("pixel--cuerpo");
                if (y <= 9) classes.push("pixel--cabeza");
              }
            }

            return (
              <div
                key={`${x}-${y}`}
                className={classes.join(" ")}
                style={{
                  gridColumn: x + 1,
                  gridRow: y + 1,
                  backgroundColor: `var(${varName})`,
                }}
              />
            );
          })
        )}

        {/* Un solo overlay animado sobre el monitor */}
        <div
          className="pantalla-brillo"
          style={{ gridColumn: "16 / 31", gridRow: "5 / 18" }}
        />
      </div>
    </div>
  );
}