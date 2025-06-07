// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animated entrance of elements when they come into view
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .contact-container');
    
    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    // Observe each animated element
    animatedElements.forEach(element => {
        // Add base class for animations
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });

    // Form validation and submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            let isValid = true;
            
            // Clear previous error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => message.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                displayError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!emailPattern.test(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                displayError(messageInput, 'Please enter a message');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    contactForm.innerHTML = '';
                    contactForm.appendChild(successMessage);
                }, 1500);
            }
        });
    }
    
    // Helper function to display error message
    function displayError(input, message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.fontSize = '0.85rem';
        errorMessage.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorMessage);
        input.style.borderColor = '#e74c3c';
        
        input.addEventListener('input', function() {
            errorMessage.remove();
            input.style.borderColor = '';
        }, { once: true });
    }

    // 3D effect for book on mousemove
    const book = document.querySelector('.book');
    const heroLeft = document.querySelector('.hero-left');
    
    if (book && heroLeft) {
        heroLeft.addEventListener('mousemove', function(e) {
            const rect = heroLeft.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 30;
            const angleY = (centerX - x) / 30;
            
            book.style.transform = `rotateX(${angleX}deg) rotateY(${angleY + 15}deg)`;
        });
        
        heroLeft.addEventListener('mouseleave', function() {
            book.style.transform = 'rotateY(15deg)';
        });
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .success-message {
            padding: 2rem;
            text-align: center;
            color: #265E5A;
            font-size: 1.2rem;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});