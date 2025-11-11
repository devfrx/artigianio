<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.image_url" :alt="product.name" />
      <div class="image-overlay">
        <!-- <span class="overlay-text">Visualizza dettagli</span> -->
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
  </div>
</template>

<script setup lang="ts">
// Usa il tipo Product dal supabase invece di ridefinirlo
import type { Product } from '@/lib/supabase'

interface Props {
  product: Product
}

defineProps<Props>()
</script>

<style scoped>
.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-card-outer);
  overflow: hidden;
  box-shadow: var(--shadow-base);
  transition: var(--transition-all);
  cursor: pointer;
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
  /* Mantieni il radius coerente per l'immagine */
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
  opacity: 0.2;
}

.overlay-text {
  color: white;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  text-align: center;
  padding: var(--space-2) var(--space-4);
  border: 2px solid white;
  border-radius: var(--radius-full);
  backdrop-filter: blur(4px);
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
  color: var(--vt-c-text-dark-1);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-secondary);
  transition: var(--transition-colors);
}

.product-card:hover .product-material {
  background: var(--color-secondary);
  color: var(--vt-c-text-light-2);
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

  .overlay-text {
    font-size: var(--font-size-base);
  }
}
</style>
