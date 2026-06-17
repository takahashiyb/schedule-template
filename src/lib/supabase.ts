import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kjxwqyohzvhaeuktoewh.supabase.co'
const supabaseAnonKey = 'sb_publishable_YrtPi5q76c7_V6A3Iqd8kw_6bY-f-kd'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
