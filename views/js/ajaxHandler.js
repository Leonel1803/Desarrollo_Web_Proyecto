"use strict"

const URL = 'http://localhost:3000/api'

async function loadProducts(){
    let response = await fetch(URLUser)
    if (response.status != 200) return [];
    return await response.json();
}

function getUserSessionStorage(){
    return sessionStorage.getItem('userData')
}

function setUserSessionStorage(data){
    const verifiedUser = {
        token: data.token,
        userName: data.userName,
    }

    sessionStorage.setItem('userData', JSON.stringify(verifiedUser))
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

async function loadUsers(onSuccess, onError){
    const userData = JSON.parse(getUserSessionStorage());

    console.log(userData);

    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', `${URL}/usuarios`);
    xhr.setRequestHeader('x-auth', userData.token);
    xhr.setRequestHeader('x-role', 'ADMIN');
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.send();
}

async function deleteUser(userUUID, onSuccess, onError){
    const userData = JSON.parse(getUserSessionStorage());

    let xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', `${URL}/usuarios/${userUUID}`);
    xhr.setRequestHeader('x-auth', userData.token);
    xhr.setRequestHeader('x-role', 'ADMIN');
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.send();
}

async function loadCategories(onSuccess, onError){
    const userData = JSON.parse(getUserSessionStorage());

    console.log(userData);

    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', `${URL}/categorias`);
    xhr.setRequestHeader('x-auth', userData.token);
    xhr.setRequestHeader('x-role', 'ADMIN');
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.send();
}

async function deleteCategory(categoryUUID, onSuccess, onError){
    const userData = JSON.parse(getUserSessionStorage());

    let xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', `${URL}/categorias/${categoryUUID}`);
    xhr.setRequestHeader('x-auth', userData.token);
    xhr.setRequestHeader('x-role', 'ADMIN');
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.send();
}

async function loadNotes(onSuccess, onError){
    const userData = JSON.parse(getUserSessionStorage());

    console.log(userData);

    let xhr = new XMLHttpRequest();
    
    xhr.open('GET', `${URL}/notas`);
    xhr.setRequestHeader('x-auth', userData.token);
    xhr.setRequestHeader('x-role', 'ADMIN');
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.send();
}

async function deleteNote(noteUUID, onSuccess, onError){
    const userData = JSON.parse(getUserSessionStorage());

    let xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', `${URL}/notas/${noteUUID}`);
    xhr.setRequestHeader('x-auth', userData.token);
    xhr.setRequestHeader('x-role', 'ADMIN');
    xhr.onload = () => getXhrResponse(xhr, onSuccess, onError);
    xhr.send();
}

function getXhrResponse(xhr, onSuccess, onError) {
    if (xhr.status >= 200 && xhr.status < 300) {
        onSuccess(JSON.parse(xhr.response));
    } else {
        onError(xhr.status + ': ' + xhr.statusText);
    }
}