// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const nav = document.querySelector(".nav")
const navLinks = document.querySelectorAll(".nav-list a")

if (hamburger && nav) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation()
    const isHidden = nav.getAttribute("aria-hidden") === "true"
    nav.setAttribute("aria-hidden", !isHidden)
  })

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.setAttribute("aria-hidden", "true")
    })
  })

  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.setAttribute("aria-hidden", "true")
    }
  })
}

// Theme Toggle
const themeToggle = document.querySelector(".btn-icon")
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)
  })
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light"
document.documentElement.setAttribute("data-theme", savedTheme)

// Contact Form
const contactForm = document.getElementById("contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const message = document.getElementById("message").value.trim()

    if (!name || !email || !message) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    if (!email.includes("@")) {
      alert("Por favor, insira um email válido.")
      return
    }

    const feedback = document.querySelector(".form-feedback")
    if (feedback) {
      feedback.textContent = "Mensagem enviada com sucesso! Entraremos em contato em breve."
      feedback.style.display = "block"
    }

    contactForm.reset()
  })
}

// Modal
const modalTriggers = document.querySelectorAll("[data-modal]")
const modals = document.querySelectorAll(".modal")

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault()
    const modalId = trigger.getAttribute("data-modal")
    const modal = document.getElementById(modalId)
    if (modal) {
      modal.setAttribute("aria-hidden", "false")
    }
  })
})

modals.forEach((modal) => {
  const closeBtn = modal.querySelector(".modal-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.setAttribute("aria-hidden", "true")
    })
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.setAttribute("aria-hidden", "true")
    }
  })
})

// Escape key to close modals and menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modals.forEach((modal) => modal.setAttribute("aria-hidden", "true"))
    if (nav) nav.setAttribute("aria-hidden", "true")
  }
})