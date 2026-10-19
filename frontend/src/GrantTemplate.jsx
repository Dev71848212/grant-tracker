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

function GrantTemplate({
  organizationType = "nonprofit",
  clientId = 1,
}) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const [grantData, setGrantData] = useState({
    grant_title: "",
    problem_statement: "",
    goals: "",
    target_population: "",
    planned_activities: "",
    budget_summary: "",
    evaluation_plan: "",
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
      if (!grantData.problem_statement.trim()) {
        return "Please enter a problem statement.";
      }

      if (!grantData.goals.trim()) {
        return "Please enter the project goals.";
      }

      if (!grantData.target_population.trim()) {
        return "Please enter the target population.";
      }
    }

    if (step === 3) {
      if (!grantData.planned_activities.trim()) {
        return "Please enter the planned activities.";
      }

      if (!grantData.budget_summary.trim()) {
        return "Please enter a budget summary.";
      }

      if (!grantData.evaluation_plan.trim()) {
        return "Please enter an evaluation plan.";
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

  const handleComplete = async () => {
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/grants/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...grantData,
            client: clientId,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error(data);
        setError("Could not save the grant draft.");
        return;
      }

      setCompleted(true);
    } catch (err) {
      console.error(err);
      setError("Could not connect to the backend.");
    }
  };

  const handleStartOver = () => {
    setStep(1);
    setError("");
    setCompleted(false);

    setGrantData({
      grant_title: "",
      problem_statement: "",
      goals: "",
      target_population: "",
      planned_activities: "",
      budget_summary: "",
      evaluation_plan: "",
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
          <h3>Step 2: Project Need and Goals</h3>

          <label htmlFor="problem_statement">
            Problem Statement
          </label>
          <br />

          <textarea
            id="problem_statement"
            name="problem_statement"
            placeholder="What problem or need will this project address?"
            value={grantData.problem_statement}
            onChange={handleChange}
            rows="5"
            style={fieldStyle}
          />

          <br />

          <label htmlFor="goals">Project Goals</label>
          <br />

          <textarea
            id="goals"
            name="goals"
            placeholder="What are the main goals of the project?"
            value={grantData.goals}
            onChange={handleChange}
            rows="5"
            style={fieldStyle}
          />

          <br />

          <label htmlFor="target_population">
            Target Population
          </label>
          <br />

          <textarea
            id="target_population"
            name="target_population"
            placeholder="Who will benefit from this project?"
            value={grantData.target_population}
            onChange={handleChange}
            rows="4"
            style={fieldStyle}
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Project Plan</h3>

          <label htmlFor="planned_activities">
            Planned Activities
          </label>
          <br />

          <textarea
            id="planned_activities"
            name="planned_activities"
            placeholder="Describe the main activities of the project."
            value={grantData.planned_activities}
            onChange={handleChange}
            rows="5"
            style={fieldStyle}
          />

          <br />

          <label htmlFor="budget_summary">
            Budget Summary
          </label>
          <br />

          <textarea
            id="budget_summary"
            name="budget_summary"
            placeholder="Summarize how grant funds will be used."
            value={grantData.budget_summary}
            onChange={handleChange}
            rows="4"
            style={fieldStyle}
          />

          <br />

          <label htmlFor="evaluation_plan">
            Evaluation Plan
          </label>
          <br />

          <textarea
            id="evaluation_plan"
            name="evaluation_plan"
            placeholder="How will you measure whether the project was successful?"
            value={grantData.evaluation_plan}
            onChange={handleChange}
            rows="4"
            style={fieldStyle}
          />
        </div>
      )}

      {step === 4 && (
        <div>
          <h3>Step 4: Review Your Application</h3>

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
            <strong>Problem Statement:</strong>
            <br />
            {grantData.problem_statement}
          </p>

          <p>
            <strong>Goals:</strong>
            <br />
            {grantData.goals}
          </p>

          <p>
            <strong>Target Population:</strong>
            <br />
            {grantData.target_population}
          </p>

          <p>
            <strong>Planned Activities:</strong>
            <br />
            {grantData.planned_activities}
          </p>

          <p>
            <strong>Budget Summary:</strong>
            <br />
            {grantData.budget_summary}
          </p>

          <p>
            <strong>Evaluation Plan:</strong>
            <br />
            {grantData.evaluation_plan}
          </p>

          {completed && (
            <p role="status" style={{ color: "lightgreen" }}>
              Grant draft saved successfully!
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
            Save Grant Draft
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
