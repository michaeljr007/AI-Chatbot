import React from "react";
import loader from "../assets/img/chatgpt-logo.jpg";

const Loader = () => {
  return (
    <div>
      <img
        src={loader}
        alt=""
        className="ml-[42vw] md:ml-[45.5vw]  mt-[33vh] w-[4rem] md:w-[6.6rem] rounded-[50%]"
      />
    </div>
  );
};

export default Loader;
