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

Veja a seção [Integração com Backend](#integração-com-backend) para detalhes sobre o contrato de API.

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

## Refactorings e Organização

### Estrutura do Projeto

O projeto foi reorganizado para melhor separação de responsabilidades:

- **`src/app/`** — Páginas e layouts do Next.js, incluindo `TasksHome.tsx` como componente-container de rota
- **`src/components/`** — Componentes de UI reutilizáveis (forms, listas, cards, headers)
- **`src/services/`** — Lógica de integração com API (auth, tasks, client HTTP)
- **`src/__tests__/`** — Testes unitários centralizados

### Estrutura de Diretórios

```text
src/
  __tests__/
    LoginForm.test.tsx
    RegisterForm.test.tsx
    TasksHome.test.tsx
  app/
    login/
      layout.tsx
      page.tsx
    register/
      layout.tsx
      page.tsx
    TasksHome.tsx
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
  services/
    api.ts
    auth.ts
    tasks.ts
```

### Refactorings Principais

| Mudança | Motivo | Benefício |
| --- | --- | --- |
| Separação de serviços em `src/services/` | Isolar chamadas HTTP da lógica de componentes | Facilita testes com mocks e manutenção da integração com API |
| Testes com mocks de services | Evitar dependência de backend nos testes | Suite determinística e mais rápida |
| Quebra de `TasksHome` em componentes menores | Componente muito grande e difícil de manter | Melhor legibilidade, testabilidade e reutilização |
| Proxy de API via `next.config.ts` | Evitar CORS direto do navegador com backend | Requisições mais confiáveis em desenvolvimento |
| Centralização de `fetchApi` em `api.ts` | Reduzir duplicação entre services | Padrão único para autenticação (Bearer Token) e tratamento de erro |
| Proteção de rota em `TasksHome` | Redirecionar usuários não autenticados | Acesso apenas com token válido no `localStorage` |
| Organização de testes em `__tests__/` | Centralizar e segregar arquivos de teste | Estrutura mais clara e padrão de mercado |

### Integração com Backend

O frontend é consumidor de uma API REST que deve estar rodando em `http://127.0.0.1:8000` (configurável via `.env.local`).

**Contrato de Autenticação:**
- `POST /auth/login` — Login com `username` e `password`, retorna `JWT`
- `POST /auth/register` — Registro com `username` e `password`, retorna `JWT`

**Contrato de Tarefas (requer Bearer Token):**
- `GET /tasks/pending` — Lista tarefas não concluídas
- `GET /tasks/completed` — Lista tarefas concluídas
- `POST /tasks/` — Cria nova tarefa com `title`
- `POST /tasks/{id}/complete` — Marca tarefa como concluída
- `PUT /tasks/{id}` — Edita título da tarefa
- `DELETE /tasks/{id}` — Exclui tarefa

**Fluxo de Autenticação:**
1. Usuário faz login ou registro
2. Backend retorna JWT em `data.JWT`
3. Frontend salva token em `localStorage.token`
4. Requests subsequentes incluem `Authorization: Bearer <token>` automaticamente via `fetchApi`

### Pontos de Atenção

- **Arquivo `.env.local`** não é versionado; use `.env.example` como referência e configure `API_BASE_URL` com a URL real do backend
- **Após alterar `.env.local` ou `next.config.ts`**, reinicie `npm run dev` — hot reload não é confiável para essas configurações
- **Se receber `401 Unauthorized`**, verifique se o token está válido no backend e se `localStorage.token` existe
- **Se receber `OPTIONS /tasks/ 405`**, o backend pode não ter CORS configurado; use o proxy do Next.js chamando `/api/...` em vez de chamar direto
- **Se receber `POST /tasks 307`**, confira se a criação está usando `/tasks/` (com barra final)
- **Em produção**, defina `NEXT_PUBLIC_API_BASE_URL` ou implemente CORS no backend para requisições cross-origin

## Desenvolvimento e Contribuição

### Verificações antes de fazer commit

```bash
# Rodar testes
npm run test

# Verificar tipos
npm run typecheck

# Verificar lint
npm run lint

# Ou tudo junto
npm run test && npm run typecheck && npm run lint
```

### Scripts de desenvolvimento

```bash
npm run dev          # Inicia servidor com hot reload
npm run build        # Build de produção
npm run start        # Executa build de produção localmente
npm run lint         # Verifica código com ESLint
npm run typecheck    # Valida tipos TypeScript sem emitir código
npm run test         # Executa testes unitários
```

### Fluxo de trabalho

1. Crie uma branch a partir de `main`
2. Faça suas alterações
3. Execute as verificações (`npm run test`, `npm run typecheck`, `npm run lint`)
4. Abra um Pull Request
5. Após aprovação, faça merge para `main`

## Uso de IA

Foi utilizada assistência de IA durante o desenvolvimento para apoiar em atividades de estruturação e refactoring.

A IA foi usada principalmente para:

- Identificar o que faltava na tela de tarefas em relação ao layout esperado
- Sugerir refactorings e reorganização do projeto para melhor separação de responsabilidades
- Atualizar e expandir testes unitários
- Estruturar a organização de diretórios e componentes
- Documentar o README com explicações claras sobre fluxos e pontos de atenção
