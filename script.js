// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');
const typewriter = document.getElementById('typewriter');
const backToTop = document.getElementById('backToTop');
const vaToggle = document.getElementById('vaToggle');
const vaChat = document.getElementById('vaChat');
const vaMessages = document.getElementById('vaMessages');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const body = document.body;

// Theme Management
// function initTheme() {
//     const savedTheme = localStorage.getItem('theme') || 'dark';
//     body.setAttribute('data-theme', savedTheme);
//     updateThemeIcon(savedTheme);
// }

// function updateThemeIcon(theme) {
//     const icon = themeToggle.querySelector('i');
//     icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
// }

// themeToggle.addEventListener('click', () => {
//     const currentTheme = body.getAttribute('data-theme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
//     body.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//     updateThemeIcon(newTheme);
// });

// Mobile Menu Management
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// Typewriter Effect
const typewriterTexts = [
    '🛡️ Cybersecurity Strategist',
    '📊 SIEM Analytics Engineer',
    '🔍 Penetration Tester',
    '💻 Ethical Hacker',
    '🤖 AI Security Researcher'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeEffect, typeSpeed);
}

const vaInput = document.getElementById('vaInput');
const vaSend = document.getElementById('vaSend');

vaSend.addEventListener('click', sendUserMessage);
vaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendUserMessage();
});

function sendUserMessage() {
    const message = vaInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addVAMessage(message, 'user');
    vaInput.value = '';

    // Simulate bot reply after 1 second
    setTimeout(() => {
        addVAMessage("I'm processing your query: " + message, 'bot');
    }, 1000);
}

// Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars when visible
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        const width = progressBar.dataset.width;
                        setTimeout(() => {
                            progressBar.style.width = width + '%';
                        }, 500);
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Back to Top Button
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
function updateVAOptions(actions) {
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('va-option-container');

    // Back button
    const backBtn = document.createElement('button');
    backBtn.classList.add('va-option');
    backBtn.textContent = '← Back to Main Menu';
    backBtn.addEventListener('click', () => {
        resetVAOptions();
    });
    optionContainer.appendChild(backBtn);

    actions.forEach(action => {
        const btn = document.createElement('button');
        btn.classList.add('va-option');
        btn.textContent = action;

        if (action === "Download PDF" || action === "Download CV") {
            btn.addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = 'assets/Sambhav_Mehra_CV.pdf';
                link.download = 'Sambhav_Mehra_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        } else if (action === "View Online") {
            btn.addEventListener('click', () => {
                showModal('View Resume', `
                    <iframe src="assets/Sambhav_Mehra_CV.pdf" width="100%" height="500px" style="border:none;"></iframe>
                `);
            });
        } else if (action === "View Certificates") {
            btn.addEventListener('click', () => {
                showModal('Certificates', `
                    <div style="display:flex;flex-direction:column;gap:10px;">
                        <img src="assets/cert1.jpg" alt="Certificate 1" style="width:100%;border-radius:8px;">
                        <img src="assets/cert2.jpg" alt="Certificate 2" style="width:100%;border-radius:8px;">
                    </div>
                `);
            });
        } else {
            btn.addEventListener('click', () => {
                addVAMessage(`Tell me more about: ${action}`, 'user');
                setTimeout(() => {
                    addVAMessage("I'd be happy to discuss this further! Please use the contact form or reach out directly.", 'bot');
                }, 1000);
            });
        }

        optionContainer.appendChild(btn);
    });

    addVAMessage(optionContainer, 'bot');
}

function resetVAOptions() {
    const mainOptions = `
        <button class="va-option" data-action="cybersecurity">Show Cybersecurity Work</button>
        <button class="va-option" data-action="blockchain">Blockchain Projects</button>
        <button class="va-option" data-action="certifications">View Certifications</button>
        <button class="va-option" data-action="contact">Contact Information</button>
        <button class="va-option" data-action="resume">Download Resume</button>
    `;
    const optionContainer = document.createElement('div');
    optionContainer.innerHTML = mainOptions;

    optionContainer.querySelectorAll('.va-option').forEach(option => {
        option.addEventListener('click', () => {
            const action = option.dataset.action;
            handleVAResponse(action);
        });
    });

    addVAMessage(optionContainer, 'bot');
}

