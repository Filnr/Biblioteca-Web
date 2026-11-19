import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="topo">
        <h1>Biblioteca Web</h1>
      </header>

      <main className="conteudo">
        <Routes>
          <Route path="/" element={<p>Bem-vindo à Biblioteca Web.</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
