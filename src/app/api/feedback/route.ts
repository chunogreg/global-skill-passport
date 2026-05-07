import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
export async function POST(req: Request) {
  const { rating, message } = await req.json();

  const { error } = await supabase
    .from("feedback")
    .insert([{ rating, message }]);
  if (error) {
    console.error("Error inserting feedback:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
  return NextResponse.json({ success: true });
}
