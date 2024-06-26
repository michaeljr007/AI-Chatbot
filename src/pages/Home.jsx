import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[21vh] md:mt-[27vh] mx-4 md:mx-10 w-[90vw] h-[100vh]">
        <h1 className="font-bold text-[1.4rem]">ChatGPT: Online AI Chatbot</h1>
        <p className="pr-1 md:pr-[7rem] lg:pr-[27rem] mt-3">
          ChatGPT is an AI-powered language model developed by OpenAI. It has
          been trained on a massive amount of text data from the internet and
          can generate human-like text responses to a given prompt. It can
          answer questions, converse on a variety of topics, and generate
          creative writing pieces.
        </p>

        <div className="mt-[2rem] text-center md:text-left animate-pulse">
          <Link to={"/chatbot"}>
            <button className="bg-white hover:bg-gray-100 text-black w-[99%] md:w-[25%] py-[0.6rem] text-[1.06rem] font-semibold rounded-sm">
              Open Chat
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
