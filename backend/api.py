from fastapi import FastAPI, Request, Response, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from vector import retrieve_from_knowledge_base, add_pdf_to_knowledge_base, delete_knowledge_base
import os
import tempfile
import requests
import traceback

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


@app.post("/api/chat_rag")
@limiter.limit("3/minute") 
async def chat_rag_endpoint(request: Request, body: dict):    
    print(f"Retrieving context for user question")
    user_question = body["messages"][-1]["content"]
    

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

@app.post("/api/chat")
@limiter.limit("5/minute") 
async def chat_endpoint(request: Request, body: dict):    
    print(body)
    response = requests.post(apiUrl, json=body)
    return response.json()

@app.post("/api/fileupload")
@limiter.limit("5/minute") 
async def fileupload_endpoint(request: Request, file: UploadFile):    
    if file.filename == "":
        raise HTTPException(status_code=400, detail="No file selected")
    print(f"Received file upload request: {file.filename}")
    temp_file = tempfile.NamedTemporaryFile(delete=False)
    temp_file.write(await file.read())
    temp_file.close()
    success = add_pdf_to_knowledge_base(temp_file.name)
    if not success:
        return JSONResponse(
            content={"message": "failed to upload file to the knowledge base"},
            status_code=500
        )
    return JSONResponse(content={"message": "File uploaded successfully"})

@app.delete("/api/delete_knowledge_base")
@limiter.limit("5/minute") 
async def delete_knowledge_base_endpoint(request: Request):  
    success = delete_knowledge_base()
    if not success:
        return JSONResponse(
            content={"message": "failed to delete knowledge base"},
            status_code=500
        )
    return JSONResponse(content={"message": "Knowledge base deleted successfully"})