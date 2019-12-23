$.get = {
	callback: function() {
		return "Callback Test";
	},
	sequenceWidth: function() {
		return getSeq().getSettings().videoFrameWidth;
	},
	sequenceHeight: function() {
		return getSeq().getSettings().videoFrameHeight;
	},
	clipX: function() {
		throw 'not supported yet';
	},
	clipY: function() {
		throw 'not supported yet';
	},
}

$.set = {
	echo: function() {
		alert("Echo Test");
	}
}

/***** helper *****/

function getSeq() {
	return app.project.activeSequence;
}
function getMotion() {
	throw 'not supported yet';
	/*
	if (seq().getSelection()) {
		var sel = seq().getSelection();
		var newSel = [];
		for (var i = 0; i < sel.length; i++) {
			if (sel[i].mediaType === "Video") return sel[i].components[1]);
		}
		else alert('no video-clip selected!');
		return false;
	}
	*/
}
