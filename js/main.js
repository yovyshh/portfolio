// Enhanced typewriter effect with smoother transitions
const phrases = [
    "Graphic Designer",
    "Video Editor",
    "Creative Strategist",
    "Visual Storyteller",
    "Motion Graphics Artist"
];
let currentPhrase = 0;
let currentLetter = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeWriter() {
    const typewriterElement = document.getElementById('typewriter');
    
    if (isDeleting) {
        typewriterElement.textContent = phrases[currentPhrase].substring(0, currentLetter - 1);
        currentLetter--;
        typingSpeed = 30; // Faster deletion for better effect
    } else {
        typewriterElement.textContent = phrases[currentPhrase].substring(0, currentLetter + 1);
        currentLetter++;
        typingSpeed = 100; // Slightly faster typing
    }
    
    if (!isDeleting && currentLetter === phrases[currentPhrase].length) {
        isDeleting = true;
        typingSpeed = 1500; // Longer pause at end of phrase
    } else if (isDeleting && currentLetter === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 500; // Pause before typing next phrase
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Improved reveal elements on scroll with smoother animations
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Only animate elements that are in the viewport
        if (elementTop < windowHeight - 50 && elementBottom > 0) {
            // Add a small delay based on element position for cascade effect
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
                element.classList.add('animate-fade-in');
            }, delay);
        }
    });
}

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Start typewriter after a short delay
    setTimeout(typeWriter, 1000);
    
    // Mobile menu toggle with improved animation
    const toggleBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = toggleBtn.querySelector('i');
    let isOpen = false;

    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        mobileMenu.style.maxHeight = isOpen ? mobileMenu.scrollHeight + 'px' : '0px';
        mobileMenu.style.opacity = isOpen ? '1' : '0';
        
        // Change icon on toggle
        if (isOpen) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.style.maxHeight = '0px';
            mobileMenu.style.opacity = '0';
            isOpen = false;
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-nav');
            });
            if (this.classList.contains('nav-link')) {
                this.classList.add('active-nav');
            }
        });
    });
    
    // Throttle function to limit how often a function runs during scroll
    function throttle(callback, delay = 100) {
        let isThrottled = false;
        return function() {
            if (isThrottled) return;
            isThrottled = true;
            callback.apply(this, arguments);
            setTimeout(() => { isThrottled = false; }, delay);
        };
    }
    
    // Update active nav link on scroll with improved performance
    window.addEventListener('scroll', throttle(function() {
        const scrollPosition = window.scrollY;
        
        // Use requestAnimationFrame for smoother visual updates
        requestAnimationFrame(() => {
            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active-nav');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active-nav');
                        }
                    });
                }
            });
            
            // Check for scroll animations
            revealOnScroll();
        });
    }, 50));
    
    // Initial check for elements in view
    revealOnScroll();
});