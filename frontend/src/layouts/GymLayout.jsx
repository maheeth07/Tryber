import React from 'react';
import { Outlet, Link, useParams } from "react-router-dom";
import FloatingChatBot from "../components/FloatingChatBot";
function GymLayout() {
  const { gymSlug } = useParams();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to={`/gym/${gymSlug}`} className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-200 bg-clip-text text-transparent uppercase tracking-tighter">
            {gymSlug?.replace(/-/g, ' ')}
          </Link>
          <nav className="flex gap-6 items-center">
            <Link to="/gyms" className="text-slate-300 hover:text-white transition-colors">All Gyms</Link>
            <Link to={`/gym/${gymSlug}`} className="text-slate-300 hover:text-white transition-colors">Plans</Link>
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

export default GymLayout;

