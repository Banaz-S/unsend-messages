import "./HomePage.css";
import Background from "../components/Home/Background";
import HeroSection from "../components/Home/HeroSection";
import SampleLetters from "../components/Home/SampleLetters";
import SearchBar from "../components/Home/SearchBar";
import GoUpButton from "../components/Home/GoUpButton";
import SharedLetter from "../components/Home/SharedLetter";

import { useState } from "react";

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
