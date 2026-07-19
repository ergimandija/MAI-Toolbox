from fastapi import FastAPI, Request  
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
import requests


app = FastAPI()
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

apiUrl = "http://localhost:11434/api/chat"


@app.post("/api/chat")
@limiter.limit("5/minute") 
async def chat_endpoint(request: Request, body: dict):    
    print(f"Retrieving context for user question")
    user_question = body["messages"][-1]["content"]
    from vector import retrieve_from_knowledge_base

    docs = retrieve_from_knowledge_base(user_question)
    context = "\n\n".join(docs)
    print(f"Retrieved context from knowledge base:\n{context}\n")
    system_message = {
        "role": "system",
        "content": f"""
    Use the provided context to answer the question. If the answer cannot be found in the context, generate from you knowledge.

    Context:
    {context}
    """
    }

    messages = [system_message] + body["messages"]

    payload = {
        "model": body["model"],
        "messages": messages,
        "stream": body.get("stream", False)
    }

    response = requests.post(apiUrl, json=payload)
    return response.json()

