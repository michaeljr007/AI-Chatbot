import { useState } from "react";
import loaderImg from "../assets/img/chatgpt-logo.jpg";
import { FaBars, FaTimes, FaArrowUp, FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import QuestionItem from "../components/QuestionItem";
import ResponseItem from "../components/ResponseItem";
import { Link } from "react-router-dom";

function Chatbot() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [responseHistory, setResponseHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let questionInput = document.getElementById("question-input");
    // Clear input
    questionInput.value = "";

    let responseList = document.getElementById("response-list");

    responseList.innerHTML = `
      <li>
          <div class="bg-zinc-800 p-5 ml-[-0.6rem] rounded-lg">
            <div class="bg-gray-400 w-[95%] h-[2rem] rounded-lg animate-pulse"></div>
          </div>
      </li>
    `;

    try {
      const response = await axios.post(
        "https://chatbot-server-2qto.onrender.com/response",
        {
          prompt,
        }
      );
      const { msg } = response.data;

      // Update response and history
      setResponse(msg);
      setResponseHistory((prevHistory) => [
        ...prevHistory,
        { question: prompt, answer: msg },
      ]);

      // Clear input and prompt
      setPrompt("");
      setError(null);
    } catch (error) {
      console.error("Error generating response:", error);
      setError("Failed to get a response. Please try again.");
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
    setResponse(""); // Clear response when typing new question
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div
      className={`flex min-h-screen overflow-x-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-0 z-50 w-64 p-6 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <img
          src={loaderImg}
          alt="Logo"
          className="w-10 mx-auto mb-12 rounded-full"
        />
        <ul className="space-y-6">
          <li className="cursor-pointer" onClick={() => setSidebarOpen(false)}>
            <Link to={"/"}>
              <span
                className={`${darkMode ? "bg-gray-900" : "bg-gray-200"} ${
                  darkMode ? "text-white" : "text-black"
                } px-[1.7rem] py-[0.6rem] rounded-md`}
              >
                Home
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Fixed Header and Icons */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-opacity-70 bg-gray-900 md:bg-transparent p-4 z-50">
        {/* Toggle Button */}
        <button
          className="bg-gray-800 text-white md:hidden p-2 rounded-full"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Heading */}
        <h1 className="text-lg md:text-4xl md:ml-[55vw] lg:ml-[53vw] font-bold text-center mx-auto">
          GPT
        </h1>

        {/* Dark Mode Toggle */}
        <button
          className="bg-gray-800 text-white p-2 rounded-full"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 pt-16 p-8 ${
          darkMode ? "bg-gray-900" : "bg-white"
        } ml-0 md:ml-0`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Response History */}
          {!prompt && responseHistory.length === 0 ? (
            <img
              src={loaderImg}
              className="w-[16%] md:w-[9%] lg:w-[5%] rounded-[50%] ml-[42.5%] md:ml-[43%] mt-[21.7vh] animate-pulse border border-black"
              alt=""
            />
          ) : (
            <div className="mt-11">
              <ul className="response-list max-[450px]:ml-[-0.8rem] mb-8 pb-6 overflow-y-auto max-h-[33vh]">
                {responseHistory.map((item, index) => (
                  <div key={index} className="mb-4">
                    <QuestionItem
                      question={item.question}
                      darkMode={darkMode}
                    />
                    <ResponseItem response={item.answer} />
                  </div>
                ))}
              </ul>
            </div>
          )}

          {/* Current Question and Response */}
          <div>
            <ul
              id="response-list"
              className="response-list mb-8 max-[450px]:ml-[-0.5rem] pb-6"
            >
              {response && (
                <li>
                  <ResponseItem response={response} />
                </li>
              )}
            </ul>
          </div>

          {/* Form for New Question */}
          <form
            className="p-[0.75rem] w-[90vw] fixed bottom-4 z-40 mt-[64vh] shadow-lg rounded-2xl flex"
            onSubmit={handleSubmit}
          >
            <textarea
              className={`mt-1 w-full md:w-[50%] md:ml-8 lg:ml-[9rem] h-[2.7rem] overflow-scroll pl-4 pt-[0.4rem] border rounded-lg ${
                darkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-200 text-black border-gray-400"
              }`}
              placeholder="Ask me anything"
              id="question-input"
              onChange={handlePromptChange}
              onKeyDown={handleKeyDown}
            />
            <button
              className="bg-white border border-black ml-2 rounded-[50%] text-black px-[1.05rem] py-4"
              type="submit"
              aria-label="Submit"
            >
              <FaArrowUp className="text-lg" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
