import React from "react";

const CreateTodo = () => {
  return (
    <div className="px-6 py-16 sm:max-w-[960px] w-[90%]  h-[100px] overflow-scroll overscroll-none ">

      <form action="" className=" mb-16">
        <div className="relative flex-wrap">
          <input
            className="text-xs sm:text-lg w-full px-4 py-3 rounded-[800px] border  "
            type="email"
            name="email"
            id="email"
            placeholder="write anything and hit enter to add"
          />
          <button className="absolute top-0 right-0 bg-[#002074] rounded-[800px] text-white h-full px-16">
            ADD
          </button>
        </div>
      </form>

    </div>
  );
};

export default CreateTodo;
