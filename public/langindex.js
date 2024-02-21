// langindex.js

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
          enviar();
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



// Add keydown event listener to document
document.addEventListener('keydown', function(event) {
    // Check if number 0 key was pressed
    if (event.key === "0" || event.keyCode === 49) {
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
            }
    }
});
    

async function enviar(){
    const userInputField = document.getElementById('user-input-field');
    const responseContainer = document.getElementById('response-field'); // Ensure you have a container with this ID in your HTML
    const userInput = userInputField.value;
    userInputField.value = ""; // Clear the input field after capturing the value

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: userInput })
        });
        const responseData = await response.json();
        console.log(responseData);

        // Update the response container with the chatText
        responseContainer.innerText = responseData.message; // Display the chatText in the response container
    
        // Dispatch a custom event with the chatText
        const chatResponseEvent = new CustomEvent('chatResponse', { detail: responseData.message });
        document.dispatchEvent(chatResponseEvent);

    } catch (error) {
        console.error('Error sending query to the server:', error);
        responseContainer.textContent = 'Error: Could not get a response.'; // Display error message
    }
};


document.getElementById('initiate-button').addEventListener('click', ()=> {
    const responseContainer = document.getElementById('response-field');
    fetch('/iniciar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ }),
    })
    .then(response => response.json())
    .then(data => {
        responseContainer.innerHTML = data.message;
        const chatResponseEvent = new CustomEvent('chatResponse', { detail: data.message });
        document.dispatchEvent(chatResponseEvent);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});




document.getElementById('talk-button').addEventListener('click', () => {
    enviar();
});


/*
function toggleButtonClasses() {
    var button = document.getElementById('voice-typing-button');
    button.classList.toggle('btn-success');
    button.classList.toggle('btn-outline-danger');
}

// Add click event listener to button
document.getElementById('voice-typing-button').addEventListener('click', toggleButtonClasses);

// Add keydown event listener to document
document.addEventListener('keydown', function(event) {
    // Check if the spacebar key was pressed
    if (event.key === " " || event.keyCode === 32) {
        // Prevent the default spacebar action (scrolling the page down)
        event.preventDefault();
        // Toggle the button classes
        toggleButtonClasses();
    }
});

*/
