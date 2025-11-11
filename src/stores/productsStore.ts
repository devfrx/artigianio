import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase, type Product, type ProductInsert } from '@/lib/supabase'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed per prodotti specifici con debug
  const featuredProducts = computed(() => {
    const featured = products.value.filter((p) => p.is_featured).slice(0, 4)
    console.log('🎯 Featured products:', featured.length, featured)
    return featured
  })

  const heroProduct = computed(() => {
    const hero = products.value.find((p) => p.is_hero)
    console.log('🦸 Hero product:', hero)
    return hero
  })

  // Fetch tutti i prodotti
  const fetchProducts = async () => {
    try {
      loading.value = true
      error.value = null

      console.log('📡 Fetching products from Supabase...')

      const { data, error: supabaseError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (supabaseError) throw supabaseError

      products.value = data || []
      console.log('✅ Products loaded:', products.value.length, products.value)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Errore nel caricamento'
      console.error('❌ Errore fetch prodotti:', err)
    } finally {
      loading.value = false
    }
  }

  // Aggiungi nuovo prodotto
  const addProduct = async (productData: ProductInsert) => {
    try {
      loading.value = true
      error.value = null

      console.log('➕ Adding product:', productData)

      // Se è hero, rimuovi hero da altri prodotti
      if (productData.is_hero) {
        await supabase.from('products').update({ is_hero: false }).neq('id', 0)
      }

      const { data, error: supabaseError } = await supabase
        .from('products')
        .insert([productData])
        .select()
        .single()

      if (supabaseError) throw supabaseError

      products.value.unshift(data)
      console.log('✅ Product added:', data)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Errore nell'aggiunta"
      console.error('❌ Errore aggiunta prodotto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Aggiorna prodotto
  const updateProduct = async (id: number, updates: Partial<ProductInsert>) => {
    try {
      loading.value = true
      error.value = null

      // Se è hero, rimuovi hero da altri prodotti
      if (updates.is_hero) {
        await supabase.from('products').update({ is_hero: false }).neq('id', id)
      }

      const { data, error: supabaseError } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (supabaseError) throw supabaseError

      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        products.value[index] = data
      }

      console.log('✅ Product updated:', data)
      return data
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Errore nell'aggiornamento"
      console.error('❌ Errore aggiornamento prodotto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Elimina prodotto
  const deleteProduct = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const { error: supabaseError } = await supabase.from('products').delete().eq('id', id)

      if (supabaseError) throw supabaseError

      products.value = products.value.filter((p) => p.id !== id)
      console.log('✅ Product deleted:', id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Errore nell'eliminazione"
      console.error('❌ Errore eliminazione prodotto:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Upload immagine
  const validateImageUrl = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  return {
    products,
    loading,
    error,
    featuredProducts,
    heroProduct,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    validateImageUrl, // Aggiungi questo
  }
})
