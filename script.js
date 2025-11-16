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

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuToggle && navLinks && navbar) {
        // Toggle menu
        mobileMenuToggle.addEventListener('click', function() {
            const isActive = mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navbar.classList.toggle('menu-open');
            mobileMenuToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active')) {
                const isClickInsideNav = navLinks.contains(e.target);
                const isClickOnToggle = mobileMenuToggle.contains(e.target);
                
                if (!isClickInsideNav && !isClickOnToggle) {
                    mobileMenuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    navbar.classList.remove('menu-open');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Prevent body scroll when menu is open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
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

// Elements we want to reveal (exclude hero section elements)
const revealSelectors = ['.education-card', '.about-content', '.cert-card', '.project-card', '.skill-category', '.experience-card', '.resume-content'];
document.querySelectorAll(revealSelectors.join(',')).forEach(el => {
    el.classList.add('pre-reveal');
    observer.observe(el);
});

// Handle hero section elements separately - make them visible immediately if in viewport
document.querySelectorAll('.hero .animate-fade-up').forEach(el => {
    // Check if element is already in viewport
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInViewport) {
        el.classList.add('is-visible');
    } else {
        el.classList.add('pre-reveal');
        observer.observe(el);
    }
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
document.addEventListener('DOMContentLoaded', function() {
    const certModal = document.getElementById('certModal');
    if (!certModal) {
        console.error('Certificate modal not found');
        return;
    }
    
    const certCards = document.querySelectorAll('.cert-card');
    let currentRotation = 0;
    let currentZoom = 1;

    // Close modal function (defined early so it can be used in event handlers)
    const closeModal = () => {
        if (certModal) {
            certModal.classList.remove('active');
            document.body.style.overflow = '';
            currentRotation = 0;
            currentZoom = 1;
            
            // Clear iframe src to prevent memory leaks
            const modalPdfViewer = certModal.querySelector('.cert-pdf-viewer');
            if (modalPdfViewer) {
                modalPdfViewer.src = '';
            }
        }
    };

    // Update image transform function
    function updateImageTransform() {
        const certImage = certModal.querySelector('.cert-image');
        if (certImage && certImage.style.display !== 'none') {
            certImage.style.transform = `rotate(${currentRotation}deg) scale(${currentZoom})`;
        }
    }

    // Open modal on card click
    certCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const certSrc = this.dataset.cert;
            const certTitle = this.dataset.title;
            const certIssuer = this.dataset.issuer;
            const certDesc = this.dataset.desc;
            
            if (!certSrc) {
                console.error('Certificate source not found');
                return;
            }
            
            const modalPdfViewer = certModal.querySelector('.cert-pdf-viewer');
            const modalImg = certModal.querySelector('.cert-image');
            const modalTitle = certModal.querySelector('.cert-modal-title');
            const modalIssuer = certModal.querySelector('.cert-modal-issuer');
            const modalDesc = certModal.querySelector('.cert-modal-desc');
            const downloadBtn = certModal.querySelector('.cert-download-btn');
            const certControls = certModal.querySelector('.cert-controls');
            
            // Update modal content
            if (modalTitle) modalTitle.textContent = certTitle || 'Certificate';
            if (modalIssuer) modalIssuer.textContent = certIssuer || '';
            if (modalDesc) modalDesc.textContent = certDesc || '';
            if (downloadBtn) {
                downloadBtn.href = certSrc;
                downloadBtn.download = (certTitle || 'certificate').replace(/\s+/g, '_') + '.pdf';
            }
            
            // Check if it's a PDF file
            if (certSrc.toLowerCase().endsWith('.pdf')) {
                // Show PDF viewer, hide image
                if (modalPdfViewer) {
                    modalPdfViewer.style.display = 'block';
                    modalPdfViewer.src = certSrc + '#toolbar=1&navpanes=1&scrollbar=1';
                    modalPdfViewer.onerror = function() {
                        // Fallback: open in new window if iframe fails
                        window.open(certSrc, '_blank');
                        closeModal();
                    };
                }
                if (modalImg) modalImg.style.display = 'none';
                if (certControls) certControls.style.display = 'none';
            } else {
                // Show image, hide PDF viewer
                if (modalPdfViewer) modalPdfViewer.style.display = 'none';
                if (modalImg) {
                    modalImg.style.display = 'block';
                    modalImg.src = certSrc;
                    modalImg.onerror = function() {
                        console.error('Failed to load image:', certSrc);
                    };
                }
                // Show rotate/zoom controls for images
                if (certControls) certControls.style.display = 'flex';
            }
            
            // Reset rotation and zoom
            currentRotation = 0;
            currentZoom = 1;
            updateImageTransform();
            
            // Show modal
            certModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeBtn = certModal.querySelector('.cert-modal-close');
    const overlay = certModal.querySelector('.cert-modal-overlay');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Rotate certificate
    const rotateBtn = certModal.querySelector('.cert-rotate-btn');
    if (rotateBtn) {
        rotateBtn.addEventListener('click', function() {
            currentRotation += 90;
            if (currentRotation >= 360) currentRotation = 0;
            updateImageTransform();
        });
    }

    // Reset rotation
    const resetBtn = certModal.querySelector('.cert-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            currentRotation = 0;
            currentZoom = 1;
            updateImageTransform();
        });
    }

    // Zoom in
    const zoomInBtn = certModal.querySelector('.cert-zoom-in-btn');
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', function() {
            currentZoom = Math.min(currentZoom + 0.25, 3);
            updateImageTransform();
        });
    }

    // Zoom out
    const zoomOutBtn = certModal.querySelector('.cert-zoom-out-btn');
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', function() {
            currentZoom = Math.max(currentZoom - 0.25, 0.5);
            updateImageTransform();
        });
    }

    // Keyboard shortcuts for modal
    document.addEventListener('keydown', function(e) {
        if (!certModal || !certModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            if (rotateBtn) rotateBtn.click();
        }
        if (e.key === '0') {
            e.preventDefault();
            if (resetBtn) resetBtn.click();
        }
        if (e.key === '+' || e.key === '=') {
            e.preventDefault();
            if (zoomInBtn) zoomInBtn.click();
        }
        if (e.key === '-') {
            e.preventDefault();
            if (zoomOutBtn) zoomOutBtn.click();
        }
    });
});
