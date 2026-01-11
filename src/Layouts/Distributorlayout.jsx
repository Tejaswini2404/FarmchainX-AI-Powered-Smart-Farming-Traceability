import { NavLink } from "react-router-dom";

export default function DistributorLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">FarmX Distributor</h2>

        <nav className="space-y-3">
          <NavLink to="/distributor/dashboard" className="block hover:text-green-400">Dashboard</NavLink>
          <NavLink to="/distributor/products" className="block hover:text-green-400">Products</NavLink>
          <NavLink to="/distributor/orders" className="block hover:text-green-400">Orders</NavLink>
          <NavLink to="/distributor/suppliers" className="block hover:text-green-400">Suppliers</NavLink>
          <NavLink to="/distributor/insights" className="block hover:text-green-400">Insights</NavLink>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
