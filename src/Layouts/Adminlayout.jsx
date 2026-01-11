import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white hidden md:block">
        <div className="p-6 text-xl font-bold border-b border-green-700">
          🌱 FarmXChain
        </div>

        <nav className="p-4 space-y-3">
          <a href="/admin/dashboard" className="block p-2 rounded hover:bg-green-700">
            Dashboard
          </a>
          <a href="#" className="block p-2 rounded hover:bg-green-700">
            Users
          </a>
          <a href="#" className="block p-2 rounded hover:bg-green-700">
            Products
          </a>
          <a href="#" className="block p-2 rounded hover:bg-green-700">
            Orders
          </a>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
