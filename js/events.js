var transforming = false;
var dragmoving = false;
var transformed = false;
var dragmoved = false;

/********** add event listeners **********/

spotlight.on('dragstart', function() {
  dragmoving = true;
});
spotlight.on('dragend', function() {
  dragmoving = false;
});
spotlight.on('transformstart', function() {
  transforming = true;
});
spotlight.on('transformend', function() {
  transforming = false;
});

spotlight.on('dragmove', function() {
  dragmoved = true;
});
spotlight.on('transform', function() {
  transformed = true;
});

window.addEventListener('resize', () => {
  //updateStageSize();
  layer.batchDraw();
});

window.addEventListener('DOMContentLoaded', () => {
  // pullUpdate();
  pushUpdate();

  setTimeout(function () {
    layer.batchDraw();
  }, 50);

  //refresh on F5
  window.addEventListener('keydown', (e) => {
    if (e.code == 'F5') location.reload(); //this only reloads the html, not the jsx
  });
});

function pushUpdate() {
  setTimeout(function () {
    if (transformed || dragmoved) {
      transformed = false;
      dragmoved = false;
      konvaToPremiere();
      updateText();
    }
    pushUpdate();
  }, 20);
}

function pullUpdate() {
  setTimeout(function () {
    debug(!transforming && !dragmoving);
    if (!transforming && !dragmoving) premiereToKonva(); //dont pull while user is editing konva
    pullUpdate();
  }, 1000);
}
