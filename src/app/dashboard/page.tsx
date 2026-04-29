"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../../../utils/supabase/client";

const DashboardRedirect = () => {
  const router = useRouter();
  // const supabase = createClientInstance();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData?.session) {
        router.push("/login");
        return;
      }
      const userId = sessionData.session.user.id;
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (profile?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/search");
      }
    };

    handleRedirect();
  }, [router]);

  return <p>Redirecting...</p>;
};

export default DashboardRedirect;
