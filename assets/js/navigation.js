// Funcții pentru navigarea în site
document.addEventListener('DOMContentLoaded', function() {
  // Generează tabla de materii
  generateTableOfContents();
  
  // Adaugă funcționalitatea de navigare laterală
  setupSidebarToggle();
  
  // Evidențiază secțiunea curentă în TOC în timpul scrollului
  setupScrollSpy();
  
  // Activează stilurile pentru TOC
  enhanceTOCStyles();
  
  // Verifică orientarea dispozitivului
  setupOrientationCheck();
});

// Generează tabla de materii din headere
function generateTableOfContents() {
  // Verifică dacă TOC există deja
  const existingTOC = document.querySelector('.toc');
  if (existingTOC) return;
  
  const content = document.querySelector('.main-content');
  if (!content) return;
  
  // Găsește toate headerele din conținut (doar h1, h2, h3)
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
  
  console.log('TOC generat cu succes');
}

// Controlează afișarea sidebar-ului pe dispozitive mobile
function setupSidebarToggle() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  
  // Creează butonul toggle dacă nu există
  let toggleButton = document.querySelector('.sidebar-toggle');
  if (!toggleButton) {
    toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.innerHTML = '☰';
    document.body.appendChild(toggleButton);
  }
  
  // Creează butonul de închidere dacă nu există
  let closeButton = document.querySelector('.sidebar-close');
  if (!closeButton) {
    closeButton = document.createElement('button');
    closeButton.className = 'sidebar-close';
    closeButton.innerHTML = '×';
    sidebar.prepend(closeButton);
  }
  
  // Adaugă funcționalitatea de toggle
  toggleButton.addEventListener('click', function() {
    sidebar.classList.add('active');
    closeButton.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Previne scroll-ul în pagină
  });
  
  // Adaugă funcționalitatea de închidere
  closeButton.addEventListener('click', function() {
    sidebar.classList.remove('active');
    closeButton.style.display = 'none';
    document.body.style.overflow = ''; // Permite scroll-ul din nou
  });
  
  // Închide sidebar-ul când se face click pe un link
  const sidebarLinks = sidebar.querySelectorAll('a');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        closeButton.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
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
        // Adaugă un efect vizual mai puternic pentru link-ul activ
        activeLink.style.backgroundColor = 'rgba(127, 157, 245, 0.1)';
        activeLink.style.borderLeft = '3px solid var(--interactive-accent)';
        activeLink.style.paddingLeft = '10px';
      }
    }
  });
}

// Funcție pentru evidențierea diferită a nivelurilor TOC
function enhanceTOCStyles() {
  const tocLinks = document.querySelectorAll('.toc a');
  
  tocLinks.forEach(link => {
    // Detectează nivelul din clasa
    if (link.classList.contains('toc-h1')) {
      link.style.color = 'var(--h1-color)';
      link.style.fontWeight = '600';
    } else if (link.classList.contains('toc-h2')) {
      link.style.color = 'var(--h2-color)';
      link.style.fontWeight = '500';
    } else if (link.classList.contains('toc-h3')) {
      link.style.color = 'var(--text-normal)';
      link.style.fontWeight = '400';
      link.style.fontSize = '0.9em';
    }
  });
}

// Adaugă detectarea orientării dispozitivului pentru a ajusta mărimea fontului
function setupOrientationCheck() {
  // Funcție care se execută când orientarea se schimbă
  function handleOrientationChange() {
    const isLandscape = window.innerWidth > window.innerHeight;
    
    // Ajustează padding-ul pentru conținutul principal în funcție de lățimea ecranului
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (window.innerWidth <= 768) {
        mainContent.style.paddingRight = '20px';
      } else if (window.innerWidth <= 1200) {
        mainContent.style.paddingRight = '30px';
      } else {
        mainContent.style.paddingRight = '320px';  // Spațiu pentru TOC
      }
    }
  }
  
  // Verifică orientarea la încărcarea paginii
  handleOrientationChange();
  
  // Adaugă listener pentru schimbări de orientare
  window.addEventListener('resize', handleOrientationChange);
}
