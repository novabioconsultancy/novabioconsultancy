// NovaBio Consultancy - Main JavaScript File
// Handles all interactive functionality across the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initHeroAnimations();
    initInnovationAssessment();
    initStatsCounters();
    initTimeline();
    initExpertiseQuiz();
    initContactForm();
    initScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
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

// Hero section animations
function initHeroAnimations() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Driving Healthcare Innovation',
                'Transforming African Healthcare',
                'Innovation from Nairobi to the World',
                'Your Healthcare Innovation Partner'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Innovation Assessment Tool
function initInnovationAssessment() {
    let currentAssessmentStep = 1;
    let assessmentAnswers = {};
    
    const nextButtons = document.querySelectorAll('[id^="assessment-next-"]');
    const prevButtons = document.querySelectorAll('[id^="assessment-prev-"]');
    const getResultsBtn = document.getElementById('assessment-get-results');
    const restartBtn = document.getElementById('restart-assessment');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateAssessmentStep(currentAssessmentStep)) {
                saveAssessmentAnswers(currentAssessmentStep);
                showAssessmentStep(currentAssessmentStep + 1);
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showAssessmentStep(currentAssessmentStep - 1);
        });
    });
    
    if (getResultsBtn) {
        getResultsBtn.addEventListener('click', function() {
            if (validateAssessmentStep(currentAssessmentStep)) {
                saveAssessmentAnswers(currentAssessmentStep);
                showAssessmentResults();
            }
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', function() {
            assessmentAnswers = {};
            currentAssessmentStep = 1;
            
            // Reset all radio buttons
            document.querySelectorAll('.assessment-step input[type="radio"]').forEach(input => {
                input.checked = false;
            });
            
            // Remove selections
            document.querySelectorAll('.focus-area-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            showAssessmentStep(1);
        });
    }
    
    function validateAssessmentStep(step) {
        const stepElement = document.getElementById(`assessment-step-${step}`);
        const checkedInput = stepElement.querySelector('input:checked');
        
        if (!checkedInput) {
            alert('Please select an option to continue.');
            return false;
        }
        return true;
    }
    
    function saveAssessmentAnswers(step) {
        const stepElement = document.getElementById(`assessment-step-${step}`);
        const checkedInput = stepElement.querySelector('input:checked');
        
        if (checkedInput) {
            const questionName = checkedInput.name;
            const answerValue = checkedInput.value;
            assessmentAnswers[questionName] = answerValue;
        }
    }
    
    function showAssessmentStep(step) {
        // Hide all steps
        document.querySelectorAll('.assessment-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        const currentStepEl = document.getElementById(`assessment-step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Update progress
        updateAssessmentProgress(step);
        
        currentAssessmentStep = step;
    }
    
    function updateAssessmentProgress(step) {
        const progressBar = document.getElementById('assessment-progress-bar');
        const currentStepEl = document.getElementById('assessment-current-step');
        const progressPercent = document.getElementById('assessment-progress-percent');
        
        const percentage = (step / 6) * 100;
        
        if (progressBar) {
            anime({
                targets: progressBar,
                width: `${percentage}%`,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        if (currentStepEl) {
            currentStepEl.textContent = step;
        }
        
        if (progressPercent) {
            progressPercent.textContent = `${Math.round(percentage)}%`;
        }
    }
    
    function showAssessmentResults() {
        // Hide all steps
        document.querySelectorAll('.assessment-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show results
        const resultsEl = document.getElementById('assessment-results');
        if (resultsEl) {
            resultsEl.classList.add('active');
            
            // Calculate and display results
            const result = calculateAssessmentResult();
            displayAssessmentResults(result);
        }
        
        updateAssessmentProgress(7); // Show 100% completion
    }
    
    function calculateAssessmentResult() {
        const focusArea = assessmentAnswers['innovation-focus'];
        const stage = assessmentAnswers['project-stage'];
        const timeline = assessmentAnswers['timeline'];
        const budget = assessmentAnswers['budget'];
        const market = assessmentAnswers['market'];
        const support = assessmentAnswers['support'];
        
        // Determine primary focus area
        let primaryFocus = 'Digital Health Innovation';
        let description = 'Your profile aligns perfectly with digital health solutions';
        
        if (focusArea === 'pharmaceuticals') {
            primaryFocus = 'Pharmaceutical Innovation';
            description = 'Your profile aligns with pharmaceutical development';
        } else if (focusArea === 'medtech') {
            primaryFocus = 'MedTech Innovation';
            description = 'Your profile aligns with medical device development';
        }
        
        // Generate recommendations
        const recommendations = [];
        if (stage === 'concept') {
            recommendations.push('Start with market research and feasibility studies');
            recommendations.push('Develop a comprehensive business plan');
        } else if (stage === 'development') {
            recommendations.push('Focus on regulatory strategy and compliance');
            recommendations.push('Plan for clinical validation and testing');
        } else {
            recommendations.push('Prepare for market entry and scaling');
            recommendations.push('Develop partnerships and distribution channels');
        }
        
        if (market === 'africa') {
            recommendations.push('Consider regional regulatory harmonization');
            recommendations.push('Plan for diverse healthcare system integrations');
        }
        
        return {
            focusArea: primaryFocus,
            description: description,
            profile: {
                'Innovation Focus': focusArea.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                'Project Stage': stage.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                'Target Timeline': timeline.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                'Primary Market': market.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
                'Support Needed': support.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
            },
            recommendations: recommendations
        };
    }
    
    function displayAssessmentResults(result) {
        const focusAreaEl = document.getElementById('result-focus-area');
        const descriptionEl = document.getElementById('result-description');
        const profileEl = document.getElementById('result-profile');
        const recommendationsEl = document.getElementById('result-recommendations');
        
        if (focusAreaEl) focusAreaEl.textContent = result.focusArea;
        if (descriptionEl) descriptionEl.textContent = result.description;
        
        if (profileEl) {
            profileEl.innerHTML = Object.entries(result.profile).map(([key, value]) => 
                `<li><strong>${key}:</strong> ${value}</li>`
            ).join('');
        }
        
        if (recommendationsEl) {
            recommendationsEl.innerHTML = result.recommendations.map(rec => 
                `<li>• ${rec}</li>`
            ).join('');
        }
    }
}

// Statistics counter animation
function initStatsCounters() {
    const counters = document.querySelectorAll('.stats-counter');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                
                anime({
                    targets: counter,
                    innerHTML: [0, target],
                    duration: 2000,
                    easing: 'easeOutQuad',
                    round: 1
                });
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Interactive timeline functionality
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            const details = this.querySelector('.timeline-details');
            if (details) {
                // Hide all other details
                timelineItems.forEach(otherItem => {
                    const otherDetails = otherItem.querySelector('.timeline-details');
                    if (otherDetails && otherDetails !== details) {
                        otherDetails.classList.add('hidden');
                    }
                });
                
                // Toggle current details
                details.classList.toggle('hidden');
                
                // Animate the toggle
                if (!details.classList.contains('hidden')) {
                    anime({
                        targets: details,
                        opacity: [0, 1],
                        translateY: [-10, 0],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            }
        });
    });
}

// Expertise Quiz functionality
function initExpertiseQuiz() {
    let currentQuizStep = 1;
    let quizAnswers = {};
    
    const nextButtons = document.querySelectorAll('[id^="quiz-next-"]');
    const prevButtons = document.querySelectorAll('[id^="quiz-prev-"]');
    const getResultsBtn = document.getElementById('quiz-get-results');
    const restartQuizBtn = document.getElementById('restart-quiz');
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateQuizStep(currentQuizStep)) {
                saveQuizAnswers(currentQuizStep);
                showQuizStep(currentQuizStep + 1);
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showQuizStep(currentQuizStep - 1);
        });
    });
    
    if (getResultsBtn) {
        getResultsBtn.addEventListener('click', function() {
            if (validateQuizStep(currentQuizStep)) {
                saveQuizAnswers(currentQuizStep);
                showQuizResults();
            }
        });
    }
    
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', function() {
            quizAnswers = {};
            currentQuizStep = 1;
            
            // Reset all radio buttons
            document.querySelectorAll('.quiz-step input[type="radio"]').forEach(input => {
                input.checked = false;
            });
            
            // Remove selections
            document.querySelectorAll('.expertise-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            showQuizStep(1);
        });
    }
    
    function validateQuizStep(step) {
        const stepElement = document.getElementById(`quiz-step-${step}`);
        const checkedInput = stepElement.querySelector('input:checked');
        
        if (!checkedInput) {
            alert('Please select an option to continue.');
            return false;
        }
        return true;
    }
    
    function saveQuizAnswers(step) {
        const stepElement = document.getElementById(`quiz-step-${step}`);
        const checkedInput = stepElement.querySelector('input:checked');
        
        if (checkedInput) {
            const questionName = checkedInput.name;
            const answerValue = checkedInput.value;
            quizAnswers[questionName] = answerValue;
        }
    }
    
    function showQuizStep(step) {
        // Hide all steps
        document.querySelectorAll('.quiz-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        const currentStepEl = document.getElementById(`quiz-step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        // Update progress
        updateQuizProgress(step);
        
        currentQuizStep = step;
    }
    
    function updateQuizProgress(step) {
        const progressBar = document.getElementById('quiz-progress-bar');
        const currentStepEl = document.getElementById('quiz-current-step');
        const progressPercent = document.getElementById('quiz-progress-percent');
        
        const percentage = (step / 4) * 100;
        
        if (progressBar) {
            anime({
                targets: progressBar,
                width: `${percentage}%`,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
        
        if (currentStepEl) {
            currentStepEl.textContent = step;
        }
        
        if (progressPercent) {
            progressPercent.textContent = `${percentage}%`;
        }
    }
    
    function showQuizResults() {
        // Hide all steps
        document.querySelectorAll('.quiz-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show results
        const resultsEl = document.getElementById('quiz-results');
        if (resultsEl) {
            resultsEl.classList.add('active');
            
            // Calculate and display match
            const match = calculateExpertMatch();
            displayMatchResults(match);
        }
        
        updateQuizProgress(5); // Show 100% completion
    }
    
    function calculateExpertMatch() {
        const projectType = quizAnswers['project-type'];
        const developmentStage = quizAnswers['development-stage'];
        const marketFocus = quizAnswers['market-focus'];
        const supportNeeds = quizAnswers['support-needs'];
        
        // Define founder expertise
        const founders = [
            {
                name: 'Armustarz Magomere',
                title: 'CEO & Co-founder',
                expertise: 'Healthcare Innovation Strategist',
                image: 'resources/founder-armustarz.jpg',
                specialties: ['pharmaceuticals', 'strategy', 'africa', 'concept'],
                description: 'Expert in pharmaceutical strategy and African market access'
            },
            {
                name: 'Brenda Karwitha',
                title: 'Co-founder',
                expertise: 'MedTech Specialist',
                image: 'resources/founder-brenda.jpg',
                specialties: ['medtech', 'technical', 'regulatory', 'development'],
                description: 'Specialist in medical device innovation and regulatory strategy'
            },
            {
                name: 'Ivan Onyunde',
                title: 'Co-founder',
                expertise: 'Digital Health Expert',
                image: 'resources/founder-ivan.jpg',
                specialties: ['digital-health', 'technical', 'global', 'market-ready'],
                description: 'Expert in AI implementation and digital health technologies'
            }
        ];
        
        // Find best match based on answers
        let bestMatch = founders[0];
        let bestScore = 0;
        
        founders.forEach(founder => {
            let score = 0;
            
            // Check project type match
            if (founder.specialties.includes(projectType)) score += 3;
            
            // Check support needs match
            if (founder.specialties.includes(supportNeeds)) score += 2;
            
            // Check market focus match
            if (founder.specialties.includes(marketFocus)) score += 2;
            
            // Check development stage match
            if (founder.specialties.includes(developmentStage)) score += 1;
            
            if (score > bestScore) {
                bestScore = score;
                bestMatch = founder;
            }
        });
        
        return bestMatch;
    }
    
    function displayMatchResults(match) {
        const nameEl = document.getElementById('matched-founder-name');
        const titleEl = document.getElementById('matched-founder-title');
        const expertiseEl = document.getElementById('matched-founder-expertise');
        const imageEl = document.getElementById('matched-founder-image');
        const reasonsEl = document.getElementById('match-reasons');
        const profileEl = document.getElementById('project-profile');
        
        if (nameEl) nameEl.textContent = match.name;
        if (titleEl) titleEl.textContent = match.title;
        if (expertiseEl) expertiseEl.textContent = match.expertise;
        if (imageEl) imageEl.src = match.image;
        
        if (reasonsEl) {
            reasonsEl.innerHTML = `
                <li>• ${match.description}</li>
                <li>• Specialized expertise in your project area</li>
                <li>• Deep understanding of African healthcare markets</li>
                <li>• Proven track record in healthcare innovation</li>
            `;
        }
        
        if (profileEl) {
            profileEl.innerHTML = Object.entries(quizAnswers).map(([key, value]) => 
                `<li>${key.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}: ${value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>`
            ).join('');
        }
    }
}

// Contact form functionality
function initContactForm() {
    let currentContactStep = 1;
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    
    const nextButtons = document.querySelectorAll('[id^="contact-next-"]');
    const prevButtons = document.querySelectorAll('[id^="contact-prev-"]');
    
    // Calendar and time slot functionality
    initCalendar();
    
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateContactStep(currentContactStep)) {
                showContactStep(currentContactStep + 1);
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            showContactStep(currentContactStep - 1);
        });
    });
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitContactForm();
        });
    }
    
    function validateContactStep(step) {
        const stepElement = document.getElementById(`contact-step-${step}`);
        const requiredInputs = stepElement.querySelectorAll('[required]');
        
        for (let input of requiredInputs) {
            if (!input.value.trim()) {
                input.focus();
                alert('Please fill in all required fields.');
                return false;
            }
        }
        
        // Additional validation for step 2 (services)
        if (step === 2) {
            const serviceCheckboxes = stepElement.querySelectorAll('input[name="services[]"]:checked');
            // Services are optional, so no validation needed
        }
        
        return true;
    }
    
    function showContactStep(step) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(stepEl => {
            stepEl.classList.remove('active');
        });
        
        // Show current step
        const currentStepEl = document.getElementById(`contact-step-${step}`);
        if (currentStepEl) {
            currentStepEl.classList.add('active');
        }
        
        currentContactStep = step;
    }
    
    function submitContactForm() {
        // Simulate form submission
        anime({
            targets: form,
            opacity: [1, 0],
            duration: 500,
            complete: function() {
                form.style.display = 'none';
                successMessage.classList.add('show');
                
                anime({
                    targets: successMessage,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    }
    
    function initCalendar() {
        const calendarDays = document.querySelectorAll('.calendar-day.available');
        const timeSlots = document.querySelectorAll('.time-slot');
        
        calendarDays.forEach(day => {
            day.addEventListener('click', function() {
                // Remove previous selections
                calendarDays.forEach(d => d.classList.remove('selected'));
                
                // Select current day
                this.classList.add('selected');
                
                // Enable time slots
                timeSlots.forEach(slot => {
                    slot.classList.add('available');
                    slot.style.opacity = '1';
                    slot.style.pointerEvents = 'auto';
                });
            });
        });
        
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                // Remove previous selections
                timeSlots.forEach(s => s.classList.remove('selected'));
                
                // Select current slot
                this.classList.add('selected');
            });
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card-hover, .founder-card, .focus-area-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 600,
                    easing: 'easeOutQuad',
                    delay: anime.stagger(100)
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Set initial state
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });
    
    // Observe elements
    animatedElements.forEach(el => observer.observe(el));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('NovaBio Consultancy website loaded successfully');
});