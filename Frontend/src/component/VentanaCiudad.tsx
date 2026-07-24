import "./VentanaCiudad.css";

// Paleta de colores de la ventana con vista a la ciudad
// (W y S ya no se pintan por inline style: se animan por CSS, ver clases)
const PALETTE: Record<string, string> = {
  ".": "transparent",
  F: "#8a5a34", // marco de madera
  K: "#211a2e", // edificios
  p: "#e7c98a", // tornillo decorativo
};

// Celdas que llevan animación en vez de color fijo
const ANIMATED_CLASS: Record<string, string> = {
  W: "pixel--cielo",
  S: "pixel--sol",
};

const GRID: string[] = [
  "........................",
  ".......FFFFpFFFFF.......",
  "......FFFFFFFFFFFF......",
  "....FFFFWWWWSWWWFFFF....",
  "...FFFWWWWSSSSSWWWFFF...",
  "...FFWWWWSSSSSSSWWWFF...",
  "..pFWWWWWSSSSSSSWWWWpF..",
  ".FFFWWWWSSSSSSSSSWWWFFF.",
  ".FFWWWWWWSSSSSSSWWWWWFF.",
  ".FFWWWWWWSSSSSSSWWWWWFF.",
  ".FFWWWWWWWSSSSSWWWWWWFF.",
  ".FFWWWWWWWWWSWKKKKWWWFF.",
  ".FFWWWWWWWWWWWKKKKWWWFF.",
  ".FFWWWWKKKKWWWKKKKWWWFF.",
  ".FFWWWWKKKKWWWKKKKWWWFF.",
  ".FFWWWWKKKKWWWKKKKKKKFF.",
  ".FFFKKKKKKKWWWKKKKKKFFF.",
  "..pFKKKKKKKKKKKKKKKKpF..",
  "...FFKKKKKKKKKKKKKKFF...",
  "...FFFKKKKKKKKKKKKFFF...",
  "....FFFFKKKKKKKKFFFF....",
  "......FFFFFFFFFFFF......",
  ".......FFFFpFFFFF.......",
  "........................",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

export default function VentanaCiudad() {
  return (
    <div className="ventana-ciudad-escena">
      <div
        className="ventana-ciudad-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Ventana circular con vista a la ciudad, pixel art"
      >
        {GRID.flatMap((row, y) =>
          row.split("").map((cell, x) => {
            const animatedClass = ANIMATED_CLASS[cell];
            if (animatedClass) {
              return (
                <div key={`${x}-${y}`} className={`pixel ${animatedClass}`} />
              );
            }
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