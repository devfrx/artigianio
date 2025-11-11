<template>
  <div class="home-view">
    <HeroSection
      :title="heroData.title"
      :slogan="heroData.slogan"
      :description="heroData.description"
      :hero-image="heroProduct?.image_url || heroData.fallbackImage"
    />

    <ProductGallery :products="featuredProducts" />

    <AboutSection :artisan="artisan" />

    <ContactSection :contact="contact" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import HeroSection from '@/components/HeroSection.vue'
import ProductGallery from '@/components/ProductGallery.vue'
import AboutSection from '@/components/AboutSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import { useProductsStore } from '@/stores/productsStore'

const productsStore = useProductsStore()

// ✅ Usa storeToRefs per mantenere la reattività
const { featuredProducts, heroProduct } = storeToRefs(productsStore)

onMounted(() => {
  productsStore.fetchProducts()
})

// Dati statici... (resto uguale)
const heroData = {
  title: 'Artigian(i)o',
  slogan: 'Fatto a mano non vuol dire fatto a meno',
  description:
    'Creazioni uniche realizzate interamente a mano, con tecniche tradizionali. Ogni pezzo racconta una storia di dedizione e maestria.',
  fallbackImage: 'https://i.ibb.co/N6VLsTd8/plantsshelve2.jpg',
}

const artisan = {
  name: 'Vincenzo Como',
  description:
    'Si effettuano piccoli e medi lavori di falegnameria su misura, ristrutturazione di artigianato in legno. Ogni pezzo è realizzato con passione e attenzione ai dettagli, utilizzando tecniche tradizionali.',
  photo: '/images/artisan-photo.jpg',
  skills: ['Restauro', 'Finitura naturale', 'Lavorazione su misura', 'Creatività'],
  experience: 25,
}

const contact = {
  email: 'rollbar@live.it',
  phone: '+39 346 660 0424',
  address: "Via dell'Artigianato 123, Milano",
  social: {
    // Instagram: 'https://instagram.com/artigianato_legno',
    Facebook: 'https://facebook.com/artigianato.legno',
  },
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}
</style>
