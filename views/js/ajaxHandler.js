// views/js/ajaxHandler.js
"use strict"

const URL = 'http://localhost:3000/api'

function redirectNotes(){
    fetch('/notes', {
        method: 'GET',
        headers: {
            'x-auth': sessionStorage.getItem('token'),
            'x-role': sessionStorage.getItem('role')
        }
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/notes';
        } else {
            console.error('Failed to redirect to notes:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error during fetch:', error);
    });
}

async function loadProducts(){
    let response = await fetch(URLUser)
    if (response.status != 200) return [];
    return await response.json();
}

async function registerUser(user, onSuccess, onError){
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${URL}/usuarios`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

async function loginRequest(user, onSuccess, onError){
    let xhr = new XMLHttpRequest();
    
    xhr.open('POST', `${URL}/usuarios/login`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(user));
    xhr.onload = () => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('role', response.role);
            onSuccess(response);
        } else {
            onError(xhr.responseText);
        }
    };
}

// Al iniciar sesión, llama a redirectNotes
loginRequest(user, (response) => {
    redirectNotes();
}, (error) => {
    console.error('Login failed:', error);
});

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.response));
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}