import "./TeamWins.css";

// Paleta de colores del corcho "Team Wins"
const PALETTE: Record<string, string> = {
  ".": "transparent",
  F: "#8a5a34", // marco de madera
  B: "#c98f4e", // corcho
  H: "#14140f", // cabecera
  Y: "#e7c34d", // nota amarilla
  R: "#d9614f", // nota roja
  G: "#5fbf8a", // nota verde
  O: "#d99a3f", // nota naranja
  p: "#e5e5e5", // chinche
};

const GRID: string[] = [
  "FFFFFFFFFFFFFFFFFFFFFFFF",
  "FBBBBBBBBBBBBBBBBBBBBBBF",
  "FBHHHHHHHHHHHHHHHHHHHHBF",
  "FBHHHHHHHHHHHHHHHHHHHHBF",
  "FBHHHHHHHHHHHHHHHHHHHHBF",
  "FBHHHHHHHHHHHHHHHHHHHHBF",
  "FBHHHHHHHHHHHHHHHHHHHHBF",
  "FBBBBBBBBBBBRRRRRRRRRBBF",
  "FBYYYYYYYYYBRRRRRRRRRBBF",
  "FBYYYYYYYYYBRRRRpRRRRBBF",
  "FBYYYYpYYYYBRRRRRRRRRBBF",
  "FBYYYYYYYYYBRRRRRRRRRBBF",
  "FBYYYYYYYYYBRRRRRRRRRBBF",
  "FBYYYYYYYYYBBBBBBBBBBBBF",
  "FBBBBBBBBBBBOOOOOOOOOBBF",
  "FBGGGGGGGGGBOOOOOOOOOBBF",
  "FBGGGGGGGGGBOOOOpOOOOBBF",
  "FBGGGGpGGGGBOOOOOOOOOBBF",
  "FBGGGGGGGGGBOOOOOOOOOBBF",
  "FBGGGGGGGGGBOOOOOOOOOBBF",
  "FBGGGGGGGGGBBBBBBBBBBBBF",
  "FBBBBBBBBBBBBBBBBBBBBBBF",
  "FBBBBBBBBBBBBBBBBBBBBBBF",
  "FFFFFFFFFFFFFFFFFFFFFFFF",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

export default function TeamWins() {
  return (
    <div className="team-wins-escena">
      <div
        className="team-wins-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Corcho de logros del equipo, pixel art"
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