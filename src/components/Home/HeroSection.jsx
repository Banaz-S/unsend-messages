import "./HeroSection.css";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="content">
      <h3>
        Let it out even if you <br />
        never send it ...
      </h3>
      <p>
        A place to share what you feel and find comfort in <br />
        knowing you are not alone
      </p>
      <button className="btn-write-letter" onClick={() => navigate("/create")}>
        Write Your Letter
      </button>
    </div>
  );
}
export default HeroSection;
