import "./SharedLetter.css";
import { useEffect, useMemo } from "react";
import { useLetters } from "../../../state/LettersContext"; // adjust path if needed

import blue_canva from "../../../assets/cards/blue-canva.svg";
import blue_flower from "../../../assets/cards/blue-flower.svg";
import green_flower from "../../../assets/cards/green-flower.svg";
import green_canva from "../../../assets/cards/green-canva.svg";
import pink_canva from "../../../assets/cards/pink-canva.svg";
import pink_flower from "../../../assets/cards/pink-flower.svg";
import peach_canva from "../../../assets/cards/peach-canva.svg";
import peach_flower from "../../../assets/cards/peach-flower.svg";
import grey_canva from "../../../assets/cards/grey-canva.svg";
import grey_flower from "../../../assets/cards/grey-flower.svg";
import purple_canva from "../../../assets/cards/purple-canva.svg";
import purple_flower from "../../../assets/cards/purple-flower.svg";

const images = {
  "blue-canva": blue_canva,
  "blue-flower": blue_flower,
  "green-flower": green_flower,
  "green-canva": green_canva,
  "pink-canva": pink_canva,
  "pink-flower": pink_flower,
  "peach-canva": peach_canva,
  "peach-flower": peach_flower,
  "grey-canva": grey_canva,
  "grey-flower": grey_flower,
  "purple-canva": purple_canva,
  "purple-flower": purple_flower,
};

