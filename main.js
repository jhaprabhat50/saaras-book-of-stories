const canvas = document.getElementById('birdCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const birds = [];

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

window.addEventListener('mousemove', (e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Bird{

    constructor(){

        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;

        this.vx = (Math.random()-0.5)*2;
        this.vy = (Math.random()-0.5)*2;
    }

    draw(){

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x-10,this.y+5);
        ctx.lineTo(this.x-10,this.y-5);

        ctx.fillStyle='white';
        ctx.fill();
    }

    update(){

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx*dx+dy*dy);

        if(distance < 200){

            this.vx += dx * 0.0001;
            this.vy += dy * 0.0001;

        }

        this.x += this.vx;
        this.y += this.vy;

        if(this.x < 0) this.x = canvas.width;
        if(this.x > canvas.width) this.x = 0;

        if(this.y < 0) this.y = canvas.height;
        if(this.y > canvas.height) this.y = 0;

        this.draw();
    }
}

for(let i=0;i<120;i++){

    birds.push(new Bird());

}

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    birds.forEach(bird=>bird.update());

    requestAnimationFrame(animate);

}

animate();

window.addEventListener('resize', ()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
