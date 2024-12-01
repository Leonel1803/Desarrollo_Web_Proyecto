// views/js/notes.js
const newNoteTitle = document.getElementById('new-note-input');
const newNoteDescription = document.getElementById('note-description-input');
const newNotePortrait = document.getElementById('preview');

let actualCategoryEdit = '';

const createNoteInput = (input, type, id, classes) => {
    input.type = type;
    input.id = id;
    input.className = classes;

    return input;
}

const newNoteButton = (notesDiv) => {
    notesDiv.innerHTML = `
        <div onclick="getActualCategory(event)" data-bs-toggle="modal" data-bs-target="#new-note" class="card turn-green me-3" style="width: 18rem;">
            <img src="./assets/nueva-nota.png" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">Nueva Nota</h5>
                <p class="card-text">
                    ¡Crea una nueva nota con el 
                    contenido que tu quieras!
                </p>
            </div>
        </div>
    `
}

const createCategory = () => {
    const noteNameInput = document.createElement('input'); //Creamos el input
    createNoteInput(noteNameInput, 'text', 'newNote', 'input-down_line') //Configutramos el input

    const categories = document.getElementById('categories'); 
    categories.appendChild(noteNameInput); //Lo adjuntamos al div de categories

    noteNameInput.focus(); //Activamos el input automáticamente para que el susuario empiece a escribir

    noteNameInput.addEventListener('blur', () => { //Si se hace click fuera del input, este se borra
        categories.removeChild(noteNameInput);
        return;
    });

    noteNameInput.addEventListener('keydown', function(event) { // Escuchamos el evento keydown
        if (event.key === 'Enter') { // Verificamos si la tecla presionada es 'Enter'
            // Crear el nuevo div con el h5
            const newCategory = document.createElement('div');
            newCategory.id = noteNameInput.value.replace(/ /g, "-");
            newCategory.style = 'height: 480px';

            const h5 = document.createElement('h5');
            h5.innerText = noteNameInput.value; // Asignar el valor del input al h5

            const notesDiv = document.createElement('div');
            notesDiv.className = 'd-flex'
            notesDiv.id = ('notes-' + noteNameInput.value).replace(/ /g, "-");

            newCategory.appendChild(h5);
            newCategory.appendChild(notesDiv);
            categories.appendChild(newCategory); // Agregamos el nuevo div a categories

            newNoteButton(notesDiv);

            categories.removeChild(noteNameInput); // Removemos el input
            return;
        }
    });
};

const getActualCategory = (event) => {
    actualCategoryEdit = event.currentTarget.parentElement.id;
}

const noteToHTML = (note) => {
    return `
        <div id="note-${note.title}" class="card turn-green me-3" style="width: 18rem;" onclick="redirectNotebook(event)">
            <img src=${note.imageURL} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${note.title}</h5>
                <p class="card-text">
                    ${note.description}
                </p>
            </div>
        </div>
    `
}

const createNote = () => {
    const portrait = document.getElementById('notePortrait');

    const newNote = {
        title: newNoteTitle.value,
        description: newNoteDescription.value,
        imageURL: portrait.src
    }

    const newNoteElement = document.createElement('div');
    newNoteElement.innerHTML = noteToHTML(newNote).trim();

    const actualCategory = document.getElementById(actualCategoryEdit);
    const firstChild = actualCategory.children[1];

    actualCategory.insertBefore(newNoteElement.firstChild, firstChild);

    deleteActualInfo();
}

const deleteActualInfo = () => {
    newNoteTitle.value = '';
    newNoteDescription.value = '';
    newNotePortrait.innerHTML = '';
}

const redirectNotebook = (event) => {
    window.location.href = `/notebook/${event.currentTarget.id}`
}

const renderNotes = (notes) => {
    const categoriesDiv = document.getElementById('categories');
    categoriesDiv.innerHTML = ''; // Limpiar contenido previo

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'card turn-green me-3';
        noteElement.style.width = '18rem';
        noteElement.innerHTML = `
            <img src="${note.portraitNoteImage || './assets/default-note.png'}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${note.noteName}</h5>
                <p class="card-text">${note.noteContent}</p>
            </div>
        `;
        categoriesDiv.appendChild(noteElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadNotes(
        (res) => {
            renderNotes(res.data);
        },
        (err) => {
            console.error('Error al cargar las notas:', err);
        }
    );
});