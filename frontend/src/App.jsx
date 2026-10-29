import { useState } from "react";
import { Link } from "react-router-dom";
import GrantTemplate from "./GrantTemplate";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_type: "",
    mission: "",
    target_population: "",
    contact_name: "",
    contact_email: "",
  });

  const [message, setMessage] = useState("");

  const [clientId, setClientId] = useState(() => {
    return Number(localStorage.getItem("clientId")) || null;
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/clients/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setMessage("Something went wrong.");
        return;
      }

      const data = await response.json();

      setClientId(data.id);

      localStorage.setItem("clientId", data.id);

      setMessage("Client profile created successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to the backend.");
    }
  };

  return (
    <div className="app-shell">
      {/* =========================
          TOP NAVIGATION
      ========================== */}
      <header className="topbar">
        <div className="brand">
          <div className="logo-box">G</div>

          <div className="brand-text">
            <h1>Grant Tracker</h1>
            <span>Funding Management Platform</span>
          </div>
        </div>

        <Link to="/tooling" className="status-pill tooling-link">
          Project Resources
        </Link>
      </header>

      <main className="page-container">
        {/* =========================
            HERO
        ========================== */}
        <section className="hero">
          <span className="hero-label">Nonprofit Funding Platform</span>

          <h2>Turn ideas into funded projects.</h2>

          <p>
            Create organization profiles, prepare guided grant applications,
            save drafts, and manage the grant process from one organized
            workspace.
          </p>
        </section>

        {/* =========================
            CLIENT PROFILE
        ========================== */}
        <section className="card">
          <div className="card-heading">
            <div>
              <h2>Create Client Profile</h2>
              <div className="gold-line"></div>

              <p>
                Add your organization information before beginning a grant
                application.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="organization_name">Organization Name</label>

                <input
                  id="organization_name"
                  type="text"
                  name="organization_name"
                  placeholder="Example: Detroit Youth Foundation"
                  value={formData.organization_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="organization_type">Organization Type</label>

                <select
                  id="organization_type"
                  name="organization_type"
                  value={formData.organization_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select organization type</option>
                  <option value="nonprofit">Nonprofit</option>
                  <option value="community">Community Organization</option>
                  <option value="student">Student Organization</option>
                  <option value="education">Education Program</option>
                  <option value="youth">Youth Program</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label htmlFor="mission">Organization Mission</label>

                <textarea
                  id="mission"
                  name="mission"
                  placeholder="Describe the organization's mission..."
                  value={formData.mission}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="target_population">Target Population</label>

                <textarea
                  id="target_population"
                  name="target_population"
                  placeholder="Who does your organization serve?"
                  value={formData.target_population}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact_name">Contact Name</label>

                <input
                  id="contact_name"
                  type="text"
                  name="contact_name"
                  placeholder="Full name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact_email">Contact Email</label>

                <input
                  id="contact_email"
                  type="email"
                  name="contact_email"
                  placeholder="name@example.com"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="button-row">
              <button type="submit" className="primary-btn">
                Create Client Profile
              </button>
            </div>
          </form>

          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </div>
          )}
        </section>

        {/* =========================
            GRANT APPLICATION
        ========================== */}
        {clientId ? (
          <GrantTemplate
            organizationType={formData.organization_type || "nonprofit"}
            clientId={clientId}
          />
        ) : (
          <section className="card">
            <div className="card-heading">
              <div>
                <h2>Guided Grant Application</h2>
                <div className="gold-line"></div>

                <p>
                  Create a client profile first to begin a guided grant
                  application.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;