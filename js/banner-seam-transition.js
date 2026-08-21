(() => {
    const banner = document.getElementById('banner-background');
    if (!banner) return;

    const spacing = 30;
    const maxDepth = 30;
    const minDepth = 0;
    const revealDistance = 160;

    let points = [];
    let height = 0;
    let targetHeight = 0;

    const smooth = t => t * t * (3 - 2 * t);

    function buildPoints() {
        const width = banner.offsetWidth;
        const count = Math.ceil(width / spacing) + 2;

        points = Array.from({ length: count + 1 }, (_, i) => ({
            x: i / count,
            phase: Math.random() * Math.PI * 2,
            speed: 0.7 + Math.random() * 0.6,
            depth: minDepth + Math.random() * (maxDepth - minDepth),
            strength: 0.7 + Math.random() * 0.6
        }));
    }

    function updateHeight() {
        const passed = window.innerHeight - banner.getBoundingClientRect().bottom;
        let progress = smooth(
            Math.max(0, Math.min(1, passed / revealDistance))
        );

        targetHeight = maxDepth * progress;
    }

    function animate(time) {
        updateHeight();
        height += (targetHeight - height) * 0.08;

        if (height < 0.05) {
            banner.style.clipPath = 'none';
        } else {
            const path = points.map(p => {
                const wave =
                    Math.sin(p.phase + time * 0.0005 * p.speed + p.x * 7) * 12 * p.strength +
                    Math.sin(p.phase * 1.7 + time * 0.0008 + p.x * 16) * 5 +
                    Math.sin(p.phase * 0.7 + time * 0.0012 + p.x * 37) * 2;

                const depth = Math.max(
                    minDepth,
                    Math.min(maxDepth, p.depth + wave)
                );

                const y = height * depth / maxDepth;

                return `${(p.x * 100).toFixed(2)}% ${(
                    100 - y / banner.offsetHeight * 100
                ).toFixed(3)}%`;
            });

            path.push('100% 0%', '0% 0%');
            banner.style.clipPath = `polygon(${path.join(',')})`;
        }

        requestAnimationFrame(animate);
    }

    buildPoints();
    updateHeight();

    window.addEventListener('resize', buildPoints);
    window.addEventListener('scroll', updateHeight, { passive: true });

    requestAnimationFrame(animate);
})();