document.addEventListener('DOMContentLoaded', function() {
    // Inizializzazione di Isotope con ordinamento personalizzato
    let portfolioContainer = document.querySelector('.portfolio-container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            getSortData: {
                order: '[data-sort-order] parseInt'
            },
            sortBy: 'order',
            sortAscending: false // Imposta l'ordinamento decrescente
        });

        // Riordina gli elementi quando si cambia filtro
        let portfolioFilters = document.querySelectorAll('#portfolio-flters li');
        portfolioFilters.forEach(function(el) {
            el.addEventListener('click', function() {
                setTimeout(function() {
                    portfolioIsotope.arrange({
                        sortBy: 'order',
                        sortAscending: false
                    });
                }, 100);
            });
        });
    }
});