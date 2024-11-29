const searchInput = document.getElementById('searchInput');
const infoTables = document.getElementById('infoTables');

let actualCriteria;

const usersToHTML = (user) => {
    return `
        <tr>
            <th>${user.uuidUser}</th>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.date}</td>
            <td>
                <button type="button" class="btn btn-outline-danger w-50" onclick="deleteUserRequest('${user.uuidUser}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `
}

const deleteUserRequest = (uuidUser) => {
    showLoadingModal();

    deleteUser(
        uuidUser,
        (res) => {
            requestLoadUsers();
            showSuccessModal(res.message);
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const requestLoadUsers = () => {
    showLoadingModal();

    infoTables.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Nombre de Usuario</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id='usersTable'>
            </tbody>
        </table>
    `

    loadUsers(
        (res) => {
            users = [...res.data];
            const usersTable = document.getElementById('usersTable');
            usersTable.innerHTML = users.map(usersToHTML).join("\n");
            closeModal();
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const categoriesToHTML = (category) => {
    return `
        <tr>
            <th>${category.uuidCategory}</th>
            <td>${category.categoryName}</td>
            <td>${category.uuidUserPropietary}</td>
            <td>${category.date}</td>
            <td>
                <button type="button" class="btn btn-outline-danger w-50" onclick="deleteCategoryRequest('${category.uuidCategory}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `
}

const deleteCategoryRequest = (uuidCategory) => {
    showLoadingModal();

    deleteCategory(
        uuidCategory,
        (res) => {
            requestLoadCategories();
            showSuccessModal(res.message);
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const requestLoadCategories = () => {
    showLoadingModal();

    infoTables.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Nombre de Categoría</th>
                    <th scope="col">UUID del Propietario</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id='categoriesTable'>
            </tbody>
        </table>
    `

    loadCategories(
        (res) => {
            categories = [...res.data];
            const categoriesTable = document.getElementById('categoriesTable');
            categoriesTable.innerHTML = categories.map(categoriesToHTML).join("\n");
            closeModal();
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const notesToHTML = (note) => {
    return `
        <tr>
            <th>${note.uuidNote}</th>
            <td>${note.noteName}</td>
            <td>${note.uuidCategoryPropietary}</td>
            <td>${note.date}</td>
            <td>
                <button type="button" class="btn btn-outline-danger w-50" onclick="deleteNoteRequest('${note.uuidNote}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        </tr>
    `
}

const deleteNoteRequest = (uuidNote) => {
    showLoadingModal();

    deleteNote(
        uuidNote,
        (res) => {
            requestLoadNotes();
            showSuccessModal(res.message);
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const requestLoadNotes = () => {
    showLoadingModal();

    infoTables.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Nombre de la Nota</th>
                    <th scope="col">UUID del la Categoría Perteneciente</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id='notesTable'>
            </tbody>
        </table>
    `

    loadNotes(
        (res) => {
            notes = [...res.data];
            const notesTable = document.getElementById('notesTable');
            notesTable.innerHTML = notes.map(notesToHTML).join("\n");
            closeModal();
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const searchInfo = () => {
    switch(actualCriteria){
        case 1:
            requestLoadUsersByName(searchInput.value);
            break;
        case 2:
            requestLoadCategoryByName(searchInput.value);
            break;
        case 3:
            requestLoadNotesByName(searchInput.value);
            break;
    }
}

const requestLoadUsersByName = (searchWord) => {
    showLoadingModal();

    infoTables.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Nombre de Usuario</th>
                    <th scope="col">E-Mail</th>
                    <th scope="col">Rol</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id='usersTable'>
            </tbody>
        </table>
    `

    loadUsersByName(
        searchWord,
        (res) => {
            users = [...res.data];
            const usersTable = document.getElementById('usersTable');
            usersTable.innerHTML = users.map(usersToHTML).join("\n");
            closeModal();
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const requestLoadCategoryByName = (searchWord) => {
    showLoadingModal();

    infoTables.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Nombre de Categoría</th>
                    <th scope="col">UUID del Propietario</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id='categoriesTable'>
            </tbody>
        </table>
    `

    loadCategoriesByName(
        searchWord,
        (res) => {
            categories = [...res.data];
            const categoriesTable = document.getElementById('categoriesTable');
            categoriesTable.innerHTML = categories.map(categoriesToHTML).join("\n");
            closeModal();
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const requestLoadNotesByName = (searchWord) => {
    showLoadingModal();

    infoTables.innerHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">UUID</th>
                    <th scope="col">Nombre de la Nota</th>
                    <th scope="col">UUID del la Categoría Perteneciente</th>
                    <th scope="col">Fecha de Creación</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody id='notesTable'>
            </tbody>
        </table>
    `

    loadNotesByName(
        searchWord,
        (res) => {
            notes = [...res.data];
            const notesTable = document.getElementById('notesTable');
            notesTable.innerHTML = notes.map(notesToHTML).join("\n");
            closeModal();
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const showInfo = (criteria) => {
    switch(criteria){
        case 1:
            searchInput.placeholder = searchCriteria.userName[1];
            actualCriteria = searchCriteria.userName[0];
            requestLoadUsers();
            break;
        case 2:
            searchInput.placeholder = searchCriteria.category[1];
            actualCriteria = searchCriteria.category[0];
            requestLoadCategories();
            break;
        case 3:
            searchInput.placeholder = searchCriteria.note[1];
            actualCriteria = searchCriteria.note[0];
            requestLoadNotes();
            break;
    }
}

const searchCriteria = {
    userName: [1, 'Buscar por nombre de usuario'],
    category: [2, 'Buscar por nombre de categoría'],
    note: [3, 'Buscar por nombre de nota']
};

const redirectNotes = () => {
    window.location.href = "/notes";
}

showInfo(searchCriteria.userName[0]);