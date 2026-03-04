import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../api/authApi';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser(form);
      alert(res.data.message || 'Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://images.unsplash.com/photo-1571902258032-78a999377495?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"></div>
      <div className="glass-card p-12 max-w-md w-full relative z-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-3xl font-black mb-2">Join Tryber</h1>
          <p className="text-slate-400">Start your fitness journey or manage your gym.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Display Name</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
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
              placeholder="Create a strong password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Registration Type</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            >
              <option value="member">I am a Member</option>
              <option value="owner">I am a Gym Owner</option>
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-lg mt-4">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;


