import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [materials, setMaterials] = useState([]);
  const token = localStorage.getItem("token");

  let role = "student";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role;
    } catch (err) {
      console.error("Invalid token");
    }
  }

  useEffect(() => {
    axios
      .get("/api/materials", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMaterials(res.data))
      .catch((err) => console.error("Failed to fetch materials:", err));
  }, [token]);

  return (
    <div className="container mt-4">
      <h2>Welcome, {role === "admin" ? "Admin" : "Student"}</h2>

      <div className="row">
        {materials.map((m) => (
          <div key={m._id} className="col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{m.title}</h5>
                <p className="card-text">{m.description}</p>
                <a
                  href={m.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-5 text-center text-muted">
        <hr />
        <p><strong>FOR SPONSORSHIP</strong></p>
        <p>
          <strong>About Us:</strong> We provide study materials for all subjects.
          Students can access notes, guides, and exams online.
        </p>
        <p>© 2025 Alfa Coaching Center</p>
      </footer>
    </div>
  );
}

export default Dashboard;