document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- GSAP SAFE ---------------- */

  const hasGSAP = typeof gsap !== "undefined"
  if (hasGSAP && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
  }

  /* ---------------- LENIS ---------------- */

  if (typeof Lenis !== "undefined" && hasGSAP) {

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    })

    function raf(time){
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on("scroll", () => {
      ScrollTrigger.update()
    })

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value){
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll
      },
      getBoundingClientRect(){
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        }
      }
    })

    ScrollTrigger.addEventListener("refresh", () => lenis.update())
    ScrollTrigger.refresh()
  }

  /* ---------------- SCROLL REVEAL ---------------- */

  if (hasGSAP) {
    gsap.utils.toArray("section").forEach(sec => {
      gsap.from(sec, {
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%"
        }
      })
    })
  }

  /* ---------------- HERO PARALLAX ---------------- */

  const heroImg = document.querySelector(".project-hero img")

  if (heroImg && hasGSAP) {
    gsap.to(heroImg, {
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: ".project-hero",
        scrub: true
      }
    })
  }

  /* ---------------- NAV HOVER ---------------- */

  document.querySelectorAll(".nav-project").forEach(card => {

    card.addEventListener("mouseenter", () => {
      if (hasGSAP) {
        gsap.to(card, { y: -10, scale: 1.02, duration: 0.4 })
      }
    })

    card.addEventListener("mouseleave", () => {
      if (hasGSAP) {
        gsap.to(card, { y: 0, scale: 1, duration: 0.4 })
      }
    })

  })

  /* ---------------- IMAGE HOVER ---------------- */

  document.querySelectorAll(".project-image img").forEach(img => {

    img.addEventListener("mouseenter", () => {
      if (hasGSAP) gsap.to(img, { scale: 1.04, duration: 0.6 })
    })

    img.addEventListener("mouseleave", () => {
      if (hasGSAP) gsap.to(img, { scale: 1, duration: 0.6 })
    })

  })

  /* ---------------- THEME TOGGLE (FIXED) ---------------- */

  const toggleBtn = document.getElementById("theme-toggle")
  const logo = document.getElementById("site-logo")

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {

      document.body.classList.toggle("dark")

      const isDark = document.body.classList.contains("dark")

      if (logo) {
        logo.src = isDark ? "../Logo-dark.png" : "../Logo.png"
      }

      localStorage.setItem("theme", isDark ? "dark" : "light")
    })
  }

  /* load saved theme */

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark")
    if (logo) logo.src = "../Logo-dark.png"
  }

  /* ---------------- MENU (FIXED PROPERLY) ---------------- */

  const menuBtn = document.querySelector(".menu-toggle")
  const menu = document.querySelector(".menu-overlay")

  if (menuBtn && menu) {

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      menu.classList.toggle("active")
    })

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.remove("active")
      }
    })
  }

})