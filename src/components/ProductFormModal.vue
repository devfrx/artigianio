<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <Icon icon="ph:magic-wand-fill" class="modal-icon" />
        <h3>{{ editingProduct ? 'Perfeziona Creazione' : 'Nuova Creazione' }}</h3>
        <button @click="$emit('close')" class="close-button">
          <Icon icon="ph:x-bold" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-section">
          <div class="form-group">
            <label for="name" class="form-label">
              <Icon icon="ph:tag-fill" />
              Nome della Creazione
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              placeholder="es. Tavolo in Rovere Antico"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="description" class="form-label">
              <Icon icon="ph:scroll-fill" />
              Storia e Descrizione
            </label>
            <textarea
              id="description"
              v-model="form.description"
              required
              rows="4"
              placeholder="Racconta la storia di questa creazione..."
              class="form-textarea"
            ></textarea>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="material" class="form-label">
              <Icon icon="ph:tree-fill" />
              Essenza di Legno
            </label>
            <input
              id="material"
              v-model="form.material"
              type="text"
              required
              placeholder="es. Rovere, Noce, Ciliegio"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="price" class="form-label">
              <Icon icon="ph:coins-fill" />
              Valore
            </label>
            <input
              id="price"
              v-model="form.price"
              type="text"
              required
              placeholder="es. €500, Su commissione"
              class="form-input"
            />
          </div>
        </div>

        <!-- Image URL Section -->
        <div class="form-group">
          <label for="image" class="form-label">
            <Icon icon="ph:image-fill" />
            Fotografia della Creazione
          </label>
          <div class="image-input-group">
            <input
              id="image"
              v-model="form.image_url"
              type="url"
              required
              placeholder="https://esempio.com/immagine.jpg"
              class="form-input"
              :class="{ 'input-error': imageError, 'input-success': imageValid }"
              @input="handleImageUrlChange"
            />
            <button
              type="button"
              @click="validateCurrentImage"
              class="validate-button"
              :disabled="validatingImage"
            >
              <Icon v-if="validatingImage" icon="ph:spinner" class="spinning" />
              <Icon v-else-if="imageValid" icon="ph:check-circle-fill" />
              <Icon v-else-if="imageError" icon="ph:x-circle-fill" />
              <Icon v-else icon="ph:eye-fill" />
            </button>
          </div>

          <!-- Image Suggestions -->
          <div class="image-suggestions">
            <Icon icon="ph:lightbulb-fill" />
            <span>
              <strong>Suggerimento:</strong> Usa servizi come
              <a href="https://imgbb.com" target="_blank">ImgBB</a> per caricare le foto
            </span>
          </div>

          <!-- Image Preview -->
          <div v-if="imagePreview && !imageError" class="image-preview">
            <img :src="imagePreview" alt="Anteprima" @error="handleImageLoadError" />
            <div class="preview-badge">
              <Icon icon="ph:check-circle-fill" />
              Immagine valida
            </div>
          </div>

          <!-- Status Messages -->
          <div v-if="imageError" class="status-message error">
            <Icon icon="ph:warning-circle-fill" />
            {{ imageError }}
          </div>
          <div v-else-if="imageValid" class="status-message success">
            <Icon icon="ph:check-circle-fill" />
            Immagine caricata correttamente
          </div>
        </div>

        <!-- Options -->
        <div class="form-group">
          <div class="form-options">
            <label class="option-checkbox">
              <input type="checkbox" v-model="form.is_featured" />
              <span class="checkbox-mark"></span>
              <Icon icon="ph:storefront-fill" />
              <span>Esponi in Vetrina</span>
            </label>

            <label class="option-checkbox">
              <input type="checkbox" v-model="form.is_hero" />
              <span class="checkbox-mark"></span>
              <Icon icon="ph:crown-fill" />
              <span>Pezzo di Punta</span>
            </label>
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="btn-secondary">
            <Icon icon="ph:x-bold" />
            Annulla
          </button>
          <button type="submit" :disabled="uploading || imageError" class="btn-primary">
            <Icon v-if="uploading" icon="ph:spinner" class="spinning" />
            <Icon v-else icon="ph:check-bold" />
            {{ uploading ? 'Creando...' : editingProduct ? 'Perfeziona' : 'Crea Capolavoro' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import type { Product, ProductInsert } from '@/lib/supabase'

interface Props {
  isVisible: boolean
  editingProduct: Product | null
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: ProductInsert): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = ref<ProductInsert>({
  name: '',
  description: '',
  material: '',
  price: '',
  image_url: '',
  is_featured: false,
  is_hero: false,
})

const uploading = ref(false)
const imagePreview = ref<string | null>(null)
const validatingImage = ref(false)
const imageValid = ref(false)
const imageError = ref<string | null>(null)

// Watch for editing product changes
watch(
  () => props.editingProduct,
  (product) => {
    if (product) {
      form.value = {
        name: product.name,
        description: product.description,
        material: product.material,
        price: product.price,
        image_url: product.image_url,
        is_featured: product.is_featured,
        is_hero: product.is_hero,
      }

      if (product.image_url) {
        imagePreview.value = product.image_url
        imageValid.value = true
        imageError.value = null
      }
    } else {
      // Reset form
      form.value = {
        name: '',
        description: '',
        material: '',
        price: '',
        image_url: '',
        is_featured: false,
        is_hero: false,
      }
      imagePreview.value = null
      imageValid.value = false
      imageError.value = null
    }
  },
  { immediate: true },
)

const handleImageUrlChange = () => {
  imageError.value = null
  imageValid.value = false
  imagePreview.value = null

  if (form.value.image_url) {
    setTimeout(() => {
      validateCurrentImage()
    }, 1000)
  }
}

const validateCurrentImage = async () => {
  if (!form.value.image_url) return

  try {
    validatingImage.value = true
    imageError.value = null
    imageValid.value = false

    const url = new URL(form.value.image_url)
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error("L'URL deve iniziare con http:// o https://")
    }

    // Test image loading
    const img = new Image()
    img.crossOrigin = 'anonymous'

    const isValid = await new Promise((resolve) => {
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = form.value.image_url
    })

    if (isValid) {
      imageValid.value = true
      imagePreview.value = form.value.image_url
    } else {
      throw new Error("Impossibile caricare l'immagine dal link fornito")
    }
  } catch (err) {
    imageError.value = err instanceof Error ? err.message : 'URL immagine non valido'
    imageValid.value = false
    imagePreview.value = null
  } finally {
    validatingImage.value = false
  }
}

const handleImageLoadError = () => {
  imageError.value = "Errore nel caricamento dell'immagine"
  imageValid.value = false
  imagePreview.value = null
}

const handleSubmit = async () => {
  if (!imageValid.value && form.value.image_url) {
    await validateCurrentImage()
    if (!imageValid.value) {
      alert("Per favore, verifica che l'URL dell'immagine sia corretto prima di procedere.")
      return
    }
  }

  try {
    uploading.value = true
    emit('submit', { ...form.value })
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
  backdrop-filter: blur(8px);
  padding: var(--space-4);
}

.modal-container {
  background: var(--color-surface);
  border-radius: var(--radius-container-outer);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-2xl);
  border: 1px solid var(--color-border);
  position: relative;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-background-soft);
}

