import React from "react";
import { Outlet, Link } from "react-router-dom";
import FloatingChatBot from "../components/FloatingChatBot";
function PlatformLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
            Tryber
          </Link>
          <nav className="flex gap-6 items-center">
            <Link
              to="/member/check"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Check Membership
            </Link>
            <Link to="/gyms" className="text-slate-300 hover:text-white transition-colors">Find Gyms</Link>
            <Link to="/member/auth" className="btn-outline py-2 px-4 text-sm">Owner Login</Link>
            <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>

          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="py-8 border-t border-white/10 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Tryber Platform. All fitness reserved.
      </footer>
      <FloatingChatBot />
    </div>
  );
}

export default PlatformLayout;
