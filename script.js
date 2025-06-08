// Global variables
let musicPlaying = false;
let confettiInterval;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Start confetti animation
    startConfetti();
    
    // Auto-play music after user interaction
    document.addEventListener('click', function() {
        if (!musicPlaying) {
            toggleMusic();
        }
    }, { once: true });
});

// Confetti animation
function startConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4d9de0', '#e15554', '#f9844a'];
    
    confettiInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            createConfetti(confettiContainer, colors);
        }
    }, 300);
}

function createConfetti(container, colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    confetti.style.animationDelay = Math.random() * 2 + 's';
    
    // Random shapes
    const shapes = ['circle', 'square'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    if (shape === 'circle') {
        confetti.style.borderRadius = '50%';
    }
    
    container.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 5000);
}

// Music control
function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    
    if (musicPlaying) {
        music.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        musicPlaying = false;
    } else {
        // Create a simple melody using Web Audio API
        playBackgroundMelody();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        musicPlaying = true;
    }
}

function playBackgroundMelody() {
    // Simple background melody using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const melody = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]; // C Major scale
    let noteIndex = 0;
    
    function playNote() {
        if (!musicPlaying) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(melody[noteIndex], audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
        
        noteIndex = (noteIndex + 1) % melody.length;
        
        if (musicPlaying) {
            setTimeout(playNote, 1500);
        }
    }
    
    playNote();
}

// Page transitions
function openWishes() {
    const welcomePage = document.getElementById('welcomePage');
    const wishesPage = document.getElementById('wishesPage');
    
    // Stop confetti
    clearInterval(confettiInterval);
    
    // Transition effect
    welcomePage.style.transform = 'translateX(-100%)';
    welcomePage.style.opacity = '0';
    
    setTimeout(() => {
        welcomePage.classList.remove('active');
        wishesPage.classList.add('active');
        wishesPage.style.opacity = '1';
        wishesPage.style.transform = 'translateX(0)';
        
        // Animate wish cards
        animateWishCards();
    }, 400);
}

function goBack() {
    const welcomePage = document.getElementById('welcomePage');
    const wishesPage = document.getElementById('wishesPage');
    
    wishesPage.style.transform = 'translateX(100%)';
    wishesPage.style.opacity = '0';
    
    setTimeout(() => {
        wishesPage.classList.remove('active');
        welcomePage.classList.add('active');
        welcomePage.style.opacity = '1';
        welcomePage.style.transform = 'translateX(0)';
        
        // Restart confetti
        startConfetti();
    }, 400);
}

function animateWishCards() {
    const wishCards = document.querySelectorAll('.wish-card');
    
    wishCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Surprise modal
function showSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'block';
    
    // Add celebration sound effect
    playCelebrationSound();
    
    // Animate surprise hearts
    setTimeout(() => {
        const hearts = document.querySelectorAll('.surprise-hearts span');
        hearts.forEach((heart, index) => {
            setTimeout(() => {
                heart.style.animation = 'heartFloat 2s ease-in-out infinite';
            }, index * 200);
        });
    }, 500);
}

function closeSurprise() {
    const modal = document.getElementById('surpriseModal');
    modal.style.display = 'none';
}

function playCelebrationSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create a celebration sound
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    frequencies.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 100);
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('surpriseModal');
    if (event.target == modal) {
        closeSurprise();
    }
}

// Add some interactive effects
document.addEventListener('mousemove', function(e) {
    const sparkles = document.querySelectorAll('.sparkle');
    sparkles.forEach(sparkle => {
        const rect = sparkle.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
            sparkle.style.transform = `scale(${1 + (100 - distance) / 200}) rotate(${distance}deg)`;
        } else {
            sparkle.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSurprise();
    }
    if (e.key === ' ') {
        e.preventDefault();
        toggleMusic();
    }
});

// Add touch support for mobile
let touchStartY = 0;
document.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > 50) { // Swipe threshold
        if (diff > 0) {
            // Swipe up - could trigger something
        } else {
            // Swipe down - could trigger something
        }
    }
});

// Performance optimization
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

// Optimized resize handler
const handleResize = debounce(() => {
    // Handle responsive adjustments if needed
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => {
        // Recalculate animations or positions if necessary
    });
}, 250);

window.addEventListener('resize', handleResize);