import { useState } from "react";
import "./MentionDropdown.css";
import arrowDown from "../../assets/icons/arrow-down.svg";
import arrowUp from "../../assets/icons/arrow-up.svg";

function MentionDropdown({ onMentionChange, isOpen, onToggle }) {
  const [selectedMention, setSelectedMention] = useState("No Mention");

  const mentions = [
    "Me",
    "A Friend",
    "My Manager",
    "Mom",
    "Dad",
    "Sister",
    "Brother",
    "Teacher",
    "Stranger",
    "No Mention",
  ];

  const handleMentionClick = (mention) => {
    setSelectedMention(mention);
    onMentionChange(mention);
    onToggle(null); // close dropdown
  };

  return (
    <div className="custom-dropdown mention-list">
      <div className="dropdown-toggle" onClick={onToggle}>
        <span className="for-who">{selectedMention}</span>
        <span className="arrow">
          <img
            className="change-arrow2"
            src={isOpen ? arrowUp : arrowDown}
            alt="Toggle Arrow"
          />
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <p className="dropdown-title">For Whom</p>
          <div className="who-options">
            {mentions.map((mention) => (
              <div
                key={mention}
                className={`who-option ${
                  selectedMention === mention ? "selected" : ""
                }`}
                onClick={() => handleMentionClick(mention)}
              >
                {mention}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MentionDropdown;
