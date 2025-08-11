import "./LetterPreview.css";

// Canva imports
import pinkCanva from "../../../assets/cards/pink-canva.svg";
import blueCanva from "../../../assets/cards/blue-canva.svg";
import peachCanva from "../../../assets/cards/peach-canva.svg";
import greyCanva from "../../../assets/cards/grey-canva.svg";
import greenCanva from "../../../assets/cards/green-canva.svg";
import purpleCanva from "../../../assets/cards/purple-canva.svg";

// Flower imports
import pinkFlower from "../../../assets/cards/pink-flower.svg";
import blueFlower from "../../../assets/cards/blue-flower.svg";
import peachFlower from "../../../assets/cards/peach-flower.svg";
import greyFlower from "../../../assets/cards/grey-flower.svg";
import greenFlower from "../../../assets/cards/green-flower.svg";
import purpleFlower from "../../../assets/cards/purple-flower.svg";
import { useState } from "react";

// Mapping object
const imageMap = {
  "pink-canva": pinkCanva,
  "blue-canva": blueCanva,
  "peach-canva": peachCanva,
  "grey-canva": greyCanva,
  "purple-canva": purpleCanva,
  "green-canva": greenCanva,
  "pink-flower": pinkFlower,
  "blue-flower": blueFlower,
  "peach-flower": peachFlower,
  "grey-flower": greyFlower,
  "purple-flower": purpleFlower,
  "green-flower": greenFlower,
};

function LetterPreview({ color, toMention, border, onTextChange }) {
  const [direction, setDirection] = useState("ltr");
  const imageSrc = require(`../../../assets/cards/${color}-${border}.svg`);

  const handleTextChange = (value) => {
    // Check if value contains Arabic/Kurdish letters (Unicode range \u0600-\u06FF)
    if (/[\u0600-\u06FF]/.test(value)) {
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
    onTextChange(value);
  };

  return (
    <div className="letter-card">
      <div className="image-card">
        <img className="img-card" src={imageSrc} alt="Card Image" />
        <textarea
          className="card-textarea text"
          style={{ direction }}
          placeholder="Write here..."
          onChange={(e) => handleTextChange(e.target.value)}
        ></textarea>
        <p className={`card-footer to ${color}s`}>To: {toMention}</p>
      </div>
    </div>
  );
}

export default LetterPreview;
