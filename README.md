# Biblioteca Web

Sistema web para cadastrar **Autores** e **Livros** (CRUD completo dos dois).
Relacionamento **1 : N** – um autor tem vários livros; cada livro pertence a um autor.

Projeto da disciplina de Engenharia de Software (Prof. Sandro Laudares) – Exercício em dupla, Parte 2.

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Java 17 + Spring Boot 3.2 (Web, Data JPA, Validation) + Lombok + Maven |
| Frontend | React 18 + React Router 6 + Axios • Node.js 20 + npm |
| Banco de dados | PostgreSQL 15 (testes: H2 em memória) |
| Testes | JUnit 5 + Mockito (`@WebMvcTest`, `@MockBean`) + `@SpringBootTest` • Jest |
| Versão e CI | Git + GitHub • GitHub Actions |
| Containers | Docker + Docker Compose |

## Modelo de dados

```
AUTORES (id, nome, nacionalidade, data_nascimento, criado_em)
   1 ──< escreve >── N
LIVROS  (id, titulo, isbn, ano_publicacao, genero, autor_id FK, criado_em)
```

## Estrutura

```
biblioteca-web/
├── backend/            # API REST (Spring Boot)
│   └── src/main/java/com/biblioteca/{model, repository, controller}
├── frontend/           # React
│   └── src/{components, services}
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
└── README.md
```

## Endpoints

| Verbo | URL | Ação | Status |
|---|---|---|---|
| POST | `/api/autores` | Criar autor | 201 |
| GET | `/api/autores` | Listar (ordem: nome) | 200 |
| GET | `/api/autores/{id}` | Buscar | 200 / 404 |
| PUT | `/api/autores/{id}` | Atualizar | 200 / 404 |
| DELETE | `/api/autores/{id}` | Remover | 200 / 404 / 409 (tem livros) |
| POST | `/api/livros` | Criar livro (`"autor": {"id": 1}`) | 201 |
| GET | `/api/livros` | Listar (ordem: título) | 200 |
| GET | `/api/livros/{id}` | Buscar | 200 / 404 |
| PUT | `/api/livros/{id}` | Atualizar (inclusive o autor) | 200 / 404 |
| DELETE | `/api/livros/{id}` | Remover | 200 / 404 |
| GET | `/api/livros/autor/{autorId}` | (extra) Livros de um autor | 200 |

Swagger: http://localhost:8080/swagger-ui.html

## Como executar

Tudo com Docker:

```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- API: http://localhost:8080/api/autores

Em desenvolvimento (sem Docker para o app):

```bash
docker-compose up -d postgres          # só o banco
cd backend && mvn spring-boot:run      # API em :8080
cd frontend && npm install && npm start  # React em :3000
```

## Como rodar os testes

```bash
cd backend
mvn test                            # todos
mvn test -Dtest="*ControllerTest"   # unitários
mvn test -Dtest="IntegracaoTest"    # integração (H2)

cd ../frontend
npm test -- --watchAll=false --passWithNoTests
```

## Divisão do trabalho

| Integrante | Responsabilidade | Branch |
|---|---|---|
| Aluno(a) 1 – NOME | Autores (Autor, AutorRepository, AutorController, AutorControllerTest, AutorList, AutorForm) | `feature/autores` |
| Aluno(a) 2 – NOME | Livros (Livro, LivroRepository, LivroController, LivroControllerTest, LivroList, LivroForm) | `feature/livros` |

Arquivos comuns (`api.js`, `App.js`, `docker-compose.yml`, CI, README) foram divididos entre os dois.
