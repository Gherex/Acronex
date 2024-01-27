import React from "react";
import "../stylesheets/InformacionMaquina.css"

export default function InformacionMaquina( { empresa, clase, estado, ultActu } ) {

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
    <>
      <div className="empresa">Empresa <div className="nombre-empresa">{empresa}</div></div>
      <div className="clase">Clase <div className="tipo-clase">{clase}</div></div>
      <div className="estado">
        <div className="contenedor-estado">
          <div className={`circulo-estado ${estado ? "circulo-verde" : "circulo-rojo"}`}></div>
          <div className="valor-estado">{estado ? "En movimiento" : "Detenida"} </div>
        </div>
      </div>
      <div className='ult-actu'> Última actualización <div className="fecha-ult-actu">{modificarFecha(ultActu)}</div>
      </div>
    </>
  );

}