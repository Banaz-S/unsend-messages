import { useEffect, useRef, useState, useCallback } from "react";
import "./GoUpButton.css";
import GoUp from "../../assets/icons/go-up.svg";

export default function GoUpButton() {
  const [visible, setVisible] = useState(false);
  const prevY = useRef(window.scrollY);

  const scrollToSearch = useCallback(() => {
    const searchSection = document.querySelector(".search-section");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const wasY = prevY.current;
      const isDown = y > wasY;

      const searchSection = document.querySelector(".search-section");
      if (!searchSection) {
        prevY.current = y;
        return;
      }

      // threshold: bottom of the search section
      const threshold = searchSection.offsetTop + searchSection.offsetHeight;

      if (isDown) {
        // Show only when scrolling down AND we have crossed below the search section
        if (y > threshold + 10) setVisible(true);
      } else {
        // Hide as soon as we scroll back up to the search section or above it
        if (y <= threshold) setVisible(false);
      }

      prevY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <img
      id="goUpBtn"
      src={GoUp}
      alt="Go up"
      onClick={scrollToSearch}
      role="button"
      aria-label="Scroll to search"
    />
  );
}
