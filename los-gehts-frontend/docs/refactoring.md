# Refactoring

Este documento registra os refactorings aplicados ao longo do projeto, o motivo de cada um e a evidencia usada para rastrear a mudanca em commits ou PRs.

## Historico

| Refactoring | O que mudou | Por que foi feito | Evidencia |
| --- | --- | --- | --- |
| Reuso do cabecalho da aplicacao | A tela inicial passou a usar `AppHeader` em vez de manter o titulo diretamente na pagina. | Reduzir duplicacao visual e centralizar a identidade do cabecalho em um componente reutilizavel. | Commit `cde065a` (`feat(home): implement ui main page and reuse AppHeader`). |
| Separacao da integracao de tarefas em service | Chamadas HTTP de tarefas foram concentradas em `src/services/tasks.ts`, deixando `TasksHome` focada em estado e interacao de UI. | Separar responsabilidade de API da responsabilidade de tela, facilitando testes com mocks e futuras alteracoes de endpoint. | Commit `b9472bc` (`feat(tasks): integrar TasksHome com service`) e PR #11 (`feat/luan`). |
| Testes com mocks de service | Os testes de `TasksHome` passaram a mockar `createTask` e `completeTask` em vez de depender de chamadas reais. | Isolar comportamento do componente, tornar a suite deterministica e evitar dependencia de backend nos testes unitarios. | Commit `50c3950` (`test(tasks): adicionar mocks de service nos testes da TasksHome`). |
| Cobertura de validacao e erro | Foram adicionados cenarios para input vazio e falhas retornadas pelos services. | Garantir que estados de erro nao quebrem a tela nem alterem contadores indevidamente. | Commit `0824347` (`test(tasks): adicionar cenarios de erro e validacao na TasksHome`). |
| Quebra de `TasksHome` em componentes menores | `TasksHome` foi reorganizada para orquestrar estado, enquanto `TaskForm`, `TaskStats`, `TaskList`, `TaskItem` e `EmptyTasks` cuidam de partes especificas da interface. | Reduzir o tamanho do componente principal, melhorar legibilidade, facilitar manutencao e permitir testes mais claros conforme a tela ganha editar, excluir, loading e erro. | Alteracao atual ainda pendente de commit. Sugestao: `refactor(tasks): split task screen into focused components`. |
| Evolucao do service de tarefas para CRUD | `src/services/tasks.ts` passou a expor `getTasks`, `updateTask` e `deleteTask`, alem de reaproveitar a constante `TASKS_URL`. | Evitar URLs duplicadas, completar o contrato da tela com a API e manter a comunicacao HTTP em uma camada unica. | Alteracao atual ainda pendente de commit. Sugestao: `feat(tasks): complete task CRUD service`. |
| Ajuste dos testes para fluxo completo da tela | `TasksHome.test.tsx` foi atualizado para cobrir listagem inicial, criacao, conclusao, edicao, exclusao, loading e erros. | Acompanhar o refactor sem perder cobertura, documentando o comportamento esperado da tela apos a reorganizacao. | Alteracao atual ainda pendente de commit. Sugestao: `test(tasks): cover full task management flow`. |
| Alinhamento do frontend ao contrato real da API | `src/services/tasks.ts` foi ajustado para usar `GET /tasks/pending`, `GET /tasks/completed`, `POST /tasks/`, `POST /tasks/{task_id}/complete`, `PUT /tasks/{task_id}` e `DELETE /tasks/{task_id}`. | O Swagger do backend nao expunha `GET /tasks`, `PATCH /tasks/{id}` nem `PATCH /tasks/{id}/complete`; manter esses endpoints causava falhas de integracao. | Alteracao atual ainda pendente de commit. Sugestao: `fix(tasks): align service with backend api contract`. |
| Centralizacao das chamadas HTTP em `fetchApi` | Foi criado `src/services/api.ts` para montar URLs internas `/api/...`, anexar `Authorization: Bearer <token>` quando necessario e padronizar erro de conexao. | Reduzir duplicacao entre services, garantir envio de JWT nas rotas protegidas e preparar a aplicacao para evitar problemas de CORS no navegador. | Alteracao atual ainda pendente de commit. Sugestao: `refactor(api): centralize frontend api client`. |
| Proxy de API pelo Next.js | `next.config.ts` passou a redirecionar `/api/:path*` para o backend definido em `API_BASE_URL`, com regras especificas para `/api/tasks` e `/api/tasks/`. | O backend nao responde corretamente ao preflight `OPTIONS` de CORS; ao chamar `/api` no mesmo dominio do frontend, o navegador nao faz CORS direto contra o FastAPI. As regras especificas evitam o `307 Temporary Redirect` causado pela barra final de `POST /tasks/`. | Alteracao atual ainda pendente de commit. Sugestao: `fix(api): proxy backend requests through next rewrites`. |
| Configuracao de ambiente documentada | Foi adicionado `.env.example` com `API_BASE_URL=http://127.0.0.1:8000` e `.gitignore` passou a permitir versionar esse exemplo. | `.env.example` serve como modelo; o Next le `.env.local`/`.env`, nao `.env.example`. A URL real do backend deve ficar em `.env.local` sem expor configuracoes locais no repositorio. | Alteracao atual ainda pendente de commit. Sugestao: `docs(env): document backend api base url`. |
| Ajuste do service de autenticacao para o cliente comum | `src/services/auth.ts` passou a usar `fetchApi` e teve a normalizacao de erros tipada sem `any`. | Manter login e registro no mesmo caminho de rede usado pelo restante da aplicacao e remover erro de lint por `no-explicit-any`. | Alteracao atual ainda pendente de commit. Sugestao: `refactor(auth): reuse api client`. |

