// Components JavaScript file for additional interactive features

// Portfolio filter functionality
class PortfolioFilter {
    constructor() {
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.filterButtons = document.querySelectorAll('.portfolio-filter-btn');
        this.init();
    }
    
    init() {
        if (this.filterButtons.length > 0) {
            this.setupFilterButtons();
        }
    }
    
    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.filterItems(filter);
                
                // Update active button
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }
    
    filterItems(filter) {
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// Counter animation for statistics
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-item h3');
        this.init();
    }
    
    init() {
        if (this.counters.length > 0) {
            this.setupCounters();
        }
    }
    
    setupCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + suffix;
        }, 30);
    }
}

// Testimonial slider
class TestimonialSlider {
    constructor() {
        this.slider = document.querySelector('.testimonial-slider');
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.currentSlide = 0;
        this.init();
    }
    
    init() {
        if (this.slider && this.slides.length > 0) {
            this.setupSlider();
            this.autoPlay();
        }
    }
    
    setupSlider() {
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            dot.setAttribute('data-slide', index);
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.slider.appendChild(dotsContainer);
        
        // Create navigation arrows
        const prevBtn = document.createElement('button');
        prevBtn.className = 'slider-arrow slider-prev';
        prevBtn.innerHTML = '‹';
        prevBtn.addEventListener('click', () => this.prevSlide());
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'slider-arrow slider-next';
        nextBtn.innerHTML = '›';
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.slider.appendChild(prevBtn);
        this.slider.appendChild(nextBtn);
        
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }
    
    updateSlider() {
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - this.currentSlide) * 100}%)`;
        });
        
        // Update dots
        const dots = this.slider.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    autoPlay() {
        setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
}

// Parallax effect
class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('.parallax');
        this.init();
    }
    
    init() {
        if (this.parallaxElements.length > 0) {
            this.setupParallax();
        }
    }
    
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Typing animation
class TypingAnimation {
    constructor(element, texts, options = {}) {
        this.element = element;
        this.texts = texts;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            pauseTime: options.pauseTime || 2000,
            ...options
        };
        this.init();
    }
    
    init() {
        if (this.element && this.texts.length > 0) {
            this.type();
        }
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.currentCharIndex--;
        } else {
            this.currentCharIndex++;
        }
        
        this.element.textContent = currentText.substring(0, this.currentCharIndex);
        
        let typeSpeed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = this.options.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Progress bar animation
class ProgressBar {
    constructor(element, percentage) {
        this.element = element;
        this.percentage = percentage;
        this.init();
    }
    
    init() {
        if (this.element) {
            this.animate();
        }
    }
    
    animate() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(this.element);
    }
    
    startAnimation() {
        const progressFill = this.element.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${this.percentage}%`;
        }
    }
}

// Image gallery with lightbox
class ImageGallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }
    
    init() {
        if (this.galleryItems.length > 0) {
            this.setupGallery();
        }
    }
    
    setupGallery() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openLightbox(item);
            });
        });
    }
    
    openLightbox(item) {
        const imageSrc = item.getAttribute('data-image') || item.querySelector('img').src;
        const imageAlt = item.getAttribute('data-alt') || item.querySelector('img').alt;
        
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imageSrc}" alt="${imageAlt}">
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        });
    }
}

// Search functionality
class SearchComponent {
    constructor() {
        this.searchInput = document.querySelector('.search-input');
        this.searchResults = document.querySelector('.search-results');
        this.searchItems = document.querySelectorAll('.searchable-item');
        this.init();
    }
    
    init() {
        if (this.searchInput) {
            this.setupSearch();
        }
    }
    
    setupSearch() {
        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            this.performSearch(query);
        });
        
        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchResults.contains(e.target)) {
                this.hideResults();
            }
        });
    }
    
    performSearch(query) {
        if (query.length < 2) {
            this.hideResults();
            return;
        }
        
        const results = this.searchItems.filter(item => {
            const text = item.textContent.toLowerCase();
            return text.includes(query);
        });
        
        this.displayResults(results, query);
    }
    
    displayResults(results, query) {
        if (this.searchResults) {
            this.searchResults.innerHTML = '';
            
            if (results.length > 0) {
                results.forEach(item => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.textContent = item.textContent;
                    resultItem.addEventListener('click', () => {
                        item.scrollIntoView({ behavior: 'smooth' });
                        this.hideResults();
                    });
                    this.searchResults.appendChild(resultItem);
                });
                this.searchResults.style.display = 'block';
            } else {
                this.searchResults.innerHTML = '<div class="no-results">No results found</div>';
                this.searchResults.style.display = 'block';
            }
        }
    }
    
    hideResults() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio filter
    new PortfolioFilter();
    
    // Initialize counter animations
    new CounterAnimation();
    
    // Initialize testimonial slider
    new TestimonialSlider();
    
    // Initialize parallax effects
    new ParallaxEffect();
    
    // Initialize typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        new TypingAnimation(heroTitle, [
            'Welcome to Our Dynamic Website',
            'Creating Amazing Digital Experiences',
            'Building the Future of Web'
        ], {
            typeSpeed: 100,
            deleteSpeed: 50,
            pauseTime: 2000
        });
    }
    
    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage') || 75;
        new ProgressBar(bar, percentage);
    });
    
    // Initialize image gallery
    new ImageGallery();
    
    // Initialize search component
    new SearchComponent();
});

// Export components for use in other modules
window.Components = {
    PortfolioFilter,
    CounterAnimation,
    TestimonialSlider,
    ParallaxEffect,
    TypingAnimation,
    ProgressBar,
    ImageGallery,
    SearchComponent
}; 