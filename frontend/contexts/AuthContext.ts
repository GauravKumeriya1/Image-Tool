import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      // TODO: Implement login API call
      set({ isLoading: false })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem('token')
  },

  setUser: (user: User | null) => {
    set({ user })
  },
}))
