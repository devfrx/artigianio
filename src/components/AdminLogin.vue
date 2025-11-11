<template>
  <div class="admin-login">
    <div class="login-container">
      <div class="login-form">
        <div class="login-header">
          <Icon icon="ph:shield-check-fill" class="login-icon" />
          <h2>Accesso Amministratore</h2>
          <p>Inserisci la password per accedere al pannello di controllo</p>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="password">Password Amministratore</label>
            <div class="password-input">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Inserisci la password"
                :class="{ error: error }"
              />
              <button type="button" @click="showPassword = !showPassword" class="toggle-password">
                <Icon :icon="showPassword ? 'ph:eye-slash' : 'ph:eye'" />
              </button>
            </div>
          </div>

          <div v-if="error" class="error-message">
            <Icon icon="ph:warning-circle-fill" />
            {{ error }}
          </div>

          <button type="submit" :disabled="loading" class="login-button">
            <Icon v-if="loading" icon="ph:spinner" class="spinning" />
            {{ loading ? 'Verifica...' : 'Accedi' }}
          </button>
        </form>

        <div class="login-footer">
          <button @click="goHome" class="back-button">
            <Icon icon="ph:arrow-left" />
            Torna alla Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    console.log('🚀 Starting login process...')

    // Usa loginSimple per compatibilità
    const success = await authStore.loginSimple(password.value)

    if (success) {
      console.log('✅ Login successful, redirecting to admin...')
      router.push('/admin')
    } else {
      error.value = authStore.error || 'Password non corretta'
      password.value = ''
      console.error('❌ Login failed:', error.value)
    }
  } catch (err) {
    console.error('❌ Login error:', err)
    error.value = "Errore durante l'accesso"
  } finally {
    loading.value = false
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-background) 0%,
    var(--color-background-soft) 100%
  );
  padding: var(--space-4);
}

.login-container {
  width: 100%;
  max-width: 400px;
}

.login-form {
  background: var(--color-surface);
  border-radius: var(--radius-container-outer);
  padding: var(--space-8);
  box-shadow: var(--shadow-wood-lg);
  border: 1px solid var(--color-border);
}

.login-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.login-icon {
  font-size: var(--font-size-5xl);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.login-header h2 {
  font-size: var(--font-size-2xl);
  color: var(--color-heading);
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-bold);
}

.login-header p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: var(--font-weight-medium);
  color: var(--color-heading);
  font-size: var(--font-size-sm);
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding: var(--space-4);
  padding-right: var(--space-12);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-colors);
}

.password-input input:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
}

.password-input input.error {
  border-color: var(--color-error);
}

.toggle-password {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-base);
  transition: var(--transition-colors);
}

.toggle-password:hover {
  color: var(--color-primary);
  background: var(--color-background-soft);
}

.error-message {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-error);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  background: rgba(239, 68, 68, 0.1);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.login-button {
  width: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: white;
  border: none;
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-all);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
}

.login-button:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-lighter));
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-footer {
  margin-top: var(--space-8);
  text-align: center;
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-6);
}

.back-button {
  background: none;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition: var(--transition-all);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.back-button:hover {
  background: var(--color-background-soft);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .admin-login {
    padding: var(--space-2);
  }

  .login-form {
    padding: var(--space-6);
  }

  .login-header h2 {
    font-size: var(--font-size-xl);
  }
}
</style>
