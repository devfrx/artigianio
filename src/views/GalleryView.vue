<template>
  <div class="gallery-view">
    <div class="container">
      <div class="gallery-header">
        <router-link to="/" class="back-link">
          <Icon icon="ph:arrow-left-bold" />
          <span>Torna alla Home</span>
        </router-link>
        <div class="section-badge">
          <Icon icon="ph:images-fill" class="badge-icon" />
          <span class="badge-text">Galleria Completa</span>
        </div>
        <h1 class="gallery-title title-font">Tutte le Creazioni</h1>
        <p class="gallery-subtitle">
          Esplora la collezione completa delle nostre creazioni artigianali
        </p>
      </div>

      <div v-if="products.length === 0" class="no-products">
        <div class="no-products-content">
          <Icon icon="ph:package-fill" class="no-products-icon" />
          <p class="no-products-title">Nessun prodotto disponibile</p>
        </div>
      </div>

      <div v-else class="gallery-grid">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="gallery-item"
          @click="openGallery(index)"
        >
          <div class="gallery-image">
            <img :src="product.image_url" :alt="product.name" loading="lazy" />
            <div class="gallery-overlay">
              <Icon icon="ph:magnifying-glass-plus-bold" class="overlay-icon" />
            </div>
          </div>
          <div class="gallery-info">
            <h3 class="gallery-name">{{ product.name }}</h3>
            <span class="gallery-material">{{ product.material }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import ImageModal from '@/components/ImageModal.vue'
import { useProductsStore } from '@/stores/productsStore'

const productsStore = useProductsStore()
const { allProducts: products } = storeToRefs(productsStore)

const showGallery = ref(false)
const currentIndex = ref(0)

const currentProduct = computed(() => products.value[currentIndex.value])

onMounted(() => {
  productsStore.fetchProducts()
})

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
  if (currentIndex.value < products.value.length - 1) {
    currentIndex.value++
  }
}
</script>

<style scoped>
.gallery-view {
  min-height: 100vh;
  padding: var(--space-8) 0 var(--section-gap);
  background: linear-gradient(
    135deg,
    var(--color-background-soft) 0%,
    var(--color-background-mute) 100%
  );
}

.gallery-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-primary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--space-6);
  transition: var(--transition-all);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}

.back-link:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
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
  margin-bottom: var(--space-4);
}

.badge-icon {
  font-size: var(--font-size-base);
}

.gallery-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  margin-bottom: var(--space-3);
}

.gallery-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  max-width: 500px;
  margin: 0 auto;
}

.no-products {
  display: flex;
  justify-content: center;
  padding: var(--space-16);
}

.no-products-content {
  text-align: center;
  background: var(--color-surface);
  padding: var(--space-10);
  border-radius: var(--radius-container-outer);
  border: 1px solid var(--color-border);
}

.no-products-icon {
  font-size: var(--font-size-5xl);
  color: var(--color-text-muted);
  margin-bottom: var(--space-4);
}

.no-products-title {
  font-size: var(--font-size-lg);
  color: var(--color-heading);
}

/* Griglia compatta */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}

.gallery-item {
  background: var(--color-surface);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: var(--transition-all);
}

.gallery-item:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-wood);
  border-color: var(--color-primary-light);
}

.gallery-image {
  height: 160px;
  overflow: hidden;
  position: relative;
}

.gallery-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-transform);
}

.gallery-item:hover .gallery-image img {
  transform: scale(1.05);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(139, 69, 19, 0.7) 0%, rgba(160, 82, 45, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-all);
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.overlay-icon {
  font-size: var(--font-size-2xl);
  color: white;
}

.gallery-info {
  padding: var(--space-3);
}

.gallery-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-heading);
  margin-bottom: var(--space-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gallery-material {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .gallery-view {
    padding: var(--space-6) 0 var(--section-gap-sm);
  }

  .gallery-title {
    font-size: var(--font-size-3xl);
  }

  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--space-3);
  }

  .gallery-image {
    height: 130px;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2);
  }

  .gallery-image {
    height: 110px;
  }

  .gallery-info {
    padding: var(--space-2);
  }

  .gallery-name {
    font-size: var(--font-size-xs);
  }
}
</style>
