import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../api/apiClient";

export default function Vitals() {
  const { id } = useParams();

  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    heartRate: "",
    bloodPressure: "",
    temperature: "",
    respiratoryRate: "",
    oxygenSaturation: "",
  });

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/patients/${id}/vitals`);
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setVitals(sorted);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load vitals history.");
      } finally {
        setLoading(false);
      }
    };
    fetchVitals();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        heartRate: Number(form.heartRate),
        bloodPressure: form.bloodPressure,
        temperature: Number(form.temperature),
        respiratoryRate: Number(form.respiratoryRate),
        oxygenSaturation: Number(form.oxygenSaturation),
      };
      const res = await apiClient.post(`/patients/${id}/vitals`, payload);
      setVitals((prev) => [res.data, ...prev]);
      setForm({
        heartRate: "", bloodPressure: "", temperature: "",
        respiratoryRate: "", oxygenSaturation: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save vitals.");
    } finally {
      setSubmitting(false);
    }
  };

  const isAbnormal = (key, value) => {
    if (key === "heartRate") return value < 60 || value > 100;
    if (key === "temperature") return value < 36.1 || value > 37.2;
    if (key === "oxygenSaturation") return value < 95;
    return false;
  };

  const inputStyle = {
    width: "100%",
    padding: "9px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    outline: "none",
    color: "#111827",
    background: "#fff",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "12px",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "5px",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <div style={{ padding: "32px", fontFamily: "'Inter', sans-serif", color: "#111827" }}>

      {/* Back link + Header */}
      <div style={{ marginBottom: "28px" }}>
        <Link
          to={`/patients/${id}`}
          style={{
            fontSize: "13px",
            color: "#6b7280",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "10px",
          }}
        >
          ← Return to Patient Profile
        </Link>
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#111827" }}>
          Clinical Vitals
        </h1>
        <p style={{ margin: "5px 0 0", fontSize: "14px", color: "#6b7280" }}>
          Monitoring health metrics for Patient #{id}
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "24px",
        alignItems: "start",
      }}>

        {/* ── Record New Vitals Form ── */}
        <div style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          padding: "24px",
        }}>
          <h2 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: 600, color: "#111827" }}>
            Record New Vitals
          </h2>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Heart Rate (bpm)", name: "heartRate", type: "number" },
              { label: "Blood Pressure (e.g. 120/80)", name: "bloodPressure", type: "text" },
              { label: "Temperature (°C)", name: "temperature", type: "number", step: "0.1" },
              { label: "Respiratory Rate (breaths/min)", name: "respiratoryRate", type: "number" },
              { label: "Oxygen Saturation (%)", name: "oxygenSaturation", type: "number" },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  step={field.step || undefined}
                  value={form[field.name]}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
            ))}

            {error && (
              <p style={{
                margin: "0 0 14px",
                fontSize: "13px",
                color: "#dc2626",
                background: "#fef2f2",
                padding: "8px 12px",
                borderRadius: "6px",
                borderLeft: "3px solid #dc2626",
              }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "10px",
                background: submitting ? "#93c5fd" : "#1a56db",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: submitting ? "not-allowed" : "pointer",
                marginTop: "4px",
              }}
            >
              {submitting ? "Saving..." : "Save Vitals"}
            </button>
          </form>
        </div>

        {/* ── Vitals History Table ── */}
        <div style={{
          background: "#fff",
          borderRadius: "8px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f3f4f6" }}>
            <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#111827" }}>
              Vitals History
            </h2>
          </div>

          {loading ? (
            <p style={{ padding: "32px 24px", color: "#9ca3af", fontSize: "14px", textAlign: "center" }}>
              Loading vitals...
            </p>
          ) : vitals.length === 0 ? (
            <div style={{ padding: "56px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "10px" }}>🩺</div>
              <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
                No vitals recorded yet. Use the form to log the first entry.
              </p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8f9fa", borderBottom: "1px solid #e5e7eb" }}>
                  {["Time", "Heart Rate", "Blood Pressure", "Temp", "O₂ Sat", "Resp. Rate"].map((h, i) => (
                    <th key={i} style={{
                      padding: "11px 20px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#6b7280",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      whiteSpace: "nowrap",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vitals.map((v, i) => (
                  <tr key={v.id || i} style={{
                    background: i % 2 === 0 ? "#fff" : "#f9fafb",
                    borderBottom: "1px solid #f3f4f6",
                  }}>
                    <td style={{ padding: "13px 20px", color: "#6b7280", fontSize: "13px", whiteSpace: "nowrap" }}>
                      {new Date(v.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      <div style={{ fontSize: "11px", color: "#9ca3af" }}>
                        {new Date(v.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{
                      padding: "13px 20px",
                      color: isAbnormal("heartRate", v.heartRate) ? "#d97706" : "#111827",
                      fontWeight: isAbnormal("heartRate", v.heartRate) ? 600 : 400,
                    }}>
                      {v.heartRate} <span style={{ fontSize: "11px", color: "#9ca3af" }}>bpm</span>
                    </td>
                    <td style={{ padding: "13px 20px", color: "#111827" }}>{v.bloodPressure}</td>
                    <td style={{
                      padding: "13px 20px",
                      color: isAbnormal("temperature", v.temperature) ? "#d97706" : "#111827",
                      fontWeight: isAbnormal("temperature", v.temperature) ? 600 : 400,
                    }}>
                      {v.temperature}°C
                    </td>
                    <td style={{
                      padding: "13px 20px",
                      color: isAbnormal("oxygenSaturation", v.oxygenSaturation) ? "#dc2626" : "#111827",
                      fontWeight: isAbnormal("oxygenSaturation", v.oxygenSaturation) ? 600 : 400,
                    }}>
                      {v.oxygenSaturation}%
                    </td>
                    <td style={{ padding: "13px 20px", color: "#111827" }}>
                      {v.respiratoryRate} <span style={{ fontSize: "11px", color: "#9ca3af" }}>br/min</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}