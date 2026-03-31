document.addEventListener('DOMContentLoaded', () => {
    // Initialize Reveal JS
    Reveal.initialize({
        // Dimensions
        width: 1920,
        height: 1080,
        margin: 0.1,
        minScale: 0.2,
        maxScale: 2.0,
        
        // Behavior
        controls: true,
        progress: true,
        center: false,
        hash: true,
        transition: 'slide', // none/fade/slide/convex/concave/zoom
        transitionSpeed: 'default', // default/fast/slow
        
        // Navigation
        keyboard: true,
        overview: true,
        
        // Visuals
        backgroundTransition: 'fade',
        disableLayout: false,

        // Optional libraries
        dependencies: []
    });

    // Add mouse move effect for background blobs
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const blob1 = document.querySelector('.blob-1');
        const blob2 = document.querySelector('.blob-2');
        const blob3 = document.querySelector('.blob-3');

        if(blob1 && blob2 && blob3) {
            blob1.style.transform = `translate(${mouseX * -50}px, ${mouseY * -50}px)`;
            blob2.style.transform = `translate(${mouseX * 100}px, ${mouseY * 100}px)`;
            blob3.style.transform = `translate(${mouseX * -80}px, ${mouseY * 80}px)`;
        }
    });
});
