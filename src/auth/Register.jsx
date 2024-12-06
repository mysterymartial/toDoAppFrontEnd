import React, {useState} from "react";
import axios  from "axios";
import {toast} from "react-toastify";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router";

const Register = () => {

  const navigate = useNavigate();

  const [form,setForm] = useState({email:"", userName:"", password:""}) 
  const [loading, setLoading] = useState(false);
  const handleChange = (event)=>{
    const {name,value} = event.target; 
    setForm({
      ...form,
      [name]: value,
      
    });
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleRegister = async(e)=>{
    e.preventDefault()
    console.log(form)
    
    if(!validateEmail(form.email)){
      toast.error("please enter a valid email")
      return;
    }
    setLoading(true);
    try{
      console.log("34567ytgfhu")
      const response = await axios.post("http://localhost:8080/api/todo/register",form)
      console.log(response.status)
      if(response.status == 200){
        navigate("/todo")
      }
      console.log(response)

    }catch(error){
      console.error("Error details:", error.response?.data || error)
      if (error.response && error.response.data) {
        if (error.response.data.message === "Username already exists") {
          toast.error("The username is already taken, please choose a different one.");
        } else {
          toast.error(error.response.data.message || "Registration failed.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
      
  }
  return (
    <div className="bg-gray-50 px-6 min-h-screen p-4  flex items-center justify-center">
      <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-3xl  items-center p-4 flex-row-reverse">
        <div className="md:w-2/4 mb-2 p-3 rounded-2xl items-center px-16 ">
          <h2 className="font-bold text-2xl text-[#002074]  ">Signup</h2>

          <form onSubmit={handleRegister} action="" className="flex flex-col gap-4 ">
            <input
              className="p-2 mt-8 border rounded-xl"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            /> 

            <div className="relative">
              <input
                className="w-full p-2 rounded-xl border"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required

              />

              <MdOutlineRemoveRedEye className="absolute top-[30%] right-3 text-gray-400" />
            </div>

              <input
                className="w-full p-2 rounded-xl border"
                type="username"
                name="userName"
                id="username"
                placeholder="username"
                value={form.userName}
                onChange={handleChange}
              />

            <button type="submit" className="bg-[#002074] text-white rounded-lg hover:scale-110 duration-300 py-2">
              Register
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center">
            <p className="w-[60%]">If you are already a member, easily log in </p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 ">
            <a href="/login">Login</a>
            </button>
          </div>

        </div>

        <div className="md:block hidden  w-2/4 ">
          <img
            className="rounded-2xl"
            src="/images/login-side.jpg"
            alt=""
          />
        </div>

      </div>
    </div>
  );
};

export default Register;
