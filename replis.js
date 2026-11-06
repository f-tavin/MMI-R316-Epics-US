// Gestion des blocs repliables (Initiatives, Epics, descriptions des US).
// Chaque bouton .toggle ouvre ou ferme l'élément qui le suit immédiatement.

function setOpen(button, open) {
  const content = button.nextElementSibling;
  if (!content) return;
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  content.hidden = !open;
}

document.addEventListener('click', (event) => {
  const toggle = event.target.closest('.toggle');
  if (toggle) {
    setOpen(toggle, toggle.getAttribute('aria-expanded') !== 'true');
    return;
  }

  const action = event.target.closest('[data-action]');
  if (!action) return;

  const toggles = document.querySelectorAll('.toggle');
  if (action.dataset.action === 'open-groups') {
    // Ouvre les Initiatives et les Epics, sans déplier les descriptions des US
    toggles.forEach((t) => {
      if (!t.closest('.us')) setOpen(t, true);
    });
  } else if (action.dataset.action === 'open-all') {
    toggles.forEach((t) => setOpen(t, true));
  } else if (action.dataset.action === 'close-all') {
    toggles.forEach((t) => setOpen(t, false));
  }
});
