import chromadb 
from data_loader import load_and_chunk_pdf, embed_chunks
import uuid

print("Loading ChromaDB client...")
chroma_client = chromadb.PersistentClient(path="./db")

collection = chroma_client.get_or_create_collection("KnowledgeBase")

def add_pdf_to_knowledge_base(file_path: str):
    try:
        chunks = load_and_chunk_pdf(file_path)
        embeddings = embed_chunks(chunks)
        ids = [str(uuid.uuid4()) for _ in chunks]
        
        collection.add(
            ids=ids,
            embeddings=embeddings,
            documents=chunks)
        print(f"Ingested {len(chunks)} chunks from {file_path}")
        return True
    except Exception as e:
        print(f"Error ingesting PDF: {e}")
        return False    
    

def retrieve_from_knowledge_base(query: str, n_results: int = 5):
    print(f"Querying knowledge base for: {query}")
    query_embedding = embed_chunks([query])[0]
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    documents = results["documents"][0] 
    return documents

def delete_knowledge_base():
    try:
        all_ids = collection.get()["ids"]
        collection.delete(all_ids)
        return True
    except Exception as e:
        print(f"Error deleting knowledge base: {e}")
        return False    