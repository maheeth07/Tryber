import React, { useEffect, useState } from 'react';
import { getOwnerMemberships, approveMembership } from '../../api/membershipApi';

function Members() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
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
    fetchMembers();
  }, []);

  const handleApprove = async (member) => {
    try {
      await approveMembership({
        gymSlug: localStorage.getItem("gymSlug"),
        memberEmail: member.memberEmail,
        planName: member.plan.name
      });
      fetchMembers();
    } catch (error) {
      console.error(error.response?.data);
      alert("Approval failed");
    }
  };

  if (loading) return <div className="text-center py-20"><h2>Loading Members...</h2></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2">Members</h1>
        <p className="text-slate-400">Manage your gym members and approve new requests.</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 italic">
                <th className="p-4 font-semibold text-slate-300">Member</th>
                <th className="p-4 font-semibold text-slate-300">Plan</th>
                <th className="p-4 font-semibold text-slate-300">Status</th>
                <th className="p-4 font-semibold text-slate-300">Expiry</th>
                <th className="p-4 font-semibold text-slate-300 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {memberships.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">No members found yet.</td>
                </tr>
              ) : (
                memberships.map((m) => (
                  <tr key={m._id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white">{m.memberName}</div>
                      <div className="text-xs text-slate-500">{m.memberEmail}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-300">{m.plan.name}</div>
                      <div className="text-xs text-slate-500">${m.plan.price}</div>
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
                    <td className="p-4">
                      <div className="text-sm text-slate-300">{new Date(m.endDate).toLocaleDateString()}</div>
                      <div className="text-xs text-indigo-400 font-semibold">{m.daysLeft} days left</div>
                    </td>
                    <td className="p-4 text-right">
                      {m.status === "Pending" && (
                        <button
                          onClick={() => handleApprove(m)}
                          className="btn-primary py-1 px-4 text-xs shadow-indigo-500/40"
                        >
                          Approve
                        </button>
                      )}
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

export default Members;

