import "./escritorioVacio.css";

// Paleta de colores del escritorio vacío
const PALETTE: Record<string, string> = {
  ".": "transparent",
  D: "#6b3c1e", // escritorio (madera)
  d: "#4b2d1e", // escritorio (sombra / patas)
  M: "#5e5e5e", // monitor
  m: "#3f3f3f", // monitor (sombra / marco)
  C: "#3a3a44", // silla (respaldo / asiento)
  c: "#242430", // silla (patas / sombra)
};

// Mismo grid de 30 x 31 que los personajes, pero sin los píxeles de cuerpo
// (así todos los escritorios quedan perfectamente alineados entre sí).
const GRID: string[] = [
  "..............................",
  "..............................",
  "..............................",
  "..............................",
  "...............Mmmmmmmmmmmm...",
  "...............MMMMMMMMMMMM...",
  "...............MMMMMMMMMMMM...",
  "...............MMMMMMMMMMMM...",
  "...............MMMMmMMMMMMM...",
  "...............MMMmMmMMMMMM...",
  "..CC...........MMMMMMMMMMMM...",
  "..CC...........MMMMMMMMMMMM...",
  "..CC...........MMMMMMMMMMMM...",
  "..CC...........MMMMMMMMmMmM...",
  "..CC.............mMMMmmmm.m...",
  "..CC..............mmmm........",
  "..CCd...........MMMMMMMm......",
  ".dddd..........DDdddddddddddd.",
  ".dddddddddddddddddddddddddddd.",
  ".ddCCCCCCCCCCCCCCCCCC......dd.",
  ".ddCCCC..........CCCC......dd.",
  ".dd.cc...........CCCC......dd.",
  "ddddcc...........CCCC.....dddd",
  "....cc...........cccc.........",
  "....cc.............cc.........",
  "....cc...........  cc.........",
  "....cc.............cc.........",
  "....cc.............cc.........",
  "....cc.............cc.........",
  "...cccc...........cccc........",
  "..............................",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

// Región del monitor: le dejamos un brillo tenue tipo "protector de pantalla"
const isMonitor = (x: number, y: number) => y >= 4 && y <= 16 && x >= 15;

export default function EscritorioVacio() {
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
        aria-label="Escritorio vacío con computadora, pixel art"
      >
        {GRID.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            const color = PALETTE[cell] ?? "transparent";
            const classes = ["pixel"];

            if (isMonitor(x, y) && cell !== ".") {
              classes.push("pixel--pantalla");
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