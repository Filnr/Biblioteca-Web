import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../services/api';

function LivroList() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState('');

  const carregar = () => {
    livroService.listar()
      .then((res) => setLivros(res.data))
      .catch(() => setErro('Não foi possível carregar os livros. O backend está rodando?'));
  };

  useEffect(carregar, []);

  const excluir = (livro) => {
    if (!window.confirm(`Excluir o livro "${livro.titulo}"?`)) return;
    livroService.deletar(livro.id)
      .then(() => { setErro(''); carregar(); })
      .catch(() => setErro('Erro ao excluir o livro.'));
  };

  return (
    <section>
      <div className="barra">
        <h2>Livros</h2>
        <Link className="btn" to="/livros/novo">Novo livro</Link>
      </div>
      {erro && <p className="erro">{erro}</p>}
      {livros.length === 0 ? (
        <p className="vazio">Nenhum livro cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Título</th><th>Autor</th><th>Ano</th><th>Gênero</th><th>ISBN</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {livros.map((l) => (
              <tr key={l.id}>
                <td>{l.titulo}</td>
                <td>{l.autor ? l.autor.nome : '-'}</td>
                <td>{l.anoPublicacao}</td>
                <td>{l.genero}</td>
                <td>{l.isbn}</td>
                <td className="acoes">
                  <Link className="btn sec" to={`/livros/editar/${l.id}`}>Editar</Link>
                  <button className="btn perigo" onClick={() => excluir(l)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default LivroList;
