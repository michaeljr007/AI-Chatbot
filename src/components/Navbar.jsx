import React from "react";
import logo1 from "../assets/img/chatgpt-logo.jpg";

// Navbar component
const Navbar = () => {
  // Function to handle the toggle of the navbar in mobile view
  const handleToggle = (e) => {
    console.log("Clicked");

    // Selecting DOM elements for the navbar and lines for the toggle button
    const navbar = document.querySelector(".navbar");
    const firstLine = document.querySelector(".first-line");
    const secondLine = document.querySelector(".second-line");
    const thirdLine = document.querySelector(".third-line");

    // Toggling the rotation class on the lines of the toggle button
    firstLine.classList.toggle("rotate");
    secondLine.classList.toggle("rotate");
    thirdLine.classList.toggle("rotate");

    // Toggling the visibility of the navbar
    if (navbar.classList.contains("hidden")) {
      navbar.classList.remove("hidden");
      navbar.classList.add("block");
    } else {
      navbar.classList.remove("block");
      navbar.classList.add("hidden");
    }
  };

  return (
    <div className="flex justify-between px-[5rem] py-[0.7rem] md:py-[1rem] bg-gray-800 fixed top-0 w-[100vw] z-50">
      {/* Logo and Title */}
      <div className=" items-center">
        <img
          src={logo1}
          alt=""
          className="w-[7rem] ml-[-4rem] mt-[-0.2rem] md:mt-3 rounded-[50%]"
        />
      </div>

      {/* Mobile navbar toggle button */}
      <div
        onClick={handleToggle}
        className="md:hidden text-white nav-toggle mt-[0.4rem] mr-[-2.8rem]"
      >
        <div className="first-line"></div>
        <div className="second-line"></div>
        <div className="third-line"></div>
      </div>

      {/* Navbar links */}
      <ul className="hidden bg-gray-800 max-[450px]:z-10 max-[450px]:p-[1rem] ml-[-4.9rem] md:ml-0 max-[450px]:h-[60vh] max-[450px]:w-[98vw] md:bg-transparent mt-[3.45rem] md:mt-[0rem] navbar md:flex gap-[3rem] pt-[0.5rem] max-[450px]:absolute">
        <li className="text-white max-[450px]:mb-[0.6rem] py-4  max-[450px]:border-b max-[450px]:border-t max-[450px]:border-gray-500">
          <a className="no-underline" href="#about">
            What is ChatGPT
          </a>
        </li>

        <li className="text-white max-[450px]:mb-[0.6rem] py-4 max-[450px]:border-b max-[450px]:border-gray-500">
          <a href="#use" className="no-underline ">
            How to use
          </a>
        </li>

        <li className="text-white max-[450px]:mb-[0.6rem] py-4 max-[450px]:border-b max-[450px]:border-gray-500">
          <a href="#faq" className="no-underline ">
            FAQ
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
