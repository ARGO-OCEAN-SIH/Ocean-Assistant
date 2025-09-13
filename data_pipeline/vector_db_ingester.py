import chromadb
from pathlib import Path
import logging
from .config import BASE_DIR
from .metadata_extractor import process_metadata_for_vector_db

# Setup logger
logger = logging.getLogger(__name__)

def initialize_chroma_db():
    """
    Initialize or connect to the Chroma vector database.
    Returns the collection object.
    """
    # Define where Chroma DB will store data
    chroma_path = BASE_DIR / "chroma_db"

    # Create persistent client at that path
    client = chromadb.PersistentClient(path=str(chroma_path))

    # Create or get the collection
    collection = client.get_or_create_collection(
        name="argo_metadata",
        metadata={"hnsw:space": "cosine"}  # Use cosine similarity for text embeddings
    )

    logger.info("ChromaDB initialized and collection ready.")
    return collection


def ingest_metadata_to_vector_db(nc_file_path: Path, collection):
    """
    Processes a single NetCDF file and stores its metadata in ChromaDB.
    """
    try:
        # Process the file
        metadata = process_metadata_for_vector_db(nc_file_path)
        if not metadata:
            return False

        # Prepare unique document ID
        document_id = f"{metadata['float_id']}_{metadata['file_name']}"

        # ✅ Convert all list metadata values to comma-separated strings
        cleaned_metadata = {}
        for k, v in metadata.items():
            if k == "embedding":  # Skip embedding (handled separately)
                continue
            if isinstance(v, list):  
                cleaned_metadata[k] = ", ".join(map(str, v))  # Convert list → string
            else:
                cleaned_metadata[k] = v

        # Add to Chroma
        collection.add(
            ids=[document_id],
            embeddings=[metadata["embedding"]],
            metadatas=[cleaned_metadata],
            documents=[metadata["metadata_text"]]  # Full metadata JSON
        )

        logger.info(f"Added metadata to vector DB: {document_id}")
        return True

    except Exception as e:
        logger.error(f"Failed to ingest metadata for {nc_file_path.name}: {e}")
        return False
