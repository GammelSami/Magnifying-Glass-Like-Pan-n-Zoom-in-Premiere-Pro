var transforming = false;
var dragmoving = false;
var transformed = false;
var dragmoved = false;
var lastPosition = {x: null, y: null};
var liveView = document.getElementById('liveView');

/********** add event listeners **********/

spotlight.on('dragstart', function() {
  dragmoving = true;
  pushUpdate();
});
spotlight.on('dragend', function() {
  konvaToPremiere();
  updateText();
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
  updateText();
  transforming = false;
});

spotlight.on('dragmove', function() {
  dragmoved = true;
  // calculateDynamicOffset();
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

{
  var rotater = tr.findOne('.rotater');
  rotater.on('mouseenter', (e) => {
    //not working
    stage.container().style.cursor = 'grab';
  });
}

window.addEventListener('resize', () => {
  premiereToKonva();
});

window.addEventListener('focus', () => {
  pushUpdate();
});

window.addEventListener('blur', () => {
});

window.addEventListener('mouseover', () => {
  if (!transforming && !dragmoving) premiereToKonva();
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
}, true);
window.addEventListener('keyup', (e) => {
  if (e.key == 'Alt') {
    tr.centeredScaling(false);
  }
});

function pushUpdate() {
  if (liveView.checked) setTimeout(function () {
    if (transformed || dragmoved) {
      transformed = false;
      dragmoved = false;
      konvaToPremiere();
    }
    if (document.hasFocus()) pushUpdate();
    if (document.hasFocus() && DEBUG) document.getElementById('userfeedback').innerText = 'focused';
    else if (DEBUG) document.getElementById('userfeedback').innerText = 'not focused';
  }, 20);
}

function pullUpdate() {
  setTimeout(function () {
    if (!transforming && !dragmoving) premiereToKonva(); //dont pull while user is editing konva
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


function calculateDynamicOffset() {
  var rect = spotlight.getClientRect();
  var spotlightCenterPositionX = rect.x + (rect.width * 0.5);
  var spotlightCenterPositionY = rect.y + (rect.height * 0.5);
  var spotlightRadiusX = rect.width * 0.5;
  var spotlightRadiusY = rect.height * 0.5;
  var stageCenterX = stage.width() * 0.5;
  var stageCenterY = stage.height() * 0.5;
  spotlight.offsetX(spotlightCenterPositionX + spotlightRadiusX);
  spotlight.offsetY(spotlightCenterPositionY + spotlightRadiusY);
  //all wrong
}
