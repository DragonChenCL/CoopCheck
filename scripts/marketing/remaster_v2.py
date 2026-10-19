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
W,H=1080,1920
im=Image.new("RGB",(W,H),(11,42,32))
d=ImageDraw.Draw(im)
# Clean, contrast-first design: no illegible page text bleeding through.
for y in range(H):
  dy=y/H
  col=(int(12+16*dy),int(46+15*dy),int(33+12*dy))
  d.line([(0,y),(W,y)],fill=col)
for x in range(0,W,72):
  d.line([(x,0),(x,H)],fill=(29,66,49),width=2)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def f(n):return ImageFont.truetype(font,n)
def center(txt,y,font,color):
  b=d.textbbox((0,0),txt,font=font)
  d.text(((W-(b[2]-b[0]))/2,y),txt,font=font,fill=color)
center('14 HENS?',98,f(160),(255,208,58))
center('REALLY?',300,f(168),(248,250,235))
d.rounded_rectangle((55,536,1025,678),radius=26,fill=(233,246,183))
center('CHECK THE REAL SIZE',568,f(72),(20,61,41))
# Actual site graphic clearly illustrating indoor vs. run space.
src=Image.open(frame).convert("RGB")
diagram=src.crop((13,565,530,935))
diagram=diagram.resize((1010,724),Image.Resampling.LANCZOS)
mask=Image.new("L",diagram.size,0)
ImageDraw.Draw(mask).rounded_rectangle((0,0,diagram.width,diagram.height),radius=55,fill=255)
im.paste(diagram,(35,745),mask)
d=ImageDraw.Draw(im)
d.rounded_rectangle((35,745,1045,1469),radius=55,outline=(221,244,173),width=8)
d.rounded_rectangle((320,1510,760,1622),radius=45,fill=(251,203,67))
center('FREE CHECKER',1537,f(55),(9,51,35))
center('CoopCheck',1710,f(105),(243,248,230))
cover=root/"cover_v2.jpg"
im.save(cover,quality=92,optimize=True)
out=root/"coopcheck_short_01_v2.mp4"
args=["ffmpeg","-y","-hide_banner","-loglevel","error","-loop","1","-framerate","30","-t","2.0",
      "-i",str(cover),"-i",str(src),"-i",str(voice),
      "-filter_complex","[0:v]scale=1080:1920,format=yuv420p,trim=duration=2,setpts=PTS-STARTPTS[poster];[1:v]trim=start=2:duration=28,setpts=PTS-STARTPTS,fps=30,format=yuv420p[web];[poster][web]concat=n=2:v=1:a=0[v];[2:a]highpass=f=65,lowpass=f=11500,loudnorm=I=-16:TP=-1.6:LRA=8[a]",
      "-map","[v]","-map","[a]","-c:v","libx264","-preset","veryfast","-crf","20","-pix_fmt","yuv420p","-r","30","-c:a","aac","-b:a","192k","-t","30","-movflags","+faststart",str(out)]
subprocess.run(args,check=True)
print("V2 video generated",out,out.stat().st_size)
