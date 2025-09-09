from fastapi import FastAPI
import secrets
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

streams = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/create_stream")
def create_stream(game_id: int):
    key = secrets.token_urlsafe(8)
    streams[game_id] = {
        "stream_key": key,
        "hls_url": f"http://your-server:8080/hls/{key}.m3u8",
        "active": True
    }
    return streams[game_id]

@app.get("/streams/{game_id}")
def get_stream(game_id: int):
    return streams.get(game_id, {"error": "Stream not found"})

@app.get("/streams_list")
def streams_list():
    return [{"game_id": gid, **info} for gid, info in streams.items()]
