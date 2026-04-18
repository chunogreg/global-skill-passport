"use client";
import { NextResponse } from "next/server";
import { useState } from "react";
import { University } from "./types/university";
import { SearchBody } from "./types/search";

export default function SearchPage() {
  const [results, setResults] = useState<University[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // const parseBoolean = (value: FormDataEntryValue | null) => {
  //   if (value === "true") return true;
  //   if (value === "false") return false;
  //   return null;
  // };

  interface myEvent {
    target: HTMLFormElement;
    preventDefault: () => void;
  }

  const handleSubmit = async (e: myEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      discipline: formData.get("discipline") as string,
      country: formData.get("country") as string,
      degree: formData.get("degree") as string,
      budget: Number(formData.get("budget")) || null,
      // ielts: formData.get("ielts") === "on",

      // applicationFee: formData.get("applicationFee") === "on",

      // scholarships: formData.get("scholarships") === "on",
      sort: formData.get("sort"),
    };

    setLoading(true);

    const res = await fetch("/api/search", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await res.json();
    const data = response.data;

    console.log("DATA is here: ", data);

    if (!Array.isArray(data)) {
      console.error("Data is not array:", data);
      return;
    }

    setLoading(false);

    const calculateScore = (university: University, body: SearchBody) => {
      let score = 0;

      if (body.budget) {
        if (university.tuition <= body.budget) {
          score += 5; //🎯Budget (highest priority)
        } else if (university.tuition <= body.budget * 1.2) {
          score += 2;
        }
      }
      //🎯 IELTS (Lower requirement is better)

      if (university.ielts_min_score === 0) {
        score += 3; // no IELTS reqired
      } else if (university.ielts_min_score <= 6.0) {
        score += 2;
      } else if (university.ielts_min_score <= 6.5) {
        score += 1;
      }

      // 🎯 Application fee (Lower is better)
      if (university.application_fee_amount === 0) {
        score += 3; // no IELTS reqired
      } else if (university.application_fee_amount <= 50) {
        score += 2;
      } else if (university.application_fee_amount <= 100) {
        score += 1;
      }

      //🎯Scholarship (higher is better)

      if (university.scholarship_amount > 0) {
        score += 2;
        if (university.scholarship_amount >= 5000) {
          score += 1;
        }
        if (university.scholarship_amount >= 10000) {
          score += 1;
        }
      }

      return score;
    };

    const getExplanation = (uni: University, body: SearchBody) => {
      const reasons = [];
      if (body.budget && uni.tuition <= body.budget) {
        reasons.push("Within your budget");
      }

      if (uni.ielts_min_score === 0) {
        reasons.push("No IELTS or TOEFL required");
      } else if (uni.ielts_min_score <= 6.5) {
        reasons.push(`Low IELTS requirement (${uni.ielts_min_score}) `);
      }

      if (uni.application_fee_amount === 0) {
        reasons.push(" No application fee  ");
      } else if (uni.application_fee_amount <= 50) {
        reasons.push("Low application fee");
      }

      if (uni.scholarship_amount > 0) {
        reasons.push(
          `Scholarship: Up to ($ ${uni.scholarship_amount.toLocaleString("en-us")} )`,
        );
      }

      return reasons;
    };

    const resultsWithScore = data.map((uni: University) => ({
      ...uni,
      score: calculateScore(uni, body),
      explanation: getExplanation(uni, body),
    }));

    //return NextResponse.json({ data: resultsWithScore });

    console.log("WITH SCORE: ", body);
    resultsWithScore.sort((a: University, b: University) => b.score - a.score);

    //setResults(data);
    setResults(resultsWithScore);

    setHasSearched(true);
    return NextResponse.json({ data: resultsWithScore });
  };

  return (
    <main className="p-10  max-auto bg-background ">
      <div className="max-w-4xl">
        <h1 className="text-2xl font-bold">Find Universities Abroad</h1>
        <p className="text-center text-gray-700 mt-2">
          Discover schools that match your budget and qualifications
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label>Discipline</label>
          <select
            name="discipline"
            className="border p-2 w-full rounded mb-3 text-gray-600 "
          >
            <option value="" className="text-gray-400">
              Select Discipline
            </option>
            <option value="History">History</option>
            <option value="Environmental Science">Environmental Science</option>
            <option value="Economics">Economics</option>
            <option value="Data Science">Data Science</option>
            <option value="MBA">MBA</option>
            <option value="Nursing">Nursing</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Artificial Intelligence">
              {" "}
              Artificial Intelligence{" "}
            </option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <label>Country</label>
          <select
            name="country"
            className="border p-2 w-full rounded mb-3  text-gray-600"
          >
            <option value="" className="text-gray-600">
              Select Country
            </option>
            <option value="Canada">Canada</option>

            <option value="USA">USA</option>
            <option value="Australia">Australia</option>
            <option value="Germany">Germany</option>
          </select>

          <label>Degree</label>
          <select
            name="degree"
            className="border p-2 w-full rounded mb-3  text-gray-600 "
          >
            <option value="">Degree-Type</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
          </select>

          <label>Budget (USD)</label>

          <input
            name="budget"
            type="number"
            placeholder="Max Budget (USD)"
            className="border p-2 mb-3 w-full rounded"
          />

          <select name="sort" className="border p-2 w-full rounded mt-3">
            <option value="">Sort By</option>
            <option value="tuition_asc">Cheapeast Tuition</option>
            <option value="tuition_desc"> Most Expensive</option>
          </select>

          <button
            disabled={loading}
            className="bg-blue-500 text-white mt-4 mb-5 px-4 py-2"
          >
            {loading ? "Searching . . ." : "Search"}
          </button>
        </form>
        {/* {loading && <p className="mt-3 mb-3">Searching . . .</p>} */}

        {results && results.length === 0 && hasSearched && (
          <p className=" text-red-500">
            No university found, Try adjusting your filters.
          </p>
        )}
        <div className="flex p-4 rounded-2xl shadow-md mb-4 flex-row mt-2 flex-wrap w-screen">
          {results.map((uni, index) => (
            <div
              key={index}
              className="m-4 p-4 border-2 border-gray-300  bg-gray-100 rounded-2xl mb-4 w-68 shadow-2xl "
            >
              <h2 className="text-lg font-bold text-gray-700 text-center">
                {uni.name}
              </h2>
              <p className="mt-3 text-gray-500">
                {" "}
                {uni.city}, {uni.country}
              </p>

              {/*             
            <p className="mt-3">
              <strong>Discipline:</strong> {uni.discipline}
            </p>
            <p className="mt-3">
              <strong>Degree:</strong> {uni.degree}
            </p>
            <p className="mt-3">
              <strong>Tuition:</strong> ${" "}
              {uni.tuition.toLocaleString("en-us")}{" "}
            </p>
            <p className="mt-3">
              <strong>IELTS minimum score:</strong> {uni.ielts_min_score}
            </p>
            <p className="mt-3">
              <strong>Scholarship:</strong> $
              {uni.scholarship_amount.toLocaleString("en-us")}
            </p>
            <p className="mt-3">
              <strong>Application Fee: </strong>$ {uni.application_fee_amount}
            </p>
            <p className="mt-3">
              <strong>Application Starts: </strong>
              {uni.application_start_date}
            </p>
            <p className="mt-3">
              <strong>Application Deadline: </strong>
              {uni.application_end_date}
            </p>

            <p className="mt-3">
              <strong> Apply here:</strong>{" "}
              <a
                className="text-blue-500 hover:underline hover:text-amber-600"
                href={uni.url}
              >
                Online application
              </a>{" "}
            </p>
            <br /> */}
              <p className="mt-2">
                {uni.score >= 7 ? (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                    ⭐ Best Match
                  </span>
                ) : uni.score >= 4 ? (
                  " 👍 Good Match"
                ) : (
                  " ℹ️ Consider "
                )}
              </p>
              <ul className="mt-2 text-sm text-gray-700">
                {uni.explanation.map((item: string, i: number) => (
                  <li key={i}> ✔ {item}</li>
                ))}
              </ul>

              <div className="mt-3 text-sm">
                <p>Tuition: $ {uni.tuition.toLocaleString()} / year</p>
                <p>
                  Cost of Living: $ {uni.cost_of_living.toLocaleString()} /
                  month
                </p>
                <p>Application fee: $ {uni.application_fee_amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
