from fastapi import APIRouter, Query
from services.protein_services import get_protein_info
from services.openai_service import analyze_protein

router = APIRouter()

@router.get("/protein/{structure_id}/analyze")
def get_protein_analysis(
    structure_id: str,
    detail_level: str = Query("short", enum=["short", "detailed"]),
    language: str = Query("en", enum=["en", "fr"])
):
    """
    Retrieves a protein's data and generates an AI-driven analysis.
    
    :param structure_id: The protein ID from the dataset.
    :param detail_level: "short" for a brief summary, "detailed" for a more in-depth explanation.
    :param language: "en" for English, "fr" for French.
    :return: JSON with protein details and ChatGPT's analysis.
    """
    protein_data = get_protein_info(structure_id)
    
    if "error" in protein_data:
        return protein_data  # Returns error if protein is not found
    
    analysis = analyze_protein(protein_data, detail_level, language)
    return {"protein": protein_data, "analysis": analysis}

@router.get("/protein/{structure_id}")
def get_protein(structure_id: str):
    """Get protein data by structure ID"""
    return get_protein_info(structure_id)
