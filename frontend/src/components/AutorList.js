import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { autorService } from '../services/api';

function AutorList() {
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () => {
    autorService.listar()
      .then((res) => setAutores(res.data))
      .catch(() => setErro('Não foi possível carregar os autores. O backend está rodando?'));
  };

  useEffect(carregar, []);

  const excluir = (autor) => {
    if (!window.confirm(`Excluir o autor "${autor.nome}"?`)) return;
    autorService.deletar(autor.id)
      .then(() => { setErro(''); carregar(); })
      .catch((e) => {
        if (e.response && e.response.status === 409) {
          setErro('Este autor possui livros. Exclua os livros antes de excluir o autor.');
        } else {
          setErro('Erro ao excluir o autor.');
        }
      });
  };

  return (
    <section>
      <div className="barra">
        <h2>Autores</h2>
        <Link className="btn" to="/autores/novo">Novo autor</Link>
      </div>
      {erro && <p className="erro">{erro}</p>}
      {autores.length === 0 ? (
        <p className="vazio">Nenhum autor cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Nome</th><th>Nacionalidade</th><th>Nascimento</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {autores.map((a) => (
              <tr key={a.id}>
                <td>{a.nome}</td>
                <td>{a.nacionalidade}</td>
                <td>{a.dataNascimento}</td>
                <td className="acoes">
                  <Link className="btn sec" to={`/autores/editar/${a.id}`}>Editar</Link>
                  <button className="btn perigo" onClick={() => excluir(a)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default AutorList;
