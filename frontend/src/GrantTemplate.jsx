import { useEffect, useState } from "react";

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

function GrantTemplate({ organizationType = "nonprofit", clientId = 1 }) {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const [savedDrafts, setSavedDrafts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [grantData, setGrantData] = useState({
    grant_title: "",
    problem_statement: "",
    goals: "",
    target_population: "",
    planned_activities: "",
    budget_summary: "",
    evaluation_plan: "",
  });

  const loadDrafts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/grants/");

      if (!response.ok) {
        setError("Could not load saved drafts.");
        return;
      }

      const data = await response.json();

      const clientDrafts = data.filter((draft) => draft.client === clientId);

      setSavedDrafts(clientDrafts);
    } catch (err) {
      console.error(err);
      setError("Could not connect to the backend.");
    }
  };

  useEffect(() => {
    loadDrafts();
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setGrantData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setStatusMessage("");
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
    setStatusMessage("");
    setStep((previous) => Math.max(previous - 1, 1));
  };

  const handleComplete = async () => {
    setError("");
    setStatusMessage("");

    try {
      const url = editingId
        ? `http://127.0.0.1:8000/api/grants/${editingId}/`
        : "http://127.0.0.1:8000/api/grants/";

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...grantData,
          client: clientId,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error(data);

        setError(
          editingId
            ? "Could not update the grant draft."
            : "Could not save the grant draft.",
        );

        return;
      }

      setStatusMessage(
        editingId
          ? "Grant draft updated successfully!"
          : "Grant draft saved successfully!",
      );

      await loadDrafts();
    } catch (err) {
      console.error(err);
      setError("Could not connect to the backend.");
    }
  };

  const handleEdit = (draft) => {
    setEditingId(draft.id);

    setGrantData({
      grant_title: draft.grant_title || "",
      problem_statement: draft.problem_statement || "",
      goals: draft.goals || "",
      target_population: draft.target_population || "",
      planned_activities: draft.planned_activities || "",
      budget_summary: draft.budget_summary || "",
      evaluation_plan: draft.evaluation_plan || "",
    });

    setStep(1);
    setError("");
    setStatusMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStartOver = () => {
    setStep(1);
    setError("");
    setStatusMessage("");
    setEditingId(null);

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
    organizationGuidance[organizationType] || organizationGuidance.other;

  const organizationName = organizationNames[organizationType] || "Other";

  return (
    <section className="grant-wizard">
      <div className="wizard-header">
        <h2>Guided Grant Application</h2>

        <span className="organization-badge">{organizationName}</span>
      </div>

      {editingId && (
        <div className="editing-banner">Editing Draft #{editingId}</div>
      )}

      <div className="progress-container">
        <div className="step-label">Step {step} of 4</div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${(step / 4) * 100}%`,
            }}
          />
        </div>
      </div>

      {step === 1 && (
        <div className="wizard-panel">
          <h3>Grant Information</h3>

          <div className="guidance-box">{guidance}</div>

          <div className="form-group">
            <label htmlFor="grant_title">Grant Title</label>

            <input
              id="grant_title"
              type="text"
              name="grant_title"
              placeholder="Enter the grant title"
              value={grantData.grant_title}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="wizard-panel">
          <h3>Project Need and Goals</h3>

          <div className="form-group">
            <label htmlFor="problem_statement">Problem Statement</label>

            <textarea
              id="problem_statement"
              name="problem_statement"
              placeholder="What problem or need will this project address?"
              value={grantData.problem_statement}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="goals">Project Goals</label>

            <textarea
              id="goals"
              name="goals"
              placeholder="What are the main goals of the project?"
              value={grantData.goals}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="target_population">Target Population</label>

            <textarea
              id="target_population"
              name="target_population"
              placeholder="Who will benefit from this project?"
              value={grantData.target_population}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="wizard-panel">
          <h3>Project Plan</h3>

          <div className="form-group">
            <label htmlFor="planned_activities">Planned Activities</label>

            <textarea
              id="planned_activities"
              name="planned_activities"
              placeholder="Describe the main activities of the project."
              value={grantData.planned_activities}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="budget_summary">Budget Summary</label>

            <textarea
              id="budget_summary"
              name="budget_summary"
              placeholder="Summarize how grant funds will be used."
              value={grantData.budget_summary}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="evaluation_plan">Evaluation Plan</label>

            <textarea
              id="evaluation_plan"
              name="evaluation_plan"
              placeholder="How will you measure whether the project was successful?"
              value={grantData.evaluation_plan}
              onChange={handleChange}
              rows="4"
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="wizard-panel">
          <h3>Review Your Application</h3>

          <div className="review-grid">
            <div className="review-item">
              <strong>Organization Type</strong>
              {organizationName}
            </div>

            <div className="review-item">
              <strong>Grant Title</strong>
              {grantData.grant_title}
            </div>

            <div className="review-item">
              <strong>Problem Statement</strong>
              {grantData.problem_statement}
            </div>

            <div className="review-item">
              <strong>Goals</strong>
              {grantData.goals}
            </div>

            <div className="review-item">
              <strong>Target Population</strong>
              {grantData.target_population}
            </div>

            <div className="review-item">
              <strong>Planned Activities</strong>
              {grantData.planned_activities}
            </div>

            <div className="review-item">
              <strong>Budget Summary</strong>
              {grantData.budget_summary}
            </div>

            <div className="review-item">
              <strong>Evaluation Plan</strong>
              {grantData.evaluation_plan}
            </div>
          </div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {statusMessage && <div className="success-message">{statusMessage}</div>}

      <div className="button-row">
        {step > 1 && (
          <button type="button" onClick={handleBack} className="secondary-btn">
            Back
          </button>
        )}

        {step < 4 && (
          <button type="button" onClick={handleNext} className="primary-btn">
            Next
          </button>
        )}

        {step === 4 && (
          <button
            type="button"
            onClick={handleComplete}
            className="primary-btn"
          >
            {editingId ? "Update Grant Draft" : "Save Grant Draft"}
          </button>
        )}

        <button
          type="button"
          onClick={handleStartOver}
          className="secondary-btn"
        >
          New Grant
        </button>
      </div>

      <div className="drafts-header">
        <h2>Saved Grant Drafts</h2>
        <div className="gold-line"></div>
      </div>

      <div className="draft-grid">
        {savedDrafts.length === 0 ? (
          <p>No saved drafts yet.</p>
        ) : (
          savedDrafts.map((draft) => (
            <div key={draft.id} className="draft-card">
              <h3>{draft.grant_title}</h3>

              <p className="draft-id">Draft #{draft.id}</p>

              <button
                type="button"
                onClick={() => handleEdit(draft)}
                className="secondary-btn"
              >
                Edit Draft
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default GrantTemplate;
