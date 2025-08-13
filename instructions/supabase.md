Project URL https://nqhzvnagozjgsxwkatmg.supabase.co
 
API Key eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xaHp2bmFnb3pqZ3N4d2thdG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4ODY3MzcsImV4cCI6MjA3MDQ2MjczN30.f7jUBSoWqLOx5yy6T6_wKzWl2_F-HsDsOB01OPOHooY


Javascript code:
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nqhzvnagozjgsxwkatmg.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


Direct connection - postgresql://postgres:[Cdtiybrjd_77]@db.nqhzvnagozjgsxwkatmg.supabase.co:5432/postgres

Transaction pooler - postgresql://postgres.nqhzvnagozjgsxwkatmg:[Cdtiybrjd_77]@aws-0-eu-north-1.pooler.supabase.com:6543/postgres

Session pooler - postgresql://postgres.nqhzvnagozjgsxwkatmg:[Cdtiybrjd_77]@aws-0-eu-north-1.pooler.supabase.com:5432/postgres