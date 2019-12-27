var transformed = false;
var dragmoved = false;

/********** add event listeners **********/

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
  setTimeout(function () {
    layer.batchDraw();
  }, 50);

  //refresh on F5
  window.addEventListener('keydown', (e) => {
    if (e.code == 'F5') location.reload(); //this only reloads the html, not the jsx
  });

  update();
});

function update() {
  setTimeout(function () {
    if (transformed || dragmoved) {
      transformed = false;
      dragmoved = false;
      konvaToPremiere();
    } else {
      // premiereToKonva();
    }
    update();
  }, 20);
}
