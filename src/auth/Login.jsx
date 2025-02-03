import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!form.userName.trim() || !form.password.trim()) {
      toast.error("Username and password are required");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/todo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        const userData = data.data;
        localStorage.setItem('user', JSON.stringify({
          userName: userData.userName,
          email: userData.email,
          token: userData.token,
          isLocked: userData.isLocked,
          activities: userData.activities || []
        }));

        toast.success("Login successful!");
        navigate('/todo');
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-50 px-6 min-h-screen p-4 flex items-center justify-center">
      <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-3xl items-center p-4">
        <div className="md:w-2/4 mb-2 p-3 rounded-2xl items-center px-16">
          <h2 className="font-bold text-2xl text-[#002074]">Login</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 border rounded-xl focus:outline-none focus:border-[#002074]"
              type="text"
              name="userName"
              placeholder="Username"
              value={form.userName}
              onChange={handleChange}
              required
            />

            <div className="relative">
              <input
                className="w-full p-2 rounded-xl border focus:outline-none focus:border-[#002074]"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <MdOutlineRemoveRedEye 
                className="absolute top-[30%] right-3 text-gray-400 cursor-pointer hover:text-[#002074]"
                onClick={togglePasswordVisibility}
              />
            </div>

            <button 
              type="submit" 
              className="bg-[#002074] text-white rounded-lg hover:scale-105 duration-300 py-2 disabled:opacity-50 disabled:hover:scale-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center">
            <p className="w-[60%]">Don't have an account?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-105 duration-300">
              <a href="/register">Register</a>
            </button>
          </div>
        </div>

        <div className="md:block hidden w-2/4">
          <img
            className="rounded-2xl"
            src="/images/login-side.jpg"
            alt="Login side"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
