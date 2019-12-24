/********** functions **********/

function applySequenceValues() {
  //clip position xy
  cs.evalScript('$.set.clipPosition('+
    getFormVal('clipPositionX') + ',' +
    getFormVal('clipPositionY')
  +')');
  //clip scale
  cs.evalScript('$.set.clipScale('+
    getFormVal('clipScale')
  +')');
  //clip scale w
  cs.evalScript('$.set.clipScaleW('+
    getFormVal('clipScaleW')
  +')');
  //clip scale sync
  cs.evalScript('$.set.clipScaleSync('+
    getFormChecked('clipScaleSync')
  +')');
  //clip rotation
  cs.evalScript('$.set.clipRotation('+
    getFormVal('clipRotation')
  +')');
  //clip anchorpoint xy
  cs.evalScript('$.set.clipAnchorPoint('+
    getFormVal('clipAnchorPointX') + ',' +
    getFormVal('clipAnchorPointY')
  +')');
}

function fetchSequenceValues() {

  /* sequence */
  //sequence width
  cs.evalScript('$.get.sequenceWidth()', function (cb) {
    setFormVal('sequenceWidth', cb);
    // stage.width(cb);
    // spotlight.width(cb);
  });
  //sequence height
  cs.evalScript('$.get.sequenceHeight()', function (cb) {
    setFormVal('sequenceHeight', cb);
    // stage.height(cb);
    // spotlight.height(cb);
  });

  /* clip */
  //clip x position
  cs.evalScript('$.get.clipPositionX()', function (cb) {
    setFormVal('clipPositionX', cb);
  });
  //clip y position
  cs.evalScript('$.get.clipPositionY()', function (cb) {
    setFormVal('clipPositionY', cb);
  });
  //clip scale
  cs.evalScript('$.get.clipScale()', function (cb) {
    setFormVal('clipScale', cb);
  });
  //clip scale w
  cs.evalScript('$.get.clipScaleW()', function (cb) {
    setFormVal('clipScaleW', cb);
  });
  //clip scale sync
  cs.evalScript('$.get.clipScaleSync()', function (cb) {
    setFormChecked('clipScaleSync', cb==='true');
  });
  //clip rotation
  cs.evalScript('$.get.clipRotation()', function (cb) {
    setFormVal('clipRotation', cb);
  });
  //clip x anchorpoint
  cs.evalScript('$.get.clipAnchorPointX()', function (cb) {
    setFormVal('clipAnchorPointX', cb);
  });
  //clip y anchorpoint
  cs.evalScript('$.get.clipAnchorPointY()', function (cb) {
    setFormVal('clipAnchorPointY', cb);
  });
  //clip height
  cs.evalScript('$.get.clipWidth()', function (cb) {
    setFormVal('clipWidth', cb);
  });
  //clip width
  cs.evalScript('$.get.clipHeight()', function (cb) {
    setFormVal('clipHeight', cb);
  });
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
      var log = document.getElementById('debug');
      var tmp = log.value;
      log.value = arguments[i] + '\n' + tmp;
    }
  }
}

/**** getter/setter demo helper ****/
function setFormVal(id, val) {
  document.getElementById(id).value = val;
}
function setFormChecked(id, val) {
  document.getElementById(id).checked = val;
}
function getFormVal(id) {
  return document.getElementById(id).value;
}
function getFormChecked(id) {
  return document.getElementById(id).checked;
}
