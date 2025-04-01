document.addEventListener('DOMContentLoaded', function() {
    // Carica l'header
    fetch('/header.html')
        .then(response => {
            if (!response.ok) {
                // Se non riesce a caricare con percorso assoluto, prova con percorso relativo
                return fetch('header.html');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Imposta la classe active sul link corrente
            const currentPage = window.location.pathname.split('/').pop();
            console.log('Current page:', currentPage); // Debug

            // Inizializza il menu mobile immediatamente dopo aver caricato l'header
            initMobileMenu();

            setTimeout(() => {
                try {
                    if (currentPage === '' || currentPage === 'index.html') {
                        document.getElementById('home-link').classList.add('active');
                    } else if (currentPage === 'about.html') {
                        document.getElementById('about-link').classList.add('active');
                    } else if (currentPage === 'resume.html') {
                        document.getElementById('resume-link').classList.add('active');
                    } else if (currentPage === 'papers.html') {
                        document.getElementById('papers-link').classList.add('active');
                    } else if (currentPage === 'prof-service.html') {
                        document.getElementById('prof-services-link').classList.add('active');
                    }
                } catch (e) {
                    console.error('Error setting active class:', e);
                }
            }, 100);
        })
        .catch(error => {
            console.error('Errore nel caricamento dell\'header:', error);
            // Fallback: inserisci direttamente l'HTML dell'header
            const headerHTML = `
      <!-- ======= Mobile nav toggle button ======= -->
      <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>
      
      <!-- ======= Header ======= -->
      <header id="header">
        <div class="d-flex flex-column">
          <div class="profile">
            <img src="assets/img/profile-img.jpg" alt="" class="img-fluid rounded-circle">
            <h1 class="text-light"><a href="index.html">Giusy Annunziata</a></h1>
            <div class="social-links mt-3 text-center">
              <a href="https://orcid.org/0009-0002-0742-7261" class="orcid"><i class="fa-brands fa-orcid"></i></a>
              <a href="https://github.com/GiusyAnn" class="google-plus"><i class="fa-brands fa-github"></i></a>
              <a href="https://scholar.google.com/citations?user=lTtvS-EAAAAJ&hl=it&oi=ao" class="instagram"><i class="fa-solid fa-book"></i></a>
              <a href="https://twitter.com/Giusy_A_" class="twitter"><i class="fa-brands fa-twitter"></i></a>
              <a href="mailto:gannunziata@unisa.it" class="facebook"><i class="fa-solid fa-envelope"></i></a>
              <a href="https://www.linkedin.com/in/giusy-annunziata" class="linkedin"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>
          <nav id="navbar" class="nav-menu navbar">
            <ul>
              <li><a href="index.html" class="nav-link" id="home-link"><i class="bx bx-home"></i> <span>Home</span></a></li>
              <li><a href="about.html" class="nav-link" id="about-link"><i class="bx bx-user"></i> <span>About</span></a></li>
              <li><a href="resume.html" class="nav-link" id="resume-link"><i class="bx bxs-graduation"></i> <span>Resume</span></a></li>
              <li><a href="papers.html" class="nav-link" id="papers-link"><i class="bx bx-library"></i> <span>Papers</span></a></li>
              <li><a href="prof-service.html" class="nav-link scrollto" id="prof-services-link"><i class="bx bx-briefcase"></i> <span>Professional Services</span></a></li>
            </ul>
          </nav><!-- .nav-menu -->
        </div>
      </header><!-- End Header -->
      `;
            document.getElementById('header-placeholder').innerHTML = headerHTML;

            // Inizializza il menu mobile anche nel fallback
            setTimeout(() => {
                initMobileMenu();
            }, 100);
        });

    // Funzione per inizializzare il menu mobile
    function initMobileMenu() {
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        if (mobileNavToggle) {
            mobileNavToggle.addEventListener('click', function(e) {
                document.querySelector('body').classList.toggle('mobile-nav-active');
                this.classList.toggle('bi-list');
                this.classList.toggle('bi-x');
            });
        }

        // Chiudi il menu mobile quando si clicca su un link
        const navLinks = document.querySelectorAll('.nav-menu .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (document.querySelector('body').classList.contains('mobile-nav-active')) {
                    document.querySelector('body').classList.remove('mobile-nav-active');
                    const toggle = document.querySelector('.mobile-nav-toggle');
                    if (toggle) {
                        toggle.classList.add('bi-list');
                        toggle.classList.remove('bi-x');
                    }
                }
            });
        });
    }
});