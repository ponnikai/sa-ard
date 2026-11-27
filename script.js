document.addEventListener('DOMContentLoaded', () => {

  // ---------- Sticky navbar shadow ----------
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Toast notification ----------
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ---------- Cart ----------
  const cartCount = document.getElementById('cartCount');
  const cartBtn = document.getElementById('cartBtn');
  let cartItems = 0;

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartItems++;
      cartCount.textContent = cartItems;
      cartCount.animate(
        [{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }],
        { duration: 300, easing: 'ease-out' }
      );

      const original = btn.textContent;
      btn.textContent = 'เพิ่มแล้ว ✓';
      btn.classList.add('added');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('added');
      }, 1200);

      showToast(`เพิ่ม "${btn.dataset.name}" ลงตะกร้าแล้ว`);
    });
  });

  cartBtn.addEventListener('click', () => {
    showToast(cartItems > 0
      ? `ตะกร้ามี ${cartItems} รายการ`
      : 'ตะกร้าของคุณยังว่างอยู่');
  });

  // ---------- Copy promo code ----------
  const copyBtn = document.getElementById('copyCode');
  copyBtn.addEventListener('click', () => {
    const code = 'SAARD30';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code)
        .then(() => showToast('คัดลอกโค้ดแล้ว'))
        .catch(() => showToast('ไม่สามารถคัดลอกได้'));
    } else {
      showToast(`โค้ดของคุณคือ ${code}`);
    }
  });

  // ---------- Countdown (ตั้งเวลาสิ้นสุดโปรโมชั่น 7 วันนับจากเข้าชมครั้งแรก) ----------
  const STORAGE_KEY = 'saard_promo_end';
  let endTime = Number(localStorage.getItem(STORAGE_KEY));
  if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, endTime);
  }

  const pad = n => String(n).padStart(2, '0');
  function updateCountdown() {
    const diff = Math.max(0, endTime - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    document.getElementById('cd-days').textContent = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent = pad(mins);
    document.getElementById('cd-secs').textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  // ---------- Close mobile menu on resize to desktop ----------
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
});