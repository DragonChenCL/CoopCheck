#!/usr/bin/env python3
"""Render a source-checked, genuinely recorded Portland backyard-chicken rules Short."""
import asyncio, pathlib, shutil, subprocess, urllib.request
import numpy as np
import soundfile as sf
from PIL import Image, ImageDraw, ImageFont, ImageOps
from kokoro_onnx import Kokoro
from playwright.async_api import async_playwright

ROOT=pathlib.Path("marketing-output")
ROOT.mkdir(exist_ok=True,parents=True)
URL="https://coopcheck.serunio.com/cities/portland-or.html"
OFFICIAL="https://www.portland.gov/code/13/40/020"
SAMPLE_RATE=24000

async def record():
    raw_dir=ROOT/"city_rules_raw"
    raw_dir.mkdir(exist_ok=True)
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,args=["--no-sandbox"])
        context=await browser.new_context(
            viewport={"width":540,"height":960},
            device_scale_factor=1,
            record_video_dir=str(raw_dir),
            record_video_size={"width":540,"height":960},
            reduced_motion="reduce")
        page=await context.new_page()
        await page.goto(URL,wait_until="domcontentloaded",timeout=45000)
        await page.locator("h1").wait_for(timeout=15000)
        if "Portland" not in await page.locator("h1").inner_text():
            raise RuntimeError("Unexpected page title; refusing to record wrong content")
        print("Loaded",await page.title(),flush=True)
        await page.wait_for_timeout(4000)
        await page.evaluate("""() => window.scrollTo({top:
          document.querySelector('#city-rules').getBoundingClientRect().top + window.scrollY - 80,
          behavior:'smooth'})""")
        await page.wait_for_timeout(5000)
        await page.screenshot(path=str(ROOT/"rule_cards_snapshot.png"))
        await page.evaluate("""() => window.scrollTo({top:
          document.querySelector('.notice').getBoundingClientRect().top + window.scrollY - 80,
          behavior:'smooth'})""")
        await page.wait_for_timeout(6000)
        await page.evaluate("""() => window.scrollTo({top:
          document.querySelector('.source-box').getBoundingClientRect().top + window.scrollY - 80,
          behavior:'smooth'})""")
        await page.wait_for_timeout(5000)
        await page.evaluate("window.scrollTo({top:0,behavior:'smooth'})")
        await page.wait_for_timeout(4000)
        await page.screenshot(path=str(ROOT/"end_snapshot.png"))
        video=page.video
        await context.close()
        video_path=pathlib.Path(await video.path())
        await browser.close()
    if not video_path.exists() or video_path.stat().st_size<100_000:
        raise RuntimeError("Browser recording is missing or unexpectedly small")
    raw=ROOT/"city_rules_raw.mp4"
    shutil.copy2(video_path,raw)
    return raw

