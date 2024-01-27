import React, { useEffect } from 'react';
import "../stylesheets/DetallesMaquina.css"
import { useParams } from 'react-router-dom';
import { useFetch } from '../useFetch';
import Indicadores from './Indicadores';
import InformacionMaquina from './InformacionMaquina';
import TablaInfo from './TablaInfo';

const DetallesMaquina = () => {

  const { id } = useParams();
  const url = `https://wrk.acronex.com/api/challenge/machines/${id}`;
  const { data: maquinaData, loading, error } = useFetch(url);

  if (loading) {
    return <p style={{ fontSize: '1.5rem', textAlign: 'center', padding: '30px' }}>Loading...</p>;
  }
  if (error) {
    console.error("No existe maquina con ese ID", error.message);
  }
  if (!maquinaData) {
    return <p style={{ textAlign: 'center', padding: '30px' }}>No existe ese ID de maquina</p>;
  }

  function transformarObjecto(objetoPrincipal, objetoMapeado) {
    const objetoTransformado = {};
    for (const key in objetoPrincipal) {
      const valor = objetoPrincipal[key];
      const description = objetoMapeado[key];
      if (description !== undefined) {
        objetoTransformado[description] = valor;
      }
    }
    return objetoTransformado;
  }

  function mapearObjeto(objeto) {
    const objetoMapeado = {};
    for (const key in objeto) {
      if (!isNaN(Number(key))) {
        let nombre = objeto[key].n;
        objetoMapeado[key] = nombre;
      }
    }
    return objetoMapeado;
  }

  const objetoMapeado = mapearObjeto(maquinaData.data_description.headers);
  const objetoTransformado = transformarObjecto(maquinaData.last, objetoMapeado);

  return (
    <div className="contenedor-detalles-maquina">

      <div className="bloque-superior">
        <h1> {maquinaData.description} </h1>
        <p> {maquinaData.id} </p>
      </div>

      <div className="bloque-izq">
        <Indicadores
          taponamiento={maquinaData.last.it}
          evaporacion={maquinaData.last.ie}
          perdidaPorViento={maquinaData.last.id}
          calidad={maquinaData.last.ig}
        />

        <InformacionMaquina
          empresa={maquinaData.company}
          clase={maquinaData.class}
          estado={maquinaData.working}
          ultActu={maquinaData.last_update}
        />
      </div>

      <div className="bloque-der">
        <TablaInfo
          nombre={"General"}
          fila1={"Cosechando"} valorFila1={maquinaData.working ? "si" : "no"}
          fila2={"Batería interna"} valorFila2={`${objetoTransformado['Batería Interna']} V`}
          fila3={"Batería vehículo"} valorFila3={`${objetoTransformado['Batería Vehiculo']} V`}
          fila4={"Uso Combustible"} valorFila4={`${objetoTransformado['Producto / min']} litros/min`}
        />
        <TablaInfo
          nombre={"Clima"}
          fila1={"Temperatura"} valorFila1={`${objetoTransformado['Temperatura']} °C`}
          fila2={"Humedad"} valorFila2={`${objetoTransformado['Humedad']} %`}
          fila3={"Dirección del viento"} valorFila3={`${objetoTransformado['Direccion Viento']} °`}
          fila4={"Velocidad del viento"} valorFila4={`${objetoTransformado['Velocidad Viento']} km/h`}
        />
        <TablaInfo
          nombre={"Operación"}
          fila1={"Velocidad"} valorFila1={`${objetoTransformado['Velocidad']} Km/h`}
          fila2={"Presión"} valorFila2={`${objetoTransformado['Presión']} bar`}
          fila3={"Producto / hectárea"} valorFila3={`${objetoTransformado['Producto / hectarea']} litros/Ha`}
          fila4={"Ancho"} valorFila4={`${objetoTransformado['Ancho']} m`}
        />
      </div>
    </div>
  );
};

export default DetallesMaquina;
