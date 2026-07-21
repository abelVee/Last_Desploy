import React from "react";
import "./Programadora.css";

// Grid de 30 x 31 "pixeles". Reusa el mismo escritorio, monitor y silla
// del personaje original, pero con una silueta de pelo/torso femenina
// en vez del cuerpo unisex (barba reciclada como marco de pelo).
const GRID: string[] = [
  "..............................",
  ".......HHHHHH.................",
  ".....HHHHHHHHH................",
  "....HHHHHHHHHHHm..............",
  "...HHHHHHHHHHHHMmmmmmmmmmmm...",
  "...HHHHHHHHHHHHMMMMMMMMMMMM...",
  "...HHHSSSSSSHHHMMMMMMMMMMMM...",
  "...HHHSESSESHHHMMMMMMMMMMMM...",
  "...HHHSSSSSSHHHMMMMmMMMMMMM...",
  "...HHHSSXXSSHHHMMMmMmMMMMMM...",
  "..CC.HSSSSHHHHHMMMMMMMMMMMM...",
  "..CC.HHHHHHHH..MMMMMMMMMMMM...",
  "..CC.HHHSSHHH..MMMMMMMMMMMM...",
  "..CC.HHGGGGHH..MMMMMMMMmMmM...",
  "..CC.gGGGGGGg..gOmMMMmmmm.m...",
  ".CC.gGGGGGGGGg.BS.mmmm........",
  ".CC.GGGGGGGGGGGSMMMMMMMm......",
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

// Cada letra de la grilla apunta a una variable CSS. El color en sí
// vive en Programadora.css (valores por defecto + overrides por variante).
const CELL_VAR: Record<string, string> = {
  H: "--c-pelo",
  S: "--c-piel",
  B: "--c-piel", // resto de mano/brazo apoyado sobre el teclado
  E: "--c-ojos",
  X: "--c-boca",
  G: "--c-sweater",
  g: "--c-sweater-sombra",
  R: "--c-pantalon",
  r: "--c-pantalon-sombra",
  O: "--c-zapatos",
  D: "--c-escritorio",
  d: "--c-escritorio-sombra",
  M: "--c-monitor",
  m: "--c-monitor-sombra",
  C: "--c-silla",
  c: "--c-silla-sombra",
};

// Letras que son "cuerpo" (no mobiliario) — se ocultan en modo `vacio`
const BODY_CHARS = new Set(["H", "S", "B", "E", "X", "G", "g", "R", "r", "O"]);

// Región rectangular del monitor (queda fijo, no respira con el cuerpo)
const isMonitor = (x: number, y: number) => y >= 4 && y <= 16 && x >= 15;

// Cuerpo (cabeza + torso + brazos): todo lo de arriba del escritorio,
// exceptuando el monitor y la silla. Esto es lo que "respira".
const isCuerpo = (x: number, y: number, cell: string) =>
  y <= 16 && !isMonitor(x, y) && cell !== "C" && cell !== "c";

// Un par de píxeles de ojos que parpadean
const ojos = [
  { x: 8, y: 7 },
  { x: 11, y: 7 },
];
const esOjo = (x: number, y: number) =>
  ojos.some((o) => o.x === x && o.y === y);

export interface ProgramadoraProps {
  /** Variante de color: "default" (rubia/pelirroja + sweater morado),
   *  o cualquier otra que definas en el CSS. */
  variante?: string;
  /** Si es true, no dibuja a nadie: solo el escritorio, monitor y silla. */
  vacio?: boolean;
  className?: string;
}

export default function Programadora({
  variante,
  vacio = false,
  className = "",
}: ProgramadoraProps) {
  const clasesEscena = [
    "programadora-escena",
    variante ? `programadora--${variante}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clasesEscena}>
      <div
        className="programadora-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label={
          vacio
            ? "Escritorio vacío con computadora, pixel art"
            : "Programadora pixel art frente a una computadora, animada"
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