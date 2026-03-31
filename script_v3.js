document.addEventListener('DOMContentLoaded', () => {
    // ─── PDF export via html2canvas + jsPDF ──────────────────────────────────
    const pdfBtn        = document.getElementById('pdf-btn');
    const pdfToast      = document.getElementById('pdf-toast');
    const toastClose    = document.getElementById('pdf-toast-close');
    const toastIcon     = document.getElementById('pdf-toast-icon');
    const toastTitle    = document.getElementById('pdf-toast-title');
    const toastMsg      = document.getElementById('pdf-toast-msg');
    const slideCur      = document.getElementById('pdf-slide-cur');
    const slideTot      = document.getElementById('pdf-slide-tot');
    const progressFill  = document.getElementById('pdf-progress-fill');

    async function generatePDF() {
        const { jsPDF } = window.jspdf;
        const total = Reveal.getTotalSlides();
        const saved = Reveal.getIndices();

        // Show toast
        pdfToast.classList.add('visible');
        toastIcon.className = 'fa-solid fa-spinner fa-spin';
        toastTitle.textContent = 'Генерую PDF…';
        slideTot.textContent = total;
        progressFill.style.width = '0%';
        pdfBtn.disabled = true;
        pdfBtn.querySelector('span').textContent = 'Генерую…';

        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
        const W = 297, H = 210;

        // Hide PDF button during capture
        pdfBtn.style.opacity = '0';

        for (let i = 0; i < total; i++) {
            Reveal.slide(i);
            await new Promise(r => setTimeout(r, 700));

            slideCur.textContent = i + 1;
            progressFill.style.width = `${Math.round(((i + 1) / total) * 100)}%`;

            const canvas = await html2canvas(document.body, {
                scale: 1,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#03070e',
                width: window.innerWidth,
                height: window.innerHeight,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight,
                logging: false,
                imageTimeout: 0,
                ignoreElements: el => el.id === 'pdf-toast'
            });

            if (i > 0) pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.93), 'JPEG', 0, 0, W, H);
        }

        // Restore slide position
        Reveal.slide(saved.h, saved.v);

        // Save
        pdf.save('DOU-Day-2026-MyWaterShop.pdf');

        // Reset UI
        pdfBtn.style.opacity = '1';
        pdfBtn.disabled = false;
        pdfBtn.querySelector('span').textContent = 'PDF';

        toastIcon.className = 'fa-solid fa-circle-check';
        toastTitle.textContent = 'PDF збережено!';
        toastMsg.innerHTML = 'Файл завантажено у папку «Завантаження»';
        progressFill.style.width = '100%';

        setTimeout(() => pdfToast.classList.remove('visible'), 4000);
    }

    if (pdfBtn) {
        pdfBtn.addEventListener('click', generatePDF);
    }
    if (toastClose) {
        toastClose.addEventListener('click', () => pdfToast.classList.remove('visible'));
    }

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
