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
        const res = await apiClient.get(`/vitals?patientId=${id}`);
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
        patientId: id,
        heartRate: Number(form.heartRate),
        bloodPressure: form.bloodPressure,
        temperature: Number(form.temperature),
        respiratoryRate: Number(form.respiratoryRate),
        oxygenSaturation: Number(form.oxygenSaturation),
      };

      const res = await apiClient.post("/vitals", payload);

      setVitals((prev) => [res.data, ...prev]);

      setForm({
        heartRate: "",
        bloodPressure: "",
        temperature: "",
        respiratoryRate: "",
        oxygenSaturation: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save vitals.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "1rem" }}>
      <Link to={`/patients/${id}`}>&larr; Back to Patient</Link>
      <h2>Vitals</h2>

      {/* ── Add Vitals Form ── */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <h3>Record New Vitals</h3>

        <label>Heart Rate (bpm)</label>
        <input
          type="number"
          name="heartRate"
          value={form.heartRate}
          onChange={handleChange}
          required
        />

        <label>Blood Pressure (e.g. 120/80)</label>
        <input
          type="text"
          name="bloodPressure"
          value={form.bloodPressure}
          onChange={handleChange}
          required
        />

        <label>Temperature (°C)</label>
        <input
          type="number"
          step="0.1"
          name="temperature"
          value={form.temperature}
          onChange={handleChange}
          required
        />

        <label>Respiratory Rate (breaths/min)</label>
        <input
          type="number"
          name="respiratoryRate"
          value={form.respiratoryRate}
          onChange={handleChange}
          required
        />

        <label>Oxygen Saturation (%)</label>
        <input
          type="number"
          name="oxygenSaturation"
          value={form.oxygenSaturation}
          onChange={handleChange}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save Vitals"}
        </button>
      </form>

      {/* ── Vitals History ── */}
      <h3>Vitals History</h3>

      {loading && <p>Loading...</p>}

      {!loading && vitals.length === 0 && (
        <p>No vitals recorded yet for this patient.</p>
      )}

      {!loading && vitals.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Recorded At</th>
              <th>Heart Rate</th>
              <th>Blood Pressure</th>
              <th>Temperature</th>
              <th>Resp. Rate</th>
              <th>O₂ Sat</th>
            </tr>
          </thead>
          <tbody>
            {vitals.map((v) => (
              <tr key={v.id}>
                <td>{new Date(v.createdAt).toLocaleString()}</td>
                <td style={{ color: v.heartRate < 60 || v.heartRate > 100 ? "orange" : "inherit" }}>
                  {v.heartRate} bpm
                </td>
                <td>{v.bloodPressure}</td>
                <td style={{ color: v.temperature < 36.1 || v.temperature > 37.2 ? "orange" : "inherit" }}>
                  {v.temperature} °C
                </td>
                <td style={{ color: v.respiratoryRate < 12 || v.respiratoryRate > 20 ? "orange" : "inherit" }}>
                  {v.respiratoryRate}
                </td>
                <td style={{ color: v.oxygenSaturation < 95 ? "orange" : "inherit" }}>
                  {v.oxygenSaturation}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}