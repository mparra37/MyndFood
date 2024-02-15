

function enviar(){
    const userInput = document.getElementById('userInput').value;
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput').value;
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('btn_iniciar').addEventListener('click', ()=> {
    fetch('/iniciar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = data.message;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});