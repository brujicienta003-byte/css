/* Marcador Nimbus: solo lectura. Modificá data-left y data-right en el post. */
(() => {
  'use strict';

  function points(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.floor(number)) : 0;
  }

  function initDuel(duel) {
    if (duel.dataset.ndReady === 'yes') return;
    duel.dataset.ndReady = 'yes';

    const left = points(duel.dataset.left);
    const right = points(duel.dataset.right);
    const leftLabel = duel.querySelector('.nd-score-left');
    const rightLabel = duel.querySelector('.nd-score-right');
    const track = duel.querySelector('.nd-track');

    if (leftLabel) leftLabel.textContent = String(left);
    if (rightLabel) rightLabel.textContent = String(right);

    const share = left + right === 0 ? 50 : (left / (left + right)) * 100;
    if (track) {
      track.setAttribute('role', 'img');
      track.setAttribute('aria-label',
        `Dominio del duelo: izquierda ${share.toFixed(1)}%, derecha ${(100 - share).toFixed(1)}%`);
    }

    // Arranca en 50/50 y se desliza hasta la proporción de puntos publicada.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        duel.style.setProperty('--nd-split', `${share}%`);
      });
    });
  }

  function initAll() {
    document.querySelectorAll('.nimbus-duel').forEach(initDuel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll, { once: true });
  } else {
    initAll();
  }
})();
