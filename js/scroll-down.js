document.addEventListener('DOMContentLoaded', () => {
  const arrow = document.getElementById('banner-arrow');
  if (!arrow) return;

  arrow.addEventListener('click', (element) => {
    element.preventDefault();

    const distance = window.innerHeight * 0.95;

    window.scrollBy({ top: distance, left: 0, behavior: 'smooth' });
  });
});