import pandas as pd
import numpy as np

# PATHS to CSV files
META_DATA_PATH = "data/pdb_data_no_dups.csv"
SEQ_DATA_PATH = "data/pdb_data_seq.csv"

# Load data
df_meta = pd.read_csv(META_DATA_PATH)
df_seq = pd.read_csv(SEQ_DATA_PATH)

def get_protein_info(structure_id: str):
    """ Get protein infos from its ID """
    protein = df_meta[df_meta["structureId"] == structure_id]

    if protein.empty:
        return {"error": "No protein found"}

    data = protein.to_dict(orient="records")[0]

    # Correction for NaN and infinite number
    for key, value in data.items():
        if isinstance(value, float) and (np.isnan(value) or np.isinf(value)):
            data[key] = None  # NaN to None

    print("✅ Données renvoyées :", data)  # Debugging

    return data

def search_proteins_by_class(classification: str):
    """ Search proteins according to classification """
    results = df_meta[df_meta["classification"].str.contains(classification, case=False, na=False)]
    return results.to_dict(orient="records") if not results.empty else {"error": "No protein found"}


