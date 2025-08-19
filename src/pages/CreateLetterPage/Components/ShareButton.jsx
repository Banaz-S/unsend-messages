import "./ShareButton.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loadingIcon from "../../../assets/icons/loading-blue.svg";

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

  const handleClick = async () => {
    if (isButtonDisabled || isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: letterText,
          color: selectedColor,
          border: selectedBorder,
          mention: selectedMention,
        }),
      });

      if (!res.ok) throw new Error("Failed to save letter");

      // Wait a short time for server to save before redirect
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error(err);
    }
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
