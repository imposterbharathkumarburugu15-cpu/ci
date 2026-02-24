import React from "react";
import Header from "./header";
import "./i.css";

function Info() {
  return (
    <div className="info-container">
       <Header /><h1>Customer Intelligence Engine – Documentation</h1>
       
      <section>
        <h2>1. System Overview</h2>
        <p>
          The Customer Intelligence Engine is a machine learning-based
          analytics system designed to predict customer churn risk and segment
          customers based on behavioral and financial data.
        </p>
        <p>
          It uses customer input features to calculate churn probability,
          risk level, and customer clustering for business decision-making.
        </p>
      </section>

      <section>
        <h2>2. Input Parameters Explained</h2>

        <h3>Age</h3>
        <p>Customer's age in years. Used to analyze demographic behavior trends.</p>

        <h3>Annual Income</h3>
        <p>Total yearly income of the customer. Indicates purchasing power.</p>

        <h3>Spending Score</h3>
        <p>
          A behavioral score (typically 0–100) representing how actively the
          customer spends.
        </p>

        <h3>Tenure</h3>
        <p>
          The duration (in months or years) the customer has been associated
          with the company.
        </p>

        <h3>Purchase Frequency</h3>
        <p>Number of purchases made in a given period.</p>

        <h3>Average Order Value (AOV)</h3>
        <p>Total revenue divided by number of orders.</p>

        <h3>Last Purchase Days (Recency)</h3>
        <p>
          Number of days since the customer's last purchase. Higher values may
          indicate disengagement.
        </p>

        <h3>Support Calls</h3>
        <p>Number of customer service interactions.</p>

        <h3>Discount Usage</h3>
        <p>Frequency of discount-based purchases.</p>

        <h3>Loyalty Score</h3>
        <p>
          A metric indicating customer loyalty based on repeat behavior and
          engagement.
        </p>
      </section>

      <section>
        <h2>3. Output Metrics</h2>

        <h3>Cluster</h3>
        <p>
          Customer segment assigned using clustering algorithms (e.g., KMeans).
        </p>

        <h3>Risk Level</h3>
        <p>
          Classification of churn risk (High, Medium, Low) based on model
          probability thresholds.
        </p>

        <h3>Churn Probability</h3>
        <p>
          A probability value between 0 and 1 representing the likelihood that
          the customer will leave.
        </p>

        <h3>Retention Probability</h3>
        <p>Calculated as 1 − Churn Probability.</p>
      </section>

      <section>
        <h2>4. Business Concepts</h2>

        <h3>Churn</h3>
        <p>
          Customer churn refers to customers who stop using a company's
          products or services.
        </p>

        <h3>Customer Lifetime Value (CLV)</h3>
        <p>
          The total revenue expected from a customer over their lifetime.
        </p>

        <p>
          Basic Formula:
          <br />
          CLV = Average Order Value × Purchase Frequency × Customer Lifespan
        </p>
      </section>

      <section>
        <h2>5. System Architecture</h2>
        <p>
          Frontend: React.js Dashboard <br />
          Backend: Flask API <br />
          Machine Learning: Classification + Clustering Model <br />
            Database: Customer Data Storage
        </p>
      </section>
    </div>
  );
}

export default Info;