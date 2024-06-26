"use strict";

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const firstSection = document.querySelector('main');
    const cards = document.querySelectorAll('.services-cards .col, .testimony-cards .col, .works-cards .col');
    const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Function adjust padding-top of the first section
    function adjustPaddingTop() {
        if (firstSection) {
            const navbarHeight = navbar.offsetHeight;
            firstSection.style.paddingTop = `${navbarHeight}px`;
        }
    }

    // Function adjust card widths
    function adjustCardWidths() {
        const windowWidth = window.innerWidth;
        const cardWidth = (windowWidth <= 992) ? windowWidth - 40 : 300;
        cards.forEach(card => {
            card.style.width = `${cardWidth}px`;
        });
    }

    // Function check if the page is scrolled and add a class to the navbar
    function checkScroll() {
        if (window.scrollY > 0) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }

    // Function check if the navbar menu is open and add a class to the navbar
    function checkMenuOpen() {
        if (navbarToggler.getAttribute('aria-expanded') === 'true') {
            navbar.classList.add('navbar-menu-open');
        } else {
            navbar.classList.remove('navbar-menu-open');
        }
    }

    // Close the navbar when a link is clicked
    function closeNavbar() {
        if (navbarToggler.getAttribute('aria-expanded') === 'true') {
            navbarToggler.click();
        }
    }

    // Event listeners
    window.addEventListener('scroll', function() {
        checkScroll();
    });
    window.addEventListener('resize', function() {
        adjustCardWidths();
    });
    navbarToggler.addEventListener('click', function() {
        setTimeout(checkMenuOpen, 80);
    });

    // Close the navbar when a link is clicked
    navbarLinks.forEach(link => {
        link.addEventListener('click', closeNavbar);
    });

    adjustPaddingTop();
    adjustCardWidths();
    checkScroll();
    checkMenuOpen();

    // Form submission
    const form = document.querySelector('form');

    // Form submission event listener
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('newsletter1').value;

        console.log(email)

        const apiKey = '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';
        const apiUrl = 'https://api.brevo.com/v3/contacts';
        const listId = 2;
        
        const data = {
            email: email,
            listIds: [listId]
        };

        // Config 
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la souscription à la newsletter');
            }
            return response.json();
        })
        .then(data => {
    
            console.log('Souscription à la newsletter réussie:', data);
            
            alert('Vous êtes inscrit à notre newsletter !');
        })
        .catch(error => {
            console.error('Erreur lors de la souscription à la newsletter:', error.message);
            
            alert('Une erreur est survenue lors de votre inscription à notre newsletter. Veuillez réessayer plus tard.');
        });
    });
});
