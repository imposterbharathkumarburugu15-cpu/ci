import pandas as pd
import pickle
import os
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

data = pd.read_csv("../data/customer_data.csv")

features = [
    "Annual_Income",
    "Spending_Score",
    "Purchase_Frequency",
    "Loyalty_Score"
]

X = data[features]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

kmeans = KMeans(n_clusters=4, random_state=42)
clusters = kmeans.fit_predict(X_scaled)

data["Cluster"] = clusters

print("Cluster distribution:")
print(data["Cluster"].value_counts())

os.makedirs("../models", exist_ok=True)
    
with open("../models/clustering_model.pkl", "wb") as f:
    pickle.dump(kmeans, f)

with open("../models/cluster_scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)

print("Clustering model saved successfully.")
