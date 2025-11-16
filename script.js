// Page Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Elements we want to reveal
const revealSelectors = ['.animate-fade-up', '.education-card', '.about-content', '.cert-card', '.project-card', '.skill-category', '.experience-card', '.resume-content'];
document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
    el.classList.add('pre-reveal');
    observer.observe(el);
});

// Typewriter effect for hero name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typewriter effect when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typewriterElement = document.querySelector('.typewriter-text');
            if (typewriterElement && !typewriterElement.dataset.typed) {
                typewriterElement.dataset.typed = 'true';
                const originalText = typewriterElement.textContent || 'Kulsum Banoo';
                typeWriter(typewriterElement, originalText, 150);
            }
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Scroll Progress Indicator
window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
    
    // Show/hide scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-to-top');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-to-top');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Custom Cursor - Enhanced
const cursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;
let trailHistory = [];

if (cursor && cursorTrail && window.innerWidth > 768) {
    function updateCursor() {
        if (cursor) {
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        }
        
        // Enhanced trail animation with history
        trailX += (mouseX - trailX) * 0.12;
        trailY += (mouseY - trailY) * 0.12;
        
        if (cursorTrail) {
            cursorTrail.style.left = trailX + 'px';
            cursorTrail.style.top = trailY + 'px';
            cursorTrail.style.opacity = '0.7';
        }
        
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    updateCursor();
    
    // Enhanced hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-tag, .project-card, .education-card, .experience-card, .contact-link, .cert-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) {
                cursor.classList.add('hover');
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) {
                cursor.classList.remove('hover');
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
}

// Add subtle parallax effect on scroll
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            
            // Parallax for particles (subtle effect)
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                const speed = 0.05 + (index % 3) * 0.02;
                const offset = scrolled * speed;
                particle.style.transform = `translateY(${offset}px)`;
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// Enhanced 3D Tilt Effect on Cards
const cards = document.querySelectorAll('.project-card, .education-card, .experience-card, .skill-category');
cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        // Enhanced 3D effect with better perspective
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Certificate Gallery Modal
const certModal = document.getElementById('certModal');
const certCards = document.querySelectorAll('.cert-card');
let currentRotation = 0;
let currentZoom = 1;

// Open modal on card click
certCards.forEach(card => {
    card.addEventListener('click', function() {
        const certSrc = this.dataset.cert;
        const certTitle = this.dataset.title;
        const certIssuer = this.dataset.issuer;
        const certDesc = this.dataset.desc;
        
        const modal = document.getElementById('certModal');
        const modalPdfViewer = modal.querySelector('.cert-pdf-viewer');
        const modalImg = modal.querySelector('.cert-image');
        const modalTitle = modal.querySelector('.cert-modal-title');
        const modalIssuer = modal.querySelector('.cert-modal-issuer');
        const modalDesc = modal.querySelector('.cert-modal-desc');
        const downloadBtn = modal.querySelector('.cert-download-btn');
        
        const certControls = modal.querySelector('.cert-controls');
        
        // Check if it's a PDF file
        if (certSrc.toLowerCase().endsWith('.pdf')) {
            // Show PDF viewer, hide image
            modalPdfViewer.style.display = 'block';
            modalImg.style.display = 'none';
            modalPdfViewer.src = certSrc + '#toolbar=0&navpanes=0&scrollbar=1';
            // Hide rotate/zoom controls for PDFs (browser handles navigation)
            if (certControls) certControls.style.display = 'none';
        } else {
            // Show image, hide PDF viewer
            modalPdfViewer.style.display = 'none';
            modalImg.style.display = 'block';
            modalImg.src = certSrc;
            // Show rotate/zoom controls for images
            if (certControls) certControls.style.display = 'flex';
        }
        
        modalTitle.textContent = certTitle;
        modalIssuer.textContent = certIssuer;
        modalDesc.textContent = certDesc;
        downloadBtn.href = certSrc;
        downloadBtn.download = certTitle.replace(/\s+/g, '_') + '.pdf';
        
        // Reset rotation and zoom
        currentRotation = 0;
        currentZoom = 1;
        updateImageTransform();
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
const closeModal = () => {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
    currentRotation = 0;
    currentZoom = 1;
};

certModal.querySelector('.cert-modal-close').addEventListener('click', closeModal);
certModal.querySelector('.cert-modal-overlay').addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
        closeModal();
    }
});

// Rotate certificate
const rotateBtn = certModal.querySelector('.cert-rotate-btn');
rotateBtn.addEventListener('click', function() {
    currentRotation += 90;
    if (currentRotation >= 360) currentRotation = 0;
    updateImageTransform();
});

// Reset rotation
const resetBtn = certModal.querySelector('.cert-reset-btn');
resetBtn.addEventListener('click', function() {
    currentRotation = 0;
    currentZoom = 1;
    updateImageTransform();
});

// Zoom in
const zoomInBtn = certModal.querySelector('.cert-zoom-in-btn');
zoomInBtn.addEventListener('click', function() {
    currentZoom = Math.min(currentZoom + 0.25, 3);
    updateImageTransform();
});

// Zoom out
const zoomOutBtn = certModal.querySelector('.cert-zoom-out-btn');
zoomOutBtn.addEventListener('click', function() {
    currentZoom = Math.max(currentZoom - 0.25, 0.5);
    updateImageTransform();
});

// Update image transform
function updateImageTransform() {
    const certImage = certModal.querySelector('.cert-image');
    if (certImage && certImage.style.display !== 'none') {
        certImage.style.transform = `rotate(${currentRotation}deg) scale(${currentZoom})`;
    }
    // Note: PDF rotation/zoom is handled by browser's PDF viewer controls
}

// Keyboard shortcuts for modal
document.addEventListener('keydown', function(e) {
    if (!certModal.classList.contains('active')) return;
    
    if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        rotateBtn.click();
    }
    if (e.key === '0') {
        e.preventDefault();
        resetBtn.click();
    }
    if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomInBtn.click();
    }
    if (e.key === '-') {
        e.preventDefault();
        zoomOutBtn.click();
    }
});
