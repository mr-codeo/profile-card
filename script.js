const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

class Particle{
  constructor(){this.reset()}
  reset(){
    this.x = Math.random()*W;
    this.y = Math.random()*H;
    this.r = Math.random()*1.8+0.4;
    this.vx = (Math.random()-0.5)*0.3;
    this.vy = (Math.random()-0.5)*0.3;
    this.alpha = Math.random()*0.6+0.1;
    this.color = ['#a855f7','#6366f1','#22d3ee','#818cf8'][Math.floor(Math.random()*4)];
  }
  update(){
    this.x+=this.vx; this.y+=this.vy;
    if(this.x<0||this.x>W||this.y<0||this.y>H) this.reset();
  }
  draw(){
    ctx.save();
    ctx.globalAlpha=this.alpha;
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fill();
    ctx.restore();
  }
}

function init(){
  particles=[];
  for(let i=0;i<160;i++) particles.push(new Particle());
}

function animate(){
  ctx.clearRect(0,0,W,H);
  particles.forEach(p=>{p.update();p.draw()});
  // Draw connecting lines
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const dx=particles[i].x-particles[j].x;
      const dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<100){
        ctx.save();
        ctx.globalAlpha=(1-dist/100)*0.12;
        ctx.strokeStyle='#a855f7';
        ctx.lineWidth=0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize',()=>{resize();init()});
resize(); init(); animate();
