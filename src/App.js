import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BarraDeBusqueda from './components/BarraDeBusqueda';
import ListaDeMaquinas from './components/ListaDeMaquinas';
import DetallesMaquina from './components/DetallesMaquina';

function App() {

  return (
    <Router>
      <div className="App">
        <BarraDeBusqueda />
        <Routes>
          <Route path="/machines" element={<ListaDeMaquinas />} />
          <Route path="/machines/:id" element={<DetallesMaquina />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
