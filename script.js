// Funkcija koja vraća klasu boje na osnovu ocene
function getClassByRate(vote) {
    // Proveravamo da li je ocena validan broj (može biti string)
    const rate = parseFloat(vote); 
    
    if (isNaN(rate)) {
        return ''; // Ako nije broj, ne vraćamo boju
    }

    if(rate >= 8) {
        return 'green';
    } else if(rate >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

// Funkcija za obradu boja ocena
function applyRatingColors() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        const ratingElement = card.querySelector('.rating');
        
        // Čitamo ocenu iz 'data-rate' atributa (ovo je ključno)
        const vote = card.getAttribute('data-rate'); 
        
        if (ratingElement && vote) {
            // Dodaje odgovarajuću klasu (red, orange ili green) elementu .rating
            ratingElement.classList.add(getClassByRate(vote));
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {

    /* =========================================
       INICIJALIZACIJA OCENA
       ========================================= */
    applyRatingColors();


    /* =========================================
       LOGIKA ZA index.html (Hamburger i Filter)
       ========================================= */
    
    // 1. Logika za Hamburger Meni
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (openMenuBtn && mobileNav && menuOverlay) { // Proverava da li smo na index.html
        
        function openMenu() {
            mobileNav.classList.add('is-open');
            menuOverlay.classList.add('is-open');
            document.body.style.overflow = 'hidden'; 
            document.body.classList.add('menu-is-open'); // Sakriva hamburger ikonicu
        }
        
        function closeMenu() {
            mobileNav.classList.remove('is-open');
            menuOverlay.classList.remove('is-open');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-is-open'); 
        }

        openMenuBtn.addEventListener('click', openMenu);
        closeMenuBtn.addEventListener('click', closeMenu);
        menuOverlay.addEventListener('click', closeMenu); 
    }

    // 2. Logika za Filtriranje po Žanru (na index.html)
    const movieGrid = document.querySelector('.movie-grid');
    
    if (movieGrid) { 
        const params = new URLSearchParams(window.location.search);
        const genreFilter = params.get('genre'); 

        if (genreFilter) {
            const movieCards = document.querySelectorAll('.movie-card');
            
            movieCards.forEach(card => {
                const cardGenres = card.getAttribute('data-genre'); 
                
                if (!cardGenres || !cardGenres.includes(genreFilter)) {
                    card.classList.add('hidden');
                } else {
                    card.classList.remove('hidden'); 
                }
            });
        }
    }

    /* =========================================
       LOGIKA ZA Oppenheimer.html (Serveri)
       ========================================= */

    // 3. Logika za promenu servera (sa stranice filma)
    const player = document.getElementById('movie-player');
    const serverButtons = document.querySelectorAll('.server-btn');

    if (player && serverButtons.length > 0) { // Proverava da li smo na stranici filma
        
        serverButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                if (this.classList.contains('active')) {
                    return; 
                }

                serverButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const newSrc = this.getAttribute('data-src');
                player.src = newSrc;
            });
        });
    }

});