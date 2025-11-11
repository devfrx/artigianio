import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipi TypeScript per il database
export interface Product {
  id: number
  name: string
  description: string
  image_url: string
  material: string
  price: string
  is_featured: boolean
  is_hero: boolean
  created_at: string
  updated_at: string
}

export interface ProductInsert {
  name: string
  description: string
  image_url: string
  material: string
  price: string
  is_featured?: boolean
  is_hero?: boolean
}
