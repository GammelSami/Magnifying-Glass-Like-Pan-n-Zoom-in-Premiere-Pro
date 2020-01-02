$.get = {
	hasSelectedVideo: function() {
		if (getSelectedVideo()) return true;
		else return false;
	},
	sequenceWidth: function() {
		return getSeq().getSettings().videoFrameWidth;
	},
	sequenceHeight: function() {
		return getSeq().getSettings().videoFrameHeight;
		//also possible: getSeq().getSettings().videoFrameHeight;
	},
	//sometimes only multipliers are returned. precalculated solution: qe.project.getActiveSequence().getVideoTrackAt(0).getItemAt(0).getComponentAt(1).getParamValue('Position'));
	clipPositionX: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[0];
		if ( useKeyframes ) return this.sequenceWidth() * getKeyValue(componentProp)[0];
		else return this.sequenceWidth() * componentProp.getValue()[0];
	},
	clipPositionY: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[0];
		if ( useKeyframes ) return this.sequenceHeight() * getKeyValue(componentProp)[1];
		else return this.sequenceHeight() * componentProp.getValue()[1];
	},
	clipScale: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[1];
		if ( useKeyframes ) return getKeyValue(componentProp);
		else return componentProp.getValue();
	},
	clipScaleW: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[2];
		if ( useKeyframes ) return getKeyValue(componentProp);
		else return componentProp.getValue();
	},
	clipScaleSync: function() {
		return getVideoComponentByMatchName("AE.ADBE Motion").properties[3].getValue();
	},
	clipRotation: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[4];
		if ( useKeyframes ) return getKeyValue(componentProp);
		else return componentProp.getValue();
	},
	clipAnchorPointX: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[5];
		if ( useKeyframes ) return this.sequenceWidth() * getKeyValue(componentProp)[0];
		else return this.sequenceWidth() * componentProp.getValue()[0];
	},
	clipAnchorPointY: function(useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[5];
		if ( useKeyframes ) return this.sequenceHeight() * getKeyValue(componentProp)[1];
		else return this.sequenceHeight() * componentProp.getValue()[1];
	},
	clipWidth: function() {
		return this.sequenceWidth(); //fallback, not possible yet!
	},
	clipHeight: function() {
		return this.sequenceHeight(); //fallback, not possible yet!
	},
}

$.set = {
	clipPosition: function(valX, valY, useKeyframes) {
		var x = valX / $.get.sequenceWidth();
		var y = valY / $.get.sequenceHeight();
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[0];
		if ( useKeyframes ) setKey(componentProp, [x,y], false);
		else setVal(componentProp, [x,y], false);
	},
	clipScale: function(val, useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[1];
		if ( useKeyframes ) setKey(componentProp, val, false);
		else setVal(componentProp, val, false);
	},
	clipScaleW: function(val, useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[2];
		if ( useKeyframes ) setKey(componentProp, val, false);
		else setVal(componentProp, val, false);
	},
	clipScaleSync: function(val, useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[3];
		if ( useKeyframes ) setKey(componentProp, val, false);
		else setVal(componentProp, val, false);
	},
	clipRotation: function(val, useKeyframes) {
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[4];
		if ( useKeyframes ) setKey(componentProp, val, false);
		else setVal(componentProp, val, false);
	},
	clipAnchorPoint: function(valX, valY, useKeyframes) {
		var x = valX / $.get.sequenceWidth();
		var y = valY / $.get.sequenceHeight();
		var componentProp = getVideoComponentByMatchName("AE.ADBE Motion").properties[5];
		if ( useKeyframes ) setKey(componentProp, [x,y], true);
		else setVal(componentProp, [x,y], true);
	},
	debug: function (str) {
		debug(str);
	}
}

/***** helper *****/
app.enableQE();

function getSeq() {
	var val = app.project.activeSequence;
	if (val) return val;
}

function getSelectedVideos() {
	var sel = getSeq().getSelection();
	if (!sel) return false; //no clips selected
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
	if (!vids) return false; //no clips selected
	if (vids.length === 1) return vids[0];
	else false; //'multiple video clips selected!';
}

function getVideoComponentByMatchName(name) { // get effect from selected video clip by matchName
	var vid = getSelectedVideo();
	if (!vid) return false; //'no components found. faild to get "' + name + '" component!';
	var components = vid.components;
	for (var i = 0; i < components.numItems; i++) {
		//returns only the first match, even if there are multiple components with this name!
		if (components[i].matchName === name) return components[i];
	}
	return false; //'video component "' + name + '" not found on this clip!'
}

function getClipPlayheadSeconds() {
	var timecode = qe.project.getActiveSequence().CTI.secs;
	var video = getSelectedVideo(); //helper
	var clipIn = video.inPoint.seconds;
	var	clipStart = video.start.seconds;
	return timecode - clipStart + clipIn;
}

function setKey(componentProp, val, updateUI) {
	if ( !componentProp.isTimeVarying() ) componentProp.setTimeVarying(true);
	var secs = getClipPlayheadSeconds();
	componentProp.addKey(secs);
	componentProp.setValueAtKey(secs, val, updateUI);
}

function getKeyValue(componentProp) {
	var secs = getClipPlayheadSeconds();
	return componentProp.getValueAtTime(secs);
}

function setVal(componentProp, val, updateUI) {
	if ( componentProp.isTimeVarying() ) componentProp.setTimeVarying(false);
	componentProp.setValue(val, updateUI);
}

function debug() {
	for (var i = 0; i < arguments.length; i++) {
		app.setSDKEventMessage(arguments[i], 'info');
	}
}
