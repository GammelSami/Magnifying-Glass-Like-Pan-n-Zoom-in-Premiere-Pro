$.get = {
	sequenceWidth: function() {
		return getSeq().getSettings().videoFrameWidth;
	},
	sequenceHeight: function() {
		return getSeq().getSettings().videoFrameHeight;
	},
	clipX: function() {
		//alert( getMotion().properties[0].getValue() );
		debug(
			getVideoComponentByMatchName("AE.ADBE Motion").properties[0].getValue()[0],
			getVideoComponentByMatchName("AE.ADBE Motion").properties[0].getValue()[1],
		);
		debug(
			qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0).getComponentAt(1).getParamValue('Position')
		);
	},
	clipY: function() {
		debug('not supported yet');
	},
}

$.set = {
}

/***** helper *****/
app.enableQE();

function getSeq() {
	return app.project.activeSequence;
}

function getSelectedVideos() {
	var sel = getSeq().getSelection();
	if (!sel) return 'no clips selected!';
	var vids = [];
	for (var i = 0; i < sel.length; i++) {
		if (sel[i].mediaType === "Video") { //only keep video clips
			vids.push(sel[i]);
		}
	}
	return vids;
}

function getSelectedVideo() {
	var vids = getSelectedVideos();
	if (vids.length === 1) return vids[0];
	else return 'multiple video clips selected!';
}

function getVideoComponentByMatchName(name) { // get effect from selected video clip by matchName
	var components = getSelectedVideo().components;
	if (!components) return 'no components found. faild to get "' + name + '" component!';
	for (var i = 0; i < components.numItems; i++) {
		//returns only the first match, even if there are multiple components with this name!
		if (components[i].matchName === name) return components[i];
	}
	return 'video component "' + name + '" not found on this clip!';
}

function debug() {
	for (var i = 0; i < arguments.length; i++) {
		app.setSDKEventMessage(arguments[i], 'info');
	}
}
