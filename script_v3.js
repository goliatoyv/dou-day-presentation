document.addEventListener('DOMContentLoaded', () => {
    Reveal.initialize({
        width: 1920,
        height: 1080,
        margin: 0.1,
        minScale: 0.2,
        maxScale: 2.0,
        controls: true,
        progress: true,
        center: false,
        hash: true,
        transition: 'slide',
        transitionSpeed: 'default',
        keyboard: true,
        overview: true,
        backgroundTransition: 'fade',
        disableLayout: false,
        dependencies: []
    });

    // Mouse parallax on background blobs
    document.addEventListener('mousemove', (e) => {
        const mx = e.clientX / window.innerWidth;
        const my = e.clientY / window.innerHeight;
        const b1 = document.querySelector('.blob-1');
        const b2 = document.querySelector('.blob-2');
        const b3 = document.querySelector('.blob-3');
        if (b1) b1.style.transform = `translate(${mx * -50}px, ${my * -50}px)`;
        if (b2) b2.style.transform = `translate(${mx * 100}px, ${my * 100}px)`;
        if (b3) b3.style.transform = `translate(${mx * -80}px, ${my * 80}px)`;
    });

    // Click-to-spin fortune wheel
    const wheel = document.getElementById('fortuneWheel');
    if (wheel) {
        let spinning = false;
        let spinTimeout = null;
        let currentDeg = 0;

        wheel.addEventListener('click', () => {
            if (spinning) return;
            spinning = true;

            const disk = wheel.querySelector('.fw-disk');
            const textLabels = wheel.querySelectorAll('.fw-text');

            // Hide text while spinning
            textLabels.forEach(t => t.style.opacity = '0');

            // Random spin: 3–7 full rotations + random stop
            const extraDeg = 360 * (3 + Math.floor(Math.random() * 4)) + Math.floor(Math.random() * 360);
            const totalDeg = currentDeg + extraDeg;
            const duration = 3500 + Math.random() * 1500;

            disk.style.transition = `transform ${duration}ms cubic-bezier(0.17, 0.67, 0.12, 0.99)`;
            disk.style.transform = `rotate(${totalDeg}deg)`;
            currentDeg = totalDeg;

            clearTimeout(spinTimeout);
            spinTimeout = setTimeout(() => {
                // Show text after stopping
                textLabels.forEach(t => {
                    t.style.transition = 'opacity 0.5s';
                    t.style.opacity = '1';
                });
                disk.style.transition = '';
                spinning = false;
            }, duration + 400);
        });
    }
});
