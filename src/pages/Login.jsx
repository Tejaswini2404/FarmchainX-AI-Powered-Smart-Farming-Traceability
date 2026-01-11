import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/api/users/login", { email, password });

      const { token, user } = res.data;

      const role = user.role.toLowerCase();

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      if (setIsAuthenticated) setIsAuthenticated(true);

      // ✅ FIXED ROUTES
      if (role === "farmer") {
        navigate("/farmer/dashboard", { replace: true });
      } else if (role === "customer") {
        navigate("/customer/dashboard", { replace: true });
      } else if (role === "distributor") {
        navigate("/distributor/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }if (role === "admin") {
  navigate("/admin/dashboard", { replace: true });
} else if (role === "farmer") {
  navigate("/farmer/dashboard", { replace: true });
} else if (role === "customer") {
  navigate("/customer/dashboard", { replace: true });
} else if (role === "distributor") {
  navigate("/distributor/dashboard", { replace: true });
} else {
  navigate("/login", { replace: true });
}


    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <input type="email" placeholder="Email" className="border p-3 rounded-lg w-full mb-4"
          value={email} onChange={(e) => setEmail(e.target.value)} required />

        <input type="password" placeholder="Password" className="border p-3 rounded-lg w-full mb-6"
          value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
