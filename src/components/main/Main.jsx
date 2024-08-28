import { useContext, useRef } from "react";
import { assets } from "../../assets/assets";
import "./main.css";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const sendButtonRef = useRef(null);

  const handleCardClick = (promptText) => {
    setInput(promptText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (sendButtonRef.current) {
        sendButtonRef.current.click();
      }
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img
          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
          alt=""
        />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>Hello , User </span>
              </p>
              <p>How Can I Help You Today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleCardClick("Suggest Some Place To Visit In Kerala")
                }
              >
                <p>Suggest Some Place To Visit In Kerala </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick(
                    "Brainstorm team bonding activities for our work retreat"
                  )
                }
              >
                <p>Brainstorm team bonding activities for our work retreat </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleCardClick("How to Create a Gyroscope using Disc?")
                }
              >
                <p>How to Create a Gyroscope using Disc?</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div
                className="card"
                onClick={() => {
                  handleCardClick(
                    "Create a Script for the youtube video about coding "
                  );
                }}
              >
                <p>Create a Script for the youtube video about coding </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img
                src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                alt=""
              />
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
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter the Prompt Here"
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img
                src={assets.send_icon}
                alt=""
                onClick={() => {
                  onSent();
                }}
                ref={sendButtonRef}
              />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its responses.{" "}
              <a href="https://support.google.com/gemini/answer/13594961?visit_id=638488069169109558-2959892032&p=privacy_notice&rd=1#privacy_notice">
                Your privacy & Gemini Apps
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
