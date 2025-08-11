import "./BorderDropdown.css";
import arrowDown from "../../../assets/icons/arrow-down.svg";
import arrowUp from "../../../assets/icons/arrow-up.svg";

function BorderDropdown({
  onBorderChange,
  isOpen,
  onToggle,
  selectedColor,
  selectedBorder = "canva", // default to 'canva'
}) {
  const handleBorderClick = (borderType) => {
    onBorderChange(borderType);
    onToggle(null);
  };

  // Dynamic paths for previews
  const card1 = require(`../../../assets/cards/${selectedColor}-canva.svg`);
  const card2 = require(`../../../assets/cards/${selectedColor}-flower.svg`);

  const borderLabelMap = {
    canva: "Calm Canvas",
    flower: "Flowered Border",
  };

  return (
    <div className="custom-dropdown border-style">
      <div className="dropdown-toggle" onClick={onToggle}>
        <span className="selected-border selected-card">
          {borderLabelMap[selectedBorder]}
        </span>
        <span className="arrow">
          <img
            className="change-arrow3"
            src={isOpen ? arrowUp : arrowDown}
            alt=""
          />
        </span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <p className="dropdown-title">Border Style</p>
          <div className="border-options">
            <div
              className="border-option"
              onClick={() => handleBorderClick("canva")}
            >
              Calm Canvas
            </div>
            <div
              className="border-option"
              onClick={() => handleBorderClick("flower")}
            >
              Flowered Border
            </div>
          </div>
          <div className="card-borders">
            <img className="card1" src={card1} alt="Canvas Preview" />
            <img className="card2" src={card2} alt="Flower Preview" />
          </div>
        </div>
      )}
    </div>
  );
}

export default BorderDropdown;
