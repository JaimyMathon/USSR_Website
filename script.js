// Making the menu work
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('menu-icon');
  const overlay = document.getElementById('overlay');

  menuIcon.addEventListener('click', () => {
      menuIcon.classList.toggle('open');
      overlay.classList.toggle('open');
  });
});

// Function for the scroll animation
window.addEventListener("scroll", setScrollVar);
window.addEventListener("resize", setScrollVar);

function setScrollVar() {
const htmlElement = document.documentElement;
const percentOfScreenHeightScrolled = htmlElement.scrollTop / htmlElement.clientHeight;
htmlElement.style.setProperty(
  "--scroll",
  Math.min(percentOfScreenHeightScrolled * 100, 1000)
);

// Custom logic for first-main-section scrolling text
const firstMainSection = document.querySelector('.first-main-section');
const scrollingText = firstMainSection.querySelector('.scrolling-text');

const sectionRect = firstMainSection.getBoundingClientRect();
const sectionHeight = sectionRect.height;
const sectionTop = sectionRect.top;
const windowHeight = window.innerHeight;

if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
  const progress = (windowHeight - sectionTop) / sectionHeight;
  scrollingText.style.transform = `translateY(${100 - progress * 100}%)`;
}
}

setScrollVar();

const observer = new IntersectionObserver(entries => {
for (let i = entries.length - 1; i >= 0; i--) {
  const entry = entries[i];
  if (entry.isIntersecting) {
    document.querySelectorAll("[data-img]").forEach(img => {
      img.classList.remove("show");
    });
    const img = document.querySelector(entry.target.dataset.imgToShow);
    img?.classList.add("show");
    break;
  }
}
});

document.querySelectorAll("[data-img-to-show]").forEach(section => {
observer.observe(section);
});


document.addEventListener('scroll', function() {
  const images = document.querySelectorAll('.image-div img');
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const totalImages = images.length;

  images.forEach((img, index) => {
    const imgStart = index * windowHeight * 0.5; // Start showing the image halfway through the previous image's viewport
    const imgEnd = imgStart + windowHeight * 0.5; // Fully show the image at 1.5 times the viewport height

    if (scrollTop >= imgStart && scrollTop <= imgEnd) {
      img.style.opacity = 1;
    } else {
      img.style.opacity = 0;
    }
  });
});

