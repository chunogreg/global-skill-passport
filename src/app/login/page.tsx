"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { login } from "@/lib/auth";
//import { supabase } from "@/lib/supabaseClient";
import { supabase } from "../../../utils/supabase/client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      return;
    }
    const { data: sessionData } = await supabase.auth.getSession();
    if (sessionData?.session) {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="p-6 pt-2 border rounded w-80 ">
        <div className="flex justify-end gap-38">
          <h2 className="text-xl mb-4 pt-4">Login</h2>
          <button
            className="mb-8 hover:bg-gray-100 px-3 active:text-lg cursor-pointer"
            onClick={() => router.push("/")}
          >
            Close
          </button>
        </div>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white p-2  hover:bg-blue-600 active:text-lg cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
