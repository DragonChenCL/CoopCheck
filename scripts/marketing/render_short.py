#!/usr/bin/env python3
"""Render real CoopCheck website interaction to a vertical YouTube Shorts MP4.
Runs via GitHub Actions so Playwright records the deployed web page, not a mockup.
"""
import asyncio, pathlib, subprocess, os, sys, textwrap, shutil
from playwright.async_api import async_playwright

ROOT=pathlib.Path("marketing-output")
ROOT.mkdir(exist_ok=True,parents=True)
URL="https://coopcheck.serunio.com/guides/prefab-chicken-coop-capacity-checker.html"

async def record():
  async with async_playwright() as p:
    browser=await p.chromium.launch(headless=True,args=["--no-sandbox"])
    context=await browser.new_context(viewport={"width":540,"height":960},
       device_scale_factor=1, record_video_dir=str(ROOT/"raw"),
       record_video_size={"width":540,"height":960},
       reduced_motion="reduce")
    page=await context.new_page()
    await page.goto(URL, wait_until="domcontentloaded",timeout=45000)
    await page.locator("h1").wait_for(timeout=15000)
    print("Loaded",await page.title())
    await page.wait_for_timeout(3400)                        # 0–3.4 hero
    await page.evaluate("""() => window.scrollTo({top:
      document.querySelector('#buyer-checker').offsetTop - 78, behavior:'smooth'})""")
    await page.wait_for_timeout(2300)                        # 3.4–5.7
    await page.locator("#bcFlock").fill("6")
    await page.wait_for_timeout(3100)                        # 5.7–8.8
    await page.locator("#bcFlock").fill("10")
    await page.wait_for_timeout(4100)                        # 8.8–12.9
    await page.locator("#bcOutdoor").select_option("no")
    await page.wait_for_timeout(3700)                        # 12.9–16.6
    await page.locator("#bcOutdoor").select_option("yes")
    await page.locator("#bcFlock").fill("6")
    await page.locator('[data-bc-pick="pawhut"]').click()
    await page.wait_for_timeout(4200)                        # 16.6–20.8
    await page.evaluate("""() => window.scrollTo({top:
      document.querySelector('#buyer-checker').offsetTop + 300, behavior:'smooth'})""")
    await page.wait_for_timeout(2300)                        # 20.8–23.1
    await page.evaluate("window.scrollTo({top:0,behavior:'smooth'})")
    await page.wait_for_timeout(2700)                        # 23.1–25.8
    await page.screenshot(path=str(ROOT/"end_snapshot.png"))
    v=page.video
    await context.close()
    video_path=await v.path()
    await browser.close()
    return pathlib.Path(video_path)

def write_ass():
  # High contrast legible English on-video caption blocks.
  entries=[
    (0,4.9,"This coop says it fits 14 hens."),
    (4.9,9.0,"But how much space is INSIDE?"),
    (9.0,13.1,"Compare real indoor area."),
    (13.1,16.7,"More hens need more room."),
    (16.7,21.0,"The outdoor run is separate."),
    (21.0,25.8,"Don't just trust the label."),
    (25.8,30.0,"Free tool • coopcheck.serunio.com")
  ]
  def tm(t):
    h=int(t//3600);m=int(t//60)%60;s=int(t)%60;c=int(t*100)%100
    return f"{h}:{m:02d}:{s:02d}.{c:02d}"
  head="""[Script Info]
Title: CoopCheck Shorts Captions
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 2
ScaledBorderAndShadow: yes
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Main,DejaVu Sans,57,&H00FFFFFF,&H00FFFFFF,&H00234030,&H90081914,-1,0,0,0,100,100,0,0,3,3,0,2,50,50,195,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
  lines=[f"Dialogue: 0,{tm(a)},{tm(b)},Main,,0,0,0,,{s}" for a,b,s in entries]
  (ROOT/"captions.ass").write_text(head+"\n".join(lines)+"\n",encoding="utf-8")

def voice():
  text=("A chicken coop might say it fits fourteen hens. But what's the actual indoor floor area? "
        "CoopCheck lets you compare the measurements with a planning reference for your flock. "
        "Change the number of hens and the space comparison changes. "
        "And remember: an outdoor run does not count as indoor sleeping space. "
        "Some kits don't even include a run. "
        "Before you buy, compare the real dimensions. "
        "Try the free chicken coop checker at coopcheck dot serunio dot com.")
  out=ROOT/"voice.mp3"
  try:
    import edge_tts
    async def gen():
      com=edge_tts.Communicate(text,voice="en-US-AriaNeural",rate="+12%")
      await com.save(str(out))
    asyncio.run(gen())
    if out.exists() and out.stat().st_size>2000:
      print("Neural voice ready");return out
  except Exception as e:
    print("Neural TTS unavailable:",e)
  # Offline fallback, never fail the video just because remote TTS is unavailable.
  wav=ROOT/"voice.wav"
  subprocess.run(["espeak","-v","en-us","-s","160","-w",str(wav),text],check=True)
  return wav

def run(args):
  print("RUN", " ".join(map(str,args)),flush=True)
  subprocess.run(list(map(str,args)),check=True)

def render(raw, speech):
  write_ass()
  out=ROOT/"coopcheck_short_01.mp4"
  # Extend the real recording by holding the final genuine browser frame for CTA.
  # Overlay concise short-form captions; audio voice generated independently.
  run(["ffmpeg","-y","-hide_banner","-loglevel","error",
       "-i",raw,"-i",speech,
       "-filter_complex",
       "[0:v]fps=30,scale=1080:1920:flags=lanczos,tpad=stop_mode=clone:stop_duration=4,subtitles="+str(ROOT/"captions.ass")+ "[v]",
       "-map","[v]","-map","1:a:0",
       "-c:v","libx264","-preset","veryfast","-crf","23","-pix_fmt","yuv420p",
       "-r","30","-c:a","aac","-b:a","128k",
       "-af","apad","-t","30","-movflags","+faststart",out])
  print("FINISHED",out.resolve(),out.stat().st_size)

if __name__=="__main__":
  raw=asyncio.run(record())
  speech=voice()
  render(raw,speech)
