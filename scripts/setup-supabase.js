#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env.local')

console.log('🗄️  Capling Supabase Setup')
console.log('==========================\n')
console.log('This script will help you set up Supabase environment variables for Capling.')
console.log('Make sure your local Supabase instance is running with: supabase start\n')

let envContent = ''
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8')
}

// Remove existing Supabase variables
const newEnvContent = envContent
  .split('\n')
  .filter(
    (line) =>
      !line.startsWith('NEXT_PUBLIC_SUPABASE_URL=') &&
      !line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')
  )
  .join('\n')

// Add Supabase configuration for local dev
// Replace <YOUR_LOCAL_ANON_KEY> with your local Supabase anon key
const supabaseConfig = `

# Supabase Configuration (Local Development)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_LOCAL_ANON_KEY>
`

const updatedEnvContent = `${newEnvContent.trim()}${supabaseConfig}`

fs.writeFileSync(envPath, updatedEnvContent.trim() + '\n')
console.log('✅ Supabase environment variables added to .env.local\n')

console.log('🚀 Next steps:')
console.log('1. Start your local Supabase instance: supabase start')
console.log('2. Apply the database migrations: supabase db reset')
console.log('3. Restart your development server: npm run dev')
console.log('4. Create an account and start using Capling!\n')

console.log('💡 Your local Supabase instance will be available at:')
console.log('   - API: http://127.0.0.1:54321')
console.log('   - Studio: http://127.0.0.1:54323')
console.log('   - Database: postgresql://postgres:postgres@127.0.0.1:54322/postgres\n')

