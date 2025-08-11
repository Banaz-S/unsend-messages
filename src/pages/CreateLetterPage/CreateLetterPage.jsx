import "./CreateLetterPage.css";
import Title from "./Components/Title";
import ColorDropdown from "./Components/ColorDropdown";
import LetterPreview from "./Components/LetterPreview";
import MentionDropdown from "./Components/MentionDropdown";
import BorderDropdown from "./Components/BorderDropdown";
import ShareButton from "./Components/ShareButton";
import SubmissionTerm from "./Components/SubmissionTerm";
import { useState, useEffect } from "react";

function CreateLetterPage() {
  const [selectedColor, setSelectedColor] = useState("grey");
  const [selectedMention, setSelectedMention] = useState("No Mention");
  const [selectedBorder, setSelectedBorder] = useState("canva");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [letterText, setLetterText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // ===== Close dropdowns =====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".custom-dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <Title />
      <div className="grid-layout">
        <LetterPreview
          color={selectedColor}
          toMention={selectedMention}
          border={selectedBorder}
          onTextChange={setLetterText}
        />
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
            selectedBorder={selectedBorder}
          />

          <ShareButton
            letterText={letterText}
            selectedColor={selectedColor}
            selectedBorder={selectedBorder}
            selectedMention={selectedMention}
            isChecked={isChecked}
          />

          <SubmissionTerm
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
          />
        </div>
      </div>
    </div>
  );
}
export default CreateLetterPage;