def write_captions():
    entries=[
      (0.0,4.6,"Portland: check city code before planning your coop."),
      (4.6,8.4,"Four small domestic fowl on any lot."),
      (8.4,11.6,"Six on lots of at least ten thousand square feet."),
      (11.6,16.2,"Roosters have agricultural-use exceptions."),
      (16.2,21.1,"No livestock permit required under city guidance."),
      (21.1,26.0,"Check zoning and coop placement separately."),
      (26.0,30.0,"Verify the official city source for your property.")
    ]
    def tm(t):
        h=int(t//3600); m=int(t//60)%60; s=int(t)%60; c=int(t*100)%100
        return f"{h}:{m:02d}:{s:02d}.{c:02d}"
    header="""[Script Info]
Title: CoopCheck Portland Backyard Chicken Rules
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes
[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Main,DejaVu Sans,55,&H00FFFFFF,&H00FFFFFF,&H00234030,&HCC09241B,-1,0,0,0,100,100,0,0,3,3,0,2,55,55,190,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
"""
    lines=[f"Dialogue: 0,{tm(a)},{tm(b)},Main,,0,0,0,,{text}" for a,b,text in entries]
    path=ROOT/"captions.ass"
    path.write_text(header+"\n".join(lines)+"\n",encoding="utf-8")
    return path

def make_voice():
    models=ROOT/"tts_models"
    models.mkdir(exist_ok=True)
    base="https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.1/"
    for filename in ("kokoro-v1.0.int8.onnx","voices-v1.0.bin"):
        path=models/filename
        if not path.exists():
            print("Downloading neural voice model",filename,flush=True)
            urllib.request.urlretrieve(base+filename,path)
        if path.stat().st_size<1_000_000:
            raise RuntimeError("Invalid neural voice model: "+str(path))
    tts=Kokoro(str(models/"kokoro-v1.0.int8.onnx"),str(models/"voices-v1.0.bin"))
    slots=[
      (0.20,4.45,"Planning a backyard coop in Portland? Start with the official city rules."),
      (4.65,8.20,"Up to four small domestic fowl are allowed on any lot."),
      (8.45,11.35,"Up to six if your lot is ten thousand square feet."),
      (11.65,16.00,"Roosters require an allowed agricultural use."),
      (16.25,20.90,"The city says no permit to keep livestock is needed."),
      (21.15,25.85,"Zoning and coop placement still need checking."),
      (26.10,29.75,"Check the official city source before you build.")
    ]
    mix=np.zeros(SAMPLE_RATE*30,dtype=np.float32)
    for start,end,words in slots:
        allowed=end-start
        voice,rate=tts.create(words,voice="af_heart",speed=1.05,lang="en-us")
        if rate!=SAMPLE_RATE:
            raise RuntimeError(f"Unexpected sample rate: {rate}")
        duration=len(voice)/rate
        if duration>allowed:
            voice,rate=tts.create(words,voice="af_heart",speed=min(1.28,1.05*(duration/allowed)+0.04),lang="en-us")
            duration=len(voice)/rate
        if duration>allowed+0.03:
            raise RuntimeError(f"Narration does not fit {start:.2f}-{end:.2f}s: {duration:.2f}s")
        offset=int(start*rate)
        mix[offset:offset+len(voice)]+=voice
        print(f"{start:5.2f}-{end:5.2f}: {duration:4.2f}s | {words}",flush=True)
    peak=float(np.max(np.abs(mix)))
    if peak<=0.0001:
        raise RuntimeError("Generated narration is silent")
    mix=np.tanh(mix*(0.90/max(peak,0.1)))*0.91
    fade=int(0.01*SAMPLE_RATE)
    mix[:fade]*=np.linspace(0,1,fade)
    mix[-fade:]*=np.linspace(1,0,fade)
    path=ROOT/"voice_city_rules.wav"
    sf.write(str(path),mix,SAMPLE_RATE,subtype="PCM_16")
    print("Natural neural narration ready",path,path.stat().st_size,flush=True)
    return path

def make_cover():
    W,H=1080,1920
    im=Image.new("RGB",(W,H),(12,43,32))
    d=ImageDraw.Draw(im)
    for y in range(H):
        t=y/H
        d.line((0,y,W,y),fill=(int(12+10*t),int(43+14*t),int(32+10*t)))
    for x in range(0,W,72):
        d.line((x,0,x,H),fill=(25,62,46),width=2)
    bold="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    regular="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    def font(path,size): return ImageFont.truetype(path,size)
    def center(text,y,f,color):
        box=d.textbbox((0,0),text,font=f)
        d.text(((W-(box[2]-box[0]))/2,y),text,font=f,fill=color)
    center("PORTLAND",95,font(bold,74),(255,205,65))
    center("5 BACKYARD COOP",200,font(bold,82),(247,249,236))
    center("RULES TO CHECK",300,font(bold,90),(247,249,236))
    source=Image.open(ROOT/"rule_cards_snapshot.png").convert("RGB")
    crop=source.crop((0,80,540,720))
    crop=ImageOps.fit(crop,(980,1020),method=Image.Resampling.LANCZOS)
    mask=Image.new("L",crop.size,0)
    ImageDraw.Draw(mask).rounded_rectangle((0,0,crop.width-1,crop.height-1),radius=38,fill=255)
    im.paste(crop,(50,435),mask)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((50,435,1030,1455),radius=38,outline=(221,239,180),width=8)
    d.rounded_rectangle((90,1510,990,1635),radius=35,fill=(249,202,64))
    center("VERIFY THE OFFICIAL CODE",1540,font(bold,45),(12,48,35))
    center("CoopCheck • source-linked planning",1715,font(regular,36),(239,245,229))
    center("Rules vary by parcel and zoning.",1790,font(regular,31),(214,227,207))
    path=ROOT/"cover_city_rules.jpg"
    im.save(path,quality=92,optimize=True)
    return path

def render(raw,voice,captions):
    out=ROOT/"coopcheck_city_rules_short.mp4"
    cmd=[
      "ffmpeg","-y","-hide_banner","-loglevel","error",
      "-i",str(raw),"-i",str(voice),
      "-filter_complex",
      f"[0:v]fps=30,scale=1080:1920:flags=lanczos,tpad=stop_mode=clone:stop_duration=8,subtitles={captions}[v]",
      "-map","[v]","-map","1:a:0","-c:v","libx264","-preset","veryfast","-crf","22",
      "-pix_fmt","yuv420p","-r","30","-c:a","aac","-b:a","160k","-af","apad",
      "-t","30","-movflags","+faststart",str(out)
    ]
    subprocess.run(cmd,check=True)
    if not out.exists() or out.stat().st_size<300_000:
        raise RuntimeError("Final Short is missing or unexpectedly small")
    print("FINAL",out.resolve(),out.stat().st_size,flush=True)

if __name__=="__main__":
    raw=asyncio.run(record())
    captions=write_captions()
    voice=make_voice()
    cover=make_cover()
    render(raw,voice,captions)
    print("Official source:",OFFICIAL,flush=True)
    print("CoopCheck page:",URL,flush=True)
