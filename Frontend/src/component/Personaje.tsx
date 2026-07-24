import "./Personaje.css";

// Grid de 30 x 31 "pixeles". Cada carácter representa una parte del cuerpo
// o del mobiliario; el color real se resuelve por CSS variable (ver
// Personaje.css), así que este mismo grid sirve para TODOS los personajes.
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

// Cada letra de la grilla apunta a una variable CSS. El color en sí
// vive en Personaje.css (valores por defecto + overrides por variante).
const CELL_VAR: Record<string, string> = {
  H: "--c-pelo",
  S: "--c-piel",
  B: "--c-barba", 
  G: "--c-camiseta",
  g: "--c-camiseta-sombra",
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
const BODY_CHARS = new Set(["H", "S", "B", "G", "g", "R", "r", "O"]);

// Región rectangular del monitor (queda fijo, no respira con el cuerpo)
const isMonitor = (x: number, y: number) => y >= 4 && y <= 16 && x >= 15;

// Cuerpo (cabeza + torso + brazos): todo lo de arriba del escritorio,
// exceptuando el monitor y la silla. Esto es lo que "respira".
const isCuerpo = (x: number, y: number, cell: string) =>
  y <= 16 && !isMonitor(x, y) && cell !== "C" && cell !== "c";

// Un par de píxeles de la cara que parpadean como un ojo
const ojos = [
  { x: 10, y: 6 },
  { x: 12, y: 7 },
];
const esOjo = (x: number, y: number) =>
  ojos.some((o) => o.x === x && o.y === y);

export interface PersonajeProps {
  /** Variante de color: "senior" (default), "joven", "morenito",
   *  "mujer-rubia", "encapuchado", o cualquier otra que definas en el CSS. */
  variante?: string;
  /** Si es true, no dibuja a nadie: solo el escritorio, monitor y silla. */
  vacio?: boolean;
  className?: string;
}

export default function Personaje({
  variante,
  vacio = false,
  className = "",
}: PersonajeProps) {
  const clasesEscena = [
    "personaje-escena",
    variante ? `personaje--${variante}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clasesEscena}>
      <div
        className="personaje-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label={
          vacio
            ? "Escritorio vacío con computadora, pixel art"
            : "Programador pixel art frente a una computadora, animado"
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

        {/* Un solo overlay animado sobre el monitor (liviano: opacity, un
            único elemento) en vez de animar cada pixel de la pantalla */}
        <div
          className="pantalla-brillo"
          style={{ gridColumn: "16 / 31", gridRow: "5 / 18" }}
        />
      </div>
    </div>
  );
}