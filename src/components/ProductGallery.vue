<template>
  <section id="products" class="products-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Il Catalogo Creazioni</h2>
        <p class="section-subtitle">
          Ogni pezzo è unico, realizzato a mano con passione e dedizione
        </p>
      </div>

      <!-- Debug: mostra il numero di prodotti -->
      <div v-if="products.length === 0" class="no-products">
        <p>Nessun prodotto in vetrina al momento.</p>
        <p>
          <small
            >Aggiungi prodotti dall'<a href="/admin"
              >area amministrativa (Solo Amministratore)</a
            ></small
          >
        </p>
      </div>

      <div v-else class="products-grid">
        <ProductCard v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '@/lib/supabase'

interface Props {
  products: Product[]
}

defineProps<Props>()
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
  text-align: center;
  padding: var(--space-16) var(--space-8);
  color: var(--color-text-muted);
}

.no-products a {
  color: var(--color-primary);
  text-decoration: none;
}

.no-products a:hover {
  text-decoration: underline;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
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
}

@media (max-width: 480px) {
  .products-grid {
    gap: var(--space-4);
  }
}
</style>
