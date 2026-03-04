import { Link, useParams, Outlet, useLocation } from "react-router-dom";
import FloatingChatBot from "../components/FloatingChatBot";

function AdminLayout() {
  const { gymSlug } = useParams();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "dashboard", icon: "📊" },
    { name: "Calendar", path: "calendar", icon: "📅" },
    { name: "Members", path: "members", icon: "👥" },
    { name: "Plans", path: "plans", icon: "📋" },
    { name: "Payments", path: "payments", icon: "💰" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/10 backdrop-blur-xl bg-white/5 flex flex-col">
        <div className="p-8">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
            Tryber Admin
          </Link>
          <div className="mt-2 text-xs text-slate-500 uppercase tracking-widest font-semibold">
            Gym Management
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {menu.map((item) => {
            const active = location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={`/admin/${gymSlug}/${item.path}`}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-medium
                ${active
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full btn-outline flex items-center justify-center gap-2 py-2 text-sm border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/40"
          >
            退出 Logout
          </button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-slate-950/40">
        <div className="container mx-auto p-12 max-w-6xl">
          <Outlet />
        </div>
      </main>
      <FloatingChatBot />
    </div>
  );
}

export default AdminLayout;
