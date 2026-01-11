import { useEffect, useState } from "react";
import { getAdminDashboard } from "../../services/apiService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading dashboard...</p>;
  }

  const Card = ({ title, value, color }) => (
    <div className={`bg-white shadow rounded-xl p-5 border-l-4 ${color}`}>
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">System Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.totalUsers} color="border-blue-500" />
        <Card title="Farmers" value={stats.totalFarmers} color="border-green-500" />
        <Card title="Customers" value={stats.totalCustomers} color="border-purple-500" />
        <Card title="Distributors" value={stats.totalDistributors} color="border-yellow-500" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
        <Card title="Products" value={stats.totalProducts} color="border-indigo-500" />
        <Card title="Orders" value={stats.totalOrders} color="border-pink-500" />
        <Card
          title="Total Revenue (₹)"
          value={stats.totalRevenue}
          color="border-emerald-600"
        />
      </div>
    </>
  );
}
