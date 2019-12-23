var width = window.innerWidth;
var height = window.innerHeight;

/********** init conva objects **********/

var stage = new Konva.Stage({
  container: 'canvas',
  width: width,
  height: height
});

var layer = new Konva.Layer();
stage.add(layer);

var spotlight = new Konva.Rect({
  x: 160,
  y: 60,
  width: 100, //sequence width
  height: 90, //sequence height
  name: 'spotlight',
  draggable: true
});
layer.add(spotlight);

var text = new Konva.Text({
  x: 5,
  y: 5
});
layer.add(text);
updateText();

var tr = new Konva.Transformer({
  keepRatio: true,
  rotationSnaps: [0, 45, 90, 135, 180, 225, 270, 315]
});
layer.add(tr);
tr.attachTo(spotlight);
layer.draw();
