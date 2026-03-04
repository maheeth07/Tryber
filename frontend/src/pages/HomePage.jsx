import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative z-10 glass-card p-12 max-w-2xl mx-auto">
        <h1 className="mb-6">Tryber</h1>
        <h2 className="text-4xl mb-4 font-bold">Gym Membership Management</h2>
        <p className="text-xl mb-8 max-w-lg mx-auto">
          The all-in-one platform for gym owners to manage memberships and for members to discover their perfect fitness plan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="btn-primary text-lg px-8"
          >
            Owner Platform
          </button>

          <button
            onClick={() => navigate("/gyms")}
            className="btn-outline text-lg px-8 backdrop-blur-md"
          >
            Find a Gym
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
