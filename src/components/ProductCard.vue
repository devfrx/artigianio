<template>
  <div class="product-card">
    <div class="product-image" @click="openImageModal">
      <img :src="product.image_url" :alt="product.name" />
      <div class="image-overlay">
        <div class="overlay-content">
          <Icon icon="ph:magnifying-glass-plus-bold" class="overlay-icon" />
          <span class="overlay-text">Visualizza</span>
        </div>
      </div>
    </div>
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      <div class="product-details">
        <span class="product-material">{{ product.material }}</span>
        <span class="product-price" v-if="product.price">{{ product.price }}</span>
      </div>
    </div>

    <!-- Image Modal -->
    <ImageModal
      :is-visible="showImageModal"
      :image-url="product.image_url"
      :image-alt="product.name"
      :image-title="product.name"
      :image-description="product.description"
      :image-material="product.material"
      :image-price="product.price"
      @close="closeImageModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { Product } from '@/lib/supabase'
import ImageModal from './ImageModal.vue'

interface Props {
  product: Product
}

interface Emits {
  (e: 'open-gallery'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const showImageModal = ref(false)

const openImageModal = () => {
  showImageModal.value = true
  // Opzionale: emetti anche l'evento per la galleria
  // emit('open-gallery')
}

const closeImageModal = () => {
  showImageModal.value = false
}
</script>

<style scoped>
.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-card-outer);
  overflow: hidden;
  box-shadow: var(--shadow-base);
  transition: var(--transition-all);
  border: 1px solid var(--color-border);
  position: relative;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-wood-lg);
  border-color: var(--color-primary-light);
}

.product-image {
  height: 280px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border-radius: var(--radius-card-outer) var(--radius-card-outer) 0 0;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-transform);
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, rgba(160, 82, 45, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-all);
}

.product-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: white;
  text-align: center;
}

.overlay-icon {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--space-1);
}

.overlay-text {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-2) var(--space-4);
  border: 2px solid white;
  border-radius: var(--radius-full);
  backdrop-filter: blur(4px);
  background: rgba(255, 255, 255, 0.1);
}

.product-info {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  height: auto;
  min-height: 180px;
}

.product-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
  line-height: var(--line-height-snug);
  margin-bottom: var(--space-2);
}

.product-description {
  color: var(--color-text);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-base);
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.product-material {
  background: var(--color-background-mute);
  color: var(--color-text);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-secondary);
  transition: var(--transition-colors);
}

.product-card:hover .product-material {
  background: var(--color-secondary);
  color: white;
}

.product-price {
  font-weight: var(--font-weight-semibold);
  color: var(--color-secondary);
  font-size: var(--font-size-lg);
  text-align: right;
}

@media (max-width: 768px) {
  .product-card {
    border-radius: var(--radius-xl);
  }

  .product-image {
    height: 240px;
  }

  .product-info {
    padding: var(--space-4);
    min-height: 160px;
  }

  .product-name {
    font-size: var(--font-size-lg);
  }

  .product-description {
    font-size: var(--font-size-sm);
    -webkit-line-clamp: 2;
  }

  .product-details {
    margin-top: var(--space-3);
    padding-top: var(--space-2);
  }

  .overlay-icon {
    font-size: var(--font-size-2xl);
  }

  .overlay-text {
    font-size: var(--font-size-base);
  }
}
</style>
