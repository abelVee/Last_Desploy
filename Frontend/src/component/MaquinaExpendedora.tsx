import "./MaquinaExpendedora.css";

// Paleta de colores de la máquina expendedora
const PALETTE: Record<string, string> = {
  ".": "transparent",
  B: "#dfe1e3", // cuerpo
  G: "#63c99a", // vidrio
  P: "#2b2f36", // panel de botones
  A: "#3a7bd5", // botón azul
  R: "#d9483f", // botón rojo
  D: "#111318", // ranura de despacho
};

const GRID: string[] = [
  "..............",
  "..............",
  "..............",
  ".BBBBBBBBBBBB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BGGGGGGGGGGB.",
  ".BBBBBBBBBBBB.",
  ".BPPPPPPPPPPB.",
  ".BPPAAPPRRPPB.",
  ".BPPAAPPRRPPB.",
  ".BPPPPPPPPPPB.",
  ".BDDDDDDDDDDB.",
  ".BDDDDDDDDDDB.",
  ".BBBBBBBBBBBB.",
];

const COLS = GRID[0].length;
const ROWS = GRID.length;

export default function MaquinaExpendedora() {
  return (
    <div className="maquina-expendedora-escena">
      <div
        className="maquina-expendedora-sprite"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          aspectRatio: `${COLS} / ${ROWS}`,
        }}
        role="img"
        aria-label="Máquina expendedora, pixel art"
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