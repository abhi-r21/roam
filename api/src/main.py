from fastapi import FastAPI

app = FastAPI(title="Yuvly Backend")


@app.get("/health")
def health():
    return { "status" : "OK" }

