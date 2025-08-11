import "./Title.css";
import goBack from "../../../assets/icons/go-back.svg";
import { useNavigate } from "react-router-dom";
function Title() {
  const navigate = useNavigate();
  return (
    <div className="create-letter">
      <div className="title">
        <img
          className="go-back"
          src={goBack}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <h3>Say What You Carry in Your Heart</h3>
      </div>
    </div>
  );
}

export default Title;
