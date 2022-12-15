let i = 0
const images = []
const slideTime = 3000

images[0] = "images/whiskey"
images[1] = "images/io"
images[2] = "images/DC"

function changePicture() {
  const slideshow = document.getElementById("slideshow")
  //   const computedStyle = window.getComputedStyle(slideshow).background
  if (slideshow.style.backgroundImage === "") {
    slideshow.style.backgroundImage =
      window.getComputedStyle(slideshow).backgroundImage
  }
  const computedStyle = slideshow.style.backgroundImage
  const constructedStyle = computedStyle.replace(
    /(?<=url\(").*?(?="\))/gm,
    `${images[i]}.jpg`
  )

  slideshow.style.backgroundImage = constructedStyle
  if (i < images.length - 1) {
    i++
  } else {
    i = 0
  }
  setTimeout(changePicture, slideTime)
}

changePicture()

const filterButtons = document.querySelectorAll(".projects-filter li")
const projects = document.querySelectorAll(".project")

let filterForNow = "all"

filterProjects(filterForNow)

filterButtons.forEach((li) => {
  li.addEventListener("click", (event) => {
    removeActiveClassfromButtons(filterButtons)
    li.classList.add("active")
    if (li.id === "all") {
      uncoverProjects(projects)
    } else {
      coverProjects(projects)
      filterProjects(li.id)
    }
    filterForNow = li.id
  })
})

projects.forEach((project) => {
  project.addEventListener(
    "mouseenter",
    () => {
      coverProjects(projects)
      project.style.opacity = "1"
    },
    true
  )
  project.addEventListener("mouseleave", () => {
    project.style.opacity = "0"
    filterProjects(filterForNow)
  })
})

function removeActiveClassfromButtons(elements) {
  elements.forEach((el) => el.classList.remove("active"))
}

function uncoverProjects(projects) {
  projects.forEach((p) => (p.style.opacity = "1"))
}
function coverProjects(projects) {
  projects.forEach((p) => (p.style.opacity = "0"))
}

function filterProjects(id) {
  if (id === "all") {
    uncoverProjects(projects)
  }
  let filteredProjects = []
  projects.forEach((p) => {
    if (p.classList.contains(id)) {
      filteredProjects.unshift(p)
    }
  })
  uncoverProjects(filteredProjects)
}



