import "./SampleLetters.css";
import cards from "../../assets/cards.svg";

function SampleLetters() {
  return (
    <div className="cards">
      <img src={cards} alt="Cards Example" />
    </div>
  );
}

export default SampleLetters;
