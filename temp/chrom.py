import json
import numpy as np

# Example result from your previous run
result = {
    'ids': ["b'4902119 '_D20250606_prof_0.nc"],
    'embeddings': np.array([[-0.067695751786232, -0.015428222715854645, -0.07515475898981094]]),  # shortened for example
    'documents': [
        '{"file_name": "D20250606_prof_0.nc", "float_id": "b\'4902119 \'", "date_created": "<xarray.DataArray>", "embedding": [-0.067695751786232, -0.015428222715854645, -0.07515475898981094]}'
    ]
}

# OPTION 1: Directly use embeddings array
query_embedding_1 = result['embeddings'][0]  # choose the first embedding
print("Query embedding (from embeddings array):")
print(query_embedding_1)

# OPTION 2: Parse embedding from documents JSON
doc_metadata = json.loads(result['documents'][0])
query_embedding_2 = np.array(doc_metadata['embedding'])
print("\nQuery embedding (from document JSON):")
print(query_embedding_2)

# Example: compute cosine similarity with itself (just for demonstration)
def cosine_similarity(vec1, vec2):
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

similarity = cosine_similarity(query_embedding_2, query_embedding_2)
print("\nCosine similarity with itself:", similarity)
