// Small interactivity: copy bibtex and dynamic year
const copy = (text) => navigator.clipboard.writeText(text);
const bib1 = document.getElementById('copy-bib');
const bib2 = document.getElementById('copy-bib-2');
const blk = document.getElementById('bibtex-block');
[bib1,bib2].forEach(btn => btn && btn.addEventListener('click', (e) => {
  e.preventDefault();
  if(!blk) return;
  const originalText = btn.textContent;
  const originalWidth = btn.offsetWidth;
  copy(blk.innerText).then(()=>{
    btn.style.width = originalWidth + 'px';
    btn.style.justifyContent = 'center';
    btn.textContent = 'Copied!';
    setTimeout(()=>{ 
      btn.textContent = originalText; 
      btn.style.width = '';
      btn.style.justifyContent = '';
    }, 2500);
  });
}));
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('nav-open');
    
    if (isOpen) {
      navLinks.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    } else {
      navLinks.classList.add('nav-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close menu when clicking on a nav link
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
