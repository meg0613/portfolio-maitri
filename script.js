document.addEventListener("DOMContentLoaded", () => {

/* ================= LENIS (SMOOTH SCROLL) ================= */

let lenis = null

if (typeof Lenis !== "undefined") {

  lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true
  })

  function raf(time){
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}


/* ================= DARK MODE ================= */

const toggleBtn = document.getElementById("theme-toggle")
const logo = document.getElementById("site-logo")

function updateLogo(){
  const isDark = document.body.classList.contains("dark")
  const isProjectPage = window.location.pathname.includes("/work/")
  const basePath = isProjectPage ? "../" : ""

  if(logo){
    logo.src = isDark
      ? basePath + "Logo-dark.png"
      : basePath + "Logo.png"
  }
}

/* APPLY SAVED THEME */
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark")
}

updateLogo()

toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark")

  const isDark = document.body.classList.contains("dark")
  localStorage.setItem("theme", isDark ? "dark" : "light")

  updateLogo()
})


/* ================= MENU ================= */

const menuBtn = document.querySelector(".menu-toggle")
const menu = document.querySelector(".menu-overlay")

menuBtn?.addEventListener("click", () => {
  menu.classList.toggle("active")
})

menu?.addEventListener("click", (e) => {
  if(e.target === menu){
    menu.classList.remove("active")
  }
})

/* CLOSE MENU WHEN LINK CLICKED */
document.querySelectorAll(".menu-nav a").forEach(link => {
  link.addEventListener("click", () => {
    menu?.classList.remove("active")
  })
})


/* ================= PAGE TRANSITION ================= */

const transition = document.querySelector(".page-transition")

document.querySelectorAll("a[href]").forEach(link => {

  link.addEventListener("click", function(e){

    const href = this.getAttribute("href")

    if(href && !href.startsWith("#") && !this.hasAttribute("target")){

      e.preventDefault()

      transition?.classList.add("active")

      setTimeout(()=>{
        window.location = href
      }, 500)
    }

  })

})

/* REMOVE TRANSITION ON LOAD */
window.addEventListener("load", () => {
  transition?.classList.remove("active")
})


/* ================= TEXT REVEAL ================= */

function splitText(element){
  const text = element.innerHTML
  element.innerHTML = text
    .split(" ")
    .map(word => `<span>${word}&nbsp;</span>`)
    .join("")
}

document.querySelectorAll(".reveal-text").forEach(el => {
  splitText(el)
})

function animateText(){
  document.querySelectorAll(".reveal-text span").forEach((span, i) => {
    setTimeout(() => {
      span.style.opacity = "1"
      span.style.transform = "translateY(0)"
      span.style.transition = "all 0.6s ease"
    }, i * 35)
  })
}


/* ================= CONTACT OVERLAY ================= */

const contact = document.querySelector(".contact-dark")

if(contact){

  window.addEventListener("scroll", () => {

    const rect = contact.getBoundingClientRect()

    if(rect.top < window.innerHeight * 0.85){
      contact.classList.add("active")
      animateText()
    } else {
      contact.classList.remove("active")
    }

    if(rect.top < window.innerHeight * 0.6){
      document.body.style.background = "#0a0a0a"
    } else {
      document.body.style.background = ""
    }

  })

}


/* ================= BUTTON GLOW ================= */

const glowBtn = document.querySelector(".contact-btn")

if(glowBtn){
  glowBtn.addEventListener("mousemove", e => {
    const rect = glowBtn.getBoundingClientRect()
    glowBtn.style.setProperty("--x", `${e.clientX - rect.left}px`)
    glowBtn.style.setProperty("--y", `${e.clientY - rect.top}px`)
  })
}


/* ================= PARALLAX ================= */

window.addEventListener("scroll", () => {
  document.querySelectorAll(".project-image img").forEach(img => {
    const rect = img.getBoundingClientRect()
    const speed = 0.05
    img.style.transform = `translateY(${rect.top * speed}px)`
  })
})


/* ================= SUBTLE HOVER ================= */

document.querySelectorAll("a, button").forEach(el => {

  el.addEventListener("mouseenter", () => {
    el.style.transition = "transform 0.2s ease"
    el.style.transform = "translateY(-2px)"
  })

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translateY(0)"
  })

})

})