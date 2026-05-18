import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import TasksHome from './TasksHome'
import {
  completeTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '@/services/tasks'

jest.mock('@/components/AppHeader', () => {
  function MockAppHeader() {
    return <div data-testid="app-header" />
  }

  MockAppHeader.displayName = 'MockAppHeader'

  return MockAppHeader
})

jest.mock('@/services/tasks', () => ({
  completeTask: jest.fn(),
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  getTasks: jest.fn(),
  updateTask: jest.fn(),
}))

describe('TasksHome', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(getTasks as jest.Mock).mockResolvedValue([])
  })

  it('Deve renderizar o componente TasksHome corretamente', async () => {
    render(<TasksHome />)

    expect(screen.getByPlaceholderText('Adicione uma nova tarefa')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /criar/i })).toBeInTheDocument()
    expect(screen.getByText('Tarefas criadas')).toBeInTheDocument()
    expect(screen.getByText('Concluídas')).toBeInTheDocument()
    expect(await screen.findByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('Crie tarefas e as organize')).toBeInTheDocument()
  })

  it('Deve buscar tarefas ao abrir a tela', async () => {
    ;(getTasks as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Validar API', completed: false },
      { id: 2, title: 'Finalizar layout', completed: true },
    ])

    render(<TasksHome />)

    expect(screen.getByText('Carregando tarefas...')).toBeInTheDocument()

    expect(await screen.findByText('Validar API')).toBeInTheDocument()
    expect(screen.getByText('Finalizar layout')).toBeInTheDocument()
    expect(getTasks).toHaveBeenCalledTimes(1)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1 de 2')).toBeInTheDocument()
  })

  it('Deve mostrar contadores zerados inicialmente', async () => {
    render(<TasksHome />)

    await screen.findByText('Você ainda não tem tarefas cadastradas')

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('0 de 0')).toBeInTheDocument()
  })

  it('Deve adicionar uma nova tarefa', async () => {
    ;(createTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Estudar React',
      completed: false,
    })

    render(<TasksHome />)

    await screen.findByText('Você ainda não tem tarefas cadastradas')

    fireEvent.change(screen.getByPlaceholderText('Adicione uma nova tarefa'), {
      target: { value: 'Estudar React' },
    })
    fireEvent.click(screen.getByRole('button', { name: /criar/i }))

    await waitFor(() => {
      expect(createTask).toHaveBeenCalledWith('Estudar React')
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
    })

    expect(screen.queryByText('Você ainda não tem tarefas cadastradas')).not.toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('0 de 1')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Adicione uma nova tarefa')).toHaveValue('')
  })

  it('Deve concluir uma tarefa adicionada', async () => {
    ;(createTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Finalizar testes',
      completed: false,
    })
    ;(completeTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Finalizar testes',
      completed: true,
    })

    render(<TasksHome />)

    await screen.findByText('Você ainda não tem tarefas cadastradas')

    fireEvent.change(screen.getByPlaceholderText('Adicione uma nova tarefa'), {
      target: { value: 'Finalizar testes' },
    })
    fireEvent.click(screen.getByRole('button', { name: /criar/i }))

    const toggleButton = await screen.findByRole('button', {
      name: /concluir tarefa finalizar testes/i,
    })
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(completeTask).toHaveBeenCalledWith(1)
      expect(screen.getByText('1 de 1')).toBeInTheDocument()
    })

    expect(screen.getByText('Finalizar testes')).toHaveClass('line-through')
  })

  it('Deve editar uma tarefa', async () => {
    ;(getTasks as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Nome antigo', completed: false },
    ])
    ;(updateTask as jest.Mock).mockResolvedValue({
      id: 1,
      title: 'Nome novo',
      completed: false,
    })

    render(<TasksHome />)

    await screen.findByText('Nome antigo')

    fireEvent.click(screen.getByRole('button', { name: /editar tarefa nome antigo/i }))
    fireEvent.change(screen.getByLabelText(/editar título da tarefa nome antigo/i), {
      target: { value: 'Nome novo' },
    })
    fireEvent.click(screen.getByRole('button', { name: /salvar tarefa nome antigo/i }))

    await waitFor(() => {
      expect(updateTask).toHaveBeenCalledWith(1, 'Nome novo')
      expect(screen.getByText('Nome novo')).toBeInTheDocument()
    })

    expect(screen.queryByText('Nome antigo')).not.toBeInTheDocument()
  })

  it('Deve excluir uma tarefa', async () => {
    ;(getTasks as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Remover tarefa', completed: false },
    ])
    ;(deleteTask as jest.Mock).mockResolvedValue(undefined)

    render(<TasksHome />)

    await screen.findByText('Remover tarefa')

    fireEvent.click(screen.getByRole('button', { name: /excluir tarefa remover tarefa/i }))

    await waitFor(() => {
      expect(deleteTask).toHaveBeenCalledWith(1)
      expect(screen.queryByText('Remover tarefa')).not.toBeInTheDocument()
    })

    expect(screen.getByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument()
  })

  it('Não deve criar tarefa quando o input estiver vazio', async () => {
    render(<TasksHome />)

    await screen.findByText('Você ainda não tem tarefas cadastradas')

    fireEvent.change(screen.getByPlaceholderText('Adicione uma nova tarefa'), {
      target: { value: '   ' },
    })
    fireEvent.click(screen.getByRole('button', { name: /criar/i }))

    expect(createTask).not.toHaveBeenCalled()
    expect(screen.getByText('Você ainda não tem tarefas cadastradas')).toBeInTheDocument()
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('0 de 0')).toBeInTheDocument()
  })

  it('Deve mostrar erro quando a listagem falhar', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    ;(getTasks as jest.Mock).mockRejectedValue(new Error('Erro ao buscar tarefas'))

    render(<TasksHome />)

    expect(await screen.findByText('Não foi possível carregar suas tarefas.')).toBeInTheDocument()

    consoleErrorSpy.mockRestore()
  })

  it('Não deve concluir a tarefa quando o service retornar erro', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    ;(getTasks as jest.Mock).mockResolvedValue([
      { id: 1, title: 'Corrigir bug', completed: false },
    ])
    ;(completeTask as jest.Mock).mockRejectedValue(new Error('Erro ao concluir tarefa'))

    render(<TasksHome />)

    const toggleButton = await screen.findByRole('button', {
      name: /concluir tarefa corrigir bug/i,
    })
    fireEvent.click(toggleButton)

    await waitFor(() => {
      expect(completeTask).toHaveBeenCalledWith(1)
      expect(consoleErrorSpy).toHaveBeenCalled()
      expect(screen.getByText('Não foi possível atualizar o status da tarefa.')).toBeInTheDocument()
    })

    expect(screen.getByText('0 de 1')).toBeInTheDocument()
    expect(screen.getByText('Corrigir bug')).not.toHaveClass('line-through')

    consoleErrorSpy.mockRestore()
  })
})
