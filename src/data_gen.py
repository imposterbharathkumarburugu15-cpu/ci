import numpy as np
import pandas as pd
import os

def generate_data(n=2000):
    np.random.seed(42)

    # -------------------------
    # Core Features
    # -------------------------
    age = np.random.randint(18, 70, n)
    income = np.random.randint(20000, 150000, n)
    spending = np.random.randint(1, 100, n)
    tenure = np.random.randint(0, 11, n)
    purchase = np.random.randint(1, 50, n)

    avg_order = np.random.randint(200, 5000, n)
    last_purchase = np.random.randint(1, 365, n)
    support = np.random.randint(0, 10, n)
    discount = np.random.uniform(0, 1, n)
    loyalty = np.random.randint(1, 100, n)

    # -------------------------
    # Churn Risk Logic
    # -------------------------
    risk = (
        (1/(tenure+1))*2 +
        (1/(loyalty+1))*2 +
        (support/10)*1.5 +
        (last_purchase/365)*1.5 +
        (1/(spending+1))*1
    )

    prob = 1 / (1 + np.exp(-risk))
    churn = (prob > 0.65).astype(int)

    # -------------------------
    # DataFrame
    # -------------------------
    df = pd.DataFrame({
        "Age": age,
        "Annual_Income": income,
        "Spending_Score": spending,
        "Tenure": tenure,
        "Purchase_Frequency": purchase,
        "Avg_Order_Value": avg_order,
        "Last_Purchase_Days": last_purchase,
        "Support_Calls": support,
        "Discount_Usage": discount,
        "Loyalty_Score": loyalty,
        "Churn": churn
    })
    #  ENGINEERED FEATURE

    #  Customer Lifetime Value
    df["CLV"] = (
        df["Avg_Order_Value"] *
        df["Purchase_Frequency"] *
        (df["Tenure"] + 1)
    )

    # Complaint Rate
    df["Complaint_Rate"] = (
        df["Support_Calls"] /
        (df["Tenure"] + 1)
    )

    #  Engagement Score
    df["Engagement_Score"] = (
        df["Loyalty_Score"] * 0.5 +
        df["Purchase_Frequency"] * 0.3 +
        (100 - df["Last_Purchase_Days"] / 3.65) * 0.2
    )

    # -------------------------
    # Save Dataset
    # -------------------------
    os.makedirs("../data", exist_ok=True)
    df.to_csv("../data/customer_data.csv", index=False)

    print("Dataset generated successfully with engineered features.")

if __name__ == "__main__":
    generate_data()
