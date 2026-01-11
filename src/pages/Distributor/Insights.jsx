import React, { useEffect, useState } from "react";
import DistributorLayout from "../../Layouts/DistributorLayout";
import API from "../../api/api";

const Insights = () => {
  const [stats, setStats] = useState({
    products: 0,
    avgPrice: 0,
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("/api/products/wholesale", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      const products = res.data || [];
      const totalPrice = products.reduce((s, p) => s + p.price, 0);

      setStats({
        products: products.length,
        avgPrice:
          products.length > 0
            ? (totalPrice / products.length).toFixed(2)
            : 0,
      });
    });
  }, []);

  return (
    <DistributorLayout>
      <h1 className="text-2xl font-black mb-6">📊 Market Insights</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Wholesale Products</h3>
          <p className="text-3xl font-black">{stats.products}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Average Price</h3>
          <p className="text-3xl font-black">₹{stats.avgPrice}/kg</p>
        </div>
      </div>
    </DistributorLayout>
  );
};

export default Insights;
