document.addEventListener('DOMContentLoaded', function() {
  // Generează tabla de materii
  generateTableOfContents();
  
  // Adaugă funcționalitatea de navigare laterală
  setupSidebarToggle();
  
  // Evidențiază secțiunea curentă în TOC în timpul scrollului
  setupScrollSpy();
});

// Generează tabla de materii din headere
function generateTableOfContents() {
  const content = document.querySelector('.main-content');
  if (!content) return;
  
  // Găsește toate headerele din conținut
  const headings = content.querySelectorAll('h1, h2, h3');
  if (headings.length === 0) return;
  
  // Creează containerul TOC
  const toc = document.createElement('div');
  toc.className = 'toc';
  
  // Adaugă titlu
  const tocTitle = document.createElement('div');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = 'Cuprins';
  toc.appendChild(tocTitle);
  
  // Creează lista
  const tocList = document.createElement('ul');
  
  // Populează lista cu linkuri către headere
  headings.forEach((heading, index) => {
    // Adaugă ID pentru ancore dacă nu există
    if (!heading.id) {
      heading.id = 'heading-' + index;
    }
    
    // Creează elementul de listă și link
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    
    // Setează clasa în funcție de nivel
    link.className = 'toc-' + heading.tagName.toLowerCase();
    
    link.href = '#' + heading.id;
    link.textContent = heading.textContent;
    
    // Adaugă în TOC
    listItem.appendChild(link);
    tocList.appendChild(listItem);
  });
  
  toc.appendChild(tocList);
  document.body.appendChild(toc);
}

// Controlează afișarea sidebar-ului pe dispozitive mobile
function setupSidebarToggle() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  
  // Creează butonul toggle
  const toggleButton = document.createElement('button');
  toggleButton.className = 'sidebar-toggle';
  toggleButton.innerHTML = '☰';
  document.body.appendChild(toggleButton);
  
  // Adaugă funcționalitatea de toggle
  toggleButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
}

// Evidențiază secțiunea curentă în TOC în timpul scrollului
function setupScrollSpy() {
  const tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length === 0) return;
  
  window.addEventListener('scroll', function() {
    // Obține poziția actuală de scroll
    const scrollPosition = window.scrollY;
    
    // Găsește headerul curent
    let currentSection = null;
    
    document.querySelectorAll('h1, h2, h3').forEach(function(heading) {
      const sectionTop = heading.offsetTop - 100;
      
      if (scrollPosition >= sectionTop) {
        currentSection = heading.id;
      }
    });
    
    // Elimină evidențierea anterioară
    tocLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    
    // Adaugă evidențierea pentru secțiunea curentă
    if (currentSection) {
      const activeLink = document.querySelector(`.toc a[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  });
}
