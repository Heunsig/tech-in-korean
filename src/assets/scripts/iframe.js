(function() {
  const isIframeHidden = localStorage.getItem('isIframeHidden') === 'true';
  const menuToggle = document.getElementById('menu-toggle');

  menuToggle.addEventListener('change', (e) => {
    localStorage.setItem('isIframeHidden', e.target.checked);
  });

  if (isIframeHidden) {
    menuToggle.checked = true;
  } else {
    menuToggle.checked = false;
  }
})();
