import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import "./Home.css";
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    "Age",
    "Annual_Income",
    "Spending_Score",
    "Tenure",
    "Purchase_Frequency",
    "Avg_Order_Value",
    "Last_Purchase_Days",
    "Support_Calls",
    "Discount_Usage",
    "Loyalty_Score"
  ];
  const navigate = useNavigate();
  const handleAbout = () => {
    navigate('/info');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value)
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://ci-x0u7.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("MAKE SURE THAT ALL FILLED IN FORMS :");
    }

    setLoading(false);
  };

  const chartData =
    result &&
    {
      labels: ["Churn Probability", "Retention Probability"],
      datasets: [
        {
          data: [
            result.Churn_Probability,
            1 - result.Churn_Probability
          ],
          backgroundColor: ["#ff4d4d", "#4caf50"],
          borderWidth: 1
        }
      ]
    };

  return (

  <div className="dashboard">
    <div className="card">
      <div className="header">
            <h1 className="title">CI Engine Dashboard</h1>
            <p className="subtitle">Customer Intelligence System</p>
            <p className="m">for more <details><summary>information</summary>Click on the "More Info" button to see detailed documentation.</details></p>
            <button onClick={handleAbout} className="about-btn">More Info</button>
      </div>
      <div className="content">
        {/* Form Section */}
        <div className="form-card">
          <h3>Customer Details according to Shoping</h3>

          {fields.map((field) => (
            <div key={field} className="input-group">
              <label>{field.replace(/_/g, " ")}</label>
              <input
                type="number"
                name={field}
                placeholder={field}
                onChange={handleChange}
              />
            </div>
          ))}

          <button onClick={handleSubmit} className="predict-btn">
            {loading ? "Predicting..." : "Predict"}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="result-card">
            <h3>Prediction Result</h3>

            <p>
              <strong>Cluster:</strong> {result.Cluster}
            </p>

            <p>
              <strong>Risk Level:</strong>{" "}
              <span
                className={`risk ${
                  result.Risk_Level === "High"
                    ? "high"
                    : result.Risk_Level === "Medium"
                    ? "medium"
                    : "low"
                }`}
              >
                {result.Risk_Level}
              </span>
            </p>

            <div className="chart-container">
              <Doughnut data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default App;
