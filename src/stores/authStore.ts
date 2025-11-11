import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs' // npm install bcryptjs

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      loading.value = true
      error.value = null

      console.log('🔐 Attempting login for:', username)

      // Cerca l'admin nel database
      const { data: admin, error: supabaseError } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username)
        .single()

      if (supabaseError || !admin) {
        console.error('❌ Admin not found:', supabaseError)
        error.value = 'Credenziali non valide'
        return false
      }

      // Verifica la password con bcrypt
      const isValidPassword = await bcrypt.compare(password, admin.password_hash)

      if (!isValidPassword) {
        console.error('❌ Invalid password')
        error.value = 'Credenziali non valide'
        return false
      }

      // Login riuscito
      isAuthenticated.value = true
      localStorage.setItem(
        'admin_session',
        JSON.stringify({
          id: admin.id,
          username: admin.username,
          loginTime: Date.now(),
        }),
      )

      console.log('✅ Login successful')
      return true
    } catch (err) {
      console.error('❌ Login error:', err)
      error.value = 'Errore durante il login'
      return false
    } finally {
      loading.value = false
    }
  }

  // Versione semplificata per backward compatibility
  const loginSimple = async (password: string): Promise<boolean> => {
    return login('admin', password)
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('admin_session')
    console.log('👋 Logged out')
  }

  const checkAuth = (): boolean => {
    try {
      const session = localStorage.getItem('admin_session')

      if (!session) {
        isAuthenticated.value = false
        return false
      }

      const sessionData = JSON.parse(session)

      // Verifica se la sessione è scaduta (24 ore)
      const isExpired = Date.now() - sessionData.loginTime > 24 * 60 * 60 * 1000

      if (isExpired) {
        logout()
        return false
      }

      isAuthenticated.value = true
      return true
    } catch (err) {
      console.error('❌ Session check error:', err)
      logout()
      return false
    }
  }

  // Auto-check auth on store initialization
  checkAuth()

  return {
    isAuthenticated,
    loading,
    error,
    login,
    loginSimple, // Per compatibilità con il componente esistente
    logout,
    checkAuth,
  }
})
