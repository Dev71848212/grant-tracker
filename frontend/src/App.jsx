import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    organization_name: "",
    organization_type: "nonprofit",
    mission: "",
    target_population: "",
    contact_name: "",
    contact_email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      if (response.ok) {
        setMessage("Client profile created successfully!");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      setMessage("Could not connect to the backend.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto", padding: "20px" }}>
      <h1>Grant Tracker</h1>
      <h2>Create Client Profile</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="organization_name"
          placeholder="Organization Name"
          value={formData.organization_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <select
          name="organization_type"
          value={formData.organization_type}
          onChange={handleChange}
        >
          <option value="nonprofit">Nonprofit</option>
          <option value="community">Community Organization</option>
          <option value="student">Student Organization</option>
          <option value="education">Education Program</option>
          <option value="youth">Youth Program</option>
          <option value="other">Other</option>
        </select>

        <br /><br />

        <textarea
          name="mission"
          placeholder="Mission"
          value={formData.mission}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="target_population"
          placeholder="Target Population"
          value={formData.target_population}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="contact_name"
          placeholder="Contact Name"
          value={formData.contact_name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="email"
          name="contact_email"
          placeholder="Contact Email"
          value={formData.contact_email}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit">Create Client</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;
