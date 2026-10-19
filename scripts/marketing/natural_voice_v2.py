#!/usr/bin/env python3
"""Generate natural U.S. English narration matched to a 30-second CoopCheck screencast.

Kokoro is an open, locally run neural TTS model. Never fall back to eSpeak:
a failed speech build must fail visibly rather than silently generate robotic audio.
"""
from pathlib import Path
from urllib.request import urlretrieve
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

BASE="https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/"
OUT=Path("marketing-output")
OUT.mkdir(exist_ok=True)
MODELS=OUT/"tts_models"
MODELS.mkdir(exist_ok=True)

for filename in ("kokoro-v1.0.int8.onnx","voices-v1.0.bin"):
    p=MODELS/filename
    if not p.exists():
        print("Downloading",filename,flush=True)
        urlretrieve(BASE+filename,p)
    if p.stat().st_size<1_000_000:
        raise RuntimeError("Invalid model file: "+str(p))

tts=Kokoro(str(MODELS/"kokoro-v1.0.int8.onnx"),str(MODELS/"voices-v1.0.bin"))
SAMPLE_RATE=24000
slots=[
  (0.25,4.75,"This coop claims room for fourteen hens. Really?"),
  (4.95,8.85,"Here's the catch. How much floor space is actually inside?"),
  (9.05,12.95,"CoopCheck compares indoor space with a planning reference."),
  (13.15,16.55,"Add more hens, and watch the numbers change."),
  (16.80,20.90,"Remember: the outdoor run is separate from the sleeping house."),
  (21.10,25.65,"So don't go by the marketing. Ask for real dimensions."),
  (25.85,29.80,"Try the free size checker at CoopCheck dot serunio dot com.")
]
mix=np.zeros(SAMPLE_RATE*30,dtype=np.float32)
for start,end,words in slots:
    allowed=end-start
    voice,rate=tts.create(words,voice="af_heart",speed=1.07,lang="en-us")
    if rate!=SAMPLE_RATE: raise RuntimeError(f"Unexpected sample rate: {rate}")
    duration=len(voice)/rate
    # Avoid clipped phonemes. A moderate speed increase is less damaging than truncation.
    if duration>allowed:
        voice,rate=tts.create(words,voice="af_heart",speed=min(1.30,1.07*(duration/allowed)+0.035),lang="en-us")
        duration=len(voice)/rate
    if duration>allowed+0.025:
        raise RuntimeError(f"Speech too long for segment {start:.2f}–{end:.2f}: {duration:.2f}s / {words}")
    a=int(start*rate)
    mix[a:a+len(voice)]+=voice
    print(f"{start:5.2f}–{end:5.2f}: voice {duration:4.2f}s | {words}",flush=True)
peak=float(np.max(np.abs(mix)))
if peak<=0.0001: raise RuntimeError("Generated audio is silent")
mix=np.tanh(mix*(0.90/max(peak,0.1)))*0.91
# Simple 10 ms fade in/out eliminates clicks at clip boundaries.
fade=int(0.01*SAMPLE_RATE)
mix[:fade]*=np.linspace(0,1,fade)
mix[-fade:]*=np.linspace(1,0,fade)
filename=OUT/"voice_natural_v2.wav"
sf.write(str(filename),mix,SAMPLE_RATE,subtype="PCM_16")
print("SUCCESS natural neural narration",filename,"peak",peak,"bytes",filename.stat().st_size,flush=True)
