<template>
  <div class="product-grid-container">
    <div v-if="loading" class="loading-state">
      <Icon icon="ph:gear-six" class="spinning loading-icon" />
      <p>Caricamento creazioni...</p>
    </div>

    <div v-else-if="error" class="error-state">
      <Icon icon="ph:warning-octagon-fill" />
      <p>{{ error }}</p>
    </div>

    <div v-else-if="products.length === 0" class="empty-state">
      <Icon icon="ph:hammer-fill" class="empty-icon" />
      <h3>Nessuna Creazione</h3>
      <p>Inizia creando il tuo primo capolavoro</p>
    </div>

    <div v-else class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <div class="product-image">
          <img :src="product.image_url" :alt="product.name" />

          <!-- Status Badges -->
          <div class="product-badges">
            <span v-if="product.is_hero" class="badge hero-badge">
              <Icon icon="ph:crown-fill" />
              Punta
            </span>
            <span v-if="product.is_featured" class="badge featured-badge">
              <Icon icon="ph:storefront-fill" />
              Vetrina
            </span>
          </div>

          <!-- Quality Seal -->
          <div class="quality-seal">
            <Icon icon="ph:seal-check-fill" />
          </div>
        </div>

        <div class="product-info">
          <h4 class="product-name">{{ product.name }}</h4>

          <div class="product-meta">
            <div class="meta-item">
              <Icon icon="ph:tree-evergreen-fill" />
              <span>{{ product.material }}</span>
            </div>
            <div class="meta-item">
              <Icon icon="ph:coins-fill" />
              <span>{{ product.price }}</span>
            </div>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <!-- Status Chips -->
          <div class="status-chips">
            <span v-if="product.is_hero" class="status-chip hero">
              <Icon icon="ph:crown-fill" />
              Pezzo di Punta
            </span>
            <span v-if="product.is_featured" class="status-chip featured">
              <Icon icon="ph:storefront-fill" />
              In Vetrina
            </span>
            <span v-if="!product.is_featured && !product.is_hero" class="status-chip draft">
              <Icon icon="ph:hammer-fill" />
              In Lavorazione
            </span>
          </div>
        </div>

        <!-- Action Tools -->
        <div class="product-actions">
          <button @click="$emit('edit', product)" class="action-btn edit-btn" title="Modifica">
            <Icon icon="ph:pencil-simple-fill" />
          </button>

          <button
            @click="$emit('toggle-featured', product)"
            class="action-btn featured-btn"
            :class="{ active: product.is_featured }"
            :title="product.is_featured ? 'Rimuovi da Vetrina' : 'Aggiungi a Vetrina'"
          >
            <Icon :icon="product.is_featured ? 'ph:storefront-fill' : 'ph:storefront'" />
          </button>

          <button
            @click="$emit('toggle-hero', product)"
            class="action-btn hero-btn"
            :class="{ active: product.is_hero }"
            :title="product.is_hero ? 'Rimuovi da Punta' : 'Imposta come Punta'"
          >
            <Icon :icon="product.is_hero ? 'ph:crown-fill' : 'ph:crown'" />
          </button>

          <button
            @click="$emit('delete', product.id)"
            class="action-btn delete-btn"
            title="Elimina"
          >
            <Icon icon="ph:trash-simple-fill" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Product } from '@/lib/supabase'

interface Props {
  products: Product[]
  loading: boolean
  error: string | null
}

interface Emits {
  (e: 'edit', product: Product): void
  (e: 'toggle-featured', product: Product): void
  (e: 'toggle-hero', product: Product): void
  (e: 'delete', id: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.product-grid-container {
  padding: var(--space-6) 0;
}

.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: var(--space-16);
  color: var(--color-text-muted);
}

.loading-icon,
.empty-icon {
  font-size: var(--font-size-5xl);
  color: var(--color-primary);
  margin-bottom: var(--space-4);
}

.empty-state h3 {
  font-size: var(--font-size-xl);
  color: var(--color-heading);
  margin-bottom: var(--space-2);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-6);
}

.product-card {
  background: var(--color-surface);
  border-radius: var(--radius-container-outer);
  overflow: hidden;
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-border);
  transition: var(--transition-all);
  position: relative;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-wood);
  border-color: var(--color-primary-light);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-transform);
}

.product-card:hover .product-image img {
  transform: scale(1.02);
}

.product-badges {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.badge {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: white;
}

.hero-badge {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.featured-badge {
  background: linear-gradient(135deg, var(--color-success), #16a34a);
}

.quality-seal {
  position: absolute;
  bottom: var(--space-2);
  left: var(--space-2);
  color: var(--color-accent);
  font-size: var(--font-size-lg);
  opacity: 0.8;
}

.product-info {
  padding: var(--space-4);
}

.product-name {
  font-size: var(--font-size-lg);
  color: var(--color-heading);
  margin-bottom: var(--space-3);
  font-weight: var(--font-weight-semibold);
}

.product-meta {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-text);
}

.product-description {
  color: var(--color-text-muted);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-3);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: var(--font-size-sm);
}

.status-chips {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin-bottom: var(--space-3);
}

.status-chip {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: white;
}

.status-chip.hero {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.status-chip.featured {
  background: var(--color-success);
}

.status-chip.draft {
  background: var(--color-neutral-400);
}

.product-actions {
  display: flex;
  padding: var(--space-3);
  border-top: 1px solid var(--color-border);
  gap: var(--space-2);
  background: var(--color-background-soft);
}

.action-btn {
  flex: 1;
  padding: var(--space-2);
  border: none;
  border-radius: var(--radius-xl);
  cursor: pointer;
  transition: var(--transition-all);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-btn {
  background: var(--color-secondary);
}

.edit-btn:hover {
  background: var(--color-secondary-dark);
}

.featured-btn {
  background: var(--color-background-mute);
}

.featured-btn:hover,
.featured-btn.active {
  background: var(--color-primary);
}

.hero-btn {
  background: none;
  border: 1px solid var(--color-background-mute);
}

.hero-btn:hover,
.hero-btn.active {
  background: var(--color-primary-lighter);
}

.delete-btn {
  background: var(--color-error);
}

.delete-btn:hover {
  background: #dc2626;
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
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
