import React, { useEffect, useState } from "react";
import DistributorLayout from "../../Layouts/DistributorLayout";
import API from "../../api/api";

const SummaryCard = ({ title, value }) => (
  <div className="bg-white border rounded-2xl p-5 shadow-sm">
    <p className="text-sm text-gray-500">{title}</p>
    <h2 className="text-2xl font-black mt-2">{value}</h2>
  </div>
);

const getStatusStyle = (status) => {
  if (status === "DELIVERED")
    return "bg-green-100 text-green-700";
  if (status === "CONFIRMED")
    return "bg-blue-100 text-blue-700";
  if (status === "REJECTED")
    return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders/my");
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to load orders", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === "PENDING"
  ).length;
  const deliveredOrders = orders.filter(
    (o) => o.status === "DELIVERED"
  ).length;

  const totalValue = orders.reduce(
    (sum, o) => sum + (o.totalPrice || 0),
    0
  );

  return (
    <DistributorLayout>
      <h1 className="text-2xl font-black mb-6">📑 My Orders</h1>

      {loading && <p>Loading orders...</p>}

      {!loading && (
        <>
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <SummaryCard title="Total Orders" value={totalOrders} />
            <SummaryCard title="Pending Orders" value={pendingOrders} />
            <SummaryCard title="Delivered Orders" value={deliveredOrders} />
            <SummaryCard
              title="Total Order Value"
              value={`₹${totalValue}`}
            />
          </div>

          {/* ORDERS TABLE */}
          {orders.length === 0 ? (
            <p className="text-gray-500">
              No orders placed yet
            </p>
          ) : (
            <div className="bg-white border rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-4 text-left">Order ID</th>
                    <th className="p-4 text-left">Product</th>
                    <th className="p-4 text-center">Quantity (kg)</th>
                    <th className="p-4 text-center">Total (₹)</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      className="border-t hover:bg-gray-50"
                    >
                      <td className="p-4">#{o.id}</td>
                      <td className="p-4">{o.productName}</td>
                      <td className="p-4 text-center">
                        {o.quantity}
                      </td>
                      <td className="p-4 text-center">
                        ₹{o.totalPrice}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded text-xs font-bold ${getStatusStyle(
                            o.status
                          )}`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {o.createdAt
                          ? new Date(o.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </DistributorLayout>
  );
};

export default Orders;
