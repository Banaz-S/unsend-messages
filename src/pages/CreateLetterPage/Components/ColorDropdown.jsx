import { useState } from "react";
import "./ColorDropdown.css";
import arrowUp from "../../../assets/icons/arrow-up.svg";
import arrowDown from "../../../assets/icons/arrow-down.svg";

const COLORS = [
  { name: "pink", label: "Pink" },
  { name: "blue", label: "Blue" },
  { name: "peach", label: "Peach" },
  { name: "grey", label: "Grey" },
  { name: "purple", label: "Purple" },
  { name: "green", label: "Green" },
];

function ColorDropdown({ onColorChange, isOpen, onToggle }) {
  const [selectedColor, setSelectedColor] = useState("grey");

  const handleColorClick = (colorName) => {
    setSelectedColor(colorName);
    onColorChange(colorName);
    onToggle(null); // Close the dropdown
  };

  const selected = COLORS.find((c) => c.name === selectedColor);
  const selectedLabel = selected?.label || "Grey";

  return (
    <div className="custom-dropdown color-dropdown">
      <div className="dropdown-toggle" onClick={onToggle}>
        <div className="color-text-selected">
          <span className={`color-dot ${selectedColor}`}></span>
          <span className="selected-text">{selectedLabel}</span>
        </div>
        <span className="arrow">
          <img
            className="change-arrow"
            src={isOpen ? arrowUp : arrowDown}
            alt="Toggle Arrow"
          />
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <p className="dropdown-title">Colors</p>
          <div className="color-options">
            {COLORS.map((color) => (
              <div
                key={color.name}
                className={`color-option ${
                  selectedColor === color.name ? "selected" : ""
                }`}
                onClick={() => handleColorClick(color.name)}
              >
                <span className={`color-dot ${color.name}`}></span>
                {color.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorDropdown;
