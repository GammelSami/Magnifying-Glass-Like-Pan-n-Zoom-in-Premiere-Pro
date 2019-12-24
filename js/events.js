/********** add event listeners **********/

spotlight.on('transformstart', function() {
});
spotlight.on('dragmove', function() {
  //snapToPixelGrid();
  updateText();
  konvaToPremiere();
});
spotlight.on('transform', function() {
  updateText();
  konvaToPremiere();
});
spotlight.on('transformend', function() {
});

window.addEventListener('resize', () => {
  //updateStageSize();
});
