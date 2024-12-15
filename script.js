/* Cursor Trail Effect */
const cursorTrails = document.querySelectorAll('.cursor-trail');
let mouseX = 0;
let mouseY = 0;
let trailCoords = [];

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateTrails() {
  trailCoords.unshift({ x: mouseX, y: mouseY });

  cursorTrails.forEach((trail, index) => {
    let coord = trailCoords[index * 3];
    if (coord) {
      trail.style.left = coord.x + 'px';
      trail.style.top = coord.y + 'px';
    }
  });

  if (trailCoords.length > 100) {
    trailCoords.pop();
  }

  requestAnimationFrame(animateTrails);
}

animateTrails();

// Matrix Rain Effect
function createMatrixRain() {
    const matrix = document.getElementById('matrix');
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 20}px`;
        column.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        let content = '';
        for (let j = 0; j < 50; j++) {
            content += characters[Math.floor(Math.random() * characters.length)] + '<br>';
        }
        column.innerHTML = content;
        matrix.appendChild(column);
    }
}

createMatrixRain();

// Recreate Matrix Rain on Window Resize
window.addEventListener('resize', () => {
    const matrix = document.getElementById('matrix');
    matrix.innerHTML = '';
    createMatrixRain();
});

// Existing JavaScript ...

// Navbar Show/Hide on Mouse Movement
const navbar = document.querySelector('.navbar');
let hideNavbarTimeout;

// Function to show the navbar
function showNavbar() {
    navbar.classList.add('visible');

    // Clear any existing timeout to prevent premature hiding
    if (hideNavbarTimeout) {
        clearTimeout(hideNavbarTimeout);
    }

    // Set a timeout to hide the navbar after 3 seconds of inactivity
    hideNavbarTimeout = setTimeout(() => {
        navbar.classList.remove('visible');
    }, 3000); // 3000 milliseconds = 3 seconds
}

// Listen for mouse movement
document.addEventListener('mousemove', showNavbar);

// Optional: Show navbar on touch (for mobile devices)
document.addEventListener('touchstart', showNavbar);

// Optional: Hide navbar on scroll
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down - hide navbar
        navbar.classList.remove('visible');
    } else {
        // Scrolling up - show navbar
        navbar.classList.add('visible');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});

// Existing JavaScript ...

// Carousel Functionality
const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const carouselItems = document.querySelectorAll('.carousel-item');
const totalItems = carouselItems.length;

// Calculate the number of visible items based on the container width
function getVisibleItems() {
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const itemWidth = carouselItems[0].offsetWidth + 20; // Item width + margin (10px on each side)
    return Math.floor(containerWidth / itemWidth);
}

let currentIndex = 0;
const visibleItems = getVisibleItems();

// Function to update the carousel position
function updateCarousel() {
    const itemWidth = carouselItems[0].offsetWidth + 20; // Recalculate in case of window resize
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Event Listeners for Navigation Buttons
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        // Loop to the end if at the beginning
        currentIndex = totalItems - visibleItems;
    }
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
    } else {
        // Loop back to the start if at the end
        currentIndex = 0;
    }
    updateCarousel();
});

// Auto Slide Carousel Every 3 Seconds
let autoSlideInterval = setInterval(() => {
    nextButton.click();
}, 3000);

// Pause Auto Slide on Hover
const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        nextButton.click();
    }, 3000);
});

// Update visibleItems and carousel on window resize
window.addEventListener('resize', () => {
    const newVisibleItems = getVisibleItems();
    if (newVisibleItems !== visibleItems) {
        // Adjust currentIndex if necessary
        if (currentIndex > totalItems - newVisibleItems) {
            currentIndex = totalItems - newVisibleItems;
            if (currentIndex < 0) currentIndex = 0;
            updateCarousel();
        }
    }
});
