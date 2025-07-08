/**
* Template Name: Restaurantly - v3.4.0
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * ========================================
   * ARTISTIC ENHANCEMENTS FOR DIGITAL MENU
   * ========================================
   */

  /**
   * Menu Item Hover Effects with Sound
   */
  const addMenuItemEffects = () => {
    const menuItems = select('.menu-content', true);

    // Create hover sound effect
    const createHoverSound = () => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    };

    menuItems.forEach(item => {
      // Add hover effects
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.boxShadow = '0 8px 25px rgba(255, 215, 0, 0.4)';
        this.style.borderLeft = '4px solid #ffd700';

        // Play hover sound (only if user has interacted)
        try {
          createHoverSound();
        } catch (e) {
          // Silently fail if audio context is not available
        }
      });

      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
        this.style.boxShadow = 'none';
        this.style.borderLeft = 'none';
      });

      // Add click ripple effect
      item.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: radial-gradient(circle, rgba(205, 164, 94, 0.6) 0%, transparent 70%);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
          z-index: 1000;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  };

  /**
   * Floating Particles Background
   */
  const createFloatingParticles = () => {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      overflow: hidden;
    `;

    document.body.appendChild(particleContainer);

    // Create particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(205, 164, 94, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        animation: float ${Math.random() * 20 + 10}s infinite linear;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;

      particleContainer.appendChild(particle);
    }
  };

  /**
   * Accordion Enhanced Animations
   */
  const enhanceAccordionAnimations = () => {
    const accordionButtons = select('.niveau1', true);

    accordionButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Add pulse effect
        this.style.animation = 'pulse 0.3s ease-in-out';

        setTimeout(() => {
          this.style.animation = '';
        }, 300);

        // Add stagger animation to menu items
        const targetId = this.getAttribute('data-bs-target');
        const targetContent = select(targetId);

        if (targetContent) {
          const menuItems = targetContent.querySelectorAll('.azerty');
          menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';

            setTimeout(() => {
              item.style.transition = 'all 0.4s ease-out';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 100 + 200);
          });
        }
      });
    });
  };

  /**
   * Price Animation Effect
   */
  const animatePrices = () => {
    const prices = select('.articlePrice', true);

    prices.forEach(price => {
      price.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
        this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        this.style.color = '#ff6b35';
        this.style.textShadow = '0 0 10px rgba(255, 107, 53, 0.5)';
      });

      price.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.color = '';
        this.style.textShadow = '';
      });
    });
  };

  /**
   * Smooth Section Transitions
   */
  const addSectionTransitions = () => {
    const sections = select('.accordion-item', true);

    sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';

      setTimeout(() => {
        section.style.transition = 'all 0.6s ease-out';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }, index * 150);
    });
  };

  /**
   * Scroll Progress Indicator
   */
  const createScrollIndicator = () => {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollIndicator.style.width = scrollPercent + '%';
    });
  };

  /**
   * Logo Hover Effect
   */
  const addLogoEffects = () => {
    const logo = select('.logo-animation');
    if (logo) {
      logo.addEventListener('click', function() {
        this.style.animation = 'bounce 1s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 1000);
      });
    }
  };

  /**
   * Dynamic Background Color Change
   */
  const addDynamicBackground = () => {
    let colorIndex = 0;
    const colors = [
      'rgba(0,0,0,0.3)',
      'rgba(205, 164, 94, 0.1)',
      'rgba(255, 107, 53, 0.1)',
      'rgba(44, 62, 80, 0.1)'
    ];

    setInterval(() => {
      const menuSection = select('.menu');
      if (menuSection) {
        colorIndex = (colorIndex + 1) % colors.length;
        menuSection.style.background = `linear-gradient(to bottom, ${colors[colorIndex]} 0%, rgba(0,0,0,0.7) 100%), url(assets/img/restau.png)`;
        menuSection.style.backgroundSize = 'cover';
        menuSection.style.backgroundPosition = 'center center';
        menuSection.style.backgroundAttachment = 'fixed';
      }
    }, 10000); // Change every 10 seconds
  };

  /**
   * Add Confetti Effect for Special Items
   */
  const addConfettiEffect = () => {
    const boxCrispyItems = select('.menu-item-boxcrispy', true);

    boxCrispyItems.forEach(item => {
      item.addEventListener('click', function() {
        createConfetti(this);
      });
    });
  };

  const createConfetti = (element) => {
    const colors = ['#ffd700', '#ff6b35', '#cda45e', '#ff1744', '#00e676'];
    const confettiCount = 20;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: confetti-fall 2s ease-out forwards;
      `;

      const rect = element.getBoundingClientRect();
      confetti.style.left = (rect.left + Math.random() * rect.width) + 'px';
      confetti.style.top = rect.top + 'px';

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 2000);
    }
  };

  /**
   * Initialize all artistic enhancements
   */
  window.addEventListener('load', () => {
    setTimeout(() => {
      addMenuItemEffects();
      createFloatingParticles();
      enhanceAccordionAnimations();
      animatePrices();
      addSectionTransitions();
      createScrollIndicator();
      addLogoEffects();
      addDynamicBackground();
      addConfettiEffect();
    }, 500);
  });

})()