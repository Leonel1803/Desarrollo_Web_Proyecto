"use strict"

const express = require('express');
const router = express.Router();
const path = require('path'); 
const userRouter = require('./user');
const categoryRouter = require('./category');
const noteRouter = require('./note');
const utils = require('./utils');
const fs = require('fs');
const saveNote = require('./saveNote');

// const productRouter = require('../routes/products');
// const adminRouter = require('../routes/admin_products')

//Asigna rutas base a cada route
// router.use('/products', productRouter);
// router.use('/admin/products', validateAdmin, adminRouter); //Tiene validador

router.post('/api/saveNote', saveNote);

router.use('/api/usuarios', userRouter);
router.use('/api/categorias', utils.verifyToken, categoryRouter);
router.use('/api/notas', utils.verifyToken, noteRouter);

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'notes.html'));
});

router.get('/notebook/:uuid', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'notebook.html'));
});

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'));
});

router.post('/api/updateNote', (req, res) => {
    const { fileName, newContent } = req.body;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    fs.writeFile(filePath, newContent, 'utf8', (err) => {
        if (err) {
            console.error('Error al actualizar el archivo:', err);
            return res.status(500).send('Error interno del servidor al actualizar la nota');
        }
        res.status(200).send('Nota actualizada exitosamente');
    });
});

router.get('/profile', (req, res) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta uploads:', err);
            return res.status(500).send('Error interno del servidor');
        }

        const notesPromises = files.map(file => {
            const filePath = path.join(uploadsDir, file);
            return new Promise((resolve, reject) => {
                fs.readFile(filePath, 'utf8', (err, content) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ name: file, content });
                });
            });
        });

        Promise.all(notesPromises)
            .then(notes => {
                res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
                        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                        <title>NotasAPP | Editar Perfil</title>
                    </head>
                    <body>
                        <div class="container mt-4">
                            <h1>Editar Mis Notas</h1>
                            <hr class="my-4">
                            <div class="list-group">
                                ${notes.map(note => `
                                    <div class="list-group-item mb-3">
                                        <h5>${note.name}</h5>
                                        <textarea id="note-${note.name}" class="form-control mb-2">${note.content}</textarea>
                                        <button class="btn btn-primary" onclick="updateNote('${note.name}')">Guardar Cambios</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <script>
                            function updateNote(fileName) {
                                const newContent = document.getElementById(\`note-\${fileName}\`).value;

                                fetch('/api/updateNote', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ fileName, newContent })
                                })
                                .then(response => {
                                    if (response.ok) {
                                        Swal.fire('¡Éxito!', 'La nota ha sido actualizada.', 'success');
                                    } else {
                                        Swal.fire('Error', 'No se pudo actualizar la nota.', 'error');
                                    }
                                })
                                .catch(error => {
                                    console.error('Error al actualizar la nota:', error);
                                    Swal.fire('Error', 'Ocurrió un problema.', 'error');
                                });
                            }
                        </script>
                    </body>
                    </html>
                `);
            })
            .catch(error => {
                console.error('Error al leer el contenido de los archivos:', error);
                res.status(500).send('Error interno del servidor al leer las notas');
            });
    });
});

module.exports = router;

//Middleware para que funcione