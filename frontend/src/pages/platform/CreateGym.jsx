import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGym } from "../../api/gymApi";

function CreateGym() {
  const [form, setForm] = useState({
    name: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createGym(form);
      localStorage.setItem("gymSlug", res.data.slug);
      alert("Gym created successfully!");
      navigate(`/admin/${res.data.slug}/dashboard`);
    } catch (error) {
      console.error(error.response?.data);
      alert(error.response?.data?.message || "Failed to create gym");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="glass-card p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🏢</div>
          <h1 className="text-3xl font-black mb-2">Create Your Gym</h1>
          <p className="text-slate-400">Launch your fitness empire in seconds.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Gym Name</label>
            <input
              type="text"
              placeholder="e.g. Iron Paradise"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Location</label>
            <input
              type="text"
              placeholder="e.g. Downtown Los Angeles"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-lg">
            {loading ? "Creating..." : "Create Gym & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGym;
