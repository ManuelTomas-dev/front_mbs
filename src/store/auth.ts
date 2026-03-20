import { api } from "@/lib/api"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { jwtDecode } from "jwt-decode" // Importe para ler o token

interface AuthState {
  token: string | null
  user: any | null
  loading: boolean
  fetchMe: () => Promise<void>
  getUserId: () => string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  setToken: (newToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true })
        try {
          const res = await api.post("auth/login", { email, password })
          const token = res.data.access_token

          set({ token }) // Salva o token primeiro

          document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`

          // Chama o fetchMe que agora sabe extrair o ID
          await get().fetchMe()

          set({ loading: false })
          return true
        } catch (error) {
          console.error("Login Error:", error)
          set({ loading: false, token: null })
          return false
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout").catch(() => null)
        } finally {
          document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
          set({ token: null, user: null, loading: false })
          window.location.href = "/login"
        }
      },

      fetchMe: async () => {
        const token = get().token
        if (!token) return

        set({ loading: true })
        try {
          // 1. Decodifica o token para pegar o ID (sub)
          const decoded: any = jwtDecode(token)
          const userId = decoded.sub // O Flask-JWT-Extended usa 'sub' para a identidade

          // 2. Busca pelo ID dinâmico extraído do token
          const { data } = await api.get(`/users/${userId}`)

          set({ user: data, loading: false })
        } catch (error: any) {
          console.error("FetchMe Error:", error)
          if (error.response?.status === 404 || error.response?.status === 401) {
            get().logout()
          }
        } finally {
          set({ loading: false })
        }
      },

      getUserId: () => {
        const token = get().token
        if (!token) return null

        // 1. Decodifica o token para pegar o ID (sub)
        const decoded: any = jwtDecode(token)
        const userId = decoded.sub // O Flask-JWT-Extended usa 'sub' para a identidade
        return userId
      },

      // Dentro do seu useAuthStore:
      setToken: (newToken: string) => {
        set({ token: newToken });
        // Atualiza o cookie também para manter a persistência
        document.cookie = `token=${newToken}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)