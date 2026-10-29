import "./App.css";

function Tooling() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="logo-box">G</div>

          <div className="brand-text">
            <h1>Grant Tracker</h1>
            <span>Project Tooling & Resources</span>
          </div>
        </div>

        <div className="status-pill">Forestview Project</div>
      </header>

      <main className="page-container">
        <section className="project-resources">
          <div className="resources-heading">
            <span className="hero-label">Forestview Project</span>

            <h2>Project Resources</h2>

            <p>
              Documentation, design artifacts, testing evidence, and development
              tools used by Team 3 to plan, build, and evaluate the Nonprofit
              Grant & Funding Tracker.
            </p>
          </div>

          <div className="resource-grid">
            <div className="resource-card">
              <div className="resource-number">01</div>

              <h3>Project Artifacts</h3>

              <p>
                Access the documentation and design artifacts supporting the
                Grant Tracker project.
              </p>

              <div className="resource-links">
                <a
                  href="https://github.com/Dev71848212/grant-tracker/blob/main/docs/project-documentation.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  Project Documentation
                  <span>→</span>
                </a>

                <a
                  href="https://github.com/Dev71848212/grant-tracker/tree/main/docs/diagrams"
                  target="_blank"
                  rel="noreferrer"
                >
                  System Diagrams
                  <span>→</span>
                </a>

                <a
                  href="https://github.com/Dev71848212/grant-tracker/blob/main/docs/metrics-testing.md"
                  target="_blank"
                  rel="noreferrer"
                >
                  Metrics &amp; Testing
                  <span>→</span>
                </a>
              </div>
            </div>

            <div className="resource-card">
              <div className="resource-number">02</div>

              <h3>Project Tooling</h3>

              <p>
                Access the source-code repository and Agile project-management
                environment used by Team 3.
              </p>

              <div className="resource-links">
                <a
                  href="https://github.com/Dev71848212/grant-tracker"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Repository
                  <span>→</span>
                </a>

                <a
                  href="https://wayne-team-mvl0lxdl.atlassian.net/jira/software/projects/TC/boards/4/backlog?epics=visible"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jira Project
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="project-summary">
            <div>
              <span className="summary-label">Product</span>
              <strong>Nonprofit Grant &amp; Funding Tracker</strong>
            </div>

            <div>
              <span className="summary-label">Course</span>
              <strong>CSC 4110 Software Engineering</strong>
            </div>

            <div>
              <span className="summary-label">Team</span>
              <strong>Team 3</strong>
            </div>
          </div>

          <div className="team-credit">
            <strong>Team 3</strong>
            <span>Haitham Muhsin • Muhammad Bazzi • Samuel Womack</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Tooling;