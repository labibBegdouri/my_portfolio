// Highlight the current section's nav link as you scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navigation a');

function setActiveLink() {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Gentle fade-in for sections as they enter the viewport
// (respects prefers-reduced-motion — no animation if the user has that set)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('section').forEach((section) => {
    section.classList.add('reveal');
    revealObserver.observe(section);
  });
}