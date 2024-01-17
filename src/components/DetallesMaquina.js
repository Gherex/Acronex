import React from 'react';
import "../stylesheets/DetallesMaquina.css"
import { useParams } from 'react-router-dom';
import { useFetch } from '../useFetch';

const DetallesMaquina = () => {

  const { id } = useParams();
  const url = `https://wrk.acronex.com/api/challenge/machines/${id}`;
  const { data: maquinaData, loading, error } = useFetch(url);

  if (loading) {
    return <p style={{ fontSize: '1.5rem' }}>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  if (!maquinaData) {
    return <p>No existe ese ID de maquina</p>;
  }

  const modificarFecha = (fechaApi) => {
    const fecha = new Date(fechaApi);
    // Obteniendo componentes de fecha y hora
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const anio = fecha.getFullYear();
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    // Formateando la cadena
    const fechaFormateada = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
  }

  return (
    <div className="contenedor-detalles-maquina">
      <div className="bloque-superior">
        <h1> {maquinaData.description} </h1>
        <p> ({maquinaData.id}) </p>
      </div>
      <div className="bloque-izq">
        <div className="indicadores">
          <div className="indicador-item">Taponamiento <div className="indicador-porcentaje">{(maquinaData.last.it == null || undefined) ? "-" : maquinaData.last.it * 100} % </div></div>
          <div className="indicador-item">Evaporación <div className="indicador-porcentaje">{(maquinaData.last.ie == null || undefined) ? "-" : maquinaData.last.ie * 100} % </div></div>
          <div className="indicador-item">Pérdida p. viento <div className="indicador-porcentaje">{(maquinaData.last.id == null || undefined) ? "-" : maquinaData.last.id * 100} % </div></div>
          <div className="indicador-item">Calidad <div className="indicador-porcentaje">{(maquinaData.last.ig == null || undefined) ? "-" : 100 - (maquinaData.last.ig * 100)} % </div></div>
        </div>
        <div className='empresa'>Empresa <div className="nombre-empresa">{maquinaData.company}</div></div>
        <div className='clase'>Clase <div className="tipo-clase">{maquinaData.class}</div></div>
        <div className='estado'> Estado 
          <div className="contenedor-estado">
            <div className={`circulo-estado ${maquinaData.working ? 'circulo-verde' : 'circulo-rojo'}`}></div>
            <div className="valor-estado">{maquinaData.working ? "En movimiento" : "Detenida"} </div>
          </div>
        </div>
        <div className='ult-actu'>Última actualización <div className="fecha-ult-actu">{modificarFecha(maquinaData.last_update)}</div></div>
      </div>
      <div className="bloque-der">
        Aqui van 3 tablas
      </div>
    </div>
  );
};

export default DetallesMaquina;
