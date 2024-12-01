// views/js/notebook.js
const fontSizeInput = document.getElementById('inputFontSize');
const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', (event) => {
  const selectedColor = event.target.value;
  changeFontColor(selectedColor);
});

const execCmd = (command, event) => {
    document.execCommand(command, false, null);
    toggleButtonColor(event);
}

const changeFontSizeButton = (sizePlus) => {
    const actualSize = parseInt(fontSizeInput.value);
    const size = actualSize + sizePlus;

    fontSizeInput.value = size;

    // Nota: NO VA A PIXELES
    document.execCommand("fontSize", false, size);
}

const changeFontColor = (color) => {
    document.execCommand("foreColor", false, color);
}

const saveNote = () => {
    const noteContent = document.getElementById("editor").innerHTML;
    const noteTitle = window.location.pathname.split('/').pop(); // Obtener el nombre de la nota desde la URL

    // Obtener el token de sessionStorage
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const token = userData ? userData.token : null;
    const userName = userData ? userData.userName : 'desconocido';

    if (!token) {
        alert("Usuario no autenticado. Por favor, inicia sesión.");
        return;
    }

    fetch('/api/saveNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en los encabezados
        },
        body: JSON.stringify({ title: noteTitle, content: noteContent })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`Nota guardada con éxito para el usuario "${userName}"`);
        } else {
            alert("Error al guardar la nota: " + data.message);
        }
    })
    .catch(error => {
        console.error('Error al guardar la nota:', error);
        alert("Error al guardar la nota");
    });
}

const toggleButtonColor = (event) => {
    const button = event.currentTarget;
    button.classList.toggle("button-control_deactivated");
    button.classList.toggle("button-control_activated");
}

fontSizeInput.value = 3;
document.execCommand("fontSize", false, 3);