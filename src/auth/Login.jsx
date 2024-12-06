import React,{useState} from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router";
import axios  from "axios";


const Login = () => {
  const navigate = useNavigate();
  const[form,setForm] = useState({userName:"",password:""})
  const handleChange = (event)=>{
    const {name,value} = event.target;
    setForm({
      ...form,
      [name]: value,
      
    });
  }
  const handleLogin = async(e)=>{
    e.preventDefault()
    console.log(form)
    try{
      console.log("34567ytgfhu")
      const response = await axios.post("http://localhost:8080/api/todo/login",form)
      console.log(response.status)
      if(response.status == 200){
        navigate("/todo")
      }
      console.log(response)

    }catch(error){
      console.error(error.response || error)
    }
      
  }
  
  return (
    <div className="bg-gray-50 px-6 min-h-screen p-4  flex items-center justify-center">
      <div className="bg-gray-300 flex rounded-2xl shadow-lg max-w-3xl  items-center p-4 ">

        <div className="md:w-2/4 mb-2 p-3 rounded-2xl items-center px-16 ">

          <h2 className="font-bold text-2xl text-[#002074]  ">Login</h2>

          <p className="text-xs mt-4 w-auto text-[#002074]">
            If you are already a member, easily log in
          </p>

          <form action=""  onSubmit={handleLogin}className="flex flex-col gap-4 ">
            <input
              className="p-2 mt-8 border rounded-xl"
              type="username"
              name="userName"
              id="username"
              placeholder="username"
              value={form.userName}
              onChange={handleChange}
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
              />

              <MdOutlineRemoveRedEye className="absolute top-[30%] right-3 text-gray-400" />
            </div>

            <button className="bg-[#002074] text-white rounded-lg hover:scale-110 duration-300 py-2">
              Login
            </button>
          </form>

          <div className="mt-3 text-xs flex justify-between items-center">
            <p className="w-[60%]">If you don't have an account... </p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 ">
            <a href="/signup">Register</a>
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

export default Login;
