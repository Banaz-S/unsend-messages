import "./CreateLetterPage.css";
import Title from "../components/Create-Letter/Title";
import ColorDropdown from "../components/Create-Letter/ColorDropdown";
import LetterPreview from "../components/Create-Letter/LetterPreview";
import MentionDropdown from "../components/Create-Letter/MentionDropdown";
import BorderDropdown from "../components/Create-Letter/BorderDropdown";
import ShareButton from "../components/Create-Letter/ShareButton";
import SubmissionTerm from "../components/Create-Letter/SubmissionTerm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateLetterPage() {
  const [selectedColor, setSelectedColor] = useState("grey");
  const [selectedMention, setSelectedMention] = useState("No Mention");
  const [selectedBorder, setSelectedBorder] = useState("canva");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [letterText, setLetterText] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleShare = () => {
  //   if (!letterText.trim()) {
  //     setError("You must write your letter first.");
  //     return;
  //   }
  //   if (!isChecked) {
  //     setError("You must agree to the terms of submission.");
  //     return;
  //   }

  //   // Success
  //   setError("");
  //   setShowPopup(true);

  //   // You could also store the letter to localStorage here if needed
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  //   // Optionally: redirect to homepage
  //   // navigate("/")
  // };

  return (
    <div>
      <Title />
      <div className="right">
        <ColorDropdown
          onColorChange={setSelectedColor}
          isOpen={openDropdown === "color"}
          onToggle={() =>
            setOpenDropdown((prev) => (prev === "color" ? null : "color"))
          }
        />
        <MentionDropdown
          onMentionChange={setSelectedMention}
          isOpen={openDropdown === "mention"}
          onToggle={() =>
            setOpenDropdown((prev) => (prev === "mention" ? null : "mention"))
          }
        />
        <BorderDropdown
          onBorderChange={setSelectedBorder}
          isOpen={openDropdown === "border"}
          onToggle={() =>
            setOpenDropdown((prev) => (prev === "border" ? null : "border"))
          }
          selectedColor={selectedColor}
          selectedBorder={selectedBorder} // ✅ ADD THIS LINE
        />

        <ShareButton
          letterText={letterText}
          selectedColor={selectedColor}
          selectedBorder={selectedBorder}
          selectedMention={selectedMention}
          isChecked={isChecked}
          setError={setError}
          setShowPopup={setShowPopup}
        />

        <SubmissionTerm
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />

        {error && <p className="error">{error}</p>}
      </div>

      <LetterPreview
        color={selectedColor}
        toMention={selectedMention}
        border={selectedBorder}
        onTextChange={setLetterText}
      />

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <p>
              Your letter has been published and will be deleted after 7 days.
            </p>
            {/* onClick={handleClosePopup} */}
            <button onClick={() => navigate(-1)} className="ok-button">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
//  width: 530px;
//   margin-top: 30px;
//   font-family: "Inter", sans-serif;
//   padding: 14px 46px;
//   border: none;
//   border-radius: 32px;
//   background-color: #ffd573;
//   font-size: 18px;
//   color: #454545;
//   cursor: pointer;
export default CreateLetterPage;
