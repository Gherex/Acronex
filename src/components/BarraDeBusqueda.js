import unimap from '../unimap_blanco.svg';
import logo from '../images/logo35x35.png';
import lupa from '../images/lupa.png';
import '../stylesheets/BarraDeBusqueda.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BarraDeBusqueda = () => {
  const navigate = useNavigate();
  const [textoBusqueda, setTextoBusqueda] = useState('');

  // const handleBuscar = () => {
  //   // Verifica si el texto de búsqueda coincide con un ID
  //   const isId = /^\d+$/.test(textoBusqueda);
  //   if (isId) {
  //     navigate(`/machines/${textoBusqueda}`);
  //   } else {
  //     // Redirige a la página de lista de máquinas con el query de búsqueda
  //     navigate(`/machines?search=${encodeURIComponent(textoBusqueda)}`);
  //   }
  // };
  const handleBuscar = () => {
    // Verifica si el texto de búsqueda es un número
    const isId = !isNaN(textoBusqueda);
  
    if (isId) {
      navigate(`/machines/${textoBusqueda}`);
    } else {
      // Redirige a la página de lista de máquinas con el query de búsqueda
      navigate(`/machines?search=${encodeURIComponent(textoBusqueda)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBuscar();
    }
  };

  return (
    <div className="barra-nav">
      <img className="logo-acronex" src={logo} alt="Logo Acronex" />
      <img className="logo-unimap" src={unimap} alt="Unimap" />
      <div className="barra-busqueda">
        <input
          id="texto-barra"
          type="text"
          placeholder="Buscar..."
          value={textoBusqueda}
          onChange={(e) => setTextoBusqueda(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          id="lupa"
          src={lupa}
          alt="Icono de lupa"
          className="lupa-icon"
          onClick={handleBuscar}
        />
      </div>
      <div className="circulo-usuario"> NN </div>
    </div>
  );
}

export default BarraDeBusqueda;