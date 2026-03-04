import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getPlansByGym } from '../../api/planApi';

function GymHome() {
  const { gymSlug } = useParams();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPlansByGym(gymSlug).then((res) => {
      setPlans(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [gymSlug]);

  if (loading) return <div className="text-center py-20"><h2>Loading Plans...</h2></div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 uppercase tracking-tight">Choose Your Plan</h1>
        <p className="text-xl text-slate-400">Unlock your potential with our flexible membership options</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.length === 0 ? (
          <p className="col-span-full text-center py-20 text-slate-500">No membership plans available for this gym yet.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan._id} className="glass-card p-8 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-8xl">💎</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="text-5xl font-black text-indigo-400 mb-2">
                ${plan.price}
                <span className="text-sm font-medium text-slate-500">/total</span>
              </div>
              <p className="text-slate-300 font-semibold mb-6">{plan.duration} Days Access</p>

              <div className="w-full h-[1px] bg-white/10 mb-6"></div>

              <p className="text-slate-400 mb-8 flex-1">
                {plan.description || "Full access to our gym facilities and expert trainers."}
              </p>

              <button
                onClick={() => navigate(`/gym/${gymSlug}/join/${plan._id}`)}
                className="w-full btn-primary py-4 text-lg"
              >
                Join Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GymHome;

