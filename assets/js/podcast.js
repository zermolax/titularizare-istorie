// podcasts.js - Sistem pentru gestionarea podcasturilor

// Obiect cu toate podcasturile pentru fiecare temă
const podcasturi = {
    1: {
        titlu: "Orientul Antic (Mesopotamia, Egipt, Palestina)",
        url: "audio/podcast-tema-01.mp3",
        descriere: "Explorează civilizațiile antice din Orientul Apropiat"
    },
    2: {
        titlu: "Lumea greacă (secolele al VI-lea – al IV-lea î.Hr.)",
        url: "audio/podcast-tema-02.mp3",
        descriere: "Descoperă splendoarea Greciei antice"
    },
    3: {
        titlu: "Geto – dacii",
        url: "audio/podcast-tema-03.mp3",
        descriere: "Istoria strămoșilor noștri geto-daci"
    },
    4: {
        titlu: "Statul roman (Republica, Principatul, Imperiul, Dominatul)",
        url: "audio/podcast-tema-04.mp3",
        descriere: "Evoluția statului roman de-a lungul secolelor"
    },
    // ... continuă pentru toate cele 29 de teme
    29: {
        titlu: "România: 1989 - la începutul mileniului al III-lea",
        url: "audio/podcast-tema-29.mp3",
        descriere: "România după 1989 și intrarea în era modernă"
    }
};

// Funcție pentru a adăuga playerul de podcast în pagină
function adaugaPodcast(numarTema) {
    const podcast = podcasturi[numarTema];
    if (!podcast) return;

    const podcastHTML = `
        <div class="podcast-container" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            box-shadow: 0 8px 32px rgba(0,0,0,0.1);
            color: white;
        ">
            <div style="
                display: flex;
                align-items: center;
                margin-bottom: 15px;
            ">
                <div style="
                    font-size: 2em;
                    margin-right: 15px;
                ">🎧</div>
                <div>
                    <h3 style="margin: 0; font-size: 1.2em;">Podcast pentru această temă</h3>
                    <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 0.9em;">${podcast.descriere}</p>
                </div>
            </div>
            
            <audio controls style="
                width: 100%;
                height: 40px;
                border-radius: 20px;
                margin-bottom: 10px;
            ">
                <source src="${podcast.url}" type="audio/mpeg">
                <source src="${podcast.url.replace('.mp3', '.ogg')}" type="audio/ogg">
                Browser-ul tău nu suportă redarea audio.
            </audio>
            
            <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.8em;
                opacity: 0.8;
            ">
                <span>💡 Tip: Poți asculta în timp ce citești notele</span>
                <a href="${podcast.url}" download style="
                    color: white;
                    text-decoration: none;
                    background: rgba(255,255,255,0.2);
                    padding: 5px 10px;
                    border-radius: 15px;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                    📥 Descarcă
                </a>
            </div>
        </div>
    `;

    // Încearcă să găsească un loc potrivit să insereze podcastul
    const locations = [
        'h1', 'h2', '.content', '.main', 'body'
    ];

    for (const selector of locations) {
        const element = document.querySelector(selector);
        if (element) {
            element.insertAdjacentHTML('afterend', podcastHTML);
            break;
        }
    }
}

// Funcție pentru a detecta automat numărul temei din URL sau titlu
function detecteazaNumarulTemei() {
    // Încearcă să extragă numărul din URL
    const urlMatch = window.location.pathname.match(/(\d+)/);
    if (urlMatch) {
        return parseInt(urlMatch[1]);
    }

    // Încearcă să extragă numărul din titlul paginii
    const titleMatch = document.title.match(/(\d+)/);
    if (titleMatch) {
        return parseInt(titleMatch[1]);
    }

    // Încearcă să extragă numărul din primul heading
    const h1 = document.querySelector('h1');
    if (h1) {
        const h1Match = h1.textContent.match(/(\d+)/);
        if (h1Match) {
            return parseInt(h1Match[1]);
        }
    }

    return null;
}

// Inițializare automată când se încarcă pagina
document.addEventListener('DOMContentLoaded', function() {
    const numarTema = detecteazaNumarulTemei();
    if (numarTema) {
        adaugaPodcast(numarTema);
    }
});

// Funcție pentru a adăuga manual podcastul (pentru debugging)
function initializezaPodcast(numarTema) {
    if (numarTema) {
        adaugaPodcast(numarTema);
    } else {
        console.log('Nu s-a putut detecta numărul temei. Specifică manual numărul.');
    }
}
