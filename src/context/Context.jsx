import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 10 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResults(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResults(true);

    try {
      let response = "";
      if (prompt !== undefined) {
        response = await runChat(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await runChat(input);
      }

      let responseArray = response.split("**");
      let newResponse = "";
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }
      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split("");
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + "");
      }

    } catch (error) {
      if (error.message.includes("RATE_LIMIT_EXCEEDED")) {
        console.error("Rate limit exceeded. Please wait and try again.");
      } else {
        console.error("Error while running chat:", error);
      }
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    input,
    setInput,
    showResults,
    loading,
    resultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
