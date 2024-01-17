
// lowshelf bass booster 
// were only going to boost or attenuate low frequencys
// demonstrating the principle

var ctx = window.AudioContext || window.webkitAudioContext;
var audioContext = new ctx();
// get audioContext for our controls


var $audio = $('#biquadExample');// our source (guitar/mp3 ) 
$('input').on('change', function(e) {
  var target = e.currentTarget;
  var file = target.files[0];
  var reader = new FileReader();
  
  console.log($audio[0]); // write file name to screen
   if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $audio.attr('src', e.target.result);
			audiocontext.volume = 0.02;
            //$audio.play();
        }
        reader.readAsDataURL(file);
    }
});



var biquadExampleMediaElementSource = audioContext.createMediaElementSource(biquadExample);


var filterNode = audioContext.createBiquadFilter();


filterNode.type = "lowpass";  // make extremes lowpass or highpass

// may seem counter intuitive but we need to control and stabilise
// lower extreem of frequency here 
// we are moving centre frequency up or down between 
// the "min" and "max" values on our html slider control 

filterNode.frequency.value = 30;
// here we set center freq to 30 the very limit of our hearing

filterNode.Q.value = -2;
// -2 is quite a wide Q range but for demonstration purposes
// has more impact so you can hear whats going on
// when you adjust the first slider 


var filterNode1x = audioContext.createBiquadFilter();
// what were doing here is raising/lowering 
// the amplitude or sound level in Db's
// of a set center frequency 65hz

filterNode1x.type = "peaking";

filterNode1x.frequency.value = 65;

filterNode1x.gain.value = 0;

// leave Q as 0 we can adjust this constant before execution
filterNode1x.Q.value = 4;

biquadExampleMediaElementSource.connect(filterNode);

biquadExampleMediaElementSource.connect(filterNode1x);


filterNode.connect(audioContext.destination);
filterNode1x.connect(audioContext.destination);



biquadA.oninput = function(evt){
    filterNode.frequency.value = parseFloat(evt.target.value);
	
};

// if your wondering where biquadB is were going to be 
// using that on later examples 

biquadC.oninput = function(evt){
    filterNode1x.gain.value = parseFloat(evt.target.value);
	
};



