import { render, screen } from '@testing-library/react'
import TasksHome from './TasksHome'

describe('TasksHome', () => {
  // Teste 1: renderização básica
  it('Deve renderizar o componente TasksHome corretamente', () => {
    render(<TasksHome />)

    expect(screen.getByPlaceholderText('Adicione uma nova tarefa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar \+/i })).toBeInTheDocument()
    expect(screen.getByText('Tarefas criadas')).toBeInTheDocument()
    expect(screen.getByText('Concluidas')).toBeInTheDocument()
    expect(screen.getByText('Voce ainda não tem tarefas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('Crie tarefas e as organize')).toBeInTheDocument()
  })

  // Teste 2: contadores iniciais
  it('Deve mostrar contadores zerados inicialmente', () => {
    render(<TasksHome />)

    const counters = screen.getAllByText('0')
    expect(counters).toHaveLength(2) // Um para criadas e outro para concluídas
  })

  // Teste 3: input de tarefa
  it('Deve ter um input para adicionar nova tarefa', () => {
    render(<TasksHome />)

    const input = screen.getByPlaceholderText('Adicione uma nova tarefa')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  // Teste 4: botão de criar tarefa
  it('Deve ter um botão para criar tarefa', () => {
    render(<TasksHome />)

    const button = screen.getByRole('button', { name: /criar \+/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  // Teste 5: seções de contadores
  it('Deve exibir seções de tarefas criadas e concluídas', () => {
    render(<TasksHome />)

    expect(screen.getByText('Tarefas criadas')).toBeInTheDocument()
    expect(screen.getByText('Concluidas')).toBeInTheDocument()
  })

  // Teste 6: mensagem de lista vazia
  it('Deve mostrar mensagem quando não há tarefas', () => {
    render(<TasksHome />)

    expect(screen.getByText('Voce ainda não tem tarefas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('Crie tarefas e as organize')).toBeInTheDocument()
  })
})