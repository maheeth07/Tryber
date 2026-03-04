import React from 'react';
import { Outlet, Link } from "react-router-dom";
import FloatingChatBot from "../components/FloatingChatBot";
function MemberLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
            Tryber Member
          </Link>
          <nav className="flex gap-6 items-center">
            <Link to="/gyms" className="text-slate-300 hover:text-white transition-colors">Browse Gyms</Link>
            <Link to="/member/dashboard" className="text-slate-300 hover:text-white transition-colors">My Memberships</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-6 py-12">
        <Outlet />
      </main>
      <FloatingChatBot />
    </div>
  );
}

export default MemberLayout;

