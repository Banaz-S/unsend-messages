import "./SubmissionTerm.css";

/* User Submission */
function SubmissionTerm({ checked, onChange }) {
  return (
    <div className="submit">
      <input
        type="checkbox"
        className="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p>
        <span>I agree that my letter </span> will be shared for 7 days.
      </p>
    </div>
  );
}

export default SubmissionTerm;
