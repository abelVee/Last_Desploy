import { useState } from 'react'
import Escenario from './component/Escenario' // Asegúrate de importar el nombre correcto

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* Aquí es donde agregas tu componente */}
      <Escenario />
      
      {/* Opcional: Puedes dejar lo que tenías antes */}
      <h1>Contador: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  )
}

export default App