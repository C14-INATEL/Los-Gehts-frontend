# Los Gehts Frontend

Frontend da aplicação **Los Gehts**, um gerenciador de tarefas com autenticação, criação, edição, conclusão e exclusão de tarefas.

O projeto foi desenvolvido com **Next.js**, **React**, **TypeScript**, **Tailwind CSS** e testes unitários com **Jest** e **Testing Library**.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Jest
- Testing Library
- ESLint

## Pré-requisitos

Antes de executar o projeto, instale:

- Node.js 20 ou superior
- npm
- Backend da aplicação rodando em `http://127.0.0.1:8000`

O frontend consome os seguintes endpoints do backend:

- `POST /auth/login`
- `POST /auth/register`
- `GET /tasks/pending`
- `GET /tasks/completed`
- `POST /tasks/`
- `POST /tasks/:id/complete`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/C14-INATEL/Los-Gehts-frontend.git
cd Los-Gehts-frontend/los-gehts-frontend
npm install
```

## Execução

Para rodar em ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:3000
```

```bash
API_BASE_URL=http://127.0.0.1:8000
```

Para gerar uma build de produção:

```bash
npm run build
```

Para executar a build:

```bash
npm run start
```

## Scripts Disponíveis

```bash
npm run dev
```

Inicia o servidor de desenvolvimento.

```bash
npm run build
```

Gera a versão de produção.

```bash
npm run start
```

Executa a aplicação após o build.

```bash
npm run test
```

Executa os testes unitários.

```bash
npm run typecheck
```

## Uso

1. Inicie o backend em `http://127.0.0.1:8000`.
2. Inicie o frontend com `npm run dev`.
3. Acesse `http://localhost:3000`.
4. Use a tela principal para gerenciar tarefas.
5. Acesse `/login` para entrar com um usuário existente.
6. Acesse `/register` para criar uma nova conta.

Na tela de tarefas, é possível:

- visualizar tarefas cadastradas;
- criar uma nova tarefa;
- marcar uma tarefa como concluída;
- editar o título de uma tarefa;
- excluir uma tarefa;
- acompanhar o total de tarefas criadas;
- acompanhar o total de tarefas concluídas no formato `concluídas de total`.

## Funcionalidades

### Autenticação

- Login de usuário.
- Registro de usuário.
- Armazenamento do token no `localStorage`.
- Exibição de mensagens de erro retornadas pela API.

### Tarefas

- Listagem inicial de tarefas via API.
- Criação de tarefas.
- Conclusão de tarefas.
- Edição de tarefas.
- Exclusão de tarefas.
- Estado vazio para quando não há tarefas cadastradas.
- Estado de carregamento durante a busca inicial.
- Mensagens de erro para falhas nas operações.
- Componentização da tela em partes menores:
  - `TaskForm`
  - `TaskStats`
  - `TaskList`
  - `TaskItem`
  - `EmptyTasks`

### Testes

- Testes unitários para login.
- Testes unitários para registro.
- Testes unitários para a tela de tarefas.
- Mocks dos services para isolar comportamento dos componentes.
- Cobertura de cenários de sucesso, validação e erro.

## Estrutura do Projeto

```text
src/
  app/
    login/
    register/
    globals.css
    layout.tsx
    page.tsx
  components/
    AppHeader.tsx
    EmptyTasks.tsx
    LoginForm.tsx
    RegisterForm.tsx
    TaskForm.tsx
    TaskItem.tsx
    TaskList.tsx
    TaskStats.tsx
    TasksHome.tsx
  hooks/
  lib/
  services/
    auth.ts
    tasks.ts
  types/
```

## Testes

Para executar todos os testes:

```bash
npm run test
```

## Refactoring

O histórico de refactorings aplicados ao projeto está documentado em:

```text
docs/refactoring.md
```

Esse documento registra o que foi alterado, por que foi alterado e quais commits ou PRs servem como evidência.

## Uso de IA

Foi utilizada assistência de IA durante o desenvolvimento para apoiar em atividades .

A IA foi usada principalmente para:

- identificar o que faltava na tela de tarefas em relação ao layout esperado;
- sugerir refactorings e possíveis melhorias;
- visualizar e atualizar testes unitários;
- estruturar este README.