function SharedLetter({ filterColor, filterTo }) {
  const { letters, loaded, loadLetters } = useLetters();

  // Fetch once (first mount) — later updates come from context (optimistic add)
  useEffect(() => {
    if (!loaded) loadLetters();
  }, [loaded, loadLetters]);

  // Order: user letters first (newest first), then defaults
  const ordered = useMemo(() => {
    const copy = [...letters];
    copy.sort((a, b) => {
      if (a.isDefault && !b.isDefault) return 1;
      if (!a.isDefault && b.isDefault) return -1;
      const da = new Date(a.createdAt || 0);
      const db = new Date(b.createdAt || 0);
      return db - da;
    });
    return copy;
  }, [letters]);

  // Apply filters
  const filteredLetters = useMemo(() => {
    return ordered.filter((letter) => {
      const colorMatch =
        !filterColor ||
        (letter.color || "").toLowerCase() === filterColor.toLowerCase();
      const toMatch = !filterTo || letter.mention === filterTo;
      return colorMatch && toMatch;
    });
  }, [ordered, filterColor, filterTo]);

  const getPlaceholder = (letter) => {
    if (!letter.isDefault) return "";
    switch (letter.mention) {
      case "Stranger":
        return "I don't know your story, but I hope today is kind to you, You matter more than you think — even when no one says it, Wishing you unexpected joy and quiet peace 💕";
      case "A Friend":
        return "Thank you for being a light in both the calm and the storms, Your presence brings comfort and laughter that I truly cherish, I'm so lucky to have you in my life 🤍";
      case "Mom":
        return "دایکە، خۆشەویستی تۆ باشترینی منی درووست کردووە. تەنانەت گەر زۆریش وانەڵێم، بەس بزانە کە هەمیشە سوپاست دەکەم. خۆشم دەوێیت زیاتر لەوەی کە بتوانم بە وشە نیشانی بدەم ✨";
      case "My Manager":
        return "Hello, Thank you for believing in me and guiding me through challenges - Your support has helped me grow more than you know, I'm grateful for your leadership and patience 🙏";
      case "Me":
        return "تۆ ماندووی؟ ئاساییە هەموو شتێک ئیهمال بکە و پشوویەک بدە، بەڵێن بێت بە یەک ڕۆژ پشوودان دواناکەویت 🌸";
      case "No Mention":
        return "To you, There are things I wish I could say, but maybe they don't need to be spoken. Some feelings are meant to stay unshared — and that's okay. Just know, I was thinking of you 💚";
      default:
        return "";
    }
  };

  return (
    <div className="card-grid">
      {filteredLetters.map((letter) => (
        <div key={letter.id} className="shared-card">
          <img
            src={images[`${letter.color}-${letter.border}`]}
            alt="Card-Image"
          />
          <textarea
            className="shared-card-textarea"
            value={letter.text}
            readOnly
            style={{
              direction: /[\u0600-\u06FF]/.test(
                letter.text || getPlaceholder(letter)
              )
                ? "rtl"
                : "ltr",
              textAlign: /[\u0600-\u06FF]/.test(
                letter.text || getPlaceholder(letter)
              )
                ? "right"
                : "left",
            }}
            placeholder={getPlaceholder(letter)}
          />
          <p className={`shared-card-footer to ${letter.color}s`}>
            To: {letter.mention}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SharedLetter;

// import "./SharedLetter.css";
// import { useState, useEffect } from "react";
// import { API_BASE } from "../../../apiBase";

// import blue_canva from "../../../assets/cards/blue-canva.svg";
// import blue_flower from "../../../assets/cards/blue-flower.svg";
// import green_flower from "../../../assets/cards/green-flower.svg";
// import green_canva from "../../../assets/cards/green-canva.svg";
// import pink_canva from "../../../assets/cards/pink-canva.svg";
// import pink_flower from "../../../assets/cards/pink-flower.svg";
// import peach_canva from "../../../assets/cards/peach-canva.svg";
// import peach_flower from "../../../assets/cards/peach-flower.svg";
// import grey_canva from "../../../assets/cards/grey-canva.svg";
// import grey_flower from "../../../assets/cards/grey-flower.svg";
// import purple_canva from "../../../assets/cards/purple-canva.svg";
// import purple_flower from "../../../assets/cards/purple-flower.svg";

// const images = {
//   "blue-canva": blue_canva,
//   "blue-flower": blue_flower,
//   "green-flower": green_flower,
//   "green-canva": green_canva,
//   "pink-canva": pink_canva,
//   "pink-flower": pink_flower,
//   "peach-canva": peach_canva,
//   "peach-flower": peach_flower,
//   "grey-canva": grey_canva,
//   "grey-flower": grey_flower,
//   "purple-canva": purple_canva,
//   "purple-flower": purple_flower,
// };

// function SharedLetter({ filterColor, filterTo }) {
//   const [letters, setLetters] = useState([]);

//   const loadLetters = () => {
//     fetch(`${API_BASE}/letters`)
//       .then((res) => res.json())
//       .then((data) => setLetters(data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     loadLetters();
//   }, []);

//   const ordered = [...letters].sort((a, b) => {
//     if (a.isDefault && !b.isDefault) return 1;
//     if (!a.isDefault && b.isDefault) return -1;
//     const da = new Date(a.createdAt || 0);
//     const db = new Date(b.createdAt || 0);
//     return db - da;
//   });

//   // ===Apply filters===
//   const filteredLetters = ordered.filter((letter) => {
//     const colorMatch =
//       !filterColor || letter.color.toLowerCase() === filterColor.toLowerCase();
//     const toMatch = !filterTo || letter.mention === filterTo;
//     return colorMatch && toMatch;
//   });

//   const getPlaceholder = (letter) => {
//     if (!letter.isDefault) return "";
//     switch (letter.mention) {
//       case "Stranger":
//         return "I don't know your story, but I hope today is kind to you, You matter more than you think — even when no one says it, Wishing you unexpected joy and quiet peace 💕";
//       case "A Friend":
//         return "Thank you for being a light in both the calm and the storms, Your presence brings comfort and laughter that I truly cherish, I'm so lucky to have you in my life 🤍";
//       case "Mom":
//         return "دایکە، خۆشەویستی تۆ باشترینی منی درووست کردووە. تەنانەت گەر زۆریش وانەڵێم، بەس بزانە کە هەمیشە سوپاست دەکەم. خۆشم دەوێیت زیاتر لەوەی کە بتوانم بە وشە نیشانی بدەم ✨";
//       case "My Manager":
//         return "Hello, Thank you for believing in me and guiding me through challenges - Your support has helped me grow more than you know, I'm grateful for your leadership and patience 🙏";
//       case "Me":
//         return "تۆ ماندووی؟ ئاساییە هەموو شتێک ئیهمال بکە و پشوویەک بدە، بەڵێن بێت بە یەک ڕۆژ پشوودان دواناکەویت 🌸";
//       case "No Mention":
//         return "To you, There are things I wish I could say, but maybe they don't need to be spoken. Some feelings are meant to stay unshared — and that's okay. Just know, I was thinking of you 💚";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="card-grid">
//       {filteredLetters.map((letter) => (
//         <div key={letter.id} className="shared-card">
//           <img
//             src={images[`${letter.color}-${letter.border}`]}
//             alt="Card-Image"
//           />
//           <textarea
//             className="shared-card-textarea"
//             value={letter.text}
//             readOnly
//             style={{
//               direction: /[\u0600-\u06FF]/.test(
//                 letter.text || getPlaceholder(letter)
//               )
//                 ? "rtl"
//                 : "ltr",
//               textAlign: /[\u0600-\u06FF]/.test(
//                 letter.text || getPlaceholder(letter)
//               )
//                 ? "right"
//                 : "left",
//             }}
//             placeholder={getPlaceholder(letter)}
//           />
//           <p className={`shared-card-footer to ${letter.color}s`}>
//             To: {letter.mention}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SharedLetter;
