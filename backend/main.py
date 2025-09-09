from fastapi import FastAPI
import secrets

app = FastAPI()

streams = {}

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