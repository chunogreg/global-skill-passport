"use client";

const AdminPage = () => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      name: formData.get("name"),
      country: formData.get("country"),
      city: formData.get("city"),
      degree: formData.get("degree"),
      tuition: formData.get("tuition"),
      ielts_required: formData.get("ielts") === "on",
      scholarships: formData.get("scholarships") === "on",

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
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-x-4">
      <div>
        <input
          className="border p-2 w-200 h-7 mb-2 rounded"
          name="name"
          placeholder="University name"
        />
        <input
          className="border p-2 w-200 h-7 mb-2 rounded"
          name="country"
          placeholder="Country"
        />
        <input
          className="border p-2 w-200 h-7 mb-2  rounded"
          name="city"
          placeholder="City"
        />
        <input
          className="border p-2 w-200 h-7 mb-2 rounded"
          name="tuition"
          placeholder="Tuition"
        />
        <label className="flex items-center cursor-pointer  ">
          IELTS or TOEFL Required
          <input className="w-5 h-5 ml-2" type="checkbox" name="ielts" />
        </label>
        <label className="flex items-center cursor-pointer  ">
          Scholarships Available
          <input className="w-5 h-5 ml-2" type="checkbox" name="ielts" />
        </label>
        <label className="flex items-center cursor-pointer  ">
          Application fee Required
          <input
            className="w-5 h-5 ml-2"
            type="checkbox"
            name="applicationFee"
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white mt-4 px-4 py-2">
          Add
        </button>
      </div>
    </form>
  );
};

export default AdminPage;
