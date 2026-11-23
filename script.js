document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');
  const selectButtons = document.querySelectorAll('.btn-select-product');
  const formulaSelect = document.getElementById('selectedFormula');
  const quickOrderForm = document.getElementById('quickOrderForm');
  const orderStatus = document.getElementById('orderStatus');

  // Toggle mobile navigation drawer
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky navbar elevation & active section link state
  const handleScroll = () => {
    if (navbar) {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    }

    const scrollPosition = window.scrollY + 140;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Select product formula and scroll smoothly to promotion order box
  selectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const formulaName = button.getAttribute('data-formula') || '';
      if (formulaSelect) {
        const matchedOption = Array.from(formulaSelect.options).find((opt) =>
          opt.value.includes(formulaName.split(' ')[0])
        );
        if (matchedOption) {
          formulaSelect.value = matchedOption.value;
        }
      }

      if (orderStatus) {
        orderStatus.textContent = `เลือก "${formulaName}" พร้อมรับส่วนลด 30% สำหรับลูกค้าใหม่แล้ว`;
      }

      const promoSection = document.getElementById('promotion');
      if (promoSection) {
        promoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Handle promotion order submission feedback
  if (quickOrderForm && orderStatus && formulaSelect) {
    quickOrderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const chosenFormula = formulaSelect.value;
      orderStatus.textContent = `รับสิทธิ์โปรโมชั่นสำหรับ "${chosenFormula}" เรียบร้อยแล้ว ขอบคุณที่ไว้วางใจ สะอาด (SA-ARD)`;
    });
  }
});