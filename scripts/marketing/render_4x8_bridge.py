#!/usr/bin/env python3
"""Produce publicly downloadable, original CoopCheck 4x8 footprint explainer assets.

Rendered by GitHub Actions on the repo's own runner; outputs are checked into
bridge-media for ordinary HTTPS download by the remote Playwright environment.
Any 4x8 and 2x4 figures are explicitly hypothetical, not manufacturer measurements.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFilter
import subprocess

OUT=Path("bridge-media")
OUT.mkdir(exist_ok=True)
W,H=1080,1920
DARK=(20,49,40); CREAM=(248,246,236); SAND=(246,206,139)
MINT=(190,220,190); SLATE=(66,86,74); WHITE=(255,255,250)
SOURCE=Path("input-video/end_snapshot.png")
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def f(sz,bold=False): return ImageFont.truetype(BOLD if bold else REG,sz)
def text(draw, xy, s, size, fill, bold=False, anchor=None):
    draw.text(xy,s,font=f(size,bold),fill=fill,anchor=anchor,stroke_width=0)
def center(draw,s,y,size,color,bold=False):
    text(draw,(W//2,y),s,size,color,bold,anchor="ma")
def panel(bg=DARK):
    im=Image.new("RGB",(W,H),bg)
    d=ImageDraw.Draw(im)
    # editorial-grid background
    for x in range(0,W,90): d.line((x,0,x,H),fill=(31,62,50),width=1)
    for y in range(0,H,90): d.line((0,y,W,y),fill=(31,62,50),width=1)
    d.rounded_rectangle((52,47,1028,134),radius=41,fill=CREAM)
    text(d,(88,72),"COOPCHECK  /  FIELD NOTES",31,DARK,True)
    d.line((62,1760,1018,1760),fill=(148,175,147),width=3)
    text(d,(64,1804),"coopcheck.serunio.com",38,CREAM,True)
    return im,d
def photo(im,x,y,w,h):
    if not SOURCE.exists(): return False
    src=Image.open(SOURCE).convert("RGB")
    # real CoopCheck checker page screenshot from previously recorded original browser run
    cropped=ImageOps.fit(src,(w,h),method=Image.Resampling.LANCZOS,centering=(0.5,0.42))
    mask=Image.new("L",(w,h))
    ImageDraw.Draw(mask).rounded_rectangle((0,0,w,h),radius=35,fill=255)
    im.paste(cropped,(x,y),mask)
    ImageDraw.Draw(im).rounded_rectangle((x,y,x+w,y+h),radius=35,outline=(214,229,199),width=5)
    return True
def number(d,label,n,x0,x1,y):
    d.rounded_rectangle((x0,y,x1,y+280),radius=35,fill=CREAM)
    text(d,(x0+38,y+29),label,34,SLATE,True)
    text(d,(x0+38,y+100),n,90,DARK,True)
def footer(d,i):
    text(d,(68,1691),f"0{i} / 04  •  BACKYARD PLANNING",34,SAND,True)

im,d=panel()
center(d,"4 × 8 FT COOP?",275,91,SAND,True)
center(d,"CHECK WHAT IT MEANS.",407,55,CREAM,True)
photo(im,82,585,916,826)
d=ImageDraw.Draw(im)
center(d,"Overall footprint ≠ indoor floor",1510,46,CREAM,True)
center(d,"Look beyond the product title.",1580,39,MINT)
footer(d,1)
im.save(OUT/"slide_01.png")

im,d=panel()
center(d,"THE FOOTPRINT",268,85,SAND,True)
center(d,"IS NOT THE WHOLE STORY",391,49,CREAM,True)
number(d,"OVERALL 4 × 8", "32 ft²",68,1012,612)
d.rounded_rectangle((68,1003,1012,1402),radius=45,outline=MINT,width=6)
text(d,(112,1069),"A hypothetical total footprint.",43,CREAM,True)
text(d,(112,1166),"This can include a covered run,",39,CREAM)
text(d,(112,1242),"not just the sleeping house.",39,CREAM)
center(d,"NOT A MEASURED PRODUCT CLAIM",1530,30,SAND,True)
footer(d,2)
im.save(OUT/"slide_02.png")

im,d=panel()
center(d,"WHAT IS INDOORS?",258,84,SAND,True)
center(d,"ASK FOR THE REAL FLOOR SIZE",387,46,CREAM,True)
number(d,"EXAMPLE HOUSE: 2 × 4", "8 ft²",68,1012,624)
d.rounded_rectangle((68,1002,1012,1455),radius=44,fill=(41,76,62))
text(d,(110,1080),"If an illustrative 2 × 4 ft",41,CREAM)
text(d,(110,1164),"sleeping house is inside",41,CREAM)
text(d,(110,1248),"the larger 4 × 8 ft footprint,",40,CREAM)
text(d,(110,1332),"indoor area is only 8 ft².",42,SAND,True)
footer(d,3)
im.save(OUT/"slide_03.png")

im,d=panel()
center(d,"6 HENS?",267,100,SAND,True)
center(d,"COMPARE FLOOR AREA FIRST",389,48,CREAM,True)
number(d,"OSU EXTENSION REFERENCE","18 ft²",68,1012,612)
d.rounded_rectangle((70,1009,1010,1467),radius=40,fill=(41,76,62))
text(d,(111,1070),"6 hens × 3 ft² = 18 ft²",45,CREAM,True)
text(d,(111,1173),"A planning reference, not a",39,CREAM)
text(d,(111,1240),"legal or welfare guarantee.",39,CREAM)
text(d,(111,1354),"Ask the seller for measured",36,SAND,True)
text(d,(111,1410),"indoor sleeping floor area.",36,SAND,True)
footer(d,4)
im.save(OUT/"slide_04.png")

# Pin: portrait 2:3, deliberately more information-dense than a Shorts frame.
PW,PH=1000,1500
pin=Image.new("RGB",(PW,PH),CREAM);p=ImageDraw.Draw(pin)
p.rectangle((0,0,PW,184),fill=DARK)
text(p,(51,50),"COOPCHECK  /  BUYER GUIDE",39,CREAM,True)
text(p,(52,236),"A 4 × 8 FT COOP?",65,DARK,True)
text(p,(52,325),"THE FOOTPRINT TRAP",52,(158,98,49),True)
p.rounded_rectangle((51,450,947,749),radius=27,fill=(230,236,215))
text(p,(88,487),"OVERALL FOOTPRINT",31,SLATE,True)
text(p,(88,549),"32 ft²",93,DARK,True)
text(p,(87,672),"4 × 8 ft — hypothetical",30,SLATE)
p.rounded_rectangle((52,773,945,1100),radius=27,fill=DARK)
text(p,(88,814),"IF THE INDOOR HOUSE IS 2 × 4",30,MINT,True)
text(p,(88,868),"ONLY 8 ft² INDOORS",58,CREAM,True)
text(p,(88,964),"A larger footprint may include a run.",30,CREAM)
text(p,(88,1017),"Ask for real measured house dimensions.",28,SAND,True)
p.line((56,1152,944,1152),fill=(170,177,153),width=3)
text(p,(56,1201),"6 hens × 3 ft² = 18 ft²",40,DARK,True)
text(p,(56,1270),"OSU Extension planning reference.",29,SLATE)
text(p,(56,1322),"Not a specific product measurement.",29,SLATE)
p.rectangle((0,1406,PW,PH),fill=DARK)
text(p,(52,1432),"FREE COOP CHECKER  •  coopcheck.serunio.com",29,CREAM,True)
pin.save(OUT/"CoopCheck-4x8-Pin-20261026.jpg",quality=92,subsampling=0,optimize=True)
Image.open(OUT/"slide_01.png").save(OUT/"CoopCheck-4x8-Cover-20261026.jpg",quality=91,optimize=True)

cmd=["ffmpeg","-hide_banner","-loglevel","error","-y","-framerate","1/5",
"-i",str(OUT/"slide_%02d.png"),"-vf","fps=24,format=yuv420p",
"-c:v","libx264","-preset","veryfast","-crf","21","-movflags","+faststart",
"-t","20",str(OUT/"CoopCheck-4x8-Short-20261026.mp4")]
subprocess.run(cmd,check=True)
for x in OUT.iterdir():
    print(x,x.stat().st_size,flush=True)
