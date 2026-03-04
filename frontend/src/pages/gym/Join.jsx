import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createMembership } from '../../api/membershipApi';
import { getPlanById } from "../../api/planApi";

function Join() {
  const { gymSlug, planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    memberName: "",
    memberEmail: "",
    paymentType: "",
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getPlanById(planId);
        setPlan(res.data);
      } catch (error) {
        console.error("Failed to fetch plan", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlan();
  }, [planId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        gymSlug,
        planName: plan?.name,
        memberName: form.memberName,
        memberEmail: form.memberEmail,
        paymentType: form.paymentType,
      };
      await createMembership(payload);
      alert("Membership requested successfully! Waiting for owner approval.");
      navigate("/gyms");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create membership");
    }
  };

  if (loading) return <div className="text-center py-20"><h2>Loading Plan Details...</h2></div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-black mb-4">Complete Your Membership</h1>
            <p className="text-slate-400">You're one step away from joining {gymSlug?.replace(/-/g, ' ')}.</p>
          </div>

          <div className="glass-card p-8 border-l-4 border-indigo-500">
            <div className="text-sm text-slate-500 uppercase tracking-widest font-bold mb-2">Selected Plan</div>
            <h3 className="text-2xl font-bold text-white mb-2">{plan?.name}</h3>
            <div className="text-3xl font-black text-indigo-400 mb-4">${plan?.price}</div>
            <div className="text-slate-300">⏱ {plan?.duration} Days Access</div>
            <p className="text-slate-400 mt-4 text-sm">{plan?.description}</p>
          </div>
        </div>

        <div className="glass-card p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.memberName}
                onChange={(e) => setForm({ ...form, memberName: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.memberEmail}
                onChange={(e) => setForm({ ...form, memberEmail: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Payment Method</label>
              <select
                value={form.paymentType}
                onChange={(e) => setForm({ ...form, paymentType: e.target.value })}
                required
              >
                <option value="">Choose Payment Method</option>
                <option value="online">Online Payment</option>
                <option value="cash">Cash at Gym</option>
              </select>
            </div>
            <button type="submit" className="w-full btn-primary py-4 text-lg">
              Confirm & Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Join;