// Project Filtering
function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Virtual Assistant
const vaResponses = {
    cybersecurity: {
        message: "I specialize in advanced cybersecurity with 5+ years of experience in penetration testing, incident response, and security architecture. My expertise includes AI-powered threat detection, blockchain security audits, and enterprise security consulting.",
        actions: ["View Security Projects", "Check Certifications", "Contact for Consultation"]
    },
    blockchain: {
        message: "My blockchain expertise covers smart contract security audits, DeFi protocol analysis, and blockchain forensics. I've audited 50+ smart contracts and developed security tools for the Web3 ecosystem.",
        actions: ["View DeFi Projects", "Smart Contract Audits", "Blockchain Security Tools"]
    },
    certifications: {
        message: "I hold 15+ industry certifications including CISSP, CEH, OSCP, and specialized blockchain security certifications. I continuously update my skills with the latest security trends.",
        actions: ["Download CV", "View Certificates", "Training Programs"]
    },
    contact: {
        message: "Ready to secure your digital assets? Let's discuss your cybersecurity needs. I offer consulting services for enterprises and startups.",
        actions: ["Email Me", "Schedule Call", "Get Quote"]
    },
    resume: {
        message: "My comprehensive resume showcases 5+ years of cybersecurity excellence, blockchain expertise, and numerous successful security implementations.",
        actions: ["Download PDF", "View Online", "Contact HR"]
    }
};

function initVirtualAssistant() {
    vaToggle.addEventListener('click', () => {
        vaChat.classList.toggle('active');
    });

    // Close VA when clicking outside
    document.addEventListener('click', (e) => {
        if (!vaChat.contains(e.target) && !vaToggle.contains(e.target)) {
            vaChat.classList.remove('active');
        }
    });

    // Handle VA option clicks
    document.querySelectorAll('.va-option').forEach(option => {
        option.addEventListener('click', () => {
            const action = option.dataset.action;
            handleVAResponse(action);
        });
    });
}

function handleVAResponse(action) {
    const response = vaResponses[action];
    if (response) {
        // Add user message
        addVAMessage(getActionText(action), 'user');
        
        // Add bot response after a delay
        setTimeout(() => {
            addVAMessage(response.message, 'bot');
            
            // Update options
            setTimeout(() => {
                updateVAOptions(response.actions);
            }, 500);
        }, 1000);
    }
}

function getActionText(action) {
    const actionTexts = {
        cybersecurity: "Tell me about your cybersecurity expertise",
        blockchain: "Show me your blockchain projects",
        certifications: "What certifications do you have?",
        contact: "How can I contact you?",
        resume: "Can I see your resume?"
    };
    return actionTexts[action] || action;
}

function addVAMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('va-message', type);
    messageDiv.textContent = message;
    vaMessages.appendChild(messageDiv);
    vaMessages.scrollTop = vaMessages.scrollHeight;
}

function updateVAOptions(actions) {
    const optionsContainer = document.querySelector('.va-options');
    optionsContainer.innerHTML = '';
    
    // Add back to main menu option
    const backOption = document.createElement('button');
    backOption.classList.add('va-option');
    backOption.textContent = '← Back to Main Menu';
    backOption.addEventListener('click', () => {
        resetVAOptions();
    });
    optionsContainer.appendChild(backOption);
    
    // Add new action options
    actions.forEach(action => {
        const option = document.createElement('button');
        option.classList.add('va-option');
        option.textContent = action;
        option.addEventListener('click', () => {
            addVAMessage(`Tell me more about: ${action}`, 'user');
            setTimeout(() => {
                addVAMessage("I'd be happy to discuss this further! Please use the contact form or reach out directly.", 'bot');
            }, 1000);
        });
        optionsContainer.appendChild(option);
    });
}

