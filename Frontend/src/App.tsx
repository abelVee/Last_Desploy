// App.tsx (ejemplo de uso)
import Escenario from "./component/Escenario";
import OrientationGuard from "./component/Orientationguard";

function App() {
  return (
    <OrientationGuard>
      <Escenario />
    </OrientationGuard>
  );
}

export default App;