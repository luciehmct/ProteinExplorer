import sys
import os

# Add backend/ to import path 
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from routes.protein_routes import router as protein_router  # NE PAS METTRE "backend.routes" --> bug

app = FastAPI()

app.include_router(protein_router)

@app.get("/")
def home():
    return {"message": "Welcome to Protein Explorer API"}
