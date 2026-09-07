"""Original explanatory diagrams. Run with Python 3; no third-party artwork.
SVGs are intentionally schematic, not press engineering drawings.
"""
from pathlib import Path
from html import escape
import math

ROOT = Path(__file__).resolve().parents[1]
INK = '#202a35'
BLUE = '#225ed0'
LIGHT = '#e6eefb'
MUTED = '#5a687a'

def text(x, y, s, size=25, color=INK, anchor='start'):
    return f'<text x="{x}" y="{y}" font-family="Arial, sans-serif" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(s)}</text>'

def rect(x,y,w,h,fill=LIGHT,stroke='none',r=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{stroke}" stroke-width="2"/>'

def line(x,y,X,Y,color=INK,width=3,dash=''):
    return f'<path d="M{x} {y} L{X} {Y}" fill="none" stroke="{color}" stroke-width="{width}" stroke-dasharray="{dash}"/>'

def arrow(x,y,X,Y,color=BLUE):
    a=math.atan2(Y-y,X-x)
    return line(x,y,X,Y,color,3)+f'<path d="M{X-13*math.cos(a-.5)} {Y-13*math.sin(a-.5)} L{X} {Y} L{X-13*math.cos(a+.5)} {Y-13*math.sin(a+.5)}" fill="none" stroke="{color}" stroke-width="3"/>'

def circle(x,y,r,fill='white',stroke=INK):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="3"/>'

def node(x,y,label,w=180):
    return rect(x,y,w,70,'white','#bccae0',8)+text(x+w/2,y+44,label,25,INK,'middle')

def frame(title,code,body,note='SCHEMATIC / NOT TO SCALE'):
    return '<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1050" viewBox="0 0 700 525">'+f'<title>{escape(title)}</title>'+rect(0,0,700,525,'#f8faff')+text(38,47,'CRAFT / '+code,18,MUTED)+text(38,99,title,32)+line(38,125,662,125,'#cbd6e7',1)+body+line(38,459,662,459,'#cbd6e7',1)+text(38,492,note,16,MUTED)+'</svg>'

def save(slug,name,title,body):
    p=ROOT/'assets/images/craft'/slug/(name+'.svg');p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(frame(title,slug.upper(),body))

def pathgrid(labels):
    # A folded sequence leaves room for readable labels on small screens.
    a,b,c,d=labels
    return node(55,185,a,245)+node(400,185,b,245)+node(400,335,c,245)+node(55,335,d,245)+arrow(315,220,383,220)+arrow(522,270,522,320)+arrow(383,370,315,370)

def register():
    b=''
    for x,title in [(195,'Aligned'),(505,'Misregister')]:
        b+=text(x,184,title,25,INK,'middle')
        for dx,dy,c in [(0,0,'#00a5cd'),(0 if x==195 else 16,0 if x==195 else -12,'#dc3879')]:
            b+=circle(x+dx,290+dy,55,'none',c)+line(x-85+dx,290+dy,x+85+dx,290+dy,c)+line(x+dx,205+dy,x+dx,375+dy,c)
    return b+text(350,422,'Check colour-to-colour alignment',25,MUTED,'middle')

def cells(kind):
    b=text(65,188,'Surface section',24,MUTED)
    b+=rect(65,270,570,108,'#d6deeb')
    if kind=='relief':
        for x in [120,270,420]:b+=rect(x,230,80,42,LIGHT,INK)+line(x,228,x+80,228,BLUE,8)
        b+=text(350,425,'Ink sits on raised image areas',25,INK,'middle')
    elif kind=='gravure':
        for x,w,dep in [(105,46,25),(255,65,43),(420,95,65)]:
            b+=f'<path d="M{x} 270 L{x+w/2} {270+dep} L{x+w} 270 Z" fill="{BLUE}"/>'
        b+=text(350,425,'Cell area + depth control ink volume',24,INK,'middle')
    elif kind=='anilox':
        for x in range(85,620,55):b+=f'<path d="M{x} 270 L{x+20} 307 L{x+40} 270 Z" fill="{BLUE}"/>'
        b+=text(350,425,'Cells meter ink to the relief plate',25,INK,'middle')
    return b

# OFFSET: indirect transfer, separation, register, finishing decisions.
b=circle(210,255,62,LIGHT,BLUE)+circle(335,255,62,'#d6deeb')+circle(460,255,62,'white')
b+=text(210,355,'Plate',25,INK,'middle')+text(335,391,'Blanket',25,INK,'middle')+text(495,355,'Impression',25,INK,'middle')
b+=line(398,151,398,418,BLUE,4)+arrow(398,175,398,217)+text(428,171,'Paper',25,BLUE)
b+=arrow(232,205,292,205)+text(350,431,'Ink transfers twice before reaching paper',22,MUTED,'middle')
save('offset','example-01','Indirect ink transfer',b)
b=''
for i,(c,label) in enumerate([('#00a5cd','C'),('#d83477','M'),('#efc932','Y'),('#202a35','K')]):
    x=47+i*166;b+=rect(x,200,110,145,'white','#bccae0')
    for yy in range(220,330,22):
        for xx in range(x+14,x+99,22):b+=circle(xx,yy,5,c,c)
    b+=text(x+55,390,label,32,c,'middle')
b+=text(350,431,'Separate plates for the CMYK inks',24,MUTED,'middle')
save('offset','example-02','Colour separations',b)
save('offset','example-03','Print registration',register())
save('offset','example-04','From sheet to carton',pathgrid(['Print sheet','Finish surface','Cut + crease','Fold + glue']))

# GRAVURE: cell geometry, blade function, web flow and laminate structure.
save('gravure','example-01','Ink held in recessed cells',cells('gravure'))
b=cells('gravure').replace('Cell area + depth control ink volume','Blade removes ink from the surface')
b+=line(310,190,390,269,INK,10)+arrow(257,213,317,250)+text(405,211,'Doctor blade',24)
save('gravure','example-02','Doctor blade function',b)
save('gravure','example-03','A web printing sequence',pathgrid(['Unwind film','Print colour','Dry ink','Next colour']))
b=''
for y,label,c in [(190,'Outer film','#d6deeb'),(242,'Print layer',BLUE),(277,'Adhesive','#91b8ed'),(324,'Sealant film','#d6deeb')]:
    b+=rect(60,y,230,20 if label in ['Print layer','Adhesive'] else 32,c)+line(305,y+12,356,y+12,'#a8b9cf',2)+text(371,y+21,label,25)
b+=text(350,421,'One possible reverse-printed laminate',23,MUTED,'middle')
save('gravure','example-04','A flexible laminate',b)

# FLEXO: relief vs metering, press sequence and die cutting.
save('flexo','example-01','A raised printing surface',cells('relief'))
save('flexo','example-02','Anilox ink metering',cells('anilox'))
save('flexo','example-03','Controlled ink transfer',pathgrid(['Ink supply','Anilox roller','Relief plate','Substrate']))
b=rect(55,211,590,158,'white','#a8b9cf')
for x in [86,271,456]:
    b+=rect(x,235,150,109,LIGHT,BLUE,15)
    b+=text(x+75,300,'LABEL',22,BLUE,'middle')
b+=text(350,188,'Face stock: cut around each label',24,INK,'middle')+text(350,420,'Release liner remains continuous',25,MUTED,'middle')
save('flexo','example-04','Label converting',b)
save('flexo','cover','Flexographic printing',cells('relief'))

# SCREEN PRINTING: stencil, ink pass, curing and adhesion.
b=text(350,183,'Stencil openings define the image',25,INK,'middle')
for x in range(90,621,20):b+=line(x,218,x,367,'#a8b9cf',1)
for y in range(218,368,20):b+=line(90,y,620,y,'#a8b9cf',1)
b+=rect(90,218,195,149,LIGHT)+rect(415,218,205,149,LIGHT)+rect(285,218,130,36,LIGHT)+rect(285,331,130,36,LIGHT)
b+=text(350,298,'OPEN',23,BLUE,'middle')+text(350,421,'Mesh supports the stencil',25,MUTED,'middle')
save('silkscreen','example-01','Mesh + stencil',b)
b=rect(60,353,580,35,'#d6deeb')+line(65,277,635,277,INK,4)
b+=line(321,181,367,275,INK,18)+arrow(402,202,511,202)+text(448,176,'Squeegee',24)
b+=f'<path d="M270 273 Q300 221 344 273 Z" fill="{BLUE}"/>'
for x in [300,335,370]:b+=arrow(x,291,x,337)
b+=line(290,350,388,350,BLUE,7)+text(72,252,'Screen',25)+text(350,431,'Ink passes through the open image area',23,MUTED,'middle')
save('silkscreen','example-02','The squeegee pass',b)
save('silkscreen','cover','Screen printing',b)
save('silkscreen','example-03','Match the ink to the job',pathgrid(['Material','Ink system','Print sample','Dry / cure']))
b=node(230,167,'Cured sample',240)+node(55,333,'Adhesion',240)+node(405,333,'Appearance',240)+arrow(310,250,190,315)+arrow(390,250,510,315)
b+=text(350,429,'Review both before production approval',23,MUTED,'middle')
save('silkscreen','example-04','Surface quality checks',b)

# MECHANICAL ENGRAVING: follows supplied pen cover, not intaglio printing.
b=rect(62,277,576,99,'#d6deeb')+f'<path d="M292 277 L350 338 L408 277" fill="#f8faff" stroke="{INK}" stroke-width="3"/>'
b+=f'<path d="M323 165 L377 165 L377 239 L350 310 L323 239 Z" fill="{LIGHT}" stroke="{BLUE}" stroke-width="3"/>'
b+=text(427,205,'Cutter',25)+arrow(350,125+15,350,154)+text(350,428,'Material is removed to create a groove',24,MUTED,'middle')
save('engraving','example-01','Mechanical surface engraving',b)
b=rect(70,183,560,208,'white','#bccae0')
b+=f'<path d="M149 333 V235 H264 V333 M149 285 H264 M334 333 V235 H450 V284 H334" fill="none" stroke="{BLUE}" stroke-width="6"/>'
b+=arrow(149,312,149,262)+arrow(370,235,418,235)+text(538,289,'XY',32,MUTED,'middle')
b+=text(350,429,'Check vectors, line width and tool access',23,MUTED,'middle')
save('engraving','example-02','Artwork becomes a toolpath',b)
b=''
for x,dep,label in [(70,20,'Shallow'),(380,62,'Deeper')]:
    b+=rect(x,259,250,108,'#d6deeb')+f'<path d="M{x+75} 259 L{x+125} {259+dep} L{x+175} 259" fill="#f8faff" stroke="{BLUE}" stroke-width="3"/>'
    b+=text(x+125,207,label,26,INK,'middle')
b+=text(350,430,'Compare on the intended material',25,MUTED,'middle')
save('engraving','example-03','Depth test on a sample',b)
save('engraving','example-04','From artwork to approval',pathgrid(['Vector artwork','Secure part','Test engraving','Review finish']))

# Home-page diagrams replace four empty visual slots.
for name,title,body in [
    ('priorities','Priorities + ownership',node(230,165,'Project brief',240)+node(55,333,'Priority',240)+node(405,333,'Owner',240)+arrow(310,250,190,315)+arrow(390,250,510,315)),
    ('workload','Work in progress',pathgrid(['Assign','Develop','Review','Deliver'])),
    ('feedback','A useful review loop',pathgrid(['Criteria','Review work','Clear feedback','Revise'])),
    ('production','Design through production',pathgrid(['Artwork','Material','Print process','Proof approval']))]:
    p=ROOT/'assets/images/leadership'/(name+'.svg')
    p.write_text(frame(title,'WORKFLOW',body,'WORKFLOW DIAGRAM'))
print('Created 22 process diagrams and 4 homepage diagrams')
