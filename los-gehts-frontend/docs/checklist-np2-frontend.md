# Checklist NP2 - Frontend

Levantamento feito a partir do PDF `Projeto_C14_NP2.pdf`, dos arquivos locais do frontend e das validacoes executadas no projeto.

## Resumo rapido

| Status | Item | Observacao |
| --- | --- | --- |
| Completo | Aplicacao frontend funcional | Next.js com telas de tarefas, login e cadastro. |
| Completo | Gerenciamento de dependencias | `package.json` e `package-lock.json` versionados. |
| Completo | Testes unitarios | Jest/Testing Library com 16 testes passando. |
| Completo | Typecheck | `npm run typecheck` passou. |
| Parcial | README | Tem instalacao, execucao, uso e funcionalidades; secao de IA ainda esta incompleta para o requisito NP2. |
| Parcial | Refactoring | `docs/refactoring.md` existe e tem evidencias, mas algumas evidencias precisam ser atualizadas para commits/PRs finais. |
| Completo | Boas praticas/lint | `npm run lint` passou apos ajustes em login, cadastro, teste de login e configuracao do Jest. |
| Parcial | CI/CD sem GitHub Actions | `Jenkinsfile` inicial criado com install e testes; Gui vai evoluir os detalhes depois. |
| Faltando | Historias de usuario | Nao ha documento com 5 historias, criterios e rastreabilidade. |
| Faltando | Metodologia de desenvolvimento | Nao ha documento com metodologia, papeis, cadencia, DoD/DoR e metricas. |
| Faltando | Dinamica de desenvolvimento | Nao ha relato consolidado sobre divisao, branches, PRs, bloqueios e licoes aprendidas. |
| Nao verificavel localmente | PRs, issues, reviews e jobs por integrante | Depende do GitHub/servico de CI, nao de arquivos locais. |

## Checklist por criterio do PDF

### 1. Aplicacao funcional

- [x] Frontend em Next.js/React/TypeScript.
- [x] Tela principal de tarefas em `src/components/TasksHome.tsx`.
- [x] Criacao de tarefas.
- [x] Listagem inicial de tarefas pendentes e concluidas.
- [x] Marcacao de tarefa como concluida.
- [x] Edicao de tarefa.
- [x] Exclusao de tarefa.
- [x] Estado vazio.
- [x] Estado de carregamento.
- [x] Mensagens de erro nas operacoes principais.
- [x] Login e cadastro em `/login` e `/register`.
- [x] Token salvo no `localStorage`.
- [x] Chamadas protegidas enviam `Authorization: Bearer <token>`.
- [x] Proxy via Next.js para evitar CORS direto contra o backend.
- [ ] Validar fluxo manual com backend rodando antes da defesa.

Evidencias locais:

- `src/components/TasksHome.tsx`
- `src/services/tasks.ts`
- `src/services/auth.ts`
- `src/services/api.ts`
- `next.config.ts`

### 2. Gerenciamento de dependencias

- [x] Projeto usa npm.
- [x] `package.json` possui scripts de dev, build, lint, typecheck e test.
- [x] `package-lock.json` esta presente.

### 3. Testes unitarios relevantes

- [x] Jest configurado.
- [x] Testing Library configurado.
- [x] Testes de login.
- [x] Testes de cadastro.
- [x] Testes da tela de tarefas.
- [x] Mocks dos services para isolar componentes.
- [x] Cenários de sucesso, erro e validacao.
- [x] Validacao executada: `npm test -- --runInBand`.
- [x] Resultado local: 3 suites passaram, 16 testes passaram.
- [ ] Gerar/armazenar relatorio de testes para CI/CD, se o pipeline exigir artefato.

Arquivos:

- `src/components/LoginForm.test.tsx`
- `src/components/RegisterForm.test.tsx`
- `src/components/TasksHome.test.tsx`
- `jest.config.mjs`
- `jest.setup.ts`

### 4. CI/CD sem GitHub Actions

