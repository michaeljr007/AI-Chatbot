import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[21vh] mx-4">
        <h1 className="font-bold text-[1.4rem]">ChatGPT: Online AI Chatbot</h1>
        <p className="pr-5 mt-3">
          ChatGPT is an AI-powered language model developed by OpenAI. It has
          been trained on a massive amount of text data from the internet and
          can generate human-like text responses to a given prompt. It can
          answer questions, converse on a variety of topics, and generate
          creative writing pieces.
        </p>

        <div className="mt-[1.5rem] text-center">
          <Link to={"/chatbot"}>
            <button className="bg-white hover:bg-gray-100 text-black w-[99%] py-[0.6rem] text-[1.06rem] font-semibold rounded-sm">
              Open Chat
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
