document.addEventListener("DOMContentLoaded", () => {
  // Initialize variables
  let currentSection = "welcome"
  const sections = ["welcome", "letter", "gallery", "special", "hidden-message", "timeline", "final"]
  const music = document.getElementById("background-music")
  const volumeControl = document.getElementById("volume")
  const musicToggle = document.getElementById("music-toggle")
  const revealBtn = document.getElementById("reveal-btn")
  const hiddenText = document.getElementById("hidden-text")

  // Personalization - Hardcoded values (edit these directly)
  const herName = "FK"
  const yourName = "Sonu"
  const songUrl = "song.mp3" // Replace with actual song URL
  const firstDate = "18/12/2024" // When you first met (DD/MM/YYYY)
  const specialDate = "14/02/2024" // Another special date (DD/MM/YYYY)
  

  // Set personalized content
  document.getElementById("her-name").textContent = herName
  document.getElementById("letter-text").innerHTML = document
    .getElementById("letter-text")
    .innerHTML.replace("[Her Name]", herName)
    .replace("[Your Name]", yourName)
  document.getElementById("first-date").textContent = firstDate
  document.getElementById("special-date").textContent = specialDate

  // Set music source directly
  music.src = songUrl

  // Set today's date
  const today = new Date()
  const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`
  document.getElementById("today-date").textContent = formattedToday

  // Calculate days together
  const firstDateParts = firstDate.split("/")
  const firstDateTime = new Date(`${firstDateParts[2]}-${firstDateParts[1]}-${firstDateParts[0]}`)
  const daysTogether = Math.floor((today - firstDateTime) / (1000 * 60 * 60 * 24))
  document.getElementById("days-count").textContent = daysTogether

  // Show first section
  document.getElementById(currentSection).classList.add("active")

  // Music controls
  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play()
      musicToggle.innerHTML = '<i class="fas fa-pause"></i>'
      document.querySelector(".volume-control").classList.add("active")
    } else {
      music.pause()
      musicToggle.innerHTML = '<i class="fas fa-music"></i>'
      document.querySelector(".volume-control").classList.remove("active")
    }
  })

  volumeControl.addEventListener("input", function () {
    music.volume = this.value
  })

  // Hidden message reveal
  revealBtn.addEventListener("click", function () {
    hiddenText.classList.add("revealed")
    hiddenText.classList.remove("hidden")
    this.style.display = "none"
  })

  // Navigation between sections
  document.querySelectorAll(".continue-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index < sections.length - 1) {
        document.getElementById(sections[index]).classList.remove("active")
        document.getElementById(sections[index]).style.display = "none"

        document.getElementById(sections[index + 1]).style.display = "flex"
        setTimeout(() => {
          document.getElementById(sections[index + 1]).classList.add("active")
        }, 10)

        currentSection = sections[index + 1]

        // Scroll to top of new section
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    })
  })

  // Animation for special points
  const specialPoints = document.querySelectorAll(".special-point")
  specialPoints.forEach((point, index) => {
    setTimeout(() => {
      point.style.opacity = "0"
      point.style.transform = "translateX(-20px)"
      point.style.transition = "opacity 0.5s ease, transform 0.5s ease"

      setTimeout(() => {
        point.style.opacity = "1"
        point.style.transform = "translateX(0)"
      }, 100)
    }, index * 300)
  })

  // Try to autoplay music (may be blocked by browsers)
  document.body.addEventListener(
    "click",
    () => {
      if (music.paused) {
        music
          .play()
          .then(() => {
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>'
            document.querySelector(".volume-control").classList.add("active")
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error)
          })
      }
    },
    { once: true },
  )
})
