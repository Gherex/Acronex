import React from "react";
import "../stylesheets/Indicadores.css"

export default function Indicadores({ taponamiento, evaporacion, perdidaPorViento, calidad }) {

  const COLORES_INDICADORES = ['#008000', '#FFFF00', '#FFA500', '#FF0000', '#8B0000', '#8B0000'];

  function getColor(valor) {
    if (valor < 0.1) {
      return COLORES_INDICADORES[0];
    } else if (valor >= 0.1 && valor < 0.2) {
      return COLORES_INDICADORES[1];
    } else if (valor >= 0.2 && valor < 0.35) {
      return COLORES_INDICADORES[2];
    } else if (valor >= 0.35 && valor < 0.5) {
      return COLORES_INDICADORES[3];
    } else if (valor >= 0.5 && valor < 1.0) {
      return COLORES_INDICADORES[4];
    } else {
      return COLORES_INDICADORES[5];
    }
  }

  function noHayDatos() { return ((taponamiento == null || undefined) && (evaporacion == null || undefined) && (perdidaPorViento == null || undefined) && (calidad == null || undefined)); }
  
  if (noHayDatos()) {

    return <></>;

  } else {

    return (
      <div className="indicadores">
        <div className="indicador-item" style={{ backgroundColor: getColor(taponamiento) }}>
          Taponamiento
          <span className="indicador-porcentaje">{(taponamiento == null || undefined) ? "-" : Math.round(taponamiento * 100)} % </span>
        </div>
        <div className="indicador-item" style={{ backgroundColor: getColor(evaporacion) }}>
          Evaporación
          <span className="indicador-porcentaje">{(evaporacion == null || undefined) ? "-" : Math.round(evaporacion * 100)} % </span>
        </div>
        <div className="indicador-item" style={{ backgroundColor: getColor(perdidaPorViento) }}>
          Pérdida p. viento
          <span className="indicador-porcentaje">{(perdidaPorViento == null || undefined) ? "-" : Math.round(perdidaPorViento * 100)} % </span>
        </div>
        <div className="indicador-item" style={{ backgroundColor: getColor(calidad) }}>
          Calidad
          <span className="indicador-porcentaje">{(calidad == null || undefined) ? "-" : Math.round(100 - (calidad * 100))} % </span>
        </div>
      </div>
    );
  }
}