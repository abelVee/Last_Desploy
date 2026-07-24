import "./Orientationguard.css";

type Props = {
  children: React.ReactNode;
};

/**
 * Envolvé tu app (o el Escenario) con este componente.
 * En pantallas chicas y orientación vertical, tapa todo con un aviso
 * pidiendo girar el celular. En horizontal (o en desktop) no hace nada.
 */
export default function OrientationGuard({ children }: Props) {
  return (
    <>
      <div className="orientation-guard-overlay">
        <div className="orientation-guard-icono">📱↻</div>
        <p>Girá tu celular para ver la oficina</p>
      </div>
      <div className="orientation-guard-contenido">{children}</div>
    </>
  );
}