- [x] Criar pipeline em ferramenta permitida pelo professor.
- [ ] Incluir build do frontend.
- [x] Incluir testes unitarios.
- [ ] Incluir typecheck.
- [ ] Incluir lint no Jenkinsfile.
- [~] Garantir pelo menos 1 job por integrante, comitado pelo proprio integrante.
- [x] Fazer o pipeline exibir relatorio de testes no console do Jenkins.
- [ ] Executar o job no Jenkins remoto e salvar evidencia da execucao.

Arquivo criado:

- `Jenkinsfile`

Observacao: o PDF proibe GitHub Actions. O projeto agora possui uma configuracao inicial de Jenkins, mas a exigencia de "pelo menos 1 job por integrante comitado pelo proprio" ainda precisa ser completada pelo grupo.

### 5. Versionamento e contribuicoes

- [x] Historico Git local existe.
- [x] Commits significativos aparecem no frontend.
- [x] Ha merges de PRs no historico local.
- [ ] Confirmar no GitHub se todos os integrantes tiveram contribuicoes significativas.
- [ ] Confirmar se ha pelo menos 4 a 6 integrantes no grupo.
- [ ] Confirmar se todos participaram de todas as entregas.
- [ ] Preparar lista de commits relevantes por integrante para a defesa.

Evidencias vistas no historico local:

- Commits de tarefas/refactor/testes por `luan.robert`, `luanrobert07` e `Luan Robert`.
- Commits de autenticacao/testes/merges por `guilhermecmr`.
- Merges de PRs #1, #3, #4, #5, #6, #8, #9, #10, #11, #12 e #13 aparecem no log local.

### 6. Revisao de codigo por PRs

- [x] Historico local mostra merges de pull requests.
- [ ] Confirmar no GitHub se os PRs tiveram revisao real, comentarios e aprovacao entre membros.
- [ ] Separar exemplos de PRs para mostrar na defesa.

### 7. README completo

- [x] Descricao do projeto.
- [x] Tecnologias.
- [x] Pre-requisitos.
- [x] Instalacao.
- [x] Execucao.
- [x] Scripts.
- [x] Uso.
- [x] Funcionalidades.
- [x] Estrutura do projeto.
- [x] Testes.
- [x] Link para refactoring.
- [~] Secao "Uso de IA" existe, mas esta incompleta.

Falta completar na secao "Uso de IA":

- [ ] Modelos utilizados.
- [ ] Pelo menos 3 prompts reais.
- [ ] Quais respostas foram aceitas.
- [ ] Quais respostas foram ajustadas.
- [ ] Quais respostas foram descartadas.
- [ ] Dinamica de uso: individual, pair programming, revisao de PR, testes, etc.
- [ ] O que nao foi feito por IA.

### 8. Historias de usuario

- [ ] Criar documento com minimo de 5 historias no formato: "Como <perfil>, eu quero <acao> para que <beneficio>".
- [ ] Cada historia precisa de criterios de aceitacao claros, preferencialmente Given/When/Then.
- [ ] Cada historia precisa de prioridade: alta, media ou baixa.
- [ ] Cada historia precisa de status final: entregue, parcial ou descartada.
- [ ] Cada historia precisa de rastreabilidade: historia -> issue/PR -> teste automatizado.

Sugestao de arquivo:

- `docs/historias-usuario.md`

Sugestoes de historias para preencher com rastreabilidade real:

- Login de usuario.
- Cadastro de usuario.
- Criacao de tarefa.
- Conclusao de tarefa.
- Edicao de tarefa.
- Exclusao de tarefa.
- Visualizacao de contadores/estado vazio.

### 9. Metodologia de desenvolvimento

- [ ] Documentar metodologia adotada: Scrum, Kanban, XP ou hibrida.
- [ ] Explicar por que a metodologia foi escolhida.
- [ ] Listar papeis do grupo: PO, facilitador, dev, QA, etc.
- [ ] Informar cadencia: sprints/ciclos, reunioes e ferramentas.
- [ ] Documentar DoD, se usado.
- [ ] Documentar DoR, se usado.
- [ ] Apresentar metricas simples: issues fechadas por sprint, lead time, burndown ou equivalente.

