import "./HomePage.css";
import { useState } from "react";
import Background from "./Components/Background";
import HeroSection from "./Components/HeroSection";
import SampleLetters from "./Components/SampleLetters";
import SearchBar from "./Components/SearchBar";
import SharedLetter from "./Components/SharedLetter";
import GoUpButton from "./Components/GoUpButton.jsx";

function HomePage() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  return (
    <div>
      <Background />
      <div className="container">
        <HeroSection />
        <SampleLetters />
      </div>
      <SearchBar
        onSelectColor={setSelectedColor}
        onSelectTo={setSelectedTo}
        selectedColor={selectedColor}
        selectedTo={selectedTo}
      />

      <SharedLetter filterColor={selectedColor} filterTo={selectedTo} />

      <GoUpButton />

      <footer className="site-footer">
        <p>
          © 2025 | Developed by{" "}
          <a
            href="https://www.linkedin.com/in/banaz-sleman-b6b181256/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Banaz Sleman
          </a>
        </p>
        <p>
          Designed by{" "}
          <a
            href="https://www.linkedin.com/in/sana-assi-27a582240/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sana Assi
          </a>
        </p>
      </footer>
    </div>
  );
}
export default HomePage;
