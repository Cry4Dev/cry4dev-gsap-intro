const mainTimeline = gsap.timeline();

function animateSVGPaths(
  selector,
  duration = 6,
  stagger = 0,
  multiplier = 12,
  ease = 'power2.inOut',
  position = '+=0'
) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  mainTimeline.fromTo(
    elements,
    {
      strokeDasharray: (_, target) => {
        const len = target.getTotalLength();
        return len * multiplier;
      },
      strokeDashoffset: (_, target) => {
        const len = target.getTotalLength();
        return len * multiplier;
      },
      opacity: 1,
    },
    {
      strokeDashoffset: 0,
      duration,
      ease,
      stagger,
    },
    position
  );
}

const logos = ['#dmc', '#logo', '#jackpot'];
const chosen = logos[Math.floor(Math.random() * logos.length)];

const el = document.querySelector(chosen);
if (el) el.style.display = 'block';

animateSVGPaths(chosen + ' path', 4, 0.08, 10, 'power2.inOut');

if (document.querySelector('.logo-name')) {
  mainTimeline.fromTo(
    '.logo-name',
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
    '<+=0.8'
  );
}

const loadingPage = document.querySelector('.loading-page');
if (loadingPage) {
  mainTimeline.to(
    loadingPage,
    {
      opacity: 0,
      duration: 1,
      delay: 0.2,
      onComplete: () => {
        loadingPage.classList.add('hidden');
        loadingPage.setAttribute('aria-hidden', 'true');
      },
    },
    '-=2'
  );
}
