import React from "react";
import "./encapuchado.css";

// Paleta de colores del sprite — Encapuchado (capucha oscura, look hacker)
const PALETTE: Record<string, string> = {
  ".": "transparent",
  H: "#5a2438", // capucha (bordó oscuro, se distingue del pelo negro)
  S: "#c9926e", // piel (sombreada por la capucha)
  B: "#1a1216", // sombra profunda bajo la capucha (oculta el rostro)
  G: "#5a2438", // buzo/hoodie (mismo tono que la capucha)
  g: "#3d1826", // hoodie (sombra)
  R: "#23262b", // jean casi negro
  r: "#16181c", // jean (sombra)
  D: "#6b3c1e", // escritorio (madera)
  d: "#4b2d1e", // escritorio (sombra / patas)
  M: "#5e5e5e", // monitor
  m: "#3f3f3f", // monitor (sombra / marco)
  O: "#4a4d55", // zapatos
  C: "#3a3a44", // silla (respaldo / asiento)
  c: "#242430", // silla (patas / sombra)
};

// Grid de 30 x 31 "pixeles". Cada carácter es una clave de PALETTE.
const GRID: string[] = [
  "..............................",
  "........mmmmmm................",
  ".......MSSSBBBM...............",
  ".......SSSBBBBBm..............",
  ".......SSHHHBBBMmmmmmmmmmmm...",
  ".......SSBBHBMMMMMMMMMMMMMM...",
  "......BSSBMHBMMMMMMMMMMMMMM...",
  "......SOBHHHBMMMMMMMMMMMMMM...",
  ".......OBHMmMMMMMMMmMMMMMMM...",
  ".......DBMMHBMMMMMmMmMMMMMM...",
  "..CC...DmmMMMMMMMMMMMMMMMMM...",
  "..CC.mGdmmmmMMMMMMMMMMMMMMM...",
  "..CCmGGmmmmmmMMMMMMMMMMMMMM...",
  "..CCMGGGg...mMMMMMMMMMMmMmM...",
  "..CCBBGGGgMMgGGgOmMMMmmmm.m...",
  "..CCOSBBBBBOGGBBS.mmmm........",
  "..CCdBSSSSHSGBSSMMMMMMMm......",
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

// Región rectangular del monitor (queda fijo, no respira con el cuerpo)
const isMonitor = (x: number, y: number) => y >= 4 && y <= 16 && x >= 15;

// Cuerpo (cabeza + torso + brazos): todo lo de arriba del escritorio,
// exceptuando el monitor y la silla. Esto es lo que "respira".
const isCuerpo = (x: number, y: number, cell: string) =>
  y <= 16 && !isMonitor(x, y) && cell !== "C" && cell !== "c";

// Escritorio, silla y piernas quedan estáticos (son mobiliario / está sentado)

// Un par de píxeles de la cara que parpadean como un ojo
// (aquí caen justo en la sombra de la capucha, así que el "parpadeo"
// se ve como un breve brillo de ojos entre las sombras)
const ojos = [
  { x: 10, y: 6 },
  { x: 12, y: 7 },
];
const esOjo = (x: number, y: number) =>
  ojos.some((o) => o.x === x && o.y === y);

export default function Encapuchado() {
  return (
    <div className="programador-escena">
      <div
        className="programador-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Programador con capucha, pixel art, animado"
      >
        {GRID.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            const color = PALETTE[cell] ?? "transparent";
            const classes = ["pixel"];

            if (esOjo(x, y)) {
              classes.push("pixel--ojo");
            } else if (isMonitor(x, y) && cell !== ".") {
              classes.push("pixel--pantalla");
            } else if (isCuerpo(x, y, cell) && cell !== ".") {
              classes.push("pixel--cuerpo");
              if (y <= 9) classes.push("pixel--cabeza");
            }

            return (
              <div
                key={`${x}-${y}`}
                className={classes.join(" ")}
                style={{ backgroundColor: color }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}