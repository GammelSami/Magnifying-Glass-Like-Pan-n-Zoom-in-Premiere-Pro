var transforming = false;
var dragmoving = false;
var transformed = false;
var dragmoved = false;
var focused = true;
var lastPosition = {x: null, y: null};

/********** add event listeners **********/

spotlight.on('dragstart', function() {
  dragmoving = true;
  focused = true;
  pushUpdate();
});
spotlight.on('dragend', function() {
  dragmoving = false;
});
spotlight.on('transformstart', function() {
  transforming = true;
  focused = true;
  pushUpdate();
  lastPosition = {
    x: spotlight.x(),
    y: spotlight.y()
  };
});
spotlight.on('transformend', function() {
  transforming = false;
});

spotlight.on('dragmove', function() {
  dragmoved = true;
});
spotlight.on('transform', function() {
  transformed = true;

  //prevent negative scaling:
  if (spotlight.scaleY() < 1/100) {
    tr.stopTransform();
    spotlight.scaleY(1/100);
  }
  if (spotlight.scaleX() < 1/100) {
    tr.stopTransform();
    spotlight.scaleX(1/100);
  }
});

window.addEventListener('resize', () => {
  //updateStageSize();
  layer.batchDraw();
});

window.addEventListener('focus', () => {
  focused = true;
  pushUpdate();
});

window.addEventListener('blur', () => {
  focused = false;
});

window.addEventListener('mouseover', () => {
  premiereToKonva();
});

window.addEventListener('DOMContentLoaded', () => {
  pullUpdate();

  setTimeout(function () {
    layer.batchDraw();
  }, 50);

});

window.addEventListener('keydown', (e) => {
  //refresh on F5
  if (e.code == 'F5') location.reload(); //this only reloads the html, not the jsx
  if (e.key == 'Alt') {
    spotlight.x(lastPosition.x);
    spotlight.y(lastPosition.y);
    tr.centeredScaling(true);
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key == 'Alt') {
    tr.centeredScaling(false);
  }
});

function pushUpdate() {
  setTimeout(function () {
    if (transformed || dragmoved) {
      transformed = false;
      dragmoved = false;
      konvaToPremiere();
      updateText();
    }
    if (focused) pushUpdate();
  }, 20);
}

function pullUpdate() {
  setTimeout(function () {
    debug(!transforming && !dragmoving);
    if (!transforming && !dragmoving) premiereToKonva(); //dont pull while user is editing konva
    pullUpdate();
  }, 800);
}
