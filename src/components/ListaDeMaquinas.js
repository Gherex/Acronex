import { useFetch } from "../useFetch";
import '../stylesheets/ListaDeMaquinas.css';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ListaDeMaquinas = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('search');

  const { data, loading, error } = useFetch("https://wrk.acronex.com/api/challenge/machines");

  // Filtra las máquinas si hay un query de búsqueda
  const maquinasFiltradas = query
    ? data?.filter((maquina) =>
        maquina.description.toLowerCase().includes(query.toLowerCase())
      )
    : data;

  return (
    <div className="contenedor-lista-de-maquinas">
      <ul>
        {error && <li>Error: {error}</li>}
        {loading && <li style={{ listStyle: 'none', fontSize: '1.5rem' }}>Loading...</li>}
        {maquinasFiltradas?.map((maquina) => (
          <li className="item-maquina" key={maquina.id}>
            <Link to={`/machines/${maquina.id}`} className="link-sin-estilos">
              <div className={`circulo ${maquina.working ? 'verde' : 'rojo'}`}></div>
              <span className="id-maquina">({maquina.id})</span>
              <span className="descrip-maquina">{maquina.description} {maquina.company}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeMaquinas;

