import React from "react";
import "./mujerRubia.css";

// Paleta de colores del sprite — Mujer rubia (pelo enmarcando la cara, top rosa)
const PALETTE: Record<string, string> = {
  ".": "transparent",
  H: "#f6dd6e", // pelo rubio (más saturado, se lee mejor en chico)
  S: "#f3cfae", // piel
  B: "#f6dd6e", // pelo enmarcando la cara (mismo color que H, no es barba)
  G: "#c9558f", // top rosa/magenta
  g: "#963d68", // top (sombra)
  R: "#463659", // pantalón/falda morado oscuro
  r: "#2f253c", // (sombra)
  D: "#6b3c1e", // escritorio (madera)
  d: "#4b2d1e", // escritorio (sombra / patas)
  M: "#5e5e5e", // monitor
  m: "#3f3f3f", // monitor (sombra / marco)
  O: "#8a5a35", // zapatos
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
const ojos = [
  { x: 10, y: 6 },
  { x: 12, y: 7 },
];
const esOjo = (x: number, y: number) =>
  ojos.some((o) => o.x === x && o.y === y);

export default function MujerRubia() {
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
        aria-label="Mujer rubia pixel art frente a una computadora, animada"
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