/********** add event listeners **********/

spotlight.on('transformstart', function() {
});
spotlight.on('dragmove', function() {
  //snapToPixelGrid();
  updateText();
});
spotlight.on('transform', function() {
  updateText();
});
spotlight.on('transformend', function() {
});

window.addEventListener('resize', () => {
  //updateStageSize();
});
