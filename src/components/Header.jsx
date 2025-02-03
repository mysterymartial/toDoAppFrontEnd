import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


import { CiSearch } from "react-icons/ci";

const Header = () => {



  return (
    <div className="text-black flex justify-center items-center  h-10 sm:h-16 bg-gray-300">
        
      <div className="sm:max-w-[960px] text-xl ms:bg-slate-50 w-[90%] flex justify-between sm:grid sm:grid-cols-12 gap-4">

        <div className="sm:col-span-2 flex justify-between gap-10  items-center  ">
          <div className="sm:hidden">
            <RxHamburgerMenu />
          </div>
          <div className=" text-2xl text-[#002074] font-black">Todoir</div>
        </div>

        {/* <div className="hidden sm:bg-[#002074] sm:flex sm:rounded-lg sm:col-span-2 justify-center items-center sm:shadow-xl text-white">Add
        <IoMdAdd />

        </div> */}

        <div className="hidden sm:col-span-8 h-full bg-[#F2F0F1]  rounded-full sm:flex items-center px-4 sm:pl-6 ml-10">
          <CiSearch />
          <div className="text-slate-400 text-opacity-25 px-4">
            search for todo
          </div>
        </div>

        <div className="sm:justify-end 
         sm:col-span-2 flex items-center gap-2">
          <div className="sm:hidden relative flex ">
            {/* /<input type="text" placeholder="search for todo"   className="focus:bg-[#F2F0F1] z-10 opacity-0 peer focus:peer focus:opacity-100 focus:placeholder-text-slate-400 focus:placeholder-text-sm focus:px-4 focus:outline-[#002074] focus:border-none focus:rounded-3xl " /> */}
            <div className="peer peer-focus:hidden">
              <CiSearch className=" absolute top-1  bottom-0 right-1 block peer"/>
            </div>
          </div>
          <div>
            <FaRegUserCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
