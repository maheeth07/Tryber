import React, { useState, useEffect } from "react";
import { getOwnerDashboard } from "../../api/dashboardApi";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getOwnerDashboard();
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error.response?.data);
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center py-20"><h2>Loading Dashboard Data...</h2></div>;
  if (!data || !data.gym) return <div className="text-center py-20"><h2>Gym record not found. Please create a gym first.</h2></div>;

  const stats = [
    { label: "Total Members", value: data.stats.totalMembers, icon: "👥", color: "from-blue-500 to-indigo-600" },
    { label: "Active", value: data.stats.activeMembers, icon: "✅", color: "from-emerald-500 to-teal-600" },
    { label: "Pending", value: data.stats.pendingMembers, icon: "⏳", color: "from-amber-500 to-orange-600" },
    { label: "Expired", value: data.stats.expiredMembers, icon: "⚠️", color: "from-rose-500 to-pink-600" },
    { label: "Total Plans", value: data.stats.totalPlans, icon: "📋", color: "from-violet-500 to-purple-600" },
  ];

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2">{data.gym.name} Dashboard</h1>
        <p className="text-slate-400">Welcome back, manager. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between overflow-hidden relative group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            <div className="relative z-10">
              <div className="text-3xl mb-4">{stat.icon}</div>
              <div className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-4xl font-black text-white">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            📍 Gym Details
          </h3>
          <div className="space-y-4">
            <div>
              <label>Gym Name</label>
              <div className="text-white font-medium">{data.gym.name}</div>
            </div>
            <div>
              <label>Location</label>
              <div className="text-white font-medium">{data.gym.location}</div>
            </div>
            <div>
              <label>Dashboard Slug</label>
              <div className="text-indigo-400 font-mono text-sm">{data.gym.slug}</div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8 flex flex-col justify-center items-center text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2 text-white">Quick Actions</h3>
          <p className="text-slate-400 mb-6 text-sm">Common tasks you might want to perform</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="btn-primary py-2 px-6 text-sm">Add New Plan</button>
            <button className="btn-outline py-2 px-6 text-sm">View All Members</button>
          </div>
        </div>
      </div>
    </div>
  );
}

