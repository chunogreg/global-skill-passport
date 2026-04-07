import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data } = await supabase.from("universities").select("*");
  // console.log("DATA:", data);
  // console.log("ERROR:", error);
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold"> Study Abroad Finder</h1>
      {/* <p className="mt-4">
        Find Universities that match your budget and profile.
      </p> */}
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading . . ."}</pre>
      {/* <Link
        href="/search"
        className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        start searching
      </Link> */}
    </main>
  );
}
