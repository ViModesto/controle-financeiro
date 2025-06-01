// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = "https://oovvqckbjobhnynjeiew.supabase.co";
// const supabaseAnonKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdnZxY2tiam9iaG55bmplaWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NTAyMDQsImV4cCI6MjA2NDIyNjIwNH0.r99vENMvxb5ozK-YxAVFzew-KwifRzeeLi_Gzklm3aQ";


// // Função auxiliar para verificar se o usuário está logado
// export const getCurrentUser = async () => {
//   const { data: { user } } = await supabase.auth.getUser()
//   return user
// }

// // Função para fazer logout
// export const signOut = async () => {
//   const { error } = await supabase.auth.signOut()
//   return { error }
// }





// export const supabase = createClient(supabaseUrl, supabaseAnonKey);


import { createClient } from '@supabase/supabase-js'

// Suas credenciais do Supabase
const supabaseUrl = "https://oovvqckbjobhnynjeiew.supabase.co" // Ex: https://abc123.supabase.co
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vdnZxY2tiam9iaG55bmplaWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NTAyMDQsImV4cCI6MjA2NDIyNjIwNH0.r99vENMvxb5ozK-YxAVFzew-KwifRzeeLi_Gzklm3aQ"; // Sua chave pública

// Verificar se as variáveis estão definidas
console.log('🔍 Supabase URL:', supabaseUrl)
console.log('🔍 Supabase Key:', supabaseAnonKey ? 'Definida' : 'NÃO DEFINIDA')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Credenciais do Supabase não configuradas!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Função para testar a conexão
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact' })
    
    console.log('Teste de conexão:', { data, error })
    return { success: !error, error }
  } catch (err) {
    console.error('Erro no teste:', err)
    return { success: false, error: err }
  }
}

// Função auxiliar para verificar se o usuário está logado
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Função para fazer logout
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}


