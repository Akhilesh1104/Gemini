import { createContext, useState } from "react";
import run from "../gemini";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState(""); // To track user sets any input or Not
  const [recentPrompt, setRecentPrompt] = useState(""); // To Display the Title of the search Operation
  const [showResult, setShowResult] = useState(false); // To Check is there any Result available or not?
  const [loading, setLoading] = useState(false); // To check Page Loading durnig Search Operation
  const [resultData, setResultData] = useState(""); // To Store the Result

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(input);
    const response = await run(input);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 == 0) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    input,
    setInput,
    onSent,
    loading,
    resultData,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
