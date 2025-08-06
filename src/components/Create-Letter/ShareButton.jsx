import "./ShareButton.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loadingIcon from "../../assets/icons/loading-blue.svg"; 

function ShareButton({
  letterText,
  selectedColor,
  selectedBorder,
  selectedMention,
  isChecked,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const isButtonDisabled = !letterText.trim() || !isChecked;

  const handleClick = () => {
    if (isButtonDisabled || isLoading) return;

    const newLetter = {
      id: Date.now(),
      text: letterText,
      color: selectedColor,
      border: selectedBorder,
      mention: selectedMention,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("sharedLetters")) || [];
    localStorage.setItem(
      "sharedLetters",
      JSON.stringify([newLetter, ...existing])
    );

    setIsLoading(true);

    setTimeout(() => {
      navigate("/"); // Go to homepage
    }, 1000);
  };

  return (
    <div
      className="share-btn-container"
      onMouseEnter={() => setShowTooltip(isButtonDisabled)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        className={`write-letter-btn post-letter ${
          isButtonDisabled ? "disabled" : "enabled"
        }`}
        onClick={handleClick}
        disabled={isButtonDisabled || isLoading}
      >
        {isLoading ? (
          <img src={loadingIcon} alt="Loading..." className="loading-icon" />
        ) : (
          "Share Your Letter"
        )}
      </button>

      {showTooltip && !isLoading && (
        <p className="tooltip-msg">
          Please write the letter and agree to the terms
        </p>
      )}
    </div>
  );
}

export default ShareButton;
