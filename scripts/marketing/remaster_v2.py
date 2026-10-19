#!/usr/bin/env python3
"""Remaster existing CoopCheck Shorts with natural Kokoro narration + branded cover.
The actual screen recording is downloaded from the original validated build artifact.
"""
import pathlib, subprocess
from PIL import Image, ImageDraw, ImageFont, ImageEnhance
root=pathlib.Path("marketing-v2");root.mkdir(exist_ok=True)
src=pathlib.Path("input-video/coopcheck_short_01.mp4")
voice=pathlib.Path("input-voice/voice_natural_v2.wav")
frame=pathlib.Path("input-video/end_snapshot.png")
if not all(x.exists() for x in (src,voice,frame)):raise RuntimeError("Required input video/voice/frame missing")
im=Image.open(frame).convert("RGB").resize((1080,1920),Image.Resampling.LANCZOS)
# Brand colors, sharp contrast and handbuilt thumbnail hierarchy.
im=ImageEnhance.Color(im).enhance(.85)
im=ImageEnhance.Brightness(im).enhance(.72)
ov=Image.new("RGBA",im.size,(0,0,0,0));d=ImageDraw.Draw(ov)
d.rounded_rectangle((24,55,1056,750),radius=55,fill=(7,32,24,242),outline=(222,241,158,115),width=5)
d.rounded_rectangle((62,740,1018,896),radius=27,fill=(230,248,169,250))
d.rounded_rectangle((55,1630,1025,1826),radius=33,fill=(7,42,31,236))
d.rounded_rectangle((615,940,1023,1080),radius=30,fill=(252,197,58,245))
font='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def f(n):return ImageFont.truetype(font,n)
def centered(txt,y,font,color):
  b=d.textbbox((0,0),txt,font=font,stroke_width=0)
  d.text(((1080-(b[2]-b[0]))/2,y),txt,font=font,fill=color,stroke_width=0)
centered("14 HENS?",110,f(155),(245,205,56,255))
centered("REALLY?",365,f(168),(255,255,243,255))
centered("CHECK THE REAL",660,f(85),(255,255,249,255))
centered("COOP SIZE",757,f(104),(21,55,43,255))
d.text((646,983),"FREE TOOL",font=f(54),fill=(9,46,36,255))
centered("CoopCheck",1680,f(111),(244,248,230,255))
im=Image.alpha_composite(im.convert("RGBA"),ov).convert("RGB")
cover=root/"cover_v2.jpg";im.save(cover,quality=91,optimize=True)
out=root/"coopcheck_short_01_v2.mp4"
args=["ffmpeg","-y","-hide_banner","-loglevel","error","-loop","1","-framerate","30","-t","2.0",
      "-i",str(cover),"-i",str(src),"-i",str(voice),
      "-filter_complex","[0:v]scale=1080:1920,format=yuv420p,trim=duration=2,setpts=PTS-STARTPTS[poster];[1:v]trim=start=2:duration=28,setpts=PTS-STARTPTS,fps=30,format=yuv420p[web];[poster][web]concat=n=2:v=1:a=0[v];[2:a]highpass=f=65,lowpass=f=11500,loudnorm=I=-16:TP=-1.6:LRA=8[a]",
      "-map","[v]","-map","[a]","-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p","-r","30","-c:a","aac","-b:a","192k","-t","30","-movflags","+faststart",str(out)]
subprocess.run(args,check=True)
print("V2 video generated",out,out.stat().st_size)
