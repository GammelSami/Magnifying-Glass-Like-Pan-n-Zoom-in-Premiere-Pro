/********** add event listeners **********/

spotlight.on('transformstart', function() {
  console.log('transform start');
});
spotlight.on('dragmove', function() {
  snapToGrid();
  updateText();
});
spotlight.on('transform', function() {
  updateText();
  console.log('transform');
});
spotlight.on('transformend', function() {
  console.log('transform end');
});
