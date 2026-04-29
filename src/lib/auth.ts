import { supabase } from "../../utils/supabase/client";

export const logout = async () => {
  return await supabase.auth.signOut();
};
// export const getCurrentUser = async () => {
//   return await supabase.auth.getUser();
// };
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
