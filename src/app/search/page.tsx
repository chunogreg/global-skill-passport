"use client";
import { useState } from "react";

export default function SearchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      discipline: formData.get("discipline"),
      country: formData.get("country"),
      degree: formData.get("degree"),
      budget: Number(formData.get("budget")) || null,

      ielts:
        formData.get("ielts") === "" ? null : formData.get("ielts") === true,
      applicationFee:
        formData.get("applicationFee") === ""
          ? null
          : formData.get("applicationFee") === true,

      scholarship:
        formData.get("scholarship") === ""
          ? null
          : formData.get("scholarship") === true,
    };

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Request failed: ", res.status, errorText);
      return;
    }

    const data = await res.json();
    setResults(data.data);

    setHasSearched(true);
  };

  return (
    <main className="p-10 max-w-4xl max-auto ">
      <h1 className="text-2xl font-bold">Find Universities Abroud</h1>
      <p className="text-center text-gray-600 mt-2">
        Discover schools that match your budget and qualifications
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-x-4">
        <input
          name="discipline"
          placeholder="Discipline (e.g civil engineering)"
          className="border p-2 w-full rounded"
        />

        <select name="country" className="border p-2 w-full rounded">
          <option value="">Select Country</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
          <option value="Spain">Spain</option>
          <option value="China">China</option>
          <option value="Japan">Japan</option>
          <option value="USA">USA</option>
          <option value="France">France</option>
          <option value="Italy">Italy</option>
          <option value="UAE">UAE</option>
          <option value="Egypt">Egypt</option>
          <option value="Quatar">Quatar</option>
          <option value="Finland">Finland</option>
        </select>

        <select name="Degree" className="border p-2 w-full rounded">
          <option value="">Degree Type</option>
          <option value="Bachelors">Undergraduate</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>

        <select name="ielts" className="border p-2 w-full rounded">
          <option value="">IELTS Requirement</option>
          <option value="true">IELT or TOEFL required</option>
          <option value="false"> No IELTS or TOEFL</option>
        </select>

        <select name="applicationFee" className="border p-2 w-full rounded">
          <option value="">Application Fee</option>
          <option value="true">Is required</option>
          <option value="false"> Not Required</option>
        </select>

        <select name="scholarships" className="border p-2 w-full rounded">
          <option value="">Scholarship</option>
          <option value="true">Available</option>
          <option value="false"> Not Available</option>
        </select>

        {/* <input
          name="country"
          placeholder="Country"
          className="border p-2 w-full"
        />
*/}
        <input
          name="budget"
          type="number"
          placeholder="Max Budget (USD)"
          className="border p-2 w-full rounded"
        />

        <select name="sort" className="border p-2 w-full rounded mt-2">
          <option value="">Sort By</option>
          <option value="tuition_asc">Cheapeast Tuition</option>
          <option value="tuition_desc"> Most Expensive</option>
        </select>

        {/* <label className="flex items-center gap-2">
          <input type="checkbox" name="ielts" value="false" />
          No IELTS required
        </label> */}

        <button
          disabled={loading}
          className="bg-blue-500 text-white mt-4 px-4 py-2"
        >
          {loading ? "Searching . . ." : "Search"}
        </button>
      </form>
      {/* {loading && <p className="mt-3 mb-3">Searching . . .</p>} */}
      <div className="mt-8">
        {results && results.length === 0 && hasSearched && (
          <p className=" text-red-500">
            No university found, Try adjusting your filters.
          </p>
        )}

        {results.map((uni, index) => (
          <div key={index} className="border p-4 mb-2 rounded">
            <h2 className="text-2xl font-semibold">{uni.name}</h2>

            <p className="mt-3 text-gray-600">{uni.country}</p>

            <div>
              {" "}
              <p className="mt-3">
                <strong>Discipline:</strong> {uni.discipline}
              </p>
              <p className="mt-3">
                <strong>Degree:</strong> {uni.degree}
              </p>
              <p className="mt-3">
                <strong>Tuition:</strong> ${uni.tuition}
              </p>
              <p className="mt-3">
                <strong>IELTS or TOEFL required :</strong>
                {uni.ielts_required ? " Yes" : " No"}
              </p>
              <p className="mt-3">
                <strong>Application Fee:</strong>
                {uni.application_fee ? " Yes" : " No"}
              </p>
              <p className="mt-3">
                <strong>Scholarships:</strong>{" "}
                {uni.scholarships ? " Yes" : " No"}
              </p>
              <p className="mt-3">
                <strong>Cost of Living:</strong> {uni.cost_of_living}/month
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
