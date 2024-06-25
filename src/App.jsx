import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Chatbot from "./pages/Chatbot";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    fakeDataFetch();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
