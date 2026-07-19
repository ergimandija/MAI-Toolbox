from llama_index.readers.file import PDFReader
from llama_index.core.node_parser import SentenceSplitter
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-large-en-v1.5")



splitter = SentenceSplitter(chunk_size=250, chunk_overlap=20)


def load_and_chunk_pdf(file_path: str):
    docs = PDFReader().load_data(file= file_path)
    texts = [d.text for d in docs if getattr(d, "text", None) is not None]
    chunks = []
    for text in texts:
        chunks.extend(splitter.split_text(text))
    return chunks

def embed_chunks(chunks: list[str]) -> list[list[float]]:
    
    embeddings = model.encode(chunks, convert_to_tensor=True).tolist()
    return embeddings
    