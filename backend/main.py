from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.protein_routes import router as protein_router

# Initialize FastAPI app
app = FastAPI()

# Configure CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from any origin (adjust in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all HTTP headers
)

# Include protein routes
app.include_router(protein_router)

# Root endpoint
@app.get("/")
def home():
    return {"message": "Welcome to Protein Explorer API"}
