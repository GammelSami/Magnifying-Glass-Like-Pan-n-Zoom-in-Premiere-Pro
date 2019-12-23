/********** add event listeners **********/

spotlight.on('transformstart', function() {
  console.log('transform start');
});
spotlight.on('dragmove', function() {
  //snapToPixelGrid();
  updateText();
});
spotlight.on('transform', function() {
  updateText();
  console.log('transform');
});
spotlight.on('transformend', function() {
  console.log('transform end');
});

window.addEventListener('resize', () => {
  updateStageSize();
});
