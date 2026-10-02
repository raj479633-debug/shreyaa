/**
 * Shreya Makeovers — Haute Bridal Artistry & Luxury Academy
 * Cinematic Scrolling, GSAP Motion & Lenis Controller
 * Fully preserves all content, branding, assets, booking modal, lightbox, and filters.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Accessibility: Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  /* ─────────────────────────────────────────────────────────────────────────
     2. LENIS SMOOTH SCROLLING SETUP
     Connects Lenis RAF with GSAP Ticker for perfect synchronization
     ───────────────────────────────────────────────────────────────────────── */
  let lenis = null;

  if (typeof Lenis !== 'undefined' && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential luxury ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      infinite: false,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -70, duration: 1.3 });
        }
      });
    });
  }

  // Register ScrollTrigger plugin with GSAP
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     3. REFINED STICKY NAVIGATION
     Smoothly transitions height, solid background & subtle shadow on scroll
     ───────────────────────────────────────────────────────────────────────── */
  const header = document.querySelector('.site-header');
  if (header) {
    if (typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
      ScrollTrigger.create({
        start: 'top -40',
        end: 99999,
        onUpdate: (self) => {
          if (self.scroll() > 40) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
      });
    } else {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     4. HERO PAGE LOAD ANIMATION SEQUENCE
     Slow, editorial, non-bouncy reveals with transform + opacity
     ───────────────────────────────────────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    const heroTL = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.1
    });

    // 1. Eyebrow text fades and slides up
    heroTL.from('.hero-eyebrow', {
      y: isMobile ? 12 : 18,
      opacity: 0,
      duration: 0.95
    }, 0.05);

    // 2. Headline reveals line-by-line out of masked overflow
    heroTL.from('.hero-line-inner', {
      yPercent: 108,
      opacity: 0,
      duration: 1.25,
      stagger: 0.16,
      ease: 'power3.out'
    }, 0.2);

    // 3. Supporting paragraph fades up
    heroTL.from('.hero-subtext', {
      y: isMobile ? 14 : 22,
      opacity: 0,
      duration: 1.05
    }, 0.5);

    // 4. CTA buttons reveal
    heroTL.from('.hero-actions', {
      y: isMobile ? 12 : 18,
      opacity: 0,
      duration: 0.9
    }, 0.7);

    // 5. Founder portrait container reveals with slow, graceful rise & scale
    heroTL.from('.portrait-tilt-container', {
      y: isMobile ? 24 : 36,
      scale: 0.97,
      opacity: 0,
      duration: 1.35,
      ease: 'power2.out'
    }, 0.25);

    // 6. Floating badge on founder portrait reveals
    heroTL.from('.portrait-badge-parallax', {
      y: 14,
      opacity: 0,
      duration: 0.85
    }, 0.8);

    // 7. Statistics reveal after primary content
    heroTL.from('.hero-stats-wrapper .stat-col', {
      y: isMobile ? 14 : 20,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12
    }, 0.85);

  } else {
    // Reduced motion or fallback: ensure everything is visible immediately
    document.querySelectorAll('.hero-line-inner, .hero-eyebrow, .hero-subtext, .hero-actions, .portrait-tilt-container, .stat-col').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     5. HERO SCROLL PARALLAX
     Subtle separation of speed between portrait and text columns
     ───────────────────────────────────────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion && !isMobile) {
    // Founder portrait moves subtly at different speed, maintaining compact size
    gsap.to('.portrait-tilt-card', {
      y: 36,
      scale: 0.985,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7
      }
    });

    // Content text column moves slightly slower
    gsap.to('.hero-text-col', {
      y: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     6. SECTION REVEALS & EDITORIAL IMAGE PARALLAX
     Headings reveal upward, images reveal with subtle scale, cards stagger
     ───────────────────────────────────────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {

    // Major Section Headers: upward reveal with stagger
    document.querySelectorAll('.section-header-reveal').forEach(header => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true
        },
        y: isMobile ? 16 : 28,
        opacity: 0,
        duration: 1.0,
        stagger: 0.14,
        ease: 'power2.out'
      });
    });

    // Editorial Images (Brand Story macro, Academy Atelier photo)
    document.querySelectorAll('.editorial-image-reveal').forEach(wrapper => {
      const img = wrapper.querySelector('img');
      const caption = wrapper.querySelector('.floating-caption');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 82%',
          once: true
        }
      });

      tl.from(wrapper, {
        opacity: 0,
        y: isMobile ? 18 : 32,
        duration: 1.1,
        ease: 'power2.out'
      });

      if (img) {
        tl.from(img, {
          scale: 1.05,
          duration: 1.4,
          ease: 'power2.out'
        }, 0);

        // Subtle scroll parallax on desktop
        if (!isMobile) {
          gsap.fromTo(img, 
            { yPercent: -3 },
            { 
              yPercent: 3, 
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8
              }
            }
          );
        }
      }

      if (caption) {
        tl.from(caption, {
          y: 14,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.4');
      }
    });

    // Signature Bridal Services: Staggered reveal
    ScrollTrigger.batch('.service-card', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: isMobile ? 20 : 34,
          opacity: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power2.out'
        });
      }
    });

    // The 3-Step Bridal Ritual: Staggered reveal
    ScrollTrigger.batch('.ritual-step-card', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: isMobile ? 18 : 30,
          opacity: 0,
          duration: 0.95,
          stagger: 0.16,
          ease: 'power2.out'
        });
      }
    });

    // Editorial Lookbook Items: Staggered reveal with subtle scale
    ScrollTrigger.batch('.lookbook-item', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: isMobile ? 20 : 34,
          scale: 0.98,
          opacity: 0,
          duration: 1.05,
          stagger: 0.15,
          ease: 'power2.out'
        });
      }
    });

    // Lookbook image subtle scroll parallax on desktop
    if (!isMobile) {
      document.querySelectorAll('.lookbook-item img').forEach(img => {
        gsap.fromTo(img,
          { yPercent: -2 },
          {
            yPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.lookbook-item'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8
            }
          }
        );
      });
    }

    // Client Praise / Reviews: Staggered reveal
    ScrollTrigger.batch('.review-card', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: isMobile ? 18 : 28,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power2.out'
        });
      }
    });

    // Journal Articles: Staggered reveal
    ScrollTrigger.batch('.journal-card', {
      start: 'top 86%',
      once: true,
      onEnter: (batch) => {
        gsap.from(batch, {
          y: isMobile ? 18 : 28,
          opacity: 0,
          duration: 0.95,
          stagger: 0.14,
          ease: 'power2.out'
        });
      }
    });

  }

  /* ─────────────────────────────────────────────────────────────────────────
     7. STATISTICS COUNT-UP ANIMATION
     Calm, non-flashy count-up triggered when statistics enter viewport
     ───────────────────────────────────────────────────────────────────────── */
  const statElements = document.querySelectorAll('.counter-animate');

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
    statElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const counter = { val: 0 };

      gsap.to(counter, {
        val: target,
        duration: 1.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true
        },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.floor(counter.val).toLocaleString()}${suffix}`;
        },
        onComplete: () => {
          el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        }
      });
    });
  } else {
    statElements.forEach(el => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    });
  }

  /* ─────────────────────────────────────────────────────────────────────────
     8. FOUNDER PORTRAIT — PROFESSIONAL 3D TILT MICRO-INTERACTION (DESKTOP)
     Preserves exact asset; creates dignified multi-plane depth
     ───────────────────────────────────────────────────────────────────────── */
  const portraitContainer = document.querySelector('.portrait-tilt-container');
  const portraitCard = document.querySelector('.portrait-tilt-card');
  const portraitBadge = document.querySelector('.portrait-badge-parallax');

  if (portraitContainer && portraitCard && !isMobile && !prefersReducedMotion) {
    let bounds;
    let isHovering = false;

    const onMouseEnter = () => {
      bounds = portraitContainer.getBoundingClientRect();
      isHovering = true;
    };

    const onMouseMove = (e) => {
      if (!bounds || !isHovering) return;
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const normX = mouseX / bounds.width - 0.5;
      const normY = mouseY / bounds.height - 0.5;

      // Restrict tilt angle to subtle, dignified max of ±3.5 degrees
      const rX = -normY * 5;
      const rY = normX * 5;

      portraitCard.style.transform = `rotateX(${rX.toFixed(2)}deg) rotateY(${rY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;
      if (portraitBadge) {
        portraitBadge.style.transform = `translateX(-50%) translateZ(28px) translate3d(${(normX * 6).toFixed(1)}px, ${(normY * 6).toFixed(1)}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      isHovering = false;
      portraitCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (portraitBadge) {
        portraitBadge.style.transform = 'translateX(-50%) translateZ(20px) translate3d(0, 0, 0)';
      }
    };

    portraitContainer.addEventListener('mouseenter', onMouseEnter);
    portraitContainer.addEventListener('mousemove', onMouseMove);
    portraitContainer.addEventListener('mouseleave', onMouseLeave);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     9. MOBILE DRAWER NAVIGATION
     ───────────────────────────────────────────────────────────────────────── */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleDrawer = () => {
    if (!mobileDrawer) return;
    const isHidden = mobileDrawer.classList.contains('hidden');
    if (isHidden) {
      mobileDrawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      mobileDrawer.classList.add('hidden');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  };

  const closeDrawer = () => {
    if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
      mobileDrawer.classList.add('hidden');
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }
  };

  mobileMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  mobileDrawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ─────────────────────────────────────────────────────────────────────────
     10. INTERACTIVE BOOKING CONSULTATION MODAL
     ───────────────────────────────────────────────────────────────────────── */
  const bookingModal = document.getElementById('booking-modal');
  const closeBookingBtn = document.getElementById('close-booking-modal');
  const bookingForm = document.getElementById('atelier-booking-form');
  const serviceSelect = document.getElementById('modal-service-select');
  const dateInput = document.getElementById('book-date');

  // Prevent selecting past dates
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  const openBookingModal = (serviceName = '') => {
    if (!bookingModal) return;
    if (serviceName && serviceSelect) {
      let matched = false;
      for (let i = 0; i < serviceSelect.options.length; i++) {
        if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) ||
            serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
          serviceSelect.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched && serviceSelect.options.length > 0) {
        serviceSelect.value = serviceSelect.options[0].value;
      }
    }
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const closeBookingModal = () => {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  // Wire up all CTA trigger buttons across the site
  document.querySelectorAll('.trigger-booking-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openBookingModal(service);
    });
  });

  closeBookingBtn?.addEventListener('click', closeBookingModal);
  bookingModal?.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeBookingModal();
  });

  // Handle Form Submission -> WhatsApp
  bookingForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name     = document.getElementById('book-name')?.value.trim()     || 'Bridal Client';
    const phone    = document.getElementById('book-phone')?.value.trim()    || '';
    const service  = serviceSelect?.value || 'Haute Bridal Consultation';
    const date     = dateInput?.value || 'Flexible';
    const location = document.getElementById('book-location')?.value.trim() || 'Darbhanga / Bihar';
    const notes    = document.getElementById('book-notes')?.value.trim()    || 'None';

    const whatsappMessage = `*SHREYA MAKEOVERS — ATELIER RESERVATION INQUIRY*\n\n` +
      `• *Client Name:* ${name}\n` +
      `• *WhatsApp:* ${phone}\n` +
      `• *Selected Service:* ${service}\n` +
      `• *Ceremony / Event Date:* ${date}\n` +
      `• *Venue / Destination:* ${location}\n` +
      `• *Notes & Style Notes:* ${notes}\n\n` +
      `Kindly share your availability and bespoke bridal package details. Thank you!`;

    const encodedMsg = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMsg}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeBookingModal();
  });

  /* ─────────────────────────────────────────────────────────────────────────
     11. LOOKBOOK FILTERING & LIGHTBOX SYSTEM
     ───────────────────────────────────────────────────────────────────────── */
  const filterButtons = document.querySelectorAll('.filter-pill');
  const lookbookCards = document.querySelectorAll('.lookbook-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const closeLightboxBtn = document.getElementById('close-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxInquireBtn = document.getElementById('lightbox-inquire-btn');

  // Filter tabs
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      lookbookCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const match = filterVal === 'all' || category === filterVal;

        if (match) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.97)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Open Lightbox
  const openLightbox = (card) => {
    if (!lightboxModal) return;
    const imgEl = card.querySelector('img');
    const title = card.getAttribute('data-title') || card.querySelector('h3, p.font-serif')?.textContent || 'Editorial Bridal Look';
    const category = card.getAttribute('data-meta') || card.querySelector('span')?.textContent || 'Haute Archive';
    const desc = card.getAttribute('data-desc') || '';

    if (lightboxImg && imgEl) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxCategory) lightboxCategory.textContent = category;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    if (lightboxInquireBtn) {
      lightboxInquireBtn.setAttribute('data-service', `Lookbook Inquiry: ${title}`);
    }

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  };

  lookbookCards.forEach(card => {
    card.addEventListener('click', () => openLightbox(card));
  });

  closeLightboxBtn?.addEventListener('click', closeLightbox);
  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  lightboxInquireBtn?.addEventListener('click', () => {
    const service = lightboxInquireBtn.getAttribute('data-service') || 'Bridal Lookbook';
    closeLightbox();
    setTimeout(() => {
      openBookingModal(service);
    }, 200);
  });

  /* ─────────────────────────────────────────────────────────────────────────
     12. MOBILE STICKY CONSULTATION BAR
     ───────────────────────────────────────────────────────────────────────── */
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');
  const footerSection = document.querySelector('footer');

  const updateMobileBarVisibility = () => {
    if (!mobileStickyBar) return;
    const scrollY = window.scrollY;
    const heroHeight = document.getElementById('hero')?.offsetHeight || 600;

    let nearFooter = false;
    if (footerSection) {
      const footerTop = footerSection.getBoundingClientRect().top;
      if (footerTop < window.innerHeight) nearFooter = true;
    }

    if (scrollY > heroHeight * 0.7 && !nearFooter) {
      mobileStickyBar.classList.add('visible');
    } else {
      mobileStickyBar.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', updateMobileBarVisibility, { passive: true });

  /* ─────────────────────────────────────────────────────────────────────────
     13. KEYBOARD SHORTCUTS (ESCAPE TO CLOSE OVERLAYS)
     ───────────────────────────────────────────────────────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeBookingModal();
      closeLightbox();
      closeDrawer();
    }
  });

});
