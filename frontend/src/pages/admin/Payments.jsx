import React, { useState, useEffect } from 'react';
import { getOwnerMemberships } from '../../api/membershipApi';

function Payments() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await getOwnerMemberships();
      setMemberships(res.data);
      setLoading(false);
    } catch (error) {
      console.error(error.response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  if (loading) return <div className="text-center py-20"><h2>Loading Payment Records...</h2></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Revenue & Payments</h1>
        <p className="text-slate-400">Track all incoming payments and subscription statuses.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 italic">
                <th className="p-4 font-semibold text-slate-300">Transaction ID</th>
                <th className="p-4 font-semibold text-slate-300">Member</th>
                <th className="p-4 font-semibold text-slate-300">Amount</th>
                <th className="p-4 font-semibold text-slate-300">Method</th>
                <th className="p-4 font-semibold text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {memberships.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">No payment records found.</td>
                </tr>
              ) : (
                memberships.map((m) => (
                  <tr key={m._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-indigo-400">#{m._id.slice(-8).toUpperCase()}</td>
                    <td className="p-4 text-white font-medium">{m.memberName}</td>
                    <td className="p-4">
                      <span className="text-emerald-400 font-bold">${m.plan.price}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded bg-white/5 text-xs text-slate-300 border border-white/10 uppercase">
                        {m.paymentType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                        ${m.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                          m.status === 'Pending' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-rose-500/20 text-rose-400'}`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;

