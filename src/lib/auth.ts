import { supabase } from "./supabaseClient";

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const login = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const logout = async () => {
  return await supabase.auth.signOut();
};
// export const getCurrentUser = async () => {
//   return await supabase.auth.getUser();
// };

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();

  return { data: { user: data.session?.user ?? null }, error };
};

export const getUserWithRole = async () => {
  const { data: sessionData } = await supabase.auth.getSession();

  const user = sessionData.session?.user;

  if (!user) return { user: null, role: null };

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return { user, role: data?.role || "user" };
};
