import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY // ⚠️ server-only
);


export const deleteUser = async (email) => {
  try {
    // 1️⃣ List all users in Supabase Auth
    const { data: authUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();

    console.log("Auth users:", authUsers, "List error:", listError);
    if (listError) {
      console.error("Error listing users:", listError.message);
      return;
    }

    // 2️⃣ Find the user by email
    const user = authUsers.users.find(u => u.email === email);

    if (!user) {
      console.warn(`User with email "${email}" not found in Auth.`);
      return;
    }

    // 3️⃣ Delete the user by ID
    const { data, error } = await supabaseAdmin.auth.admin.deleteUser(user.id);

    if (error) {
      console.error("Error deleting user:", error.message);
    } else {
      console.log("User deleted from Auth:", data);
    }

    // 4️⃣ Optionally delete from your users table
    const { error: tableError } = await supabaseAdmin
      .from("users")
      .delete()
      .eq("email", email);

    if (tableError) {
      console.error("Error deleting user from table:", tableError.message);
    } else {
      console.log("User deleted from users table");
    }

  } catch (err) {
    console.error("Unexpected error:", err);
  }
};