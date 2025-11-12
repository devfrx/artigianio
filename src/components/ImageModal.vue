<template>
  <Teleport to="body">
    <div v-if="isVisible" class="image-modal-overlay" @click="closeModal">
      <div class="image-modal-container">
        <!-- Close Button -->
        <button class="close-button" @click="closeModal" aria-label="Chiudi">
          <Icon icon="ph:x-bold" />
        </button>

        <!-- Navigation Arrows (se ci sono più immagini) -->
        <button
          v-if="hasPrevious"
          class="nav-button nav-previous"
          @click.stop="$emit('previous')"
          aria-label="Immagine precedente"
        >
          <Icon icon="ph:caret-left-bold" />
        </button>

        <button
          v-if="hasNext"
          class="nav-button nav-next"
          @click.stop="$emit('next')"
          aria-label="Immagine successiva"
        >
          <Icon icon="ph:caret-right-bold" />
        </button>

        <!-- Image Container -->
        <div class="image-container" @click.stop>
          <img
            :src="imageUrl"
            :alt="imageAlt"
            class="modal-image"
            @load="handleImageLoad"
            @error="handleImageError"
          />

          <!-- Loading State -->
          <div v-if="loading" class="loading-state">
            <Icon icon="ph:spinner" class="spinning" />
            <span>Caricamento...</span>
          </div>

          <!-- Error State -->
          <div v-if="error" class="error-state">
            <Icon icon="ph:warning-circle-fill" />
            <span>Errore nel caricamento dell'immagine</span>
          </div>

          <!-- Image Info -->
          <div v-if="showInfo" class="image-info">
            <h3 class="image-title">{{ imageTitle }}</h3>
            <p v-if="imageDescription" class="image-description">{{ imageDescription }}</p>
            <div class="image-meta">
              <span v-if="imageMaterial" class="meta-item">
                <Icon icon="ph:tree-fill" />
                {{ imageMaterial }}
              </span>
              <span v-if="imagePrice" class="meta-item">
                <Icon icon="ph:coins-fill" />
                {{ imagePrice }}
              </span>
            </div>
          </div>
        </div>

        <!-- Counter (se ci sono più immagini) -->
        <div v-if="totalImages > 1" class="image-counter">
          {{ currentIndex + 1 }} / {{ totalImages }}
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  isVisible: boolean
  imageUrl: string
  imageAlt?: string
  imageTitle?: string
  imageDescription?: string
  imageMaterial?: string
  imagePrice?: string
  currentIndex?: number
  totalImages?: number
  showInfo?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'previous'): void
  (e: 'next'): void
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '',
  imageTitle: '',
  imageDescription: '',
  imageMaterial: '',
  imagePrice: '',
  currentIndex: 0,
  totalImages: 1,
  showInfo: true,
})

const emit = defineEmits<Emits>()

const loading = ref(true)
const error = ref(false)

const hasPrevious = computed(() => props.currentIndex > 0)
const hasNext = computed(() => props.currentIndex < props.totalImages - 1)

const handleImageLoad = () => {
  loading.value = false
  error.value = false
}

const handleImageError = () => {
  loading.value = false
  error.value = true
}

const closeModal = () => {
  emit('close')
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (!props.isVisible) return

  switch (event.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowLeft':
      if (hasPrevious.value) emit('previous')
      break
    case 'ArrowRight':
      if (hasNext.value) emit('next')
      break
  }
}

// Watch for image changes to reset loading state
watch(
  () => props.imageUrl,
  () => {
    loading.value = true
    error.value = false
  },
)

// Prevent body scroll when modal is open
watch(
  () => props.isVisible,
  (visible) => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: var(--z-index-modal);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  cursor: pointer;
}

.image-modal-container {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-all);
  backdrop-filter: blur(10px);
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-all);
  backdrop-filter: blur(10px);
  font-size: var(--font-size-xl);
}

.nav-button:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.nav-previous {
  left: var(--space-4);
}

.nav-next {
  right: var(--space-4);
}

.image-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  cursor: default;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2xl);
  transition: var(--transition-transform);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  color: white;
  font-size: var(--font-size-lg);
  padding: var(--space-8);
}

.loading-state Icon,
.error-state Icon {
  font-size: var(--font-size-4xl);
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

.image-info {
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
  color: white;
  padding: var(--space-4) var(--space-3) var(--space-3);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  backdrop-filter: blur(10px);

  transition: var(--transition-opacity) 0.3s ease;
}

.image-container:hover .image-info,
.image-container:focus-within .image-info {
  opacity: 0;
}

.image-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-2);
}

.image-description {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-4);
  opacity: 0.9;
}

.image-meta {
  display: flex;
  gap: var(--space-6);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.image-counter {
  position: absolute;
  bottom: var(--space-4);
  right: var(--space-4);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .image-modal-container {
    max-width: 100vw;
    max-height: 100vh;
    padding: 0;
  }

  .modal-image {
    max-height: 70vh;
    border-radius: 0;
  }

  .nav-button {
    width: 48px;
    height: 48px;
    font-size: var(--font-size-lg);
  }

  .nav-previous {
    left: var(--space-2);
  }

  .nav-next {
    right: var(--space-2);
  }

  .close-button {
    top: var(--space-2);
    right: var(--space-2);
    width: 40px;
    height: 40px;
  }

  .image-info {
    padding: var(--space-6) var(--space-4) var(--space-4);
  }

  .image-title {
    font-size: var(--font-size-xl);
  }

  .image-description {
    font-size: var(--font-size-sm);
  }
}
</style>
