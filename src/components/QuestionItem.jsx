import React from "react";

const QuestionItem = ({ question, darkmode }) => {
  return (
    <>
      <li className="response-item pl-[1.3rem] w-[80vw] md:w-[80%] md:ml-[20%] pr-[1.3rem] mb-4 rounded-lg ml-14 bg-zinc-600 py-[1.5rem]">
        <p
          className={`response-paragraph w-[100%] break-words ${
            darkmode ? "text-black" : "text-white"
          }`}
        >
          {question}
        </p>
      </li>
    </>
  );
};

export default QuestionItem;
