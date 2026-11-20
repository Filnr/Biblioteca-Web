import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { autorService } from '../services/api';

function AutorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [autor, setAutor] = useState({ nome: '', nacionalidade: '', dataNascimento: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (id) {
      autorService.buscar(id)
        .then((res) => setAutor({
          nome: res.data.nome || '',
          nacionalidade: res.data.nacionalidade || '',
          dataNascimento: res.data.dataNascimento || '',
        }))
        .catch(() => setErro('Autor não encontrado.'));
    }
  }, [id]);

  const alterar = (e) => setAutor({ ...autor, [e.target.name]: e.target.value });

  const salvar = (e) => {
    e.preventDefault();
    const dados = {
      nome: autor.nome,
      nacionalidade: autor.nacionalidade || null,
      dataNascimento: autor.dataNascimento || null, // formato AAAA-MM-DD
    };
    const requisicao = id ? autorService.atualizar(id, dados) : autorService.criar(dados);
    requisicao
      .then(() => navigate('/autores'))
      .catch(() => setErro('Não foi possível salvar. Confira os campos (o nome é obrigatório).'));
  };

  return (
    <section>
      <h2>{id ? 'Editar autor' : 'Novo autor'}</h2>
      {erro && <p className="erro">{erro}</p>}
      <form onSubmit={salvar}>
        <label>Nome
          <input name="nome" value={autor.nome} onChange={alterar} maxLength={100} required />
        </label>
        <label>Nacionalidade
          <input name="nacionalidade" value={autor.nacionalidade} onChange={alterar} maxLength={50} />
        </label>
        <label>Data de nascimento
          <input type="date" name="dataNascimento" value={autor.dataNascimento} onChange={alterar} />
        </label>
        <div className="acoes">
          <button className="btn" type="submit">Salvar</button>
          <Link className="btn sec" to="/autores">Cancelar</Link>
        </div>
      </form>
    </section>
  );
}

export default AutorForm;