function resetVAOptions() {
    const optionsContainer = document.querySelector('.va-options');
    optionsContainer.innerHTML = `
        <button class="va-option" data-action="cybersecurity">Show Cybersecurity Work</button>
        <button class="va-option" data-action="blockchain">Blockchain Projects</button>
        <button class="va-option" data-action="certifications">View Certifications</button>
        <button class="va-option" data-action="contact">Contact Information</button>
        <button class="va-option" data-action="resume">Download Resume</button>
    `;
    
    // Re-add event listeners
    optionsContainer.querySelectorAll('.va-option').forEach(option => {
        option.addEventListener('click', () => {
            const action = option.dataset.action;
            handleVAResponse(action);
        });
    });
}

// Contact Form
function initContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<div class="loading"></div> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showModal('Message Sent!', 'Thank you for your message. I\'ll get back to you within 24 hours.');
            contactForm.reset();
            
        } catch (error) {
            showModal('Error', 'Sorry, there was an error sending your message. Please try again or contact me directly.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Modal Management
function showModal(title, content) {
    modalBody.innerHTML = `
        <h2>${title}</h2>
        <p>${content}</p>
    `;
    modal.classList.add('active');
}

function initModal() {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Project Card Interactions
function initProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent);
            
            const modalContent = `
                <h2>${title}</h2>
                <p>${description}</p>
                <div style="margin: 1rem 0;">
                    <h4>Technologies Used:</h4>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
                        ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <div style="margin-top: 1.5rem;">
                    <button class="btn btn-primary" onclick="window.open('#', '_blank')">
                        <i class="fas fa-external-link-alt"></i> View Project
                    </button>
                    <button class="btn btn-secondary" onclick="window.open('#', '_blank')" style="margin-left: 1rem;">
                        <i class="fab fa-github"></i> Source Code
                    </button>
                </div>
            `;
            
            showModal('Project Details', modalContent);
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur when scrolling
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add loading animation to buttons
function initButtonAnimations() {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

    initSmoothScrolling();
    initScrollAnimations();
    initBackToTop();
    initProjectFiltering();
    initVirtualAssistant();
    initContactForm();
    initModal();
    initProjectCards();
    initNavbarScroll();
    initButtonAnimations();
    createParticles();
    
    // Start typewriter effect
    setTimeout(typeEffect, 1000);
    
    console.log('🚀 Sambhav Mehra Portfolio Loaded Successfully!');
    console.log('🛡️ All security features activated!');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recreate particles for different screen sizes
    const particlesContainer = document.getElementById('particles');
    particlesContainer.innerHTML = '';
    createParticles();
});

// Performance optimization - lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Ctrl + K to open virtual assistant
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        vaChat.classList.toggle('active');
    }
    
    // Ctrl + / to show keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showModal('Keyboard Shortcuts', `
            <div style="text-align: left;">
                <p><strong>Ctrl/Cmd + K:</strong> Toggle Virtual Assistant</p>
                <p><strong>Ctrl/Cmd + /:</strong> Show this help</p>
                <p><strong>Escape:</strong> Close modals/menus</p>
                <p><strong>Tab:</strong> Navigate through elements</p>
            </div>
        `);
    }
});

// Add console welcome message
setTimeout(() => {
    console.log(`
    🌟 Welcome to Sambhav Mehra's Cybersecurity Portfolio! 🌟
    
    🛡️ Features Active:
    ✅ AI-Powered Virtual Assistant
    ✅ Dynamic Theme Switching  
    ✅ Responsive Design
    ✅ Smooth Animations
    ✅ Interactive Project Filtering
    ✅ Real-time Contact Form
    
    🔍 Easter Egg: Try typing "hacktheplanet" in the console!
    
    📧 Contact: sambhavmehra07@gmail.com
    🔗 Connect: linkedin.com/in/sambhavmehra
    `);
}, 2000);

// Easter egg function
window.hacktheplanet = function() {
    console.log('🚀 Access Granted! Welcome to the Matrix, Neo...');
    document.body.style.filter = 'hue-rotate(120deg)';
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 3000);
};

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        
        typeEffect,
        handleVAResponse,
        showModal
    };
}