.modal-header h3 {
  font-size: var(--font-size-xl);
  color: var(--color-heading);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.modal-icon {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
}

.close-button {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-base);
  transition: var(--transition-colors);
}

.close-button:hover {
  background: var(--color-background-mute);
  color: var(--vt-c-text-dark-1);
}

.modal-form {
  padding: var(--space-6);
}

.form-section {
  margin-bottom: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-6);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.form-label {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  font-weight: var(--font-weight-medium);
  color: var(--vt-c-text-dark-1);
  font-size: var(--font-size-sm);
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  transition: var(--transition-all);
  background: var(--color-background);
  color: var(--color-text); /* <--- aggiunto: colore del testo negli input */
}
/* placeholder color */
.form-input::placeholder,
.form-textarea::placeholder {
  color: var(--color-text-muted);
}

.form-input:focus,
.form-textarea:focus {
  border-color: var(--color-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
}

.form-input.input-error {
  border-color: var(--color-error);
  background: rgba(239, 68, 68, 0.05);
}

.form-input.input-success {
  border-color: var(--color-success);
  background: rgba(34, 197, 94, 0.05);
}

.image-input-group {
  display: flex;
  gap: var(--space-2);
  align-items: stretch;
}

.image-input-group .form-input {
  flex: 1;
}

.validate-button {
  padding: var(--space-3);
  background: var(--color-info);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-all);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
}

.validate-button:hover:not(:disabled) {
  background: #2563eb;
}

.validate-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.image-suggestions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-2);
  padding: var(--space-3);
  background: var(--color-background-soft);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.image-suggestions a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.image-suggestions a:hover {
  text-decoration: underline;
}

.image-preview {
  margin-top: var(--space-4);
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  max-width: 300px;
  border: 2px solid var(--color-success);
}

.image-preview img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.preview-badge {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  background: var(--color-success);
  color: white;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.status-message {
  margin-top: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.status-message.error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.status-message.success {
  background: rgba(34, 197, 94, 0.1);
  color: var(--color-success);
  border: 1px solid rgba(34, 197, 94, 0.2);
}

.form-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.option-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: var(--transition-all);
  background: var(--color-background);
}

.option-checkbox:hover {
  border-color: var(--color-primary-light);
  background: var(--color-background-soft);
}

.option-checkbox input {
  display: none;
}

.checkbox-mark {
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-base);
  position: relative;
  transition: var(--transition-all);
}

.option-checkbox input:checked + .checkbox-mark {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.option-checkbox input:checked + .checkbox-mark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.form-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  margin-top: var(--space-8);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.btn-primary,
.btn-secondary {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-all);
  font-size: var(--font-size-base);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: var(--vt-c-text-dark-1);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-lighter));
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-background-soft);
  border-color: var(--color-primary-light);
  color: var(--vt-c-text-dark-1);
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

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .image-input-group {
    flex-direction: column;
  }

  .validate-button {
    align-self: flex-start;
  }
}
</style>
