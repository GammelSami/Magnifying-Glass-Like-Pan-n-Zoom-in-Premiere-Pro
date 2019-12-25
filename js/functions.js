/********** functions **********/
/*
function applyToPremiere() {
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

function fetchFromPremiere() {

  var windowH = window.innerHeight;
  var windowW = window.innerWidth;

  //sequence
  //sequence width
  cs.evalScript('$.get.sequenceWidth()', function (cb) {
    setFormVal('sequenceWidth', cb);
  });
  //sequence height
  cs.evalScript('$.get.sequenceHeight()', function (cb) {
    setFormVal('sequenceHeight', cb);
  });

  //clip
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
  cs.evalScript('$.get.clipHeight()', function (cb) {
    setFormVal('clipHeight', cb);
  });
  //clip width
  cs.evalScript('$.get.clipWidth()', function (cb) {
    setFormVal('clipWidth', cb);
  });
  layer.batchDraw();
}

function applyToKonva() {
  stage.width( getFormVal('stageWidth') );
  stage.height( getFormVal('stageHeight') );
  spotlight.x( getFormVal('spotlightX') );
  spotlight.y( getFormVal('spotlightY') );
  spotlight.offsetX( getFormVal('spotlightOffsetX') );
  spotlight.offsetY( getFormVal('spotlightOffsetY') );
  spotlight.height( getFormVal('spotlightHeight') );
  spotlight.width( getFormVal('spotlightWidth') );
  spotlight.scaleX( getFormVal('spotlightScaleX') );
  spotlight.scaleY( getFormVal('spotlightScaleY') );
}
*/

function premiereToKonva() {
  cs.evalScript('$.get.sequenceWidth()', function (cb) {
    stage.width( parseFloat(cb) );
  });
  cs.evalScript('$.get.sequenceHeight()', function (cb) {
    stage.height( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipPositionX()', function (cb) {
    spotlight.x( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipPositionY()', function (cb) {
    spotlight.y( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipAnchorPointX()', function (cb) {
    spotlight.offsetX( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipAnchorPointY()', function (cb) {
    spotlight.offsetY( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipHeight()', function (cb) {
    spotlight.height( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipWidth()', function (cb) {
    spotlight.width( parseFloat(cb) );
  });
  cs.evalScript('$.get.clipScale()', function (cb) {
    spotlight.scaleY( parseFloat(cb) / 100 );
  });
  cs.evalScript('$.get.clipScaleW()', function (cb) {
    spotlight.scaleX( parseFloat(cb) / 100 );
  });
}

function konvaToPremiere() {
  //clip position xy
  cs.evalScript('$.set.clipPosition('+
    (stage.width() - spotlight.x()) / stage.width() + ',' +
    (stage.height() - spotlight.y()) / stage.height()
  +')');
  //clip scale
  cs.evalScript('$.set.clipScale('+
    ((1 / spotlight.scaleY() ) * 100) //magic formular by Hannes
  +')');
  //clip scale w
  cs.evalScript('$.set.clipScaleW('+
    ((1 / spotlight.scaleX() ) * 100) //magic formular by Hannes
  +')');
  //clip rotation
  cs.evalScript('$.set.clipRotation('+
    spotlight.rotation()
  +')');
  //clip anchorpoint xy
  cs.evalScript('$.set.clipAnchorPoint('+
    spotlight.offsetX() + ',' +
    spotlight.offsetY()
  +')');
}

function updateText() {
  if (DEBUG) {
    var lines = [
      'stageWidth: ' + stage.width(),
      'stageHeight: ' + stage.height(),
      'spotlightX: ' + spotlight.x(),
      'spotlightY: ' + spotlight.y(),
      'spotlightOffsetX: ' + spotlight.offsetX(),
      'spotlightOffsetY: ' + spotlight.offsetY(),
      'spotlightHeight: ' + spotlight.height(),
      'spotlightWidth: ' + spotlight.width(),
      'spotlightScaleX: ' + spotlight.scaleX(),
      'spotlightScaleY: ' + spotlight.scaleY(),
      'spotlightRotation: ' + spotlight.rotation(),
    ];
    text.text(lines.join('\n'));
    layer.batchDraw();
  }
}

function snapToPixelGrid() {
  var blockSize = 10 //size of grid gaps in px
  spotlight.position({
    x: Math.round(spotlight.x() / blockSize) * blockSize,
    y: Math.round(spotlight.y() / blockSize) * blockSize
  });
  stage.batchDraw();
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

var foo = 1;
function test(a) {
  alert(foo);
  foo = a;
  alert(foo);
}

/**** getter/setter demo helper ****/
/*
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
*/