## Ajustes recentes de integracao com o backend

Esta rodada foi motivada por erros reais observados no navegador e nos logs do Uvicorn:

- `401 Unauthorized` em `GET /tasks/pending` e `GET /tasks/completed`.
- `307 Temporary Redirect` em `POST /tasks`.
- `405 Method Not Allowed` em `OPTIONS /tasks/`.
- `TypeError: Failed to fetch` no frontend.

O diagnostico foi:

- As rotas de tarefas no backend exigem Bearer Token. Por isso, as chamadas de tarefas precisam enviar `Authorization: Bearer <token>` usando o token salvo no `localStorage` apos login ou registro.
- O backend FastAPI esta registrando `POST /tasks/`, com barra final. Quando o frontend ou o proxy chega em `/tasks`, o FastAPI responde `307` para `/tasks/`.
- Como a chamada direta do browser para `http://127.0.0.1:8000` cruza origem, requests com `Content-Type: application/json` e `Authorization` disparam preflight `OPTIONS`. O backend nao tem `CORSMiddleware` configurado, entao responde `405` no preflight.
- Para evitar depender de CORS no backend durante o desenvolvimento, o frontend chama `/api/...`; o Next.js faz o rewrite server-side para `API_BASE_URL`.

### Estado atual esperado

O fluxo esperado em desenvolvimento e:

1. Backend rodando em `http://127.0.0.1:8000`.
2. Frontend rodando em `http://localhost:3000`.
3. Arquivo `.env.local` na raiz do frontend com:

```bash
API_BASE_URL=http://127.0.0.1:8000
```

4. Usuario faz login ou registro.
5. O token retornado em `JWT` e salvo como `localStorage.token`.
6. As telas chamam `/api/tasks/...`.
7. O Next redireciona internamente para o backend.
8. O backend recebe as rotas finais sem CORS direto do navegador.

Depois de alterar `.env.local` ou `next.config.ts`, e necessario reiniciar `npm run dev`. Hot reload nao e confiavel para essas configuracoes.

### Contrato de tarefas usado pelo frontend

| Acao | Endpoint usado | Observacao |
| --- | --- | --- |
| Listar pendentes | `GET /tasks/pending` | Requer Bearer Token. |
| Listar concluidas | `GET /tasks/completed` | Requer Bearer Token. |
| Criar tarefa | `POST /tasks/` | A barra final e importante para evitar `307`. |
| Concluir tarefa | `POST /tasks/{task_id}/complete` | Requer Bearer Token. |
| Editar tarefa | `PUT /tasks/{task_id}` | Substitui o `PATCH` usado anteriormente. |
| Excluir tarefa | `DELETE /tasks/{task_id}` | Retorna `204` quando sucesso. |

### Pontos de atencao

- Se voltar a aparecer `401 Unauthorized`, verificar se o usuario esta logado, se `localStorage.token` existe e se o backend aceita o JWT gerado.
- Se aparecer `OPTIONS /tasks/ 405`, alguma chamada voltou a bater direto no backend em vez de passar por `/api`, ou o servidor Next precisa ser reiniciado.
- Se aparecer `POST /tasks 307`, conferir as regras especificas em `next.config.ts` e se a criacao esta usando `/tasks/`.
- Se `API_BASE_URL` mudar, atualizar `.env.local` e reiniciar o frontend.
- `.env.example` e apenas modelo; ele nao substitui `.env.local`.
- A solucao de proxy resolve o ambiente atual, mas em producao e preciso decidir se o frontend continuara usando rewrites do Next, se havera gateway/API route, ou se o backend tera CORS configurado corretamente.
- As alteracoes de `auth.ts`, `api.ts` e `next.config.ts` devem ser revisadas em PR porque mudam a forma de comunicacao HTTP do projeto, mesmo quando a tela afetada diretamente e a de tarefas.

## Evidencias de qualidade

Validacoes executadas apos o refactor atual:

```bash
npm test -- --runInBand
npm run typecheck
npx eslint src/components/TasksHome.tsx src/components/TaskForm.tsx src/components/TaskStats.tsx src/components/EmptyTasks.tsx src/components/TaskItem.tsx src/components/TaskList.tsx src/components/TasksHome.test.tsx src/services/tasks.ts
npx eslint next.config.ts src/services/api.ts src/services/tasks.ts
```

Resultado:

- Testes: 16 passaram.
- Typecheck: passou.
- Lint dos arquivos alterados: passou.

Observacao: `npm run lint` no projeto inteiro ainda acusa problemas preexistentes em `jest.config.js`, `LoginForm.test.tsx`, `LoginForm.tsx` e `RegisterForm.tsx`. Esses pontos nao fazem parte do refactor da tela de tarefas.
