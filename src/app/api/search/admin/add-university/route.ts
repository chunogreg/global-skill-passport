import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const POST = async (req: Request) => {
  const body = await req.json();

  const { data, error } = await supabase.from("universities").insert([body]);
  if (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 400 });
  }

  if (req.headers.get("authorization") !== "my-secret-key") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ data });
};
