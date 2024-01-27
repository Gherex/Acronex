import React from "react";
import "../stylesheets/TablaInfo.css"

export default function TablaInfo(tabla) {

  return (
    <div className="tabla">
      <h2>{tabla.nombre}</h2>
      <div className="fila">
        <h3>{tabla.fila1}</h3>
        <p>{tabla.valorFila1}</p>
      </div>
      <div className="fila">
        <h3>{tabla.fila2}</h3>
        <p> {tabla.valorFila2}</p>
      </div>
      <div className="fila">
        <h3>{tabla.fila3}</h3>
        <p> {tabla.valorFila3}</p>
      </div>
      <div className="fila">
        <h3>{tabla.fila4}</h3>
        <p> {tabla.valorFila4}</p>
      </div>
    </div>
  );

}