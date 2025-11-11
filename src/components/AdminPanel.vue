<template>
  <div class="admin-panel">
    <!-- Header -->
    <div class="admin-header">
      <div class="container">
        <div class="header-content">
          <div class="header-title">
            <Icon icon="ph:hammer-fill" class="header-icon" />
            <div>
              <h2>Laboratorio Digitale</h2>
              <p>Gestisci le tue creazioni artigianali</p>
            </div>
          </div>

          <div class="header-actions">
            <button @click="handleHome" class="btn-home">
              <Icon icon="ph:house-line" />
              Torna alla Vetrina
            </button>
            <button @click="showAddForm = true" class="btn-primary">
              <Icon icon="ph:plus-bold" />
              Nuova Creazione
            </button>
            <button @click="handleLogout" class="btn-logout">
              <Icon icon="ph:sign-out-bold" />
              Esci
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="admin-stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <Icon icon="ph:package-fill" class="stat-icon" />
            <div class="stat-content">
              <span class="stat-number">{{ products.length }}</span>
              <span class="stat-label">Creazioni Totali</span>
            </div>
          </div>

          <div class="stat-card featured">
            <Icon icon="ph:storefront-fill" class="stat-icon" />
            <div class="stat-content">
              <span class="stat-number">{{ featuredProducts.length }}</span>
              <span class="stat-label">In Vetrina</span>
            </div>
          </div>

          <!-- <div class="stat-card hero">
            <Icon icon="ph:crown-fill" class="stat-icon" />
            <div class="stat-content">
              <span class="stat-number">{{ heroProduct ? '1' : '0' }}</span>
              <span class="stat-label">Pezzo di Punta</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="admin-content">
      <div class="container">
        <AdminProductGrid
          :products="products"
          :loading="loading"
          :error="error"
          @edit="editProduct"
          @toggle-featured="toggleFeatured"
          @toggle-hero="setAsHero"
          @delete="deleteProductConfirm"
        />
      </div>
    </div>

    <!-- Modal -->
    <ProductFormModal
      :is-visible="showAddForm || !!editingProduct"
      :editing-product="editingProduct"
      @close="cancelEdit"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useProductsStore } from '@/stores/productsStore'
import { useAuthStore } from '@/stores/authStore'
import AdminProductGrid from './AdminProductGrid.vue'
import ProductFormModal from './ProductFormModal.vue'
import type { Product, ProductInsert } from '@/lib/supabase'

const router = useRouter()
const productsStore = useProductsStore()
const authStore = useAuthStore()

const { products, loading, error, featuredProducts, heroProduct } = storeToRefs(productsStore)

const showAddForm = ref(false)
const editingProduct = ref<Product | null>(null)

onMounted(() => {
  productsStore.fetchProducts()
})

const handleSubmit = async (productData: ProductInsert) => {
  try {
    if (editingProduct.value) {
      await productsStore.updateProduct(editingProduct.value.id, productData)
    } else {
      await productsStore.addProduct(productData)
    }
    cancelEdit()
  } catch (err) {
    console.error('Error saving product:', err)
    alert('Errore nel salvare il prodotto. Controlla la console per maggiori dettagli.')
  }
}

const editProduct = (product: Product) => {
  editingProduct.value = product
  showAddForm.value = false
}

const toggleFeatured = async (product: Product) => {
  try {
    await productsStore.updateProduct(product.id, {
      is_featured: !product.is_featured,
    })
  } catch (err) {
    console.error('Error toggling featured:', err)
  }
}

const setAsHero = async (product: Product) => {
  try {
    await productsStore.updateProduct(product.id, {
      is_hero: !product.is_hero,
    })
  } catch (err) {
    console.error('Error setting hero:', err)
  }
}

const cancelEdit = () => {
  showAddForm.value = false
  editingProduct.value = null
}

const deleteProductConfirm = (id: number) => {
  if (confirm('Sei sicuro di voler eliminare questa creazione?')) {
    productsStore.deleteProduct(id)
  }
}

const handleLogout = () => {
  if (confirm('Sei sicuro di voler uscire?')) {
    authStore.logout()
    router.push('/')
  }
}

const handleHome = () => {
  router.push('/')
}
</script>

<style scoped>
.admin-panel {
  min-height: 100vh;
  background: var(--color-background);
}

.admin-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-base);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6) 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.header-icon {
  font-size: var(--font-size-3xl);
  color: var(--color-primary);
}

.header-title h2 {
  font-size: var(--font-size-2xl);
  color: var(--color-heading);
  margin-bottom: var(--space-1);
  font-weight: var(--font-weight-bold);
}

.header-title p {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.header-actions {
  display: flex;
  gap: var(--space-3);
}

.btn-primary,
.btn-logout {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-all);
  font-size: var(--font-size-sm);
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--color-primary-light), var(--color-primary-lighter));
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn-logout {
  background: var(--color-surface);
  color: var(--color-error);
  border: 1px solid var(--color-border);
}

.btn-logout:hover {
  background: var(--color-error);
  color: white;
  border-color: var(--color-error);
}

.btn-home {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-all);
  font-size: var(--font-size-sm);
}

.btn-home:hover {
  background: var(--color-secondary);
  color: white;
  border-color: var(--color-secondary);
}

.admin-stats {
  background: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-6) 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.stat-card {
  background: var(--color-surface);
  padding: var(--space-4);
  border-radius: var(--radius-container-outer);
  box-shadow: var(--shadow-base);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  transition: var(--transition-all);
  position: relative;
  overflow: hidden;
}

/* .stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background: var(--color-primary);
} */

.stat-card.featured::before {
  background: var(--color-success);
}

.stat-card.hero::before {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.stat-card:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-wood);
}

.stat-icon {
  font-size: var(--font-size-2xl);
  color: var(--color-primary);
}

.stat-card.featured .stat-icon {
  color: var(--color-success);
}

.stat-card.hero .stat-icon {
  color: #8b5cf6;
}

.stat-content {
  display: flex;
  gap: var(--space-1);
  flex-direction: row;
  align-items: baseline;
}

.stat-number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  line-height: 1;
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  font-weight: var(--font-weight-medium);
}

.admin-content {
  padding: var(--space-8) 0;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }

  .header-actions {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
