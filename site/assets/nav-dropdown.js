/* CoopCheck homepage navigation: keyboard-accessible animated disclosures. */
(() => {
  'use strict';
  const menus = [...document.querySelectorAll('.cc-nav-menu')];
  if (!menus.length) return;

  const timers = new WeakMap();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const CLOSE_MS = 240;

  function cancelPending(menu) {
    const pending = timers.get(menu);
    if (pending != null) window.clearTimeout(pending);
    timers.delete(menu);
  }

  function close(menu, { immediate = false, focus = false } = {}) {
    cancelPending(menu);
    if (!menu.open) return;
    menu.classList.remove('is-visible');
    const finish = () => {
      menu.open = false;
      timers.delete(menu);
      if (focus) menu.querySelector('summary')?.focus({ preventScroll: true });
    };
    if (immediate || reduceMotion.matches) finish();
    else timers.set(menu, window.setTimeout(finish, CLOSE_MS));
  }

  function open(menu) {
    menus.forEach(other => { if (other !== menu) close(other, { immediate: true }); });
    cancelPending(menu);
    if (menu.open) {
      menu.classList.add('is-visible');
      return;
    }
    menu.open = true;
    menu.classList.remove('is-visible');
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (menu.open) menu.classList.add('is-visible');
      });
    });
  }

  // Keep native <details> disclosure and keyboard behavior when scripts are unavailable.
  document.documentElement.classList.add('cc-nav-interactive');
  menus.forEach(menu => {
    const trigger = menu.querySelector('summary');
    if (!trigger) return;
    if (menu.open) menu.classList.add('is-visible');

    trigger.addEventListener('click', event => {
      event.preventDefault();
      if (menu.open && menu.classList.contains('is-visible')) close(menu);
      else open(menu);
    });

    menu.querySelectorAll('a[href]').forEach(link => {
      link.addEventListener('click', () => close(menu, { immediate: true }));
    });
  });

  document.addEventListener('pointerdown', event => {
    menus.forEach(menu => {
      if (!menu.contains(event.target)) close(menu);
    });
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const active = menus.find(menu => menu.open);
    if (active) {
      event.preventDefault();
      menus.forEach(menu => close(menu, { immediate: true }));
      active.querySelector('summary')?.focus({ preventScroll: true });
    }
  });
  window.addEventListener('resize', () => {
    menus.forEach(menu => {
      if (menu.open && getComputedStyle(menu).display === 'none') {
        close(menu, { immediate: true });
      }
    });
  }, { passive: true });
})();
