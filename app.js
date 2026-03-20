(function() {
  function showPage(id) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
    var target = document.getElementById('page-' + id);
    if (target) target.classList.add('active');
    var links = document.querySelectorAll('.nav-links a');
    for (var j = 0; j < links.length; j++) links[j].classList.remove('active');
    var navEl = document.getElementById('nav-' + id);
    if (navEl) navEl.classList.add('active');
    window.scrollTo(0, 0);
  }

  // Event delegation - attach to document so Cloudflare cannot interfere
  document.addEventListener('click', function(e) {
    var el = e.target;
    // Walk up the DOM in case click was on a child element (e.g. <span> inside <a>)
    while (el && el !== document) {
      var page = el.getAttribute('data-page');
      if (page) {
        e.preventDefault();
        showPage(page);
        return;
      }
      el = el.parentNode;
    }
  });

  // Contact form - Formspree AJAX
  var form = document.getElementById('fs-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function(res) {
        if (res.ok) {
          document.getElementById('contact-form').style.display = 'none';
          document.getElementById('form-success').style.display = 'block';
        } else {
          btn.textContent = 'Something went wrong - try again';
          btn.disabled = false;
        }
      }).catch(function() {
        btn.textContent = 'Network error - try again';
        btn.disabled = false;
      });
    });
  }
})();