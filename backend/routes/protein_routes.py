from fastapi import APIRouter
from services.protein_services import get_protein_info, search_proteins_by_class  # PAS "backend.services"

router = APIRouter()

@router.get("/protein/{structure_id}")
def get_protein(structure_id: str):
    """ Get protein from its ID """
    return get_protein_info(structure_id)

@router.get("/proteins/")
def search_proteins(classification: str):
    """ Search proteins according to classification """
    return search_proteins_by_class(classification)
