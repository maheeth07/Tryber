import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginOwner } from "../../api/authApi";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginOwner(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === 'owner') {
        localStorage.setItem("gymSlug", res.data.gymSlug);
        navigate(res.data.gymSlug ? `/admin/${res.data.gymSlug}/dashboard` : "/create-gym");
      } else {
        localStorage.setItem("userEmail", res.data.user.email);
        navigate("/member/dashboard");
      }
    } catch (error) {
      console.error("Login error", error.response?.data);
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
      <div className="glass-card p-12 max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-3xl font-black mb-2">Welcome Back</h1>
          <p className="text-slate-400">Login to access your fitness portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-lg">
            {loading ? "Authenticating..." : "Login to Platform"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

