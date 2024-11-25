"use strict"

const URL = 'http://localhost:3000/api'

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
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.response));
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}