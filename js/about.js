document.addEventListener("DOMContentLoaded", () => {

/* ---------------- ELEMENTS ---------------- */

const character = document.getElementById("character")
const intro = document.getElementById("intro")
const introText = document.getElementById("intro-text")
const options = document.getElementById("options")

const buttons = document.querySelectorAll(".about-options button")
const blocks = document.querySelectorAll(".content-block")
const contentWrap = document.querySelector(".about-content")

const cursor = document.querySelector(".custom-cursor")

/* ---------------- SAFETY ---------------- */

if(!character || !intro || !introText || !options || !contentWrap){
console.error("Missing required elements")
return
}

/* ---------------- CURSOR ---------------- */

if(cursor && window.innerWidth > 900){

let mouseX = window.innerWidth / 2
let mouseY = window.innerHeight / 2
let posX = mouseX
let posY = mouseY

document.addEventListener("mousemove",(e)=>{
mouseX = e.clientX
mouseY = e.clientY
})

function animate(){
posX += (mouseX - posX) * 0.15
posY += (mouseY - posY) * 0.15


cursor.style.transform =
  `translate(${posX}px, ${posY}px) translate(-50%, -50%)`

requestAnimationFrame(animate)

}

animate()

document.querySelectorAll("a, button, #character").forEach(el=>{
el.addEventListener("mouseenter",()=> cursor.classList.add("cursor-grow"))
el.addEventListener("mouseleave",()=> cursor.classList.remove("cursor-grow"))
})
}

/* ---------------- TYPEWRITER ---------------- */

const text = "hi, i’m maitri.\nwant to know more?"
let typingInterval = null

function typeText(){

clearInterval(typingInterval)

introText.innerHTML = ""
let i = 0

typingInterval = setInterval(()=>{


if(i >= text.length){
  clearInterval(typingInterval)
  options.style.opacity = 1
  return
}

const char = text[i]
introText.innerHTML += char === "\n" ? "<br>" : char

i++


}, 30)
}

/* ---------------- STATE ---------------- */

let started = false
let locked = false

/* ---------------- INIT ---------------- */

intro.classList.remove("active")
contentWrap.classList.remove("active")

blocks.forEach(b => b.classList.remove("active"))

options.style.opacity = 0

/* ---------------- RESET FUNCTION (CORE FIX) ---------------- */

function resetToIntro(){

// 🔥 step 1: kill all cards FIRST
blocks.forEach(b=>{
b.classList.remove("active")
})

// 🔥 step 2: hide wrapper
contentWrap.classList.remove("active")

// 🔥 step 3: force reflow (THIS is the real fix)
contentWrap.offsetHeight

// 🔥 step 4: show intro cleanly
intro.classList.add("active")

options.style.opacity = 0

typeText()
}

/* ---------------- BUNNY CLICK ---------------- */

character.addEventListener("click",()=>{

if(locked) return
locked = true

if(started){
resetToIntro()
started = false
} else {
intro.classList.add("active")
options.style.opacity = 0
typeText()
started = true
}

setTimeout(()=> locked = false, 300)
})

/* ---------------- BUTTON CLICK ---------------- */

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{


const target = document.getElementById(btn.dataset.target)
if(!target) return

// hide intro
intro.classList.remove("active")

// show wrapper
contentWrap.classList.add("active")

// reset all cards
blocks.forEach(b=> b.classList.remove("active"))

// show selected
target.classList.add("active")

})

})

})
