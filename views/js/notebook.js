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

/*
const saveNote = () => {
    const noteContent = document.getElementById("editor").innerHTML;
    
    // Aquí debes hacer una llamada a tu backend para guardar `noteContent` en la base de datos
    console.log("Contenido guardado:", noteContent);
    alert("Nota guardada con éxito");
}

const toggleButtonColor = (event) => {
    const button = event.currentTarget;

    button.classList.toggle("button-control_deactivated");
    button.classList.toggle("button-control_activated");
}*/
const saveNote = () => {
    const noteContent = document.getElementById("editor").innerHTML;
    const noteTitle = document.getElementById("note-title").value;

    console.log("Contenido guardado:", noteContent);

    fetch('http://localhost:3000/api/saveNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth': sessionStorage.getItem('token'),
            'x-role': sessionStorage.getItem('role')
        },
        body: JSON.stringify({ title: noteTitle, content: noteContent })
    })
    .then(response => response.json())
    /*
    .then(data => {
        if (data.success) {
            console.log("Archivo guardado en ../uploads");
            alert("Nota guardada con éxito");
        } else {
            console.error('Error al guardar la nota:', data.message);
        }
    })*/
    .catch(error => {
        console.error('Error al guardar la nota:', error);
    });
}
fontSizeInput.value = 3;
document.execCommand("fontSize", false, 3);