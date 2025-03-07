// Adaugă acest cod în fișierul tău navigation.js sau inclus direct în layout

// Funcție pentru evidențierea diferită a nivelurilor TOC
function enhanceTOCStyles() {
  const tocLinks = document.querySelectorAll('.toc a');
  
  tocLinks.forEach(link => {
    // Identifică nivelul din clasa
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

// Funcție pentru a adăuga spațiu și stil între paragrafe și secțiuni
function enhanceParagraphSpacing() {
  // Adaugă clase speciale pentru paragrafe
  const mainContent = document.querySelector('.main-content');
  if (!mainContent) return;
  
  // Găsește toate secțiunile h1, h2, h3
  const headings = mainContent.querySelectorAll('h1, h2, h3');
  
  headings.forEach(heading => {
    let nextElement = heading.nextElementSibling;
    
    // Dacă următorul element este un paragraf sau o listă
    if (nextElement && (nextElement.tagName === 'P' || nextElement.tagName === 'UL' || nextElement.tagName === 'OL')) {
      // Adaugă o clasă pentru a identifica secțiunea
      if (heading.tagName === 'H1') {
        nextElement.classList.add('h1-section');
      } else if (heading.tagName === 'H2') {
        nextElement.classList.add('h2-section');
      } else if (heading.tagName === 'H3') {
        nextElement.classList.add('h3-section');
      }
    }
  });
}

// Funcție pentru a îmbunătăți aspectul listelor
function enhanceLists() {
  const lists = document.querySelectorAll('ul, ol');
  
  lists.forEach(list => {
    // Adaugă spațiu între elementele listei
    const items = list.querySelectorAll('li');
    items.forEach(item => {
      item.style.marginBottom = '8px';
    });
    
    // Adaugă un border subtil pentru listele nested
    if (list.parentElement && list.parentElement.tagName === 'LI') {
      list.style.borderLeft = '1px solid var(--border-color)';
      list.style.paddingLeft = '15px';
      list.style.marginLeft = '5px';
    }
  });
}

// Adaugă aceste funcții la evenimentul DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Execută funcțiile existente
  
  // Adaugă funcționalitățile noi
  enhanceTOCStyles();
  enhanceParagraphSpacing();
  enhanceLists();
  
  // Adaugă un highlight pentru secțiunea activă
  window.addEventListener('scroll', function() {
    const tocLinks = document.querySelectorAll('.toc a');
    const activeLink = document.querySelector('.toc a.active');
    
    if (activeLink) {
      // Adaugă un efect vizual mai puternic pentru link-ul activ
      activeLink.style.backgroundColor = 'rgba(127, 157, 245, 0.1)';
      activeLink.style.borderLeft = '3px solid var(--interactive-accent)';
      activeLink.style.paddingLeft = '10px';
    }
  });
});
