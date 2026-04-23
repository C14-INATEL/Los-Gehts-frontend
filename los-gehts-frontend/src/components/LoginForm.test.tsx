import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from './LoginForm'
import { login } from '@/services/auth'

// Mock do login
jest.mock('@/services/auth', () => ({
  login: jest.fn(),
}))

// Mock do useRouter e useSearchParams
const pushMock = jest.fn()

// Mock para o get do useSearchParams
let getMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: getMock,
  }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    getMock.mockReset()
  })

  // Teste 1: login bem-sucedido
  it('Deve fazer o login e redirecionar para home', async () => {
    ;(login as jest.Mock).mockResolvedValue({
      JWT: 'fake-token',
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome'), { 
      target: { value: 'guilherme' },
    })

    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: '123456' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('guilherme', '123456')
    })

    expect(localStorage.getItem('token')).toBe('fake-token') // Verifica se o token foi salvo
    expect(pushMock).toHaveBeenCalledWith('/') // Verifica se redirecionou para home
  })

  // Teste 2: login falhou
  it('Deve mostrar erro quando login falha', async () => {
    ;(login as jest.Mock).mockRejectedValue({
      message: 'Usuario ou senha incorretos',
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByPlaceholderText('Digite seu nome'), {
      target: { value: 'guilherme' },
    })

    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: 'errado' },
    })

    fireEvent.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Usuario ou senha incorretos')
      ).toBeInTheDocument() // Verifica se a mensagem de erro é exibida
    })
  })

  // Teste 3: exibir mensagem de sucesso
  it('Deve exibir mensagem de sucesso quando houver query param success', async () => {
    getMock.mockReturnValue('true')

    render(<LoginForm />)

    expect(
      await screen.findByText('Usuário criado com sucesso')
    ).toBeInTheDocument() // Verifica se a mensagem de sucesso é exibida
  })
})