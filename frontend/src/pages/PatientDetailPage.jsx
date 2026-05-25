import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getPatientById,
  deletePatient,
  updatePatient
} from "../api/patients";

export default function PatientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: ""
  });

  /* =========================
     LOAD PATIENT (FIXED)
  ========================== */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        console.log("PATIENT ID:", id);

        const data = await getPatientById(id);

        if (!data || data.error) {
          setPatient(null);
          return;
        }

        setPatient(data);

        setForm({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          phone: data.phone || ""
        });

      } catch (err) {
        console.error("Error loading patient:", err);
        setPatient(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  /* =========================
     HANDLE CHANGE
  ========================== */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     VALIDATION
  ========================== */
  const isValid = () => {
    return (
      form.name.trim() &&
      form.age &&
      form.gender.trim() &&
      form.phone.trim()
    );
  };

  /* =========================
     UPDATE
  ========================== */
  const handleUpdate = async () => {
    if (!isValid()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      const res = await updatePatient(id, form);

      if (res?.error) {
        alert("Update failed");
        return;
      }

      const updated = await getPatientById(id);
      setPatient(updated);

      setIsEditing(false);

    } catch (err) {
      console.error(err);
      alert("Update error");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     DELETE
  ========================== */
  const handleDelete = async () => {
    const ok = window.confirm("Delete this patient?");
    if (!ok) return;

    try {
      setDeleting(true);

      const res = await deletePatient(id);

      if (res?.error) {
        alert("Delete failed");
        return;
      }

      navigate("/patients");

    } catch (err) {
      console.error(err);
      alert("Delete error");
    } finally {
      setDeleting(false);
    }
  };

  /* =========================
     LOADING
  ========================== */
  if (loading) {
    return (
      <div style={center}>
        <h2 style={{ color: "#fff" }}>Loading...</h2>
      </div>
    );
  }

  /* =========================
     NOT FOUND
  ========================== */
  if (!patient) {
    return (
      <div style={center}>
        <h2 style={{ color: "#ff6b6b" }}>Patient not found</h2>
        <button style={backBtn} onClick={() => navigate("/patients")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={container}>

      {/* HEADER */}
      <div style={header}>
        <button style={backBtn} onClick={() => navigate("/patients")}>
          ← Back
        </button>

        <div style={{ display: "flex", gap: "10px" }}>

          {!isEditing ? (
            <button style={editBtn} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          ) : (
            <>
              <button style={cancelBtn} onClick={() => setIsEditing(false)}>
                Cancel
              </button>

              <button
                style={saveBtn}
                onClick={handleUpdate}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </>
          )}

          <button
            style={deleteBtn}
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>

        </div>
      </div>

      {/* PROFILE */}
      <div style={profileCard}>
        <h2 style={{ margin: 0 }}>{patient.name}</h2>
        <p style={{ color: "#8b949e" }}>
          Patient ID: {id}
        </p>
      </div>

      {/* DETAILS */}
      <div style={card}>
        <Field label="Name" name="name" value={form.name}
          isEditing={isEditing} onChange={handleChange} />

        <Field label="Age" name="age" value={form.age}
          isEditing={isEditing} onChange={handleChange} />

        <Field label="Gender" name="gender" value={form.gender}
          isEditing={isEditing} onChange={handleChange} />

        <Field label="Phone" name="phone" value={form.phone}
          isEditing={isEditing} onChange={handleChange} />
      </div>

    </div>
  );
}

/* =========================
   FIELD COMPONENT
========================= */
function Field({ label, name, value, isEditing, onChange }) {
  return (
    <div style={row}>
      <span style={labelStyle}>{label}</span>

      {isEditing ? (
        <input
          name={name}
          value={value}
          onChange={onChange}
          style={input}
        />
      ) : (
        <span style={valueStyle}>{value || "N/A"}</span>
      )}
    </div>
  );
}

/* =========================
   STYLES
========================= */
const container = { padding: "30px", color: "#fff" };

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px"
};

const profileCard = {
  background: "#0D1117",
  border: "1px solid #30363d",
  padding: "20px",
  borderRadius: "14px",
  marginBottom: "20px"
};

const backBtn = { background: "#21262d", color: "#fff", padding: "10px", border: "none", borderRadius: "8px", cursor: "pointer" };
const editBtn = { background: "#238636", color: "#fff", padding: "10px", border: "none", borderRadius: "8px" };
const saveBtn = { background: "#1f6feb", color: "#fff", padding: "10px", border: "none", borderRadius: "8px" };
const cancelBtn = { background: "#30363d", color: "#fff", padding: "10px", border: "none", borderRadius: "8px" };
const deleteBtn = { background: "#da3633", color: "#fff", padding: "10px", border: "none", borderRadius: "8px" };

const card = {
  background: "#161B22",
  border: "1px solid #30363d",
  padding: "20px",
  borderRadius: "14px",
  maxWidth: "500px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px 0",
  borderBottom: "1px solid #222"
};

const labelStyle = { color: "#8b949e", fontWeight: "600" };
const valueStyle = { color: "#fff" };

const input = {
  background: "#0D1117",
  border: "1px solid #30363d",
  color: "#fff",
  padding: "8px",
  borderRadius: "8px",
  width: "60%"
};

const center = {
  height: "70vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};