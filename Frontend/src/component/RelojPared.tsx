import "./RelojPared.css";

// Paleta de colores de la esfera fija (sin la manecilla, que va aparte)
const PALETTE: Record<string, string> = {
  ".": "transparent",
  F: "#111318", // marco negro
  E: "#e9e6de", // esfera
  T: "#111318", // marcas de hora
  H: "#111318", // manecilla de hora (fija, apunta a las 12)
  C: "#111318", // centro
};

// Esfera + marco + manecilla de hora fija (sin el minutero, que se dibuja aparte)
const GRID: string[] = [
  "....................",
  "......FFFFFFFF......",
  "....FFFFFTTFFFFF....",
  "...FFFEEEEEEEEFFF...",
  "..FFFEEEEEEEEEEFFF..",
  "..FFEEEEEHHEEEEEFF..",
  ".FFEEEEEEHHEEEEEEFF.",
  ".FFEEEEEEHHEEEEEEFF.",
  ".FFEEEEEEHHEEEEEEFF.",
  ".FTTEEEEECEEEEEETTF.",
  ".FFEEEEEEEEEEEEEEFF.",
  ".FFEEEEEEEEEEEEEEFF.",
  ".FFEEEEEEEEEEEEEEFF.",
  ".FFEEEEEEEEEEEEEEFF.",
  "..FFEEEEEEEEEEEEFF..",
  "..FFFEEEEEEEEEEFFF..",
  "...FFFEEETTEEEFFF...",
  "....FFFFFFFFFFFF....",
  "......FFFFFFFF......",
  "....................",
];

// Minutero: sprite chico que se posiciona sobre el centro y gira
const HAND_GRID: string[] = ["MMMMM", "MMMMM"];

const COLS = GRID[0].length;
const ROWS = GRID.length;
const HAND_COLS = HAND_GRID[0].length;
const HAND_ROWS = HAND_GRID.length;

export default function RelojPared() {
  return (
    <div className="reloj-pared-escena">
      {/* Esfera fija */}
      <div
        className="reloj-pared-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Reloj de pared, pixel art"
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

      {/* Minutero animado: pivota desde el centro del reloj */}
      <div className="reloj-pared-manecilla">
        <div
          className="reloj-pared-manecilla-sprite"
          style={{
            gridTemplateColumns: `repeat(${HAND_COLS}, 1fr)`,
            gridTemplateRows: `repeat(${HAND_ROWS}, 1fr)`,
          }}
        >
          {HAND_GRID.flatMap((row, y) =>
            row.split("").map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className="pixel"
                style={{ backgroundColor: cell === "M" ? "#e0763f" : "transparent" }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}