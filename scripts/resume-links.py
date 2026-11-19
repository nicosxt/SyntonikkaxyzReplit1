# Extract link areas from client/public/resume.pdf as page percentages for the /resume page.
# Usage: python3 scripts/resume-links.py client/public/resume.pdf > client/src/data/resume-links.json
import re,sys,json
d=open(sys.argv[1],'rb').read()
mb=re.search(rb'/MediaBox\s*\[\s*([\d.\s-]+)\]',d).group(1).split()
W,H=float(mb[2]),float(mb[3])
out=[]
for m in re.finditer(rb'(\d+) 0 obj(.*?)endobj',d,re.S):
    b=m.group(2)
    if b'/Link' not in b or b'/URI' not in b: continue
    r=[float(x) for x in re.search(rb'/Rect\s*\[([^\]]*)\]',b).group(1).split()]
    u=re.search(rb'/URI\s*\(((?:\\.|[^)])*)\)',b).group(1)
    u=re.sub(rb'\\(\d{3})',lambda x:bytes([int(x.group(1),8)]),u).decode()
    x0,y0,x1,y1=min(r[0],r[2]),min(r[1],r[3]),max(r[0],r[2]),max(r[1],r[3])
    out.append({"href":u,"left":round(x0/W*100,3),"top":round((H-y1)/H*100,3),"width":round((x1-x0)/W*100,3),"height":round((y1-y0)/H*100,3)})
print(W,H,file=sys.stderr)
print(json.dumps(out,indent=1))
