var amps = $('td');
// console.log(amps[0]); // successfully selected all table data's. Time to fill them with the frequency data, but only change the values when the array changes

// create a new instance of an audio object, give it some properties manually
var audio = new Audio();
// audio.crossOrigin = 'Anonymous'; // DOESN'T WORK??
audio.src = "audio/chopin-nocturne.mp3"; // works because of index.js line 19
audio.controls = true;
audio.loop = true;
audio.autoplay = false;

// finding out if the bar height is hitting the max, this is where it will be displayed
var barH = document.getElementById("barH");

// These are all the variables that the analyzer will need.
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

// Initializes the mp3 player after the page loads all HTML into the window
window.addEventListener("load", initmp3player, false);

function initmp3player() {
  // plug in the aux!!
  document.getElementById('audio_box').appendChild(audio);
  context = new AudioContext(); // AudioContext object instance
  analyser = context.createAnalyser(); // Analyser node method.
  canvas = document.getElementById('visualiser'); // the visualization
  ctx = canvas.getContext('2d');
  // Re-route the audio playback into the processing graph of the AudioContext.
  source = context.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(context.destination);
  frameLooper(); // this is defined below
}

// frameLooper() is the visualiser itself, natively at 60fps
function frameLooper() {
  window.requestAnimationFrame(frameLooper); // recursive yaaay, for looping
  // fbc_array is our actual frequency/amplitude array
  // having access to this will be key to split up later
  fbc_array = new Uint8Array(analyser.frequencyBinCount);

  analyser.getByteFrequencyData(fbc_array);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas every loop
  ctx.fillStyle = '#00CCFF'; // color of the bars. I chose sky blue
  bars = 128; // how many bars to render. 128 might make the most sense.
  // fbc_array.length == 1024, so each bar represents 8 frequencies

  for(var i = 0; i < bars; i++){
    bar_x = i * 2; // each bar is 3 units apart on the x axis
    bar_width = 1; // each bar is 2 units wide. 0-1 is a bar, 2 is not, 3-4 is a bar, etc. But this is based on the width of the canvas
    bar_height = -(fbc_array[i] / 2); // frequency data, of the current index. The amplitude

    // amps[0].text = fbc_array[0]; // not working

    // here I'm finding out stuff about the bar_height
    // barH.innerHTML = fbc_array; // this is a simple trick for now, but I want to make a 32x32 grid, and loop over it and fill the number (amp) into each of them
    // Doing this at every frame makes everything lag, so idk if I'll have to comment out the *BAR* visualization for testing purposes. Then I'll make a grid of the array, change the color of the text as it increases, and that'll be my new visualisation.

    // fillRect(x, y, width, height) // explanation of the parameters below
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height); // this draws the bars themselves
  }


  // Table visualization
  for(var j = 0; j < fbc_array.length; j++){
    amps[j].innerHTML = fbc_array[j];
    // styling is gonna be difficult
    // amps[j].css({"background-color":`rgb(0,${j}, ${j})`});
  }

}

