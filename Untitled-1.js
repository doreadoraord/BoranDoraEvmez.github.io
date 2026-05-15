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