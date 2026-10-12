
import { useState } from "react";

const organizationGuidance = {
  nonprofit:
    "Explain how your nonprofit's mission supports the proposed project and benefits the community.",
  community:
    "Describe the community need, the residents you serve, and how the project will benefit them.",
  student:
    "Explain how students will participate and what educational or leadership outcomes you expect.",
  education:
    "Describe the educational need and how you will measure improvements in learning.",
  youth:
    "Explain how the project will support young people and what positive outcomes you expect.",
  other:
    "Describe your organization's purpose, the people it serves, and why the project is important.",
};

const organizationNames = {
  nonprofit: "Nonprofit",
  community: "Community Organization",
  student: "Student Organization",
  education: "Education Program",
  youth: "Youth Program",
  other: "Other",
};

function GrantTemplate({ organizationType = "nonprofit" }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const [grantData, setGrantData] = useState({
    grant_title: "",
    project_description: "",
    project_goals: "",
    funding_requested: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGrantData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setCompleted(false);
  };

  const validateStep = () => {
    if (step === 1 && !grantData.grant_title.trim()) {
      return "Please enter a grant title.";
    }

    if (step === 2) {
      if (!grantData.project_description.trim()) {
        return "Please enter a project description.";
      }

      if (!grantData.project_goals.trim()) {
        return "Please enter your project goals.";
      }
    }

    if (step === 3) {
      const amount = Number(grantData.funding_requested);

      if (
        grantData.funding_requested.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        return "Please enter a funding amount greater than zero.";
      }
    }

    return "";
  };

  const handleNext = () => {
    const validationError = validateStep();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setStep((previous) => Math.min(previous + 1, 4));
  };

  const handleBack = () => {
    setError("");
    setCompleted(false);
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const handleComplete = () => {
    setCompleted(true);
    setError("");
  };

  const handleStartOver = () => {
    setStep(1);
    setError("");
    setCompleted(false);
    setGrantData({
      grant_title: "",
      project_description: "",
      project_goals: "",
      funding_requested: "",
    });
  };

  const guidance =
    organizationGuidance[organizationType] ||
    organizationGuidance.other;

  const organizationName =
    organizationNames[organizationType] || "Other";

  const fieldStyle = {
    width: "100%",
    maxWidth: "450px",
    padding: "10px",
    boxSizing: "border-box",
    marginTop: "8px",
    marginBottom: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "8px",
    cursor: "pointer",
  };

  return (
    <section
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "25px",
        border: "1px solid #777",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2>Guided Grant Application</h2>

      <p>Organization Type: {organizationName}</p>

      <p>Step {step} of 4</p>

      <progress value={step} max="4" style={{ width: "80%" }} />

      {step === 1 && (
        <div>
          <h3>Step 1: Grant Information</h3>

          <p>{guidance}</p>

          <label htmlFor="grant_title">Grant Title</label>
          <br />

          <input
            id="grant_title"
            type="text"
            name="grant_title"
            placeholder="Enter the grant title"
            value={grantData.grant_title}
            onChange={handleChange}
            style={fieldStyle}
          />
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Step 2: Project Details</h3>

          <p>
            Describe your proposed project and explain what
            you hope to accomplish.
          </p>

          <label htmlFor="project_description">
            Project Description
          </label>
          <br />

          <textarea
            id="project_description"
            name="project_description"
            placeholder="Describe your project..."
            value={grantData.project_description}
            onChange={handleChange}
            rows="5"
            style={fieldStyle}
          />

          <br />

          <label htmlFor="project_goals">Project Goals</label>
          <br />

          <textarea
            id="project_goals"
            name="project_goals"
            placeholder="What are your project goals?"
            value={grantData.project_goals}
            onChange={handleChange}
            rows="5"
            style={fieldStyle}
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Funding Request</h3>

          <p>
            Enter the amount of funding your organization
            needs to complete this project.
          </p>

          <label htmlFor="funding_requested">
            Funding Requested ($)
          </label>
          <br />

          <input
            id="funding_requested"
            type="number"
            min="0.01"
            step="0.01"
            name="funding_requested"
            placeholder="Example: 10000"
            value={grantData.funding_requested}
            onChange={handleChange}
            style={fieldStyle}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Step 4: Review Your Application</h3>

          <p>Review your information before completing the template.</p>

          <p>
            <strong>Organization Type:</strong>
            <br />
            {organizationName}
          </p>

          <p>
            <strong>Grant Title:</strong>
            <br />
            {grantData.grant_title}
          </p>

          <p>
            <strong>Project Description:</strong>
            <br />
            {grantData.project_description}
          </p>

          <p>
            <strong>Project Goals:</strong>
            <br />
            {grantData.project_goals}
          </p>

          <p>
            <strong>Funding Requested:</strong>
            <br />
            ${Number(grantData.funding_requested).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )}
          </p>

          {completed && (
            <p role="status" style={{ color: "lightgreen" }}>
              Grant template completed successfully!
              Your answers have not been saved to the database.
            </p>
          )}
        </div>
      )}

      {error && (
        <p role="alert" style={{ color: "#ff7777" }}>
          {error}
        </p>
      )}

      <div>
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            style={buttonStyle}
          >
            Back
          </button>
        )}

        {step < 4 && (
          <button
            type="button"
            onClick={handleNext}
            style={buttonStyle}
          >
            Next
          </button>
        )}

        {step === 4 && !completed && (
          <button
            type="button"
            onClick={handleComplete}
            style={buttonStyle}
          >
            Complete Template
          </button>
        )}

        {step === 4 && (
          <button
            type="button"
            onClick={handleStartOver}
            style={buttonStyle}
          >
            Start Over
          </button>
        )}
      </div>
    </section>
  );
}

export default GrantTemplate;
