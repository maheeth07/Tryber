import React, { useEffect, useState } from "react";
import { getOwnerMemberships } from "../../api/membershipApi";

function Calender() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const res = await getOwnerMemberships();
        setMemberships(res.data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load memberships");
      } finally {
        setLoading(false);
      }
    };
    fetchMemberships();
  }, []);

  if (loading) return <div className="text-center py-20"><h2>Loading Calendar...</h2></div>;
  if (error) return <div className="text-center py-20 text-red-400"><h2>{error}</h2></div>;

  return (
    <div>
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2">Membership Deadlines</h1>
        <p className="text-slate-400">Track upcoming expiries and notify your members.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.length === 0 ? (
          <div className="col-span-full glass-card p-20 text-center text-slate-500 italic text-xl">
            No memberships found.
          </div>
        ) : (
          memberships.map((m) => {
            const expiryDate = m.endDate
              ? new Date(m.endDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              : "N/A";
            const daysLeft = typeof m.daysLeft === "number" ? m.daysLeft : 0;

            let statusColor = "";
            let statusBadge = "";
            let borderColor = "";

            if (daysLeft === 0) {
              statusColor = "text-rose-400";
              statusBadge = "bg-rose-500/20";
              borderColor = "border-rose-500/20";
            } else if (daysLeft <= 7) {
              statusColor = "text-amber-400";
              statusBadge = "bg-amber-500/20";
              borderColor = "border-amber-500/20";
            } else {
              statusColor = "text-emerald-400";
              statusBadge = "bg-emerald-500/20";
              borderColor = "border-emerald-500/20";
            }

            return (
              <div
                key={m._id}
                className={`glass-card p-6 border-l-4 ${borderColor} relative overflow-hidden group`}
              >
                <div className={`absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-125 transition-transform duration-500`}>
                  {daysLeft === 0 ? "⌛" : "🕒"}
                </div>

                <h3 className="text-xl font-bold text-white mb-2 truncate">
                  {m.memberName || "Unknown Member"}
                </h3>

                <p className="text-sm text-slate-400 mb-6 truncate italic">
                  {m.memberEmail || "No Email Provided"}
                </p>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Expires On</div>
                    <div className="text-white font-medium">{expiryDate}</div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor} ${statusBadge}`}>
                    {daysLeft === 0 ? "EXPIRED" : `${daysLeft} DAYS LEFT`}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Calender;
