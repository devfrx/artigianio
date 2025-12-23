<template>
  <section id="products" class="products-section">
    <div class="container">
      <div class="section-header">
        <div class="section-badge">
          <Icon icon="ph:images-fill" class="badge-icon" />
          <span class="badge-text">Galleria Creazioni</span>
        </div>
        <h2 class="section-title title-font">Il Catalogo Creazioni</h2>
        <p class="section-subtitle">
          Ogni pezzo è unico, realizzato a mano con passione e dedizione
        </p>
      </div>

      <!-- Debug: mostra il numero di prodotti -->
      <div v-if="products.length === 0" class="no-products">
        <div class="no-products-content">
          <Icon icon="ph:package-fill" class="no-products-icon" />
          <p class="no-products-title">Nessun prodotto in vetrina al momento</p>
          <p class="no-products-subtitle">
            <small>Aggiungi prodotti dall'<a href="/admin">area amministrativa</a></small>
          </p>
        </div>
      </div>

      <div v-else class="products-grid">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          @open-gallery="openGallery(index)"
        />
      </div>

      <div v-if="showViewAllButton" class="view-all-wrapper">
        <router-link to="/galleria" class="view-all-button">
          <Icon icon="ph:images-square-fill" class="btn-icon" />
          <span>Vedi Tutta la Galleria</span>
          <Icon icon="ph:arrow-right-bold" class="btn-arrow" />
        </router-link>
      </div>
    </div>

    <!-- Gallery Modal -->
    <ImageModal
      :is-visible="showGallery"
      :image-url="currentProduct?.image_url || ''"
      :image-alt="currentProduct?.name || ''"
      :image-title="currentProduct?.name || ''"
      :image-description="currentProduct?.description || ''"
      :image-material="currentProduct?.material || ''"
      :image-price="currentProduct?.price || ''"
      :current-index="currentIndex"
      :total-images="products.length"
      @close="closeGallery"
      @previous="previousImage"
      @next="nextImage"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ProductCard from './ProductCard.vue'
import ImageModal from './ImageModal.vue'
import type { Product } from '@/lib/supabase'

interface Props {
  products: Product[]
  showViewAllButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showViewAllButton: false,
})

const showGallery = ref(false)
const currentIndex = ref(0)

const currentProduct = computed(() => props.products[currentIndex.value])

const openGallery = (index: number) => {
  currentIndex.value = index
  showGallery.value = true
}

const closeGallery = () => {
  showGallery.value = false
}

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const nextImage = () => {
  if (currentIndex.value < props.products.length - 1) {
    currentIndex.value++
  }
}
</script>

<style scoped>
.products-section {
  padding: var(--section-gap) 0;
  background: linear-gradient(
    135deg,
    var(--color-background-soft) 0%,
    var(--color-background-mute) 100%
  );
  position: relative;
}

.products-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 30% 20%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(139, 69, 19, 0.02) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  position: relative;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, var(--color-primary-lighter), var(--color-primary-dark));
  color: white;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-6);
}

.badge-icon {
  font-size: var(--font-size-base);
}

.section-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  margin-bottom: var(--space-4);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
}

.section-subtitle {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
  font-weight: var(--font-weight-normal);
}

.no-products {
  display: flex;
  justify-content: center;
  padding: var(--space-20) var(--space-8);
}

.no-products-content {
  text-align: center;
  background: var(--color-surface);
  padding: var(--space-12);
  border-radius: var(--radius-container-outer);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-base);
  max-width: 400px;
}

.no-products-icon {
  font-size: var(--font-size-6xl);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

.no-products-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
  margin-bottom: var(--space-4);
}

.no-products-subtitle {
  color: var(--color-text-muted);
}

.no-products a {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
}

.no-products a:hover {
  text-decoration: underline;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
}

.view-all-wrapper {
  display: flex;
  justify-content: center;
  margin-top: var(--space-12);
}

.view-all-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-full);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: var(--transition-all);
  box-shadow: var(--shadow-wood);
}

.view-all-button:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-wood-lg);
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%);
}

.view-all-button .btn-icon {
  font-size: var(--font-size-xl);
}

.view-all-button .btn-arrow {
  font-size: var(--font-size-base);
  transition: var(--transition-transform);
}

.view-all-button:hover .btn-arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .products-section {
    padding: var(--section-gap-sm) 0;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .section-header {
    margin-bottom: var(--space-12);
  }

  .section-title {
    font-size: var(--font-size-4xl);
  }

  .section-subtitle {
    font-size: var(--font-size-lg);
  }

  .no-products {
    padding: var(--space-16) var(--space-4);
  }

  .no-products-content {
    padding: var(--space-8);
  }
}

@media (max-width: 480px) {
  .products-grid {
    gap: var(--space-4);
  }
}
</style>
