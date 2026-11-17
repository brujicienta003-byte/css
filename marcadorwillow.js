/* Mismo sistema de inicializacion del primer marcador .rduel.
   Sin controles; puntajes definidos desde los atributos data. */
(function () {
  document.querySelectorAll('.rduel:not([data-ready])').forEach(function (el) {
    el.dataset.ready = '1';
    var a = Math.max(0, Number(el.dataset.aPoints) || 0);
    var b = Math.max(0, Number(el.dataset.bPoints) || 0);
    var scoreA = el.querySelector('[data-score="a"]');
    var scoreB = el.querySelector('[data-score="b"]');
    var barA = el.querySelector('[data-terrain="a"]');
    var shareA = el.querySelector('[data-share="a"]');
    var shareB = el.querySelector('[data-share="b"]');
    var progress = el.querySelector('.rduel-arena');
    var territoryA = a + b ? (a / (a + b)) * 100 : 50;
    if (scoreA) scoreA.textContent = a;
    if (scoreB) scoreB.textContent = b;
    if (shareA) shareA.textContent = territoryA.toFixed(1) + '% del terreno';
    if (shareB) shareB.textContent = (100 - territoryA).toFixed(1) + '% del terreno';
    if (progress) progress.setAttribute('aria-valuenow', String(territoryA));
    if (barA) setTimeout(function () { barA.style.flexBasis = territoryA + '%'; }, 60);
  });
})();
