import React, { useContext } from "react";
import "./main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    newChat,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p className="head" onClick={() => newChat()}>
          Gemini
        </p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Good Evening</span>
              </p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card" onClick={()=>{input === "Suggest some beautiful places to see on an upcoming road trip" ? setInput('') : setInput("Suggest some beautiful places to see on an upcoming road trip")}}>
                <p>
                  Suggest some beautiful places to see on an upcoming road trip
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card" onClick={()=>{input === "Briefly summarize this concept: urban planning" ? setInput('') : setInput("Briefly summarize this concept: urban planning")}}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card" onClick={()=>{input === "Brainstorm team bonding activities for our work retreat" ? setInput('') : setInput("Brainstorm team bonding activities for our work retreat")}}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card" onClick={()=>{input === "Improve the readability of the following code" ? setInput('') : setInput("Improve the readability of the following code")}}>
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Genimi may display incorrect info, including about people, so
            double-check its Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default main;
