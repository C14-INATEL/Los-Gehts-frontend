import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RegisterForm from './RegisterForm'
import { register } from '@/services/auth'

// Mock do register
jest.mock('@/services/auth', () => ({
  register: jest.fn(),
}))

// Mock do router
const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  // Teste 1: registro bem-sucedido
  it('Deve registrar o usuario e redirecionar para login com sucesso', async () => {
    ;(register as jest.Mock).mockResolvedValue({
      JWT: 'fake-token',
    })

    render(<RegisterForm />)

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome'), {
      target: { value: 'guilherme' },
    })

    fireEvent.change(screen.getByPlaceholderText('Crie uma senha'), {
      target: { value: '123456' },
    })

    fireEvent.change(screen.getByPlaceholderText('Digite a senha novamente'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }))

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('guilherme', '123456')
    })

    expect(localStorage.getItem('token')).toBe('fake-token') // Verifica se o token foi salvo
    expect(pushMock).toHaveBeenCalledWith('/login?success=1') // Verifica se redirecionou para login com sucesso
  })

  // Teste 2: erro de validação (senhas diferentes)
  it('Deve mostrar erro quando as senhas nao coincidem', async () => {
    render(<RegisterForm />)

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome'), {
      target: { value: 'guilherme' },
    })

    fireEvent.change(screen.getByPlaceholderText('Crie uma senha'), {
      target: { value: '123456' },
    })

    fireEvent.change(screen.getByPlaceholderText('Digite a senha novamente'), {
      target: { value: '654321' },
    })

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }))

    await waitFor(() => {
      expect(
        screen.getByText('As senhas não coincidem')
      ).toBeInTheDocument()
    })

    expect(register).not.toHaveBeenCalled() // Verifica que a função de registro não foi chamada devido ao erro de validação
  })

  // Teste 3: erro da API
  it('Deve mostrar erro quando a API retornar erro', async () => {
    ;(register as jest.Mock).mockRejectedValue({
      message: 'Erro ao registrar usuário',
    })

    render(<RegisterForm />)

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome'), {
      target: { value: 'guilherme' },
    })

    fireEvent.change(screen.getByPlaceholderText('Crie uma senha'), {
      target: { value: '123456' },
    })

    fireEvent.change(screen.getByPlaceholderText('Digite a senha novamente'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /registrar/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Erro ao registrar usuário') // Verifica se a mensagem de erro da API é exibida
      ).toBeInTheDocument()
    })

    expect(register).toHaveBeenCalled() // Verifica que a função de registro foi chamada mesmo com o erro da API
  })
})