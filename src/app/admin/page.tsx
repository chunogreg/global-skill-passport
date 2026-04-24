"use client";
//import { getCurrentUser } from "@/lib/auth";
import { getUserWithRole } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Logout } from "../search/page";

//import { useState } from "react";

const AdminPage = () => {
  // const [text, setText] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { user, role } = await getUserWithRole();
      //const currentUser = data.user;
      setUser(user);
      setRole(role);
      setLoading(false);
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login?redirect=/admin");
      } else if (role !== "admin") {
        router.push("/search"); //🚫 block non-admin
      } else if (role === "admin") {
        router.push("/admin");
      }
    }
  }, [user, role, loading, router]);

  if (loading) return <p>loading . . .</p>;

  interface myEvent {
    //currentTarget: HTMLFormElement;
    target: HTMLFormElement;
    preventDefault: () => void;
  }

  const handleSubmit = async (e: myEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const body = {
      name: formData.get("name"),
      country: formData.get("country"),
      city: formData.get("city"),
      degree: formData.get("degree"),
      tuition: formData.get("tuition"),
      discipline: formData.get("discipline"),
      currency: formData.get("currency"),
      source: formData.get("source"),
      ielts_min_score: formData.get("ielts_min_score"),
      application_fee_amount: formData.get("application_fee_amount"),
      application_start_date: formData.get("application_start_date"),
      application_end_date: formData.get("application_end_date"),
      scholarship_amount: formData.get("scholarship_amount"),

      // ielts_required: formData.get("ielts") === "on",
      // scholarships: formData.get("scholarships") === "on",

      // discipline: formData.get("discipline"),

      // budget: Number(formData.get("budget")) || null,
    };

    await fetch("/api/admin/add-university", {
      method: "POST",
      //headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    // if (!res.ok) {
    //   const errorText = await res.text();
    //   console.error("Request failed: ", res.status, errorText);
    //   return;
    // }

    //const data = await res.json();

    // setText("");
    e.target.reset();
  };

  return (
    <>
      <span className="flex justify-end hover:text-amber-600 active:text-lg pt-3 pb-0 pr-20 text-2xl">
        <Logout />
      </span>
      <form onSubmit={handleSubmit} className="mt-6 space-x-4">
        <div className="ml-14">
          <h1 className="text-2xl pb-6">Admin Dashboard</h1>
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="name"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="University name"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="country"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Country"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2  rounded"
            name="city"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="City"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="tuition"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Tuition"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="degree"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Degree of Study"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="discipline"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Discipline"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="currency"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Currency"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="source"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Source"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="ielts_min_score"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="IELTS or TOEFL minimum score"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="application_fee_amount"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Application fee amount"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="application_start_date"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Application start date"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="application_end_date"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Application end date"
          />
          <input
            type="text"
            className="border p-2 w-200 h-7 mb-2 rounded"
            name="scholarship_amount"
            // value={text}
            // onChange={(e) => setText(e.target.value)}
            placeholder="Scholarship amount"
          />
          <br />
          <button
            type="submit"
            className="bg-blue-500 text-white mt-4 px-4 py-2 active:scale-110 "
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminPage;
