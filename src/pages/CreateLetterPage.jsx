import "./CreateLetterPage.css";
import Title from "../components/Create-Letter/Title";
import ColorDropdown from "../components/Create-Letter/ColorDropdown";
import LetterPreview from "../components/Create-Letter/LetterPreview";
import MentionDropdown from "../components/Create-Letter/MentionDropdown";
import BorderDropdown from "../components/Create-Letter/BorderDropdown";
import ShareButton from "../components/Create-Letter/ShareButton";
import SubmissionTerm from "../components/Create-Letter/SubmissionTerm";
import { useState, useEffect } from "react";

function CreateLetterPage() {
  const [selectedColor, setSelectedColor] = useState("grey");
  const [selectedMention, setSelectedMention] = useState("No Mention");
  const [selectedBorder, setSelectedBorder] = useState("canva");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [letterText, setLetterText] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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

      <LetterPreview
        color={selectedColor}
        toMention={selectedMention}
        border={selectedBorder}
        onTextChange={setLetterText}
      />
    </div>
  );
}
export default CreateLetterPage;