Sugestao de arquivo:

- `docs/metodologia.md`

### 10. Dinamica de desenvolvimento

- [ ] Documentar como o trabalho aconteceu no dia a dia.
- [ ] Explicar divisao de tarefas.
- [ ] Explicar como decisoes tecnicas foram tomadas.
- [ ] Explicar fluxo de branches.
- [ ] Explicar padrao de commits.
- [ ] Explicar processo de code review.
- [ ] Registrar conflitos ou bloqueios.
- [ ] Registrar como o grupo se reorganizou.
- [ ] Registrar licoes aprendidas.
- [ ] Registrar o que fariam diferente em um proximo projeto.

Sugestao de arquivo:

- `docs/dinamica-desenvolvimento.md`

### 11. Refactoring

- [x] Existe `docs/refactoring.md`.
- [x] Documento explica refactorings aplicados e motivos.
- [x] Ha evidencias por commits/PRs em parte dos itens.
- [ ] Atualizar linhas que ainda dizem "Alteracao atual ainda pendente de commit", pois esses commits agora aparecem no historico local.
- [ ] Conferir se todos os commits/PRs citados existem no remoto.
- [ ] Separar 2 ou 3 refactorings mais fortes para defender oralmente.

### 12. Uso transparente de IA

- [~] README tem secao "Uso de IA".
- [ ] Completar com modelos usados.
- [ ] Completar com prompts reais.
- [ ] Completar com respostas aceitas, ajustadas e descartadas.
- [ ] Completar com dinamica de uso.
- [ ] Completar com partes feitas a mao.
- [ ] Garantir que todos do grupo entendam o que foi gerado com apoio de IA.

### 13. Defesa Q&A

- [ ] Preparar todos os integrantes para responder sobre o sistema inteiro.
- [ ] Treinar abertura do repositorio.
- [ ] Treinar execucao de testes ao vivo.
- [ ] Treinar explicacao do pipeline.
- [ ] Treinar explicacao dos services e endpoints.
- [ ] Treinar explicacao de pelo menos 3 commits/PRs.
- [ ] Treinar explicacao de historias de usuario e rastreabilidade.
- [ ] Treinar explicacao do uso de IA.

Comandos uteis para demonstracao:

```bash
npm install
npm run dev
npm test -- --runInBand
npm run typecheck
npm run lint
```

### 14. Engenharia de Software geral

- [x] Separacao entre componentes de UI e services.
- [x] Services centralizam acesso HTTP.
- [x] Testes isolam componentes com mocks.
- [x] Documentacao de refactorings existe.
- [~] README documenta boa parte do projeto.
- [x] Corrigir lint.
- [ ] Completar rastreabilidade historia -> issue/PR -> teste.
- [ ] Completar metodologia e dinamica.
- [~] Completar CI/CD.

## Problemas encontrados nas validacoes

### `npm test -- --runInBand`

- [x] Passou.
- Resultado: 3 suites passaram, 16 testes passaram.

### `npm run typecheck`

- [x] Passou.

### `npm run lint`

- [x] Passou.

Ajustes feitos:

- `jest.config.js` foi substituido por `jest.config.mjs` usando import/export.
- `src/components/LoginForm.test.tsx` passou a usar `const` para `getMock`.
- `src/components/LoginForm.tsx` removeu `setState` direto do efeito inicial e tipou o `catch` como `unknown`.
- `src/components/RegisterForm.tsx` tipou o `catch` como `unknown`.

## Prioridade recomendada

1. Completar README, principalmente a secao "Uso de IA".
2. Criar `docs/historias-usuario.md` com 5 historias e rastreabilidade.
3. Criar `docs/metodologia.md`.
4. Criar `docs/dinamica-desenvolvimento.md`.
5. Executar o Jenkinsfile no Jenkins remoto e salvar evidencia.
6. Atualizar `docs/refactoring.md` com evidencias finais de commits/PRs.
7. Fazer uma rodada de defesa Q&A entre o grupo.
