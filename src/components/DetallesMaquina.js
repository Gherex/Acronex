import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../useFetch';

const DetallesMaquina = () => {
  const { id } = useParams();
  const url = `https://wrk.acronex.com/api/challenge/machines/${id}`;
  const { maquinaData, loading, error } = useFetch(url);

  console.log("MaquinaData:", maquinaData);
  console.log("Renderizando DetallesMaquina, MaquinaData:", maquinaData);
  
  if (loading) {
    return <p style={{ fontSize: '1.5rem' }}>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!maquinaData) {
    return <p>No data available</p>;
  }

  const getColorForIndicador = (value) => {
    const COLORES_INDICADORES = ['#008000', '#FFFF00', '#FFA500', '#FF0000', '#8B0000', '#8B0000'];
    const PUNTOS_QUIEBRE_COLORES_INDICADORES = [0.0, 0.1, 0.2, 0.35, 0.5, 1.0];

    const colorIndex = PUNTOS_QUIEBRE_COLORES_INDICADORES.findIndex((point) => value <= point);
    return COLORES_INDICADORES[colorIndex];
  };

  const getNombreIndicador = (id) => {
    return 'Nombre del Indicador';
  };

  const getValorIndicador = (value) => {
    return value >= 0 ? `${(value * 100).toFixed(0)}%` : '-';
  };

  const renderGrupo = (grupoData) => {
    if (!grupoData || grupoData.length === 0) {
      return null;
    }

    console.log("GrupoData:", grupoData);

    return (
      <div key={grupoData[0]?.g}>
        <h2>{grupoData[0]?.g}</h2>
        <ul>
          {grupoData
            .filter((variable) => !variable?.h)
            .map((variable) => (
              <li key={variable?.n}>
                <strong>{variable?.n}:</strong> {variable?.value != null ? variable?.value : '-'} {variable?.u}
              </li>
            ))}
        </ul>
      </div>
    );
  };

  const renderIndicadores = () => {
    if (!maquinaData?.last || !maquinaData.last[3]) {
      return null;
    }

    console.log("Indicadores:", maquinaData.last[3]);

    const indicadores = maquinaData.last[3];

    return (
      <div key="indicadores">
        <h2>Indicadores</h2>
        <ul>
          {Object.entries(indicadores).map(([id, value]) => (
            <li key={id} style={{ color: getColorForIndicador(value) }}>
              <strong>{getNombreIndicador(id)}:</strong> {getValorIndicador(value)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {loading && <p style={{ fontSize: '1.5rem' }}>Loading...</p>}
      <h1>Detalles de la Máquina {id}</h1>
      {Object.values(maquinaData?.data_description?.groups || {}).map((grupo) =>
        renderGrupo(maquinaData?.last?.[grupo])
      )}
      {renderIndicadores()}
    </div>
  );
};


export default DetallesMaquina;
