const createNoteInput = (input, type, id, classes) => {
    input.type = type;
    input.id = id;
    input.className = classes;

    return input;
}

const createCategory = () => {
    const noteNameInput = document.createElement('input'); //Creamos el input
    createNoteInput(noteNameInput, 'text', 'newNote', 'input-down_line') //Configutramos el input

    const categories = document.getElementById('categories'); 
    categories.appendChild(noteNameInput); //Lo adjuntamos al div de categories

    noteNameInput.focus(); //Activamos el input automáticamente para que el susuario empiece a escribir

    noteNameInput.addEventListener('blur', () => { //Si se hace click fuera dle input, este se borra
        categories.removeChild(noteNameInput);
        return;
    });

    noteNameInput.addEventListener('keydown', function(event) { // Escuchamos el evento keydown
        if (event.key === 'Enter') { // Verificamos si la tecla presionada es 'Enter'
            // Crear el nuevo div con el h5
            const newCategory = document.createElement('div');
            newCategory.id = noteNameInput.value;

            const h5 = document.createElement('h5');
            h5.innerText = noteNameInput.value; // Asignar el valor del input al h5

            const notesDiv = document.createElement('div');
            notesDiv.id = 'notes' + noteNameInput.value;

            newCategory.appendChild(h5);
            newCategory.appendChild(notesDiv);
            categories.appendChild(newCategory); // Agregamos el nuevo div a categories

            categories.removeChild(noteNameInput); // Removemos el input
            return;
        }
    });
};