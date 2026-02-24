import pickle
import pandas as pd
with open("models/churn_model.pkl", "rb") as f:
    churn_model = pickle.load(f)

with open("models/scaler.pkl", "rb") as f:
    churn_scaler = pickle.load(f)

with open("models/clustering_model.pkl", "rb") as f:
    cluster_model = pickle.load(f)

with open("models/cluster_scaler.pkl", "rb") as f:
    cluster_scaler = pickle.load(f)


def predict_customer(customer_data):

    # Convert to DataFrame
    df = pd.DataFrame([customer_data])

    # -------------------------
    # Add engineered features
    # -------------------------
    df["CLV"] = (
        df["Avg_Order_Value"] *
        df["Purchase_Frequency"] *
        (df["Tenure"] + 1)
    )

    df["Complaint_Rate"] = (
        df["Support_Calls"] /
        (df["Tenure"] + 1)
    )

    df["Engagement_Score"] = (
        df["Loyalty_Score"] * 0.5 +
        df["Purchase_Frequency"] * 0.3 +
        (100 - df["Last_Purchase_Days"] / 3.65) * 0.2
    )

    # -------------------------
    # Clustering
    # -------------------------
    cluster_features = [
        "Annual_Income",
        "Spending_Score",
        "Purchase_Frequency",
        "Loyalty_Score"
    ]
    cluster_scaled = cluster_scaler.transform(df[cluster_features])
    cluster = cluster_model.predict(cluster_scaled)[0]
    # -------------------------
    # Churn Prediction
    # -------------------------
    churn_scaled = churn_scaler.transform(df.drop(columns=[]))
    churn_prob = churn_model.predict_proba(churn_scaled)[0][1]

    # Risk Level
    if churn_prob > 0.75:
        risk = "High"
    elif churn_prob > 0.4:
        risk = "Medium"
    else:
        risk = "Low"

    return {
        "Cluster": int(cluster),
        "Churn_Probability": float(round(churn_prob, 3)),
        "Risk_Level": risk
    }


# Example usage
if __name__ == "__main__":
    sample_customer = {
        "Age": 35,
        "Annual_Income": 75000,
        "Spending_Score": 60,
        "Tenure": 3,
        "Purchase_Frequency": 15,
        "Avg_Order_Value": 1200,
        "Last_Purchase_Days": 45,
        "Support_Calls": 2,
        "Discount_Usage": 0.3,
        "Loyalty_Score": 70
    }

    result = predict_customer(sample_customer)
    print(result)
