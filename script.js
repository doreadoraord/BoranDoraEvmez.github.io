// script.js

// AOS
AOS.init({
    duration:1000,
    once:true
});

// PARTICLES

particlesJS("particles-js", {
    particles: {
        number: {
            value: 60
        },

        color: {
            value: "#ffffff"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.3
        },

        size: {
            value: 2
        },

        move: {
            enable: true,
            speed: 1
        },

        line_linked: {
            enable: true,
            opacity: 0.1
        }
    }
});

// CURSOR

const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    cursor2.style.left = e.clientX - 20 + "px";
    cursor2.style.top = e.clientY - 20 + "px";

});

// DARK MODE

const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click",()=>{

    document.body.classList.toggle("light");

});

// SHARE BUTTON

document.getElementById("shareBtn")
.addEventListener("click",()=>{

    navigator.clipboard.writeText(window.location.href);

    alert("Link copied!");

});

// RANDOM QUOTES

const quotes = [

"Build what you dream.",
"Stay creative.",
"Everything starts with an idea.",
"Code. Design. Create.",
"Dream bigger every day."

];

const quote = document.getElementById("quote");

setInterval(()=>{

    const random =
    quotes[Math.floor(Math.random()*quotes.length)];

    quote.style.opacity = 0;

    setTimeout(()=>{

        quote.innerText = random;
        quote.style.opacity = 1;

    },300);

},4000);

// HOVER SOUND

const sound =
document.getElementById("hoverSound");

document.querySelectorAll(".link-card")
.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        sound.currentTime = 0;
        sound.play();

    });

});

/* Minimal Dino Game */
(function(){
    const canvas = document.getElementById('dinoCanvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    const dino = { x: 48, y: H - 30, w: 20, h: 30, vy: 0, jumping: false };
    const gravity = 0.8;
    const jumpPower = 12;
    let obstacles = [];
    let spawnTimer = 0;
    let speed = 4;
    let score = 0;
    let running = true;

    function spawn(){
        const h = 20 + Math.random()*20;
        obstacles.push({ x: W, y: H - h, w: 12 + Math.random()*12, h: h });
    }

    function reset(){
        obstacles = [];
        dino.y = H - dino.h;
        dino.vy = 0;
        dino.jumping = false;
        spawnTimer = 0;
        score = 0;
        running = true;
    }

    function rectsIntersect(a,b){
        return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    function update(){
        if(!running) return;
        dino.vy += gravity;
        dino.y += dino.vy;
        if(dino.y > H - dino.h){ dino.y = H - dino.h; dino.vy = 0; dino.jumping = false; }

        spawnTimer++;
        if(spawnTimer > 90){ spawn(); spawnTimer = 0; }

        for(let i = obstacles.length-1; i>=0; i--){
            obstacles[i].x -= speed;
            if(obstacles[i].x + obstacles[i].w < 0){ obstacles.splice(i,1); score++; }
        }

        for(const o of obstacles){ if(rectsIntersect(dino, o)){ running = false; } }
    }

    function draw(){
        ctx.clearRect(0,0,W,H);
        // ground
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(0, H-6, W, 6);

        // dino
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

        // obstacles
        ctx.fillStyle = '#ffffff';
        obstacles.forEach(o=> ctx.fillRect(o.x, o.y, o.w, o.h));

        // game over overlay
        if(!running){
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0,0,W,H);
            ctx.fillStyle = '#fff';
            ctx.font = '14px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over — Space to restart', W/2, H/2);
        }

        // update score element
        const scoreEl = document.getElementById('dinoScore');
        if(scoreEl) scoreEl.innerText = score;
    }

    function loop(){ update(); draw(); requestAnimationFrame(loop); }

    window.addEventListener('keydown', (e)=>{
        if(e.code === 'Space'){
            e.preventDefault();
            if(!running){ reset(); }
            if(!dino.jumping){ dino.vy = -jumpPower; dino.jumping = true; }
        }
    });

    canvas.addEventListener('touchstart', (e)=>{
        e.preventDefault();
        if(!running){ reset(); }
        if(!dino.jumping){ dino.vy = -jumpPower; dino.jumping = true; }
    }, { passive:false });

    reset(); loop();
})();

/* Mailto fallback: try several open methods, if they fail copy address to clipboard */
(function(){
    const link = document.getElementById('contactLink');
    if(!link) return;
    const email = 'borandora@gmail.com';

    link.addEventListener('click', function(e){
        e.preventDefault();
        const webmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(email);

        // Try to open webmail in new tab/window
        try{
            const w = window.open(webmail, '_blank');
            if(w){
                w.focus();
                return;
            }
        }catch(err){}

        // As a fallback, navigate current tab
        try{
            window.location.href = webmail;
            return;
        }catch(err){}

        // Final fallback: copy email to clipboard and notify
        if(navigator.clipboard){
            navigator.clipboard.writeText(email).then(()=>{
                alert('Web postası açılamadı; e-posta adresi panoya kopyalandı: ' + email);
            }).catch(()=>{
                alert('Web postası açılamadı. Lütfen manuel olarak gönderin: ' + email);
            });
        }else{
            alert('Web postası açılamadı. Lütfen manuel olarak gönderin: ' + email);
        }
    });
})();
