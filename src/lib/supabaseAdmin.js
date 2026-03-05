import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY // ⚠️ server-only
);


export const deleteUser = async (userId) => {
  console.log(userId)
  supabaseAdmin.auth.admin.deleteUser(userId)
    .then(({ data, error }) => {
      if (error) {
        console.error('Error deleting user:', error);
      } else {
        console.log('User deleted:', data);
      }
    });
}