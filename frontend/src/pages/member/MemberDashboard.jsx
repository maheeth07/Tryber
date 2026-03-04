import React, { useState, useEffect } from "react";
import { getMembershipsByMember } from "../../api/membershipApi";

function MemberDashboard() {
  const [email, setEmail] = useState("");
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMemberships = async (searchEmail) => {
    setLoading(true);
    try {
      const res = await getMembershipsByMember(searchEmail.toLowerCase());
      setMemberships(res.data);
    } catch (error) {
      console.error(error);
      setMemberships([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (email) fetchMemberships(email);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1>Check Membership</h1>

      <form onSubmit={handleSearch}>
        <input
          type="email"
          placeholder="Enter registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          {loading ? "Searching..." : "Check Membership"}
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        {memberships.length === 0 ? (
          <p>No memberships found.</p>
        ) : (
          memberships.map((m) => (
            <div
              key={m._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h3>{m.gym.name}</h3>

              <p>Plan: {m.plan.name}</p>

              <p>
                Expiry:{" "}
                {new Date(m.endDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>

              <p>Status: {m.status}</p>

              <p>
                {m.daysLeft > 0
                  ? `${m.daysLeft} days left`
                  : "Membership expired"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MemberDashboard;