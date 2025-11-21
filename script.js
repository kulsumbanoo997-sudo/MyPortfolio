// portfolio javascript
// smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// navbar changes on scroll
window.addEventListener('scroll', function() {
    var nav = document.querySelector('.navbar');
    if (nav) {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// mobile menu
document.addEventListener('DOMContentLoaded', function() {
    var menuBtn = document.querySelector('.mobile-menu-toggle');
    var menu = document.querySelector('.nav-links');
    var navbar = document.querySelector('.navbar');
    var navLinks = document.querySelectorAll('.nav-links a');
    
    if (!menuBtn || !menu) return;
    
    function closeMenu() {
        menuBtn.classList.remove('active');
        menu.classList.remove('active');
        if (navbar) navbar.classList.remove('menu-open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
    
    menuBtn.addEventListener('click', function() {
        var isOpen = menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        if (navbar) navbar.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });
    
    // close on outside click
    document.addEventListener('click', function(e) {
        if (menu.classList.contains('active')) {
            if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // close on resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            closeMenu();
        }
    });
});

// fade in elements when scrolling
var observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            var children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach(function(child, i) {
                setTimeout(function() {
                    child.classList.add('is-visible');
                }, i * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// elements that should fade in
var elements = '.about-content, .about-item, .about-skills, .key-skill-item, .education-card, .skill-category, .project-card, .experience-card, .cert-card, .resume-content, .contact-form-wrapper, .contact-links-wrapper, .contact-link, section > .container > h2';

document.querySelectorAll(elements).forEach(function(el) {
    el.classList.add('pre-reveal');
    observer.observe(el);
});

// headings animation delay
document.querySelectorAll('section > .container > h2').forEach(function(h, i) {
    h.style.transitionDelay = (i * 0.1) + 's';
});

// hero animations
document.querySelectorAll('.hero .animate-fade-up').forEach(function(el) {
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible');
    } else {
        el.classList.add('pre-reveal');
        observer.observe(el);
    }
});

// rotating words
function rotateWords() {
    var container = document.querySelector('.rotating-words');
    if (!container) return;
    
    var words = container.querySelectorAll('.word');
    if (words.length === 0) return;
    
    var index = 0;
    
    function next() {
        words.forEach(function(w) { w.classList.remove('active'); });
        words[index].classList.add('active');
        index = (index + 1) % words.length;
    }
    
    next();
    setInterval(next, 3000);
}

document.addEventListener('DOMContentLoaded', rotateWords);

// progress bar at top
window.addEventListener('scroll', function() {
    var total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (window.pageYOffset / total) * 100;
    var bar = document.querySelector('.scroll-progress');
    if (bar) {
        bar.style.width = scrolled + '%';
    }
    
    // back to top button
    var topBtn = document.querySelector('.scroll-to-top');
    if (topBtn) {
        if (window.pageYOffset > 300) {
            topBtn.classList.add('visible');
        } else {
            topBtn.classList.remove('visible');
        }
    }
});

// back to top
var topBtn = document.querySelector('.scroll-to-top');
if (topBtn) {
    topBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// custom cursor for desktop
var cursor = document.querySelector('.custom-cursor');
var trail = document.querySelector('.cursor-trail');
var mx = 0, my = 0, tx = 0, ty = 0;

if (cursor && trail && window.innerWidth > 768) {
    function updateCursor() {
        if (cursor) {
            cursor.style.left = mx + 'px';
            cursor.style.top = my + 'px';
        }
        tx += (mx - tx) * 0.12;
        ty += (my - ty) * 0.12;
        if (trail) {
            trail.style.left = tx + 'px';
            trail.style.top = ty + 'px';
            trail.style.opacity = '0.7';
        }
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', function(e) {
        mx = e.clientX;
        my = e.clientY;
    });
    
    updateCursor();
    
    // cursor gets bigger on hover
    var interactive = document.querySelectorAll('a, button, .btn, .skill-tag, .project-card, .education-card, .experience-card, .contact-link, .cert-card');
    interactive.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            if (cursor) {
                cursor.classList.add('hover');
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            }
        });
        el.addEventListener('mouseleave', function() {
            if (cursor) {
                cursor.classList.remove('hover');
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    });
}

// card tilt on hover
var cards = document.querySelectorAll('.project-card, .education-card, .experience-card, .skill-category');
cards.forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var centerX = rect.width / 2;
        var centerY = rect.height / 2;
        var rotateX = (y - centerY) / 15;
        var rotateY = (centerX - x) / 15;
        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.03)';
        card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// cert modal popup
document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('certModal');
    if (!modal) return;
    
    var certCards = document.querySelectorAll('.cert-card');
    var rotation = 0;
    var zoom = 1;
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        rotation = 0;
        zoom = 1;
        var pdf = modal.querySelector('.cert-pdf-viewer');
        if (pdf) pdf.src = '';
    }
    
    function updateImage() {
        var img = modal.querySelector('.cert-image');
        if (img && img.style.display !== 'none') {
            img.style.transform = 'rotate(' + rotation + 'deg) scale(' + zoom + ')';
        }
    }
    
    certCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            var file = this.dataset.cert;
            var title = this.dataset.title;
            var issuer = this.dataset.issuer;
            var desc = this.dataset.desc;
            
            if (!file) return;
            
            var pdf = modal.querySelector('.cert-pdf-viewer');
            var img = modal.querySelector('.cert-image');
            var titleEl = modal.querySelector('.cert-modal-title');
            var issuerEl = modal.querySelector('.cert-modal-issuer');
            var descEl = modal.querySelector('.cert-modal-desc');
            var download = modal.querySelector('.cert-download-btn');
            var controls = modal.querySelector('.cert-controls');
            
            if (titleEl) titleEl.textContent = title || 'Certificate';
            if (issuerEl) issuerEl.textContent = issuer || '';
            if (descEl) descEl.textContent = desc || '';
            if (download) {
                download.href = file;
                download.download = (title || 'certificate').replace(/\s+/g, '_') + '.pdf';
            }
            
            if (file.toLowerCase().endsWith('.pdf')) {
                if (pdf) {
                    pdf.style.display = 'block';
                    pdf.src = file + '#toolbar=1&navpanes=1&scrollbar=1';
                    pdf.onerror = function() {
                        window.open(file, '_blank');
                        closeModal();
                    };
                }
                if (img) img.style.display = 'none';
                if (controls) controls.style.display = 'none';
            } else {
                if (pdf) pdf.style.display = 'none';
                if (img) {
                    img.style.display = 'block';
                    img.src = file;
                }
                if (controls) controls.style.display = 'flex';
            }
            
            rotation = 0;
            zoom = 1;
            updateImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    var closeBtn = modal.querySelector('.cert-modal-close');
    var overlay = modal.querySelector('.cert-modal-overlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);
    
    var rotateBtn = modal.querySelector('.cert-rotate-btn');
    if (rotateBtn) {
        rotateBtn.addEventListener('click', function() {
            rotation += 90;
            if (rotation >= 360) rotation = 0;
            updateImage();
        });
    }
    
    var resetBtn = modal.querySelector('.cert-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            rotation = 0;
            zoom = 1;
            updateImage();
        });
    }
    
    var zoomIn = modal.querySelector('.cert-zoom-in-btn');
    if (zoomIn) {
        zoomIn.addEventListener('click', function() {
            zoom = Math.min(zoom + 0.25, 3);
            updateImage();
        });
    }
    
    var zoomOut = modal.querySelector('.cert-zoom-out-btn');
    if (zoomOut) {
        zoomOut.addEventListener('click', function() {
            zoom = Math.max(zoom - 0.25, 0.5);
            updateImage();
        });
    }
    
    // keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (!modal || !modal.classList.contains('active')) return;
        
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
            if (zoomIn) zoomIn.click();
        }
        if (e.key === '-') {
            e.preventDefault();
            if (zoomOut) zoomOut.click();
        }
    });
});
