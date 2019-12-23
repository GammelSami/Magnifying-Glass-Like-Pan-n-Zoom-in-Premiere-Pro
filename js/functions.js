/********** functions **********/

function fetchSequenceValues() {

  /* sequence */

  //sequence width
  cs.evalScript('$.get.sequenceWidth()', function (cb) {
    debug('sequenceWidth: ' + cb);
    stage.width(cb);
    spotlight.width(cb);
  });
  //sequence height
  cs.evalScript('$.get.sequenceHeight()', function (cb) {
    debug('sequenceHeight: ' + cb);
    stage.height(cb);
    spotlight.height(cb);
  });

  /* clip */

  //clip x position
  cs.evalScript('$.get.clipX()', function (cb) {
    debug('clipX: ' + cb);
    spotlight.x(cb);
  });
  //clip y position
  cs.evalScript('$.get.clipY()', function (cb) {
    debug('clipY: ' + cb);
    spotlight.y(cb);
  });
  //clip x anchorpoint
  //clip y anchorpoint
  //clip rotation
}

function snapToPixelGrid() {
  var blockSize = 10 //size of grid gaps in px
  spotlight.position({
    x: Math.round(spotlight.x() / blockSize) * blockSize,
    y: Math.round(spotlight.y() / blockSize) * blockSize
  });
  stage.batchDraw();
}

function updateText() {
  if (DEBUG) {
    var lines = [
      'x: ' + spotlight.x(),
      'y: ' + spotlight.y(),
      'rotation: ' + spotlight.rotation(),
      'width: ' + spotlight.width(),
      'height: ' + spotlight.height(),
      'scaleX: ' + spotlight.scaleX(),
      'scaleY: ' + spotlight.scaleY(),
      'stageW: ' + stage.width(),
      'stageH: ' + stage.height()

    ];
    text.text(lines.join('\n'));
    layer.batchDraw();
  }
}

function debug() {
  if (DEBUG) {
    for (var i = 0; i < arguments.length; i++) {
      document.getElementById('debug').value += arguments[i] + '\n';
    }
  }
}
