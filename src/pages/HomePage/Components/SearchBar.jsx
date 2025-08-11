import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";

const getDotColor = (color) => {
  switch (color) {
    case "Pink":
      return "#f9c6d3";
    case "Blue":
      return "#c3dcff";
    case "Peach":
      return "#f4d6cc";
    case "Grey":
      return "#c4c4c4";
    case "Purple":
      return "#d8c2f0";
    case "Green":
      return "#bdf5e0";
    default:
      return "#000";
  }
};

export default function SearchBar({
  onSelectColor,
  onSelectTo,
  selectedColor,
  selectedTo,
}) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Search letters...");
  const wrapRef = useRef(null);

  // Open filters and clear input on focus & click
  const openFilters = () => {
    setOpen(true);
    setInputValue("");
  };

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close on Enter key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Change placeholder based on filters
  useEffect(() => {
    if (selectedColor || selectedTo) {
      setPlaceholder("Add tag...");
      setInputValue(""); // clear input when filters selected
    } else {
      setPlaceholder("Search letters...");
      setInputValue(""); // reset when filters cleared
    }
  }, [selectedColor, selectedTo]);

  // Clear input when filters are removed
  useEffect(() => {
    if (!selectedColor && !selectedTo) {
      setInputValue("");
    }
  }, [selectedColor, selectedTo]);

  // Handlers for buttons
  const handleColor = (e) => {
    const color = e.currentTarget.getAttribute("data-color");
    onSelectColor?.(color);
    setInputValue(""); // optionally clear input on selection
  };

  const handleTo = (e) => {
    const to = e.currentTarget.getAttribute("data-to");
    onSelectTo?.(to);
    setInputValue(""); // optionally clear input on selection
  };

  return (
    <div className="search-section" ref={wrapRef}>
      <div className="search-bar">
        <input
          type="text"
          className={`search ${selectedColor || selectedTo ? "no-icon" : ""}`}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={openFilters}
          onClick={() => {
            openFilters();
            setInputValue(""); // clear when clicked
          }}
        />
        <div className="selected-tags">
          {selectedColor && (
            <span className="tag">
              <span
                className="color-dot"
                style={{ "--dot-color": getDotColor(selectedColor) }}
              ></span>
              {selectedColor}
              <button
                className="tag-close"
                onClick={() => onSelectColor(null)}
                aria-label="Remove color filter"
              >
                &times;
              </button>
            </span>
          )}

          {selectedTo && (
            <span className="tag">
              {selectedTo}
              <button
                className="tag-close"
                onClick={() => onSelectTo(null)}
                aria-label="Remove to-whom filter"
              >
                &times;
              </button>
            </span>
          )}
        </div>
      </div>

      {/* --- dropdown markup --- */}
      <div className={`filters ${open ? "" : "hidden"}`}>
        <p>
          <strong>Colors</strong>
        </p>
        <div>
          <button
            className="color-btn"
            data-color="Pink"
            style={{ "--dot-color": "#f9c6d3" }}
            onClick={handleColor}
          >
            Pink
          </button>
          <button
            className="color-btn"
            data-color="Blue"
            style={{ "--dot-color": "#c3dcff" }}
            onClick={handleColor}
          >
            Blue
          </button>
          <button
            className="color-btn"
            data-color="Peach"
            style={{ "--dot-color": "#f4d6cc" }}
            onClick={handleColor}
          >
            Peach
          </button>
          <button
            className="color-btn"
            data-color="Grey"
            style={{ "--dot-color": "#c4c4c4" }}
            onClick={handleColor}
          >
            Grey
          </button>
          <button
            className="color-btn"
            data-color="Purple"
            style={{ "--dot-color": "#d8c2f0" }}
            onClick={handleColor}
          >
            Purple
          </button>
          <button
            className="color-btn"
            data-color="Green"
            style={{ "--dot-color": "#bdf5e0" }}
            onClick={handleColor}
          >
            Green
          </button>
        </div>

        <p>
          <strong>To Whom</strong>
        </p>
        <div className="to-options">
          <button className="to-btn" data-to="Me" onClick={handleTo}>
            Me
          </button>
          <button className="to-btn" data-to="A Friend" onClick={handleTo}>
            A Friend
          </button>
          <button className="to-btn" data-to="My Manager" onClick={handleTo}>
            My Manager
          </button>
          <button className="to-btn" data-to="Mom" onClick={handleTo}>
            Mom
          </button>
          <button className="to-btn" data-to="Dad" onClick={handleTo}>
            Dad
          </button>
          <button className="to-btn" data-to="Sister" onClick={handleTo}>
            Sister
          </button>
          <button className="to-btn" data-to="Brother" onClick={handleTo}>
            Brother
          </button>
          <button className="to-btn" data-to="Teacher" onClick={handleTo}>
            Teacher
          </button>
          <button className="to-btn" data-to="Stranger" onClick={handleTo}>
            Stranger
          </button>
          <button className="to-btn" data-to="No Mention" onClick={handleTo}>
            No Mention
          </button>
        </div>
      </div>
      {/* --- end dropdown --- */}
    </div>
  );
}
