import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BarraDeBusqueda from './components/BarraDeBusqueda';
import ListaDeMaquinas from './components/ListaDeMaquinas';
import DetallesMaquina from './components/DetallesMaquina';

export default function App() {

  return (
    <Router>
      <div className="App">
        <BarraDeBusqueda />
        <Routes>
          <Route path="/machines" element={<ListaDeMaquinas />} />
          <Route path="/machines/:id" element={<DetallesMaquina />} />
          {/* Redirección a /machines, para arrancar acá inicialmente */}
          <Route
            path="/"
            element={<Navigate to="/machines" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}
