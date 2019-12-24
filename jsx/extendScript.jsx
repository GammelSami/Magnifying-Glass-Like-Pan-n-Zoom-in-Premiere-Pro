$.get = {
	sequenceWidth: function() {
		return getSeq().getSettings().videoFrameWidth;
	},
	sequenceHeight: function() {
		return getSeq().getSettings().videoFrameHeight;
	},
	clipPositionX: function() {
		//only the multiplyer is returned, so...
		return this.sequenceWidth() * getVideoComponentByMatchName("AE.ADBE Motion").properties[0].getValue()[0];
		//debug(qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0).getComponentAt(1).getParamValue('Position')); //precalculated qe-solution
	},
	clipPositionY: function() {
		return this.sequenceHeight() * getVideoComponentByMatchName("AE.ADBE Motion").properties[0].getValue()[1];
	},
	clipScale: function() {
		return getVideoComponentByMatchName("AE.ADBE Motion").properties[1].getValue();
	},
	clipScaleW: function() {
		return getVideoComponentByMatchName("AE.ADBE Motion").properties[2].getValue();
	},
	clipScaleSync: function() {
		return getVideoComponentByMatchName("AE.ADBE Motion").properties[3].getValue();
	},
	clipRotation: function() {
		return getVideoComponentByMatchName("AE.ADBE Motion").properties[4].getValue();
	},
	clipAnchorPointX: function() {
		return this.sequenceWidth() * getVideoComponentByMatchName("AE.ADBE Motion").properties[5].getValue()[0];
	},
	clipAnchorPointY: function() {
		return this.sequenceHeight() * getVideoComponentByMatchName("AE.ADBE Motion").properties[5].getValue()[1];
	},
	clipWidth: function() {
		return this.sequenceWidth(); //fallback, not possible yet!
	},
	clipHeight: function() {
		return this.sequenceHeight(); //fallback, not possible yet!
	},
}

$.set = {
	clipPosition: function(valX, valY) {
		var x = valX / $.get.sequenceWidth();
		var y = valY / $.get.sequenceHeight();
		getVideoComponentByMatchName("AE.ADBE Motion").properties[0].setValue([x,y], true);
	},
	clipScale: function(val) {
		var calc = val * 100;
		getVideoComponentByMatchName("AE.ADBE Motion").properties[1].setValue(calc, true);
	},
	clipScaleW: function(val) {
		getVideoComponentByMatchName("AE.ADBE Motion").properties[2].setValue(val, true);
	},
	clipScaleSync: function(val) {
		getVideoComponentByMatchName("AE.ADBE Motion").properties[3].setValue(val, true);
	},
	clipRotation: function(val) {
		getVideoComponentByMatchName("AE.ADBE Motion").properties[4].setValue(val, true);
	},
	clipAnchorPoint: function(valX, valY) {
		var x = valX / $.get.sequenceWidth();
		var y = valY / $.get.sequenceHeight();
		getVideoComponentByMatchName("AE.ADBE Motion").properties[5].setValue([x,y], true);
	},
}

/***** helper *****/
//app.enableQE();

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
