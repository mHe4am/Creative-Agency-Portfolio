// Local Storage
let currColor = localStorage.getItem("color_theme");
if (currColor !== null) {
  document.documentElement.style.setProperty("--main-color", currColor);

  document.querySelectorAll(".colors li").forEach((el) => {
    el.classList.remove("active");

    if (el.dataset.color === currColor) {
      el.classList.add("active");
    }
  });
}

let randBg = true,
  theInterval;
let randomBg = localStorage.getItem("random_bg");
if (randomBg !== null) {
  document.querySelectorAll(".bg-opts span").forEach((span) => {
    span.classList.remove("active");
  });

  if (randomBg === "true") {
    randBg = true;
    document.querySelector(".bg-opts .yes").classList.add("active");
  } else {
    randBg = false;
    document.querySelector(".bg-opts .no").classList.add("active");
  }
}

let showBullets = localStorage.getItem("show_bullets");
if (showBullets !== null) {
  document.querySelector(".nav-bullets").style.display = showBullets;
  document.querySelectorAll(".bullets-opts span").forEach((span) => {
    span.classList.remove("active");
    if (span.dataset.bullets === showBullets) {
      span.classList.add("active");
    }
  });
}

// Settings Options
document.querySelector(".settings-box .gear-ico").onclick = function () {
  document
    .querySelector(".settings-box .gear-ico i")
    .classList.toggle("fa-spin");
  this.parentElement.classList.toggle("opened");
};

// Colors
let colorsLis = document.querySelectorAll(".settings-box .colors li");

colorsLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);

    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_theme", e.target.dataset.color);
  });
});

// Random Background
let bgSpans = document.querySelectorAll(".settings-box .bg-opts span");

bgSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.rand_bg === "yes") {
      randBg = true;
      setRandomBg();
      localStorage.setItem("random_bg", true);
    } else {
      randBg = false;
      clearInterval(theInterval);
      localStorage.setItem("random_bg", false);
    }
  });
});

// Nav Bullets
let navBullets = document.querySelectorAll(".nav-bullets .bullet");

scrollTo(navBullets);

// Landing Page
let landPage = document.querySelector(".landing-page"),
  imgsArr = [];

for (let i = 0; i < 10; i++) {
  imgsArr.push(`img_${i}.jpg`);
}

function setRandomBg() {
  if (randBg === true) {
    theInterval = setInterval(() => {
      let randImg = imgsArr[Math.floor(Math.random() * imgsArr.length)];
      landPage.style.backgroundImage = `url("../imgs/${randImg}")`;
    }, 5000);
  }
}

setRandomBg();

// Skills
let skills = document.querySelector(".our-skills");
let progSpans = document.querySelectorAll(".our-skills span.done-prog");

window.onscroll = () => {
  if (
    // this == window HERE
    window.scrollY + this.innerHeight >=
    skills.offsetTop + skills.offsetHeight / 3
  ) {
    progSpans.forEach((span) => {
      span.style.width = span.dataset.prog;
    });
  } else {
    progSpans.forEach((span) => {
      span.style.width = "0%";
    });
  }
};

let galleryImgs = document.querySelectorAll(".gallery-imgs img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== "") {
      let imgTitle = document.createElement("h3");
      imgTitle.appendChild(document.createTextNode(img.alt));
      popupBox.appendChild(imgTitle);
    }

    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.appendChild(document.createTextNode("X"));
    popupBox.appendChild(closeBtn);

    document.body.appendChild(popupBox);
  });
});

// close span
document.addEventListener("click", (e) => {
  let closeBtn = document.querySelector(".popup-box span.close-btn");
  if (e.target === closeBtn) {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Scroll To View
function scrollTo(elements) {
  elements.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

let landSecs = document.querySelectorAll(".landing-page .links a");
scrollTo(landSecs);

function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((span) => {
    span.classList.remove("active");
  });
  e.target.classList.add("active");
}

// Show bullets option
let bulletsBox = document.querySelector(".nav-bullets");
let bulletsSpans = document.querySelectorAll(".bullets-opts span");

bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    bulletsBox.style.display = span.dataset.bullets;
    localStorage.setItem("show_bullets", span.dataset.bullets);
  });
});

// Reset Option
document.querySelector(".reset-btn").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// Menu
let menuBtn = document.querySelector(".burger-icon");
let menuContent = document.querySelector(".landing-page ul.links");

menuBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  menuContent.classList.toggle("opened");
};

document.addEventListener("click", (e) => {
  if (e.target !== menuBtn && e.target !== menuContent) {
    menuBtn.classList.remove("menu-active");
    menuContent.classList.remove("opened");
  }
});

menuContent.onclick = (e) => {
  e.stopPropagation();
};
