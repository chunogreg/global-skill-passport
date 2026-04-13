"use client";
import { NextResponse } from "next/server";
import { useState } from "react";
import { University } from "../types/university";
import { SearchBody } from "../types/search";

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
        reasons.push(`Scholarship available (${uni.scholarship_amount})`);
      }

      return reasons;
    };

    const resultsWithScore = data.map((uni: University) => ({
      ...uni,
      score: calculateScore(uni, body),
      explanation: getExplanation(uni, body),
    }));

    return NextResponse.json({ data: resultsWithScore });

    console.log("WITH SCORE: ", body);
    resultsWithScore.sort((a: University, b: University) => b.score - a.score);

    //setResults(data);
    setResults(resultsWithScore);

    setHasSearched(true);
  };

  return (
    <main className="p-10 max-w-4xl max-auto ">
      <h1 className="text-2xl font-bold">Find Universities Abroud</h1>
      <p className="text-center text-gray-600 mt-2">
        Discover schools that match your budget and qualifications
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-x-4">
        {/* <input
          name="discipline"
          placeholder="Discipline (e.g civil engineering)"
          className="border p-2 w-full rounded"
        /> */}
        <select name="discipline" className="border p-2 w-full rounded">
          <option value="">Select Discipline</option>
          <option value="History">History</option>
          <option value="Environmental Science">Environmental Science</option>
          <option value="Economics">Economics</option>
          <option value="Data Science">Data Science</option>
          <option value="MBA">MBA</option>
          <option value="Nursing">Nursing</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Civil Engineering">Civil Engineering</option>
        </select>

        <select name="country" className="border p-2 w-full rounded">
          <option value="">Select Country</option>
          <option value="Canada">Canada</option>

          <option value="USA">USA</option>
        </select>

        <select name="degree" className="border p-2 w-full rounded">
          <option value="">Degree-Type</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </select>
        {/* 
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
        </select> */}

        <input
          name="budget"
          type="number"
          placeholder="Max Budget (USD)"
          className="border p-2 mb-3 w-full rounded"
        />

        <label className="flex items-center cursor-pointer  ">
          Only show universities where IELTS or TOEFL is not mandatory
          <input type="checkbox" name="ielts" className="w-5 h-5 ml-2" />
        </label>

        <label className="flex items-center cursor-pointer m-0 p-0">
          Only show universities where application fee is not required
          <input
            type="checkbox"
            name="applicationFee"
            className="w-5 h-5 ml-2 "
          />
        </label>

        <label className="flex items-center cursor-pointer m-0">
          Only show universities with scholarships
          <input type="checkbox" name="scholarships" className="w-5 h-5 ml-2" />
        </label>

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
      <div className="flex p-4 mb-2 rounded flex-row mt-2 flex-wrap w-screen">
        {results.map((uni, index) => (
          <div key={index} className="m-4 p-4 border w-80 ">
            <h2 className="text-2xl font-semibold text-blue-950">{uni.name}</h2>

            <p className="mt-3 text-blue-700 text-2xl ml-7">{uni.country}</p>

            <p className="mt-3">
              <strong>Discipline:</strong> {uni.discipline}
            </p>
            <p className="mt-3">
              <strong>Degree:</strong> {uni.degree}
            </p>
            <p className="mt-3">
              <strong>Tuition:</strong> ${uni.tuition}
            </p>
            {/* <p className="mt-3">
              <strong>IELTS or TOEFL required :</strong>
              {uni.ielts_required ? " Yes" : " No"}
            </p>
            <p className="mt-3">
              <strong>Application Fee:</strong>
              {uni.application_fee ? " Yes" : " No"}
            </p>
            <p className="mt-3">
              <strong>Scholarships:</strong> {uni.scholarships ? " Yes" : " No"}
            </p> */}
            <p>Score: {uni.score}</p>
            <p> {uni.score >= 5 ? "⭐ Best Match" : "Good Option"}</p>
            <ul>
              {uni.explanation.map((item: string, i: number) => (
                <li key={i}> {item}</li>
              ))}
            </ul>
            {/* <p className="mt-3">
                <strong>Cost of Living:</strong> {uni.cost_of_living}/month
              </p> */}
          </div>
        ))}
      </div>
    </main>
  );
}
