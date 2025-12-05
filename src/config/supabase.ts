import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://aieccfvrulclrqsizxyr.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZWNjZnZydWxjbHJxc2l6eHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4OTcwNjgsImV4cCI6MjA4MDQ3MzA2OH0.7NLuTTjq1Bv8peL3xRSZXcPp9po2jbaz9J7eDRcV9_s';

// 값이 없을 때를 대비한 안전한 초기화
let supabaseInstance: any = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });
  } catch (error) {
    console.error('Failed to create Supabase client:', error);
  }
} else {
  console.warn(
    'Supabase is not configured. Please create .env file with SUPABASE_URL and SUPABASE_ANON_KEY',
  );
}

// 더미 객체 생성 (에러 방지용)
if (!supabaseInstance) {
  supabaseInstance = {
    auth: {
      getSession: async () => ({data: {session: null}, error: null}),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      }),
      signInWithPassword: async () => ({
        data: null,
        error: {message: 'Supabase not configured'},
      }),
      signUp: async () => ({
        data: null,
        error: {message: 'Supabase not configured'},
      }),
      signOut: async () => ({error: null}),
    },
  };
}
export const supabase = supabaseInstance;
