import React, { useEffect, useState } from "react";
import DistributorLayout from "../../Layouts/DistributorLayout";
import API from "../../api/api";

const StatCard = ({ title, value, sub }) => (
  <div className="bg-white border rounded-2xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-black mt-2">{value}</h2>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          API.get("/orders/my"),
          API.get("/products/wholesale"),
        ]);

        setOrders(ordersRes.data || []);
        setProducts(productsRes.data || []);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === "PENDING"
  ).length;

  const avgGrade = () => {
    const grades = products
      .map((p) => p.qualityGrade)
      .filter(Boolean);

    if (grades.length === 0) return "N/A";

    const score = grades.reduce(
      (sum, g) => sum + (g === "A" ? 3 : g === "B" ? 2 : 1),
      0
    );

    const avg = score / grades.length;
    return avg >= 2.5 ? "A" : avg >= 1.5 ? "B" : "C";
  };

  return (
    <DistributorLayout>
      <h1 className="text-2xl font-black mb-6">
        🚚 Distributor Dashboard
      </h1>

      {loading && <p>Loading dashboard...</p>}

      {!loading && (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Orders"
              value={totalOrders}
              sub="All time"
            />
            <StatCard
              title="Pending Orders"
              value={pendingOrders}
              sub="Awaiting farmer response"
            />
            <StatCard
              title="Wholesale Products"
              value={products.length}
              sub="Available now"
            />
            <StatCard
              title="Avg AI Quality"
              value={avgGrade()}
              sub="Across listings"
            />
          </div>

          {/* ALERTS */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800">
              🔔 <b>Market Insight:</b> Tomato & Onion demand is increasing.
              Consider bulk purchase this week.
            </p>
          </div>

          {/* RECENT ORDERS */}
          <div className="bg-white border rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-lg mb-4">
              Recent Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No orders placed yet
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-gray-500">
                  <tr>
                    <th className="text-left py-2">Product</th>
                    <th className="text-center">Qty</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-t">
                      <td className="py-2">{o.productName}</td>
                      <td className="text-center">{o.quantity} kg</td>
                      <td className="text-center">
                        <span
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            o.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : o.status === "CONFIRMED"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </DistributorLayout>
  );
};

export default Dashboard;
