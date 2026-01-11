import React, { useState, useEffect } from "react";
import CustomerLayout from "../../Layouts/CustomerLayout";
import API from "../../api/api";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Customer",
    email: "",
    role: "CUSTOMER",
    joinedDate: new Date().toLocaleDateString()
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Assuming you have an endpoint to get current user info
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Could not fetch profile details", err);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Account Settings</h1>
          <p className="text-gray-500">Manage your profile and account preferences</p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Cover Header */}
          <div className="h-32 bg-gradient-to-r from-green-400 to-green-600"></div>
          
          <div className="px-8 pb-8">
            <div className="relative -top-12 flex items-end gap-6">
              <div className="h-28 w-28 bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-xl">
                <div className="h-full w-full bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-4xl">
                  👤
                </div>
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                <p className="text-green-600 font-bold text-sm uppercase tracking-wider">Verified {user.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 pb-2">
                    {user.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Member Since</label>
                  <p className="text-lg font-medium text-gray-700 dark:text-gray-200 border-b dark:border-gray-700 pb-2">
                    {user.joinedDate}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Total Orders</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm">Reward Points</span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-black">450</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-gray-800 dark:bg-gray-700 text-white py-3 rounded-xl font-bold text-sm hover:bg-black transition-all">
                  Edit Profile Information
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/20">
          <h3 className="text-red-600 font-bold mb-2">Danger Zone</h3>
          <p className="text-sm text-red-500/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="text-red-600 font-bold text-sm hover:underline">Delete Account</button>
        </div>
      </div>
    </CustomerLayout>
  );
};

export default Profile;