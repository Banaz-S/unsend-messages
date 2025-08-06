import "./Background.css";
import shadow from "../../assets/bg/shadow.svg";
import lines from "../../assets/bg/lines.svg";
function Background() {
  return (
    <div>
      <img id="shadow-background" src={shadow} alt="shadow" />
      <img id="line-background" src={lines} alt="lines" />
    </div>
  );
}
export default Background;
