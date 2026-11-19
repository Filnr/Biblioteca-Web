import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { autorService, livroService } from '../services/api';

function LivroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autores, setAutores] = useState([]);
  const [erro, setErro] = useState('');
  const [livro, setLivro] = useState({
    titulo: '', isbn: '', anoPublicacao: '', genero: '', autorId: '',
  });

  // carrega os autores para o <select>
  useEffect(() => {
    autorService.listar()
      .then((res) => setAutores(res.data))
      .catch(() => setErro('Não foi possível carregar os autores.'));
  }, []);

  // modo edição: carrega o livro
  useEffect(() => {
    if (id) {
      livroService.buscar(id)
        .then((res) => setLivro({
          titulo: res.data.titulo || '',
          isbn: res.data.isbn || '',
          anoPublicacao: res.data.anoPublicacao ?? '',
          genero: res.data.genero || '',
          autorId: res.data.autor ? String(res.data.autor.id) : '',
        }))
        .catch(() => setErro('Livro não encontrado.'));
    }
  }, [id]);

  const alterar = (e) => setLivro({ ...livro, [e.target.name]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    const dados = {
      titulo: livro.titulo,
      isbn: livro.isbn || null,
      anoPublicacao: livro.anoPublicacao === '' ? null : Number(livro.anoPublicacao),
      genero: livro.genero || null,
      autor: { id: Number(livro.autorId) }, // o autor vai só com o id
    };
    const requisicao = id ? livroService.atualizar(id, dados) : livroService.criar(dados);
    requisicao
      .then(() => navigate('/livros'))
      .catch(() => setErro('Não foi possível salvar. Confira os campos (título e autor são obrigatórios).'));
  };

  return (
    <section>
      <h2>{id ? 'Editar livro' : 'Novo livro'}</h2>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={salvar}>
        <label>Título
          <input name="titulo" value={livro.titulo} onChange={alterar} maxLength={200} required />
        </label>
        <label>Autor
          <select name="autorId" value={livro.autorId} onChange={alterar} required>
            <option value="">Selecione um autor</option>
            {autores.map((a) => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
        </label>
        <label>ISBN
          <input name="isbn" value={livro.isbn} onChange={alterar} maxLength={20} />
        </label>
        <label>Ano de publicação
          <input type="number" name="anoPublicacao" value={livro.anoPublicacao} onChange={alterar} />
        </label>
        <label>Gênero
          <input name="genero" value={livro.genero} onChange={alterar} maxLength={50} />
        </label>
        <div className="acoes">
          <button className="btn" type="submit">Salvar</button>
          <Link className="btn sec" to="/livros">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}

export default LivroForm;
