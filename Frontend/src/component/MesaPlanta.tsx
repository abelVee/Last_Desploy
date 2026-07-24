import "./MesaPlanta.css";

// Paleta de colores de la mesa con planta y botella
const PALETTE: Record<string, string> = {
  ".": "transparent",
  D: "#6b4226", // tabla de la mesa
  d: "#4a2d18", // patas de la mesa
  B: "#8a8f96", // botella/vaso
  R: "#d9614f", // fruta roja
  Y: "#e7c34d", // fruta amarilla
  G: "#5fbf8a", // hoja verde
};

const GRID: string[] = [
  "..................",
  "..................",
  "............BB....",
  "...........BBBB...",
  "........Y..BBBB...",
  "....R.YYYYYBBBB...",
  "..RRRRYYYYYBBBB...",
  "..RRRYYYYYYYBBB...",
  ".RRRRGGGGYYBBBB...",
  "..RRRGGGGYYBBBB...",
  "..RRRGGGG..BBBB...",
  ".DDDRGGGGDDBBBBDD.",
  ".DDDDDDDDDDDDDDDD.",
  ".DDDDDDDDDDDDDDDD.",
  "..dd..........dd..",
  "..dd..........dd..",
  "..dd..........dd..",
  "..dd..........dd..",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

export default function MesaPlanta() {
  return (
    <div className="mesa-planta-escena">
      <div
        className="mesa-planta-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Mesa con planta y botella, pixel art"
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