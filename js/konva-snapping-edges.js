var GUIDELINE_OFFSET = 10;

var snapToEdges = true;
document.getElementById('snapToEdges').addEventListener('change', (e) => {
  snapToEdges = e.target.checked;
  if (e.target.checked) tr.rotationSnaps([0, 90, 180, 270]);
  else tr.rotationSnaps(null);
});

layer.on('dragmove', function(e) {
  if (snapToEdges) {
    // clear all previous lines on the screen
    layer.find('.guid-line').destroy();

    // find possible snapping lines
    var lineGuideStops = getLineGuideStops(e.target);
    // find snapping points of current object
    var itemBounds = getObjectSnappingEdges(e.target);

    // now find where can we snap current object
    var guides = getGuides(lineGuideStops, itemBounds);

    // do nothing of no snapping
    if (!guides.length) {
      return;
    }

    drawGuides(guides);

    // now force object position
    guides.forEach(lg => {
      switch (lg.snap) {
        case 'start': {
          switch (lg.orientation) {
            case 'V': {
              e.target.x(lg.lineGuide + lg.offset);
              break;
            }
            case 'H': {
              e.target.y(lg.lineGuide + lg.offset);
              break;
            }
          }
          break;
        }
        case 'center': {
          switch (lg.orientation) {
            case 'V': {
              e.target.x(lg.lineGuide + lg.offset);
              break;
            }
            case 'H': {
              e.target.y(lg.lineGuide + lg.offset);
              break;
            }
          }
          break;
        }
        case 'end': {
          switch (lg.orientation) {
            case 'V': {
              e.target.x(lg.lineGuide + lg.offset);
              break;
            }
            case 'H': {
              e.target.y(lg.lineGuide + lg.offset);
              break;
            }
          }
          break;
        }
      }
    });
  }
});

layer.on('dragend', function(e) {
  if (snapToEdges) {
    // clear all previous lines on the screen
    layer.find('.guid-line').destroy();
    layer.batchDraw();
  }
});


// were can we snap our objects?
function getLineGuideStops(skipShape) {
  // we can snap to stage borders and the center of the stage
  var vertical = [0, stage.width() / 2, stage.width()];
  var horizontal = [0, stage.height() / 2, stage.height()];

  return {
    vertical: vertical.reduce((acc, val) => acc.concat(val), []),
    horizontal: horizontal.reduce((acc, val) => acc.concat(val), [])
  };

}

// what points of the object will trigger to snapping?
// it can be just center of the object
// but we will enable all edges and center
function getObjectSnappingEdges(node) {
  var box = node.getClientRect();
  return {
    vertical: [
      {
        guide: Math.round(box.x),
        offset: Math.round(node.x() - box.x),
        snap: 'start'
      },
      {
        guide: Math.round(box.x + box.width / 2),
        offset: Math.round(node.x() - box.x - box.width / 2),
        snap: 'center'
      },
      {
        guide: Math.round(box.x + box.width),
        offset: Math.round(node.x() - box.x - box.width),
        snap: 'end'
      }
    ],
    horizontal: [
      {
        guide: Math.round(box.y),
        offset: Math.round(node.y() - box.y),
        snap: 'start'
      },
      {
        guide: Math.round(box.y + box.height / 2),
        offset: Math.round(node.y() - box.y - box.height / 2),
        snap: 'center'
      },
      {
        guide: Math.round(box.y + box.height),
        offset: Math.round(node.y() - box.y - box.height),
        snap: 'end'
      }
    ]
  };
}

// find all snapping possibilities
function getGuides(lineGuideStops, itemBounds) {
  var resultV = [];
  var resultH = [];

  lineGuideStops.vertical.forEach(lineGuide => {
    itemBounds.vertical.forEach(itemBound => {
      var diff = Math.abs(lineGuide - itemBound.guide);
      // if the distance between guild line and object snap point is close we can consider this for snapping
      if (diff < GUIDELINE_OFFSET) {
        resultV.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset
        });
      }
    });
  });

  lineGuideStops.horizontal.forEach(lineGuide => {
    itemBounds.horizontal.forEach(itemBound => {
      var diff = Math.abs(lineGuide - itemBound.guide);
      if (diff < GUIDELINE_OFFSET) {
        resultH.push({
          lineGuide: lineGuide,
          diff: diff,
          snap: itemBound.snap,
          offset: itemBound.offset
        });
      }
    });
  });

  var guides = [];

  // find closest snap
  var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
  var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
  if (minV) {
    guides.push({
      lineGuide: minV.lineGuide,
      offset: minV.offset,
      orientation: 'V',
      snap: minV.snap
    });
  }
  if (minH) {
    guides.push({
      lineGuide: minH.lineGuide,
      offset: minH.offset,
      orientation: 'H',
      snap: minH.snap
    });
  }
  return guides;
}

function drawGuides(guides) {
  guides.forEach(lg => {
    if (lg.orientation === 'H') {
      var line = new Konva.Line({
        points: [-6000, lg.lineGuide, 6000, lg.lineGuide],
        stroke: 'rgb(0, 161, 255)',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [4, 6]
      });
      layer.add(line);
      layer.batchDraw();
    } else if (lg.orientation === 'V') {
      var line = new Konva.Line({
        points: [lg.lineGuide, -6000, lg.lineGuide, 6000],
        stroke: 'rgb(0, 161, 255)',
        strokeWidth: 1,
        name: 'guid-line',
        dash: [4, 6]
      });
      layer.add(line);
      layer.batchDraw();
    }
  });
}
