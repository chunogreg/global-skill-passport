import { supabase } from "@/lib/supabase";
// export async function GET() {
//   return Response.json({ message: "API is working" });
// }

export async function POST(req: Request) {
  // interface Err {
  //   err: string;
  // }
  try {
    const body = await req.json();
    console.log("BODY", body);

    //const { discipline, country, budget } = body;

    let query = supabase.from("universities").select("*");

    //apply filter dynamically

    if (body.discipline) {
      query = query.ilike("discipline", `%${body.discipline.trim()}%`);
    }
    if (body.country) {
      query = query.ilike("country", `%${body.country.trim()}%`);
    }
    if (body.degree && body.degree.trim() !== "") {
      query = query.eq("degree", body.degree.trim());
    }
    // if (body.degree) {
    //   query = query.eq("degree", body.degree);
    // }

    // if (body.degree) {
    //   query = query.ilike("degree", `%${body.degree.trim()}%`);
    // }

    if (body.budget) {
      query = query.lte("tuition", body.budget);
    }
    if (body.ielts === true) {
      query = query.eq("ielts_required", false);
    }
    if (body.applicationFee === true) {
      query = query.eq("application_fee", false);
    }
    if (body.scholarships === true) {
      query = query.eq("scholarships", true);
    }

    if (body.sort === "tuition_asc") {
      query = query.order("tuition", { ascending: true });
    } else if (body.sort === "tuition_desc") {
      query = query.order("tuition", { ascending: false });
    }
    console.log("SORT VALUE:", body.sort);
    const { data, error } = await query;

    console.log("DATA: ", data);
    console.log("ERROR: ", error);

    if (error) {
      throw error;
      //return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err: unknown) {
    console.error("FULL ERROR: ", err);
    return Response.json(
      { error: (err as Error).message || "Something went wrong" },
      { status: 400 },
    );
  }
}
