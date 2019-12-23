/********** functions **********/

function snapToGrid() {
  var blockSize = 10 //size of grid gaps in px
  spotlight.position({
    x: Math.round(spotlight.x() / blockSize) * blockSize,
    y: Math.round(spotlight.y() / blockSize) * blockSize
  });
  stage.batchDraw();
}

function updateText() {
  var lines = [
    'x: ' + spotlight.x(),
    'y: ' + spotlight.y(),
    'rotation: ' + spotlight.rotation(),
    'width: ' + spotlight.width(),
    'height: ' + spotlight.height(),
    'scaleX: ' + spotlight.scaleX(),
    'scaleY: ' + spotlight.scaleY()
  ];
  text.text(lines.join('\n'));
  layer.batchDraw();
}
