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

var userfeedback = document.getElementById('userfeedback');
var clipScaleSyncFalseHandles = [
  'top-left',
  'top-center',
  'top-right',
  'middle-right',
  'middle-left',
  'bottom-left',
  'bottom-center',
  'bottom-right'
];
var clipScaleSyncTrueHandles = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
  'right'
];
var sequenceWidth, sequenceHeight, aspectRatio;
var bodyMargin = 8 + 8;
var settingsHeight = 20;

function premiereToKonva() {
  cs.evalScript('$.get.hasSelectedVideo()', function (cb) {
    if (cb==='true') {
      document.getElementById('userfeedback').innerText = '';

      cs.evalScript('$.get.sequenceWidth()', function (cb) {
        sequenceWidth = Number(cb);
      });
      cs.evalScript('$.get.sequenceHeight()', function (cb) {
        sequenceHeight = Number(cb);

        // https://stackoverflow.com/a/3971875

        var maxWidth = window.innerWidth - bodyMargin; // Max width for the image
        var maxHeight = window.innerHeight - bodyMargin - settingsHeight; // Max height for the image
        var ratio;  // Used for aspect ratio
        var width = sequenceWidth;    // Current image width
        var height = sequenceHeight;  // Current image height

        // Check if the current width is larger than the max
        if(true || width > maxWidth) {
            ratio = maxWidth / width;   // get ratio for scaling image
            stage.width(maxWidth); // Set new width
            stage.height(height * ratio);  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if(height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            stage.height(maxHeight);   // Set new height
            stage.width(width * ratio);    // Scale width based on ratio
        }

      });
      cs.evalScript('$.get.clipPositionX()', function (cb) {
        spotlight.offsetX( Number(cb) );
      });
      cs.evalScript('$.get.clipPositionY()', function (cb) {
        spotlight.offsetY( Number(cb) );
      });
      cs.evalScript('$.get.clipAnchorPointX()', function (cb) {
        spotlight.x( Number(cb) );
      });
      cs.evalScript('$.get.clipAnchorPointY()', function (cb) {
        spotlight.y( Number(cb) );
      });
      cs.evalScript('$.get.clipHeight()', function (cb) {
        spotlight.height( Number(cb) );
      });
      cs.evalScript('$.get.clipWidth()', function (cb) {
        spotlight.width( Number(cb) );
      });
      cs.evalScript('$.get.clipRotation()', function (cb) {
        spotlight.rotation( -Number(cb) );
      });
      cs.evalScript('$.get.clipScale()', function (cb) {
        spotlight.scaleY(calcScalePremiereToKonva(cb));
      });
      cs.evalScript('$.get.clipScaleSync()', function (cb) {
        if(cb==='true') {
          tr.enabledAnchors(clipScaleSyncTrueHandles);
          cs.evalScript('$.get.clipScale()', function (cb) {
            spotlight.scaleX(calcScalePremiereToKonva(cb));
            layer.batchDraw();
          });
        } else {
          tr.enabledAnchors(clipScaleSyncFalseHandles);
          cs.evalScript('$.get.clipScaleW()', function (cb) {
            spotlight.scaleX(calcScalePremiereToKonva(cb));
            layer.batchDraw();
          });
        }
        updateText();
      });
    } else {
      document.getElementById('userfeedback').innerText = '(no video clip selected)';
      stage.width(0);
      stage.height(0);
    }
  });

}

function konvaToPremiere() {
  //clip position xy
  cs.evalScript('$.set.clipPosition('+
    //not so magic "formular" by sami
    spotlight.offsetX() + ',' +
    spotlight.offsetY()
  +')');
  //clip scale
  cs.evalScript('$.set.clipScale('+
    //magic formular by Hannes
    ((1 / spotlight.scaleY() ) * 100)
  +')');
  //clip scale w
  cs.evalScript('$.set.clipScaleW('+
    //magic formular by Hannes
    ((1 / spotlight.scaleX() ) * 100)
  +')');
  //clip rotation
  cs.evalScript('$.set.clipRotation('+
    -spotlight.rotation() //negative rotation
  +')');
  //clip anchorpoint xy
  cs.evalScript('$.set.clipAnchorPoint('+
    //not so magic "formular" by sami
    spotlight.x() + ',' +
    spotlight.y()
  +')');
}

function calcScalePremiereToKonva(cb) {
  var x = Number(cb) / 100;
  var calc = x / Math.pow(x, 2);
  return calc;
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

function debug() {
  if (DEBUG) {
    for (var i = 0; i < arguments.length; i++) {
      cs.evalScript('$.set.debug('+ arguments[i] +')');
    }
  }
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
