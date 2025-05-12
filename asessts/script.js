document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const autoRotateBtn = document.getElementById('autoRotateBtn');
    const itemCount = items.length;
    let currentAngle = 0;
    let autoRotateInterval;
    let isAutoRotating = false;
    function setupCarousel() {
        const angleIncrement = 360 / itemCount;
        items.forEach((item, index) => {
            const angle = index * angleIncrement;
            item.style.transform = `rotateY(${angle}deg) translateZ(450px)`;
            item.addEventListener('click', () => {
                const targetAngle = -angle;
                rotateCarousel(targetAngle);
                currentAngle = targetAngle;
            });
        });
    }
    function rotateCarousel(angle) {
        carousel.style.transform = `translateZ(-450px) rotateY(${angle}deg)`;
    }
    function nextItem() {
        currentAngle -= 360 / itemCount;
        rotateCarousel(currentAngle);
    }
    function prevItem() {
        currentAngle += 360 / itemCount;
        rotateCarousel(currentAngle);
    }
    function toggleAutoRotate() {
        if (isAutoRotating) {
            clearInterval(autoRotateInterval);
            autoRotateBtn.textContent = '🔄 Auto Rotate';
            isAutoRotating = false;
        } else {
            autoRotateInterval = setInterval(nextItem, 2500);
            autoRotateBtn.textContent = '⏹ Stop Rotation';
            isAutoRotating = true;
        }
    }
    prevBtn.addEventListener('click', prevItem);
    nextBtn.addEventListener('click', nextItem);
    autoRotateBtn.addEventListener('click', toggleAutoRotate);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevItem();
        if (e.key === 'ArrowRight') nextItem();
        if (e.key === ' ') toggleAutoRotate();
    });
    setupCarousel();
    setTimeout(() => {
        rotateCarousel(currentAngle);
    }, 100);
});
