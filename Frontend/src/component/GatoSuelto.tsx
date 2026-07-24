import "./GatoSuelto.css";

// Sprite grande (22 x 14), gato siamés de perfil caminando: orejas y
// máscara facial oscuras, ojos claros, collar con placa, cola gruesa
// que se afina hacia la punta. Mira hacia la derecha por defecto; el
// propio componente lo espeja al caminar hacia la izquierda.
//
// La cola ocupa un rectángulo fijo dentro del grid (columnas 0-5,
// filas 3-8) y se dibuja aparte, en su propio sub-grid, para poder
// mecerla como una sola forma coherente en vez de pixel por pixel.
const FULL_GRID: string[] = [
  "..............CC....CC..",
  ".............ccc...ccc..",
  ".............CCCCCCCCC..",
  "CCCCC.......CCKKKKKKKC..",
  "KK..........CKKKBKKBKC..",
  "KK..........CKKKKKKKKC..",
  "KK..........CKKKKKNKCC..",
  "KK..........CCCCCCCCC...",
  "KK..........RRRRRRRRR...",
  "KK..........RRRRRRRRR...",
  "KKCCCCCCCCCCCCCCCCCCCC..",
  "KCCCCCCCccccccCCCCCCCCC.",
  ".CCCCCCCCCCCCCCCCCCCCCC.",
  "..CCCCCCCCCCCCCCCCCCCCC.",
  "..CCCC..CCCC..CCC...CCC.",
  "..ccc...ccc...ccc...ccc.",
  "..ccc...ccc...ccc...ccc.",

];

const COLS = FULL_GRID[0].length;
const ROWS = FULL_GRID.length;

// Bounding box de la cola dentro del grid completo (0-indexado, inclusive)
const TAIL_X0 = 0;
const TAIL_X1 = 5;
const TAIL_Y0 = 3;
const TAIL_Y1 = 7; // la fila 8 (base de la cola, ya pegada al cuerpo)
// se deja fuera a propósito: ahí la fila mezcla cola (K) y hombro (C)
const TAIL_COLS = TAIL_X1 - TAIL_X0 + 1;
const TAIL_ROWS = TAIL_Y1 - TAIL_Y0 + 1;
const isTailCell = (x: number, y: number) =>
  x >= TAIL_X0 && x <= TAIL_X1 && y >= TAIL_Y0 && y <= TAIL_Y1;

const CELL_VAR: Record<string, string> = {
  K: "--c-mascara", // orejas, máscara facial, cola
  C: "--c-pelaje",
  c: "--c-pelaje-sombra", // panza/patas
  B: "--c-ojos",
  N: "--c-nariz",
  R: "--c-collar",
  Y: "--c-placa",
  y: "--c-placa-sombra",
};

// Ojos que parpadean (coordenadas dentro del grid completo)
const ojos = [
  { x: 15, y: 4 },
  { x: 18, y: 4 },
];
const esOjo = (x: number, y: number) =>
  ojos.some((o) => o.x === x && o.y === y);

export interface GatoSueltoProps {
  /** Variante de color, ver GatoSuelto.css (default: siamés crema). */
  variante?: string;
  className?: string;
}

export default function GatoSuelto({
  variante,
  className = "",
}: GatoSueltoProps) {
  const clases = [
    "gato-suelto-escena",
    variante ? `gato-suelto--${variante}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={clases} aria-hidden="true">
      <div className="gato-suelto-caminata">
        <div
          className="gato-suelto-sprite"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            aspectRatio: `${COLS} / ${ROWS}`,
          }}
        >
          {/* Cuerpo, cabeza y patas (todo salvo la cola) */}
          {FULL_GRID.flatMap((row, y) =>
            row.split("").map((cell, x) => {
              if (cell === ".") return null;
              if (isTailCell(x, y)) return null; // la cola se dibuja aparte
              const varName = CELL_VAR[cell];
              const clasesPixel = ["gs-pixel"];
              if (esOjo(x, y)) clasesPixel.push("gs-pixel--ojo");
              return (
                <div
                  key={`${x}-${y}`}
                  className={clasesPixel.join(" ")}
                  style={{
                    gridColumn: x + 1,
                    gridRow: y + 1,
                    backgroundColor: `var(${varName})`,
                  }}
                />
              );
            })
          )}

          {/* Cola: sub-grid propio, pivotea desde donde se une al cuerpo */}
          <div
            className="gs-cola"
            style={{
              gridColumn: `${TAIL_X0 + 1} / ${TAIL_X1 + 2}`,
              gridRow: `${TAIL_Y0 + 1} / ${TAIL_Y1 + 2}`,
              gridTemplateColumns: `repeat(${TAIL_COLS}, 1fr)`,
              gridTemplateRows: `repeat(${TAIL_ROWS}, 1fr)`,
            }}
          >
            {FULL_GRID.slice(TAIL_Y0, TAIL_Y1 + 1).flatMap((row, ry) =>
              row
                .slice(TAIL_X0, TAIL_X1 + 1)
                .split("")
                .map((cell, rx) => {
                  if (cell === ".") return null;
                  return (
                    <div
                      key={`cola-${rx}-${ry}`}
                      className="gs-pixel"
                      style={{
                        gridColumn: rx + 1,
                        gridRow: ry + 1,
                        backgroundColor: `var(${CELL_VAR[cell]})`,
                      }}
                    />
                  );
                })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}