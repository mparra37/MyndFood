var talkVideo = document.getElementById("talk-video");
var btn_iniciar = document.getElementById("btn_inicar");

btn_iniciar.addEventListener('click', playVideo);

function playVideo(video_src) {
  if(video_src === null){
    video_src = 'videos/intro.mp4'
  }
  talkVideo.srcObject = null; // Use null when resetting srcObject
  talkVideo.src = video_src; // Adjusted path
  //talkVideo.loop = true;
  talkVideo.load(); // Load the new video source
  talkVideo.play(); // Attempt to play the video
}

function toggleButtonClasses() {
    var button = document.getElementById('voice-typing-button');
    button.classList.toggle('btn-success');
    button.classList.toggle('btn-outline-danger');
}

// Add click event listener to button
var isRecording = false;
var recognition = new webkitSpeechRecognition();
document.addEventListener('DOMContentLoaded', () => {
    if ('webkitSpeechRecognition' in window) {
        
        recognition.continuous = true; // Set this to true if you want the recognition to continue even after it detects a pause in speaking
        recognition.interimResults = true; // Show interim results
        recognition.lang = 'es-MX'; // Set the language of the recognition

        //var isRecording = false; // Flag to track recording state
  
        // What to do when speech is detected
        recognition.onresult = function(event) {
          //var transcript= document.getElementById('response-field');
          //transcript.innerHTML = "";
          var final_transcript = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            }
          }
          // Update the text field with the result
         document.getElementById('user-input-field').value += final_transcript;
        };

        // Handle end of speech recognition session
        recognition.onend = function() {
          // Reset the recording state and button color when recognition ends
          //enviar();
          isRecording = false;
          document.getElementById('voice-typing-button').classList.remove('btn-success');
          document.getElementById('voice-typing-button').classList.add('btn-outline-danger'); // Change to your default button color
        };
  
        // Toggle the speech recognition when the button is clicked
        document.getElementById('voice-typing-button').addEventListener('click', function() {
            if (!isRecording) {
              recognition.start();
              isRecording = true;
              this.classList.remove('btn-outline-danger'); // Remove the btn-success class
              this.classList.add('btn-success') // Change button color to green
              //var transcript= document.getElementById('response-field');
              //transcript.innerHTML = "";
            } else {
              recognition.stop();
              // Note: The button color will be reset in the onend event handler
              //enviar();
            }
          });
      } else {
          alert("Web Speech API is not supported in this browser.");
      };
});

var estado = 1;

function respuesta_usuario(){
   var campo_respuesta = document.getElementById("user-input-field");
   var respuesta = campo_respuesta.value;
   campo_respuesta.value = "";

   if(estado === 2){
     var campo_color = document.getElementById("campo_color");
     campo_color.innerHTML = respuesta;
   }

   if(estado === 3){
     var campo_color = document.getElementById("campo_aroma");
     campo_color.innerHTML = respuesta;
   }

   if(estado === 4){
     var campo_color = document.getElementById("campo_sabor");
     campo_color.innerHTML = respuesta;
   }
}

document.addEventListener('keydown', function(event) {
    // Check if number 0 key was pressed
    if (event.key === "0") {
        // Prevent the default spacebar action (scrolling the page down)
        event.preventDefault();
        var boton_micro = document.getElementById('voice-typing-button');

        if (!isRecording) {
              recognition.start();
              isRecording = true;
              boton_micro.classList.remove('btn-outline-danger'); // Remove the btn-success class
              boton_micro.classList.add('btn-success') // Change button color to green
              //var transcript= document.getElementById('response-field');
              //transcript.innerHTML = "";
            } else {
              recognition.stop();
              // Note: The button color will be reset in the onend event handler
              //enviar();
              respuesta_usuario();
            }
    }

    if(event.key === "1"){
        var titulo_accion = document.getElementById("titulo_accion");
        titulo_accion.innerHTML = ""
        var campo_tip = document.getElementById("tip_label");
        campo_tip.innerHTML = "Bienvenido a esta cata de vino";

        playVideo("videos/intro.mp4");
    }
    if(event.key === "2"){
      estado = 2;
        //var titulo_accion = document.getElementById("titulo_accion");
        //titulo_accion.innerHTML = "Apariencia"
        var campo_tip = document.getElementById("tip_label");
        campo_tip.innerHTML = "¿De qué color es el vino?";

        playVideo("videos/color.mp4");
    }
    if(event.key === "3"){
      estado = 3;
       //var titulo_accion = document.getElementById("titulo_accion");
        //titulo_accion.innerHTML = "Fragancia"
        var campo_tip = document.getElementById("tip_label");
        campo_tip.innerHTML = "¿Qué aromas distingues en este vino?";

        playVideo("videos/aroma.mp4");
    }
    if(event.key === "4"){
      estado = 4;
       //var titulo_accion = document.getElementById("titulo_accion");
        //titulo_accion.innerHTML = "Gusto"
        var campo_tip = document.getElementById("tip_label");
        campo_tip.innerHTML = "¿Qué sabores distingues en el vino?";

        playVideo("videos/gusto.mp4");
    }
    if(event.key === "5"){
      estado = 5;
      //var titulo_accion = document.getElementById("titulo_accion");
        //titulo_accion.innerHTML = "Cierre"
        var campo_tip = document.getElementById("tip_label");
        campo_tip.innerHTML = "¡Hasta pronto!";

        playVideo("videos/cierre.mp4");
    }
    if(event.key === "6"){
        
    }
    if(event.key === "7"){
        
    }
    if(event.key === "8"){
        
    }
    if(event.key === "9"){
       
    }
});


//alert("hola");