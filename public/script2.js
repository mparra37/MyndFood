/*
* Pasos
* 1.- Introducción
* 2.- Colores 
*    2.1.- respuesta no esperada
     2.2.- respuesta esperada pero corta
     2.3.- respuesta del color del vino
  3.- Aromas
     3.1.- primeros aromas
     3.2.- liberar aromas
     3.3.- respuesta de los aromas
  4.- Sabor
     4.1.- primeros sabores
     4.2.- segundo sorbo
     4.3.- respuesta del sabor
  5.- Maridaje
     5.1.- No le gustó
     5.2.- Si le gustó
  6.- Cierre

  Extra: 
  7.- No tengo respuesta
*/

var estado = 0;

var talkVideo = document.getElementById("talk-video");
var btn_iniciar = document.getElementById("btn_inicar");

btn_iniciar.addEventListener('click', function() {

  playIdleVideo();
  //estado = 1;
    //playVideo("videos/intro.mp4");
});


function playVideo(video_src) {
  
  //if(video_src === null){
    //video_src = 'videos/intro.mp4'
  //}
  talkVideo.srcObject = null; // Use null when resetting srcObject
  talkVideo.src = video_src; // Adjusted path
  //talkVideo.loop = true;
  talkVideo.load(); // Load the new video source
  talkVideo.loop = false;
  
  talkVideo.onended = null;
  // Add an event listener for when the video ends
  talkVideo.onended = function() {
      playIdleVideo(); // This function should play the idle video
  };

  talkVideo.play();
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
          document.getElementById('voice-typing-button').classList.add('btn-outline-danger'); 
          document.getElementById('user-input-field').value = ""// Change to your default button color
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




function reproducir_pasos(){

  if(estado==1){
    playVideo("videos/intro.mp4");
  }
  if(estado == 2){
        playVideo("videos/color.mp4");
    }
    if(estado == 3){
      playVideo("videos/aroma.mp4");
    }
    if(estado== 4){
      playVideo("videos/gusto.mp4");
    }
    if(estado==5){
      playVideo("videos/maridaje.mp4");
    }
    if(estado==6){
      playVideo("videos/cierre.mp4");
    }
}


document.addEventListener('keydown', function(event) {
    // Check if number 0 key was pressed
    if (event.key === " ArrowDown" || event.keyCode===40) {
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
              //respuesta_usuario();
            }
    }

    if (event.key === "ArrowRight" || event.keyCode === 39) {
        estado++;
        reproducir_pasos();
        
        // Your specific action goes here
        //console.log('Right arrow key pressed');
        // For example, if you're handling a carousel, you might call its 'next' function here
    }

    if (event.key === "ArrowLeft" || event.keyCode === 37) {
        estado--;
        reproducir_pasos();
        
        // Your specific action goes here
        //console.log('Right arrow key pressed');
        // For example, if you're handling a carousel, you might call its 'next' function here
    }


    if(event.key === "1"){
        if(estado==2){
          playVideo("videos/color_primero.mp4");
        }    
        if(estado==3){
          playVideo("videos/aroma_primero.mp4");
        }
        if(estado==4){
          playVideo("videos/gusto_primero.mp4");
        }
      
      if(estado==5){
          playVideo("videos/maridaje_primero.mp4");
        }
    }

    if(event.key === "2"){
        if(estado==2){
          playVideo("videos/color_segundo.mp4");
        }  
        if(estado==3){
          playVideo("videos/aroma_segundo.mp4");
        }  
        if(estado==4){
          playVideo("videos/gusto_segundo.mp4");
        }
        if(estado==5){
          playVideo("videos/maridaje_segundo.mp4");
        }
    }

    if(event.key === "3"){
        if(estado==2){
          playVideo("videos/color_tercero.mp4");
        }    
        if(estado==3){
          playVideo("videos/aroma_tercero.mp4");
        }
        if(estado==4){
          playVideo("videos/gusto_tercero.mp4");
        }
    }

    if(event.key === "4"){
        
          playVideo("videos/lo_siento.mp4");
            
    }

    if(event.key === "5"){
        
          playVideo("videos/repetir.mp4");
          
    }

   /*
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

    */
});

function playIdleVideo() {
  talkVideo.srcObject = undefined;
  talkVideo.src = 'videos/idle_mago.mp4';
  //talkVideo.src = 'latino_idle.mp4';
  talkVideo.loop = true;
}


//alert("hola");