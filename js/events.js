var transforming = false;
var dragmoving = false;
var transformed = false;
var dragmoved = false;
var lastPosition = {x: null, y: null};
var liveupdate = document.getElementById('liveupdate');

/********** add event listeners **********/

spotlight.on('dragstart', function() {
  dragmoving = true;
  pushUpdate();
});
spotlight.on('dragend', function() {
  konvaToPremiere();
  dragmoving = false;
});
spotlight.on('transformstart', function() {
  transforming = true;
  pushUpdate();
  lastPosition = {
    x: spotlight.x(),
    y: spotlight.y()
  };
});
spotlight.on('transformend', function() {
  konvaToPremiere();
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
    premiereToKonva();
  }
  if (spotlight.scaleX() < 1/100) {
    tr.stopTransform();
    spotlight.scaleX(1/100);
    premiereToKonva();
  }
});

window.addEventListener('resize', () => {
  premiereToKonva();
});

window.addEventListener('focus', () => {
  pushUpdate();
});

window.addEventListener('blur', () => {
});

window.addEventListener('mouseover', () => {
  premiereToKonva();
});

window.addEventListener('DOMContentLoaded', () => {
  pullUpdate();
  pushUpdate();
});

window.addEventListener('keydown', (e) => {
  //refresh on F5
  if (e.code == 'F5') location.reload(); //this only reloads the html, not the jsx
  //only change scaling on Alt
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
  if (liveupdate.checked) setTimeout(function () {
    if (transformed || dragmoved) {
      transformed = false;
      dragmoved = false;
      konvaToPremiere();
      updateText();
    }
    if (document.hasFocus()) pushUpdate();
    if (document.hasFocus() && DEBUG) document.getElementById('userfeedback').innerText = 'focused';
    else if (DEBUG) document.getElementById('userfeedback').innerText = 'not focused';
  }, 20);
}

function pullUpdate() {
  setTimeout(function () {
    if (!transforming && !dragmoving && !document.hasFocus()) premiereToKonva(); //dont pull while user is editing konva
    pullUpdate();
  }, 800);
}

function resetSpotlight() {
  spotlight.x(stage.width() / 2);
  spotlight.y(stage.height() / 2);
  spotlight.offsetX(stage.width() / 2);
  spotlight.offsetY(stage.height() / 2);
  spotlight.scaleX(1);
  spotlight.scaleY(1);
  spotlight.rotation(0);
  layer.batchDraw();
  konvaToPremiere();
}
