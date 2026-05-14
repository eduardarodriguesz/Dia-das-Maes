document.addEventListener('DOMContentLoaded', () => {
    const homeView = document.getElementById('homeView');
    const surpriseView = document.getElementById('surpriseView');
    const finalView = document.getElementById('finalView');
    const imageTrigger = document.getElementById('imageTrigger');
    const backBtn = document.getElementById('backBtn');
    const restartBtn = document.getElementById('restartBtn');
    const cards = document.querySelectorAll('.card');
    const countDisplay = document.getElementById('count');

    let flippedCards = new Set();
    const totalCards = cards.length;

    // Navigation: Home -> Surprise
    if (imageTrigger) {
        imageTrigger.addEventListener('click', () => {
            imageTrigger.style.transform = 'scale(0.9) rotate(5deg)';
            setTimeout(() => {
                imageTrigger.style.transform = '';
                homeView.classList.add('hidden');
                surpriseView.classList.remove('hidden');
                document.querySelector('.mobile-container').scrollTop = 0;
            }, 300);
        });
    }

    // Navigation: Surprise -> Home
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            surpriseView.classList.add('hidden');
            homeView.classList.remove('hidden');
            // We don't reset flippedCards here so user can continue
        });
    }

    // Navigation: Final -> Home
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            finalView.classList.add('hidden');
            homeView.classList.remove('hidden');
            
            // RESET EVERYTHING for a new run
            flippedCards.clear();
            countDisplay.textContent = '0';
            cards.forEach(c => c.classList.remove('is-flipped'));
        });
    }

    // Card Flipping Logic
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isFlipped = card.classList.contains('is-flipped');
            const cardId = card.getAttribute('data-id');
            
            if (isFlipped) {
                card.classList.remove('is-flipped');
            } else {
                // Close all other cards first
                cards.forEach(c => c.classList.remove('is-flipped'));
                
                // Flip this card
                card.classList.add('is-flipped');
                
                // Track progress
                flippedCards.add(cardId);
                countDisplay.textContent = flippedCards.size;
                
                // Trigger Heart Confetti
                createHeartConfetti();

                // Check if all cards are flipped
                if (flippedCards.size === totalCards) {
                    setTimeout(() => {
                        // Transition to Final Page after a short delay
                        surpriseView.classList.add('hidden');
                        finalView.classList.remove('hidden');
                        
                        // Grand Confetti Finale
                        for(let i=0; i<3; i++) {
                            setTimeout(createHeartConfetti, i * 500);
                        }
                    }, 1500);
                }
            }
        });
    });
});

function createHeartConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-confetti';
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        heart.style.opacity = Math.random();
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3500);
    }
}
