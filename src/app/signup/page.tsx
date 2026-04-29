"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../utils/supabase/client";
//import { signUp } from "@/lib/auth";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      alert("Check your email to confirm signup");
      router.push("/login");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSignup} className="p-6 border rounded w-80 ">
        <h2 className="text-xl mb-4">Sign Up</h2>

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
        <button className="w-full bg-green-500 text-white p-2">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
