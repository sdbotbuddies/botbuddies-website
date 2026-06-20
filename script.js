// AOS scroll animations
AOS.init({ duration: 800, once: true, offset: 80 });

// tsParticles — interactive particle field
tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
        number: { value: 90, density: { enable: true, value_area: 900 } },
        color: { value: ["#00d4ff", "#7c3aed", "#00ff88"] },
        shape: { type: "circle" },
        opacity: {
            value: 0.5, random: true,
            animation: { enable: true, speed: 0.8, minimumValue: 0.1, sync: false }
        },
        size: {
            value: 2, random: true,
            animation: { enable: true, speed: 1.5, minimumValue: 0.3, sync: false }
        },
        links: {
            enable: true, distance: 140,
            color: "#00d4ff", opacity: 0.6, width: 1.5
        },
        move: {
            enable: true, speed: 1.2,
            direction: "none", random: true,
            straight: false, outModes: { default: "bounce" }
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" }
        },
        modes: {
            repulse: { distance: 120, duration: 0.4 },
            push: { quantity: 5 }
        }
    },
    detectRetina: true
});

// GSAP scroll triggers
gsap.registerPlugin(ScrollTrigger);

// GSAP terminal line stagger on scroll
gsap.from('.terminal-line', {
    scrollTrigger: { trigger: '.terminal-preview', start: 'top 80%' },
    opacity: 0, x: -15,
    duration: 0.5,
    stagger: 0.35,
    ease: 'power2.out'
});

// Stat counter animation
const counters = document.querySelectorAll('.stat-number');
counters.forEach(counter => {
    const text = counter.textContent;
    if (text === '∞' || text === '100%') return;
    const target = parseInt(text);
    ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        onEnter: () => {
            gsap.from(counter, {
                textContent: 0,
                duration: 1.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                    counter.textContent = Math.ceil(this.targets()[0].textContent);
                }
            });
        },
        once: true
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle('active',
                    link.getAttribute('href') === `#${entry.target.id}`);
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
