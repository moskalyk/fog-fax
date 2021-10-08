
(() => {
	function playSparkline(notes) {
	    if (!window.AudioContext && !window.webkitAudioContext) {
	        return;
	    }
	    var playing = null;
	    var note = 0;
	    var output = new (window.AudioContext || window.webkitAudioContext)();
	    var instrument = output.createOscillator();
	    var amplifier = output.createGain();
	    var playNotes = function() {
	        if (note < notes.length) {
	            instrument.frequency.value = 440 + (notes[note] * 64); // hertz
	            note = note + 1;
	        } else {
	            amplifier.gain.value = 0;
	        }
	        playing = window.setTimeout(playNotes, 39);
	    };
	    instrument.type = 'sine'; // 'sine', 'square', 'sawtooth', 'triangle'
	    instrument.start();
	    instrument.connect(amplifier);
	    amplifier.gain.value = 0.7;
	    amplifier.connect(output.destination);
	    playNotes();

	    // stream file to save
	    // every so oftern, pull file
	    // visualize file with circular wave
	}

	setInterval(() => {
		playSparkline([3,1,4,5,9,2,6,5,3,9,2,8,7,3,4])
	}, 1440)
})()