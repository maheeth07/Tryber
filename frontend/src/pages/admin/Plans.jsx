import React, { useState, useEffect } from 'react';
import { getOwnerPlans, createPlan } from "../../api/planApi";

function Plans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        price: "",
        duration: "",
        description: ""
    });

    const fetchPlans = async () => {
        try {
            const res = await getOwnerPlans();
            setPlans(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error.response?.data);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPlan(form);
            setForm({
                name: "",
                price: "",
                duration: "",
                description: ""
            });
            fetchPlans();
            alert("Plan created successfully!");
        } catch (error) {
            console.error(error.response?.data);
            alert("Failed to create plan");
        }
    };

    if (loading) return <div className="text-center py-20"><h2>Loading Plans...</h2></div>;

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black mb-2">Membership Plans</h1>
                    <p className="text-slate-400">Design and manage your gym's membership offerings.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* CREATE FORM */}
                <div className="lg:col-span-1">
                    <div className="glass-card p-8 sticky top-32">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            ✨ Create New Plan
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Plan Name</label>
                                <input
                                    placeholder="e.g. Platinum Annual"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label>Price ($)</label>
                                    <input
                                        type="number"
                                        placeholder="99"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Duration (days)</label>
                                    <input
                                        type="number"
                                        placeholder="365"
                                        value={form.duration}
                                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Description</label>
                                <textarea
                                    placeholder="What's included?"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows="3"
                                />
                            </div>
                            <button type="submit" className="w-full btn-primary py-3">
                                Publish Plan
                            </button>
                        </form>
                    </div>
                </div>

                {/* LIST */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.length === 0 ? (
                            <div className="col-span-full glass-card p-12 text-center text-slate-500 italic">
                                No plans created yet. Start by filling out the form.
                            </div>
                        ) : (
                            plans.map((plan) => (
                                <div key={plan._id} className="glass-card p-6 border-l-4 border-indigo-500">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                        <div className="text-2xl font-black text-indigo-400">${plan.price}</div>
                                    </div>
                                    <div className="text-sm text-slate-300 font-semibold mb-4 bg-white/5 py-1 px-3 rounded-lg inline-block">
                                        ⏱ {plan.duration} Days
                                    </div>
                                    <p className="text-sm text-slate-400 line-clamp-3">
                                        {plan.description || "No description provided."}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plans;

