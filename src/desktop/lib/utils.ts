export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function scrollToSection(sectionId: string): void {
  const normalizedId = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId;
  const element = document.getElementById(normalizedId);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const stickyNavbar = document.querySelector<HTMLElement>('[data-site-navbar]');
  const navbarBottom = stickyNavbar?.getBoundingClientRect().bottom ?? 0;
  const spacingAfterNavbar = 20;
  const targetTop =
    window.scrollY + element.getBoundingClientRect().top - navbarBottom - spacingAfterNavbar;

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  });
}
