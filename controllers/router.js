// controllers/router.js
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
    const noteName = req.params.uuid;
    const filePath = path.join(__dirname, '..', 'uploads', `${noteName}.txt`);

    fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.writeFile(filePath, '', (writeErr) => {
                    if (writeErr) {
                        console.error('Error al crear el archivo:', writeErr);
                        return res.status(500).send('Error interno del servidor al crear la nota');
                    }

                    res.send(`
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
                            <link rel="stylesheet" href="../css/style.css">
                            <title>NotasAPP | Notebook</title>
                        </head>
                        <body>
                            <div style="height: 100vh; width: 100vw; background-color: #c5f796;">
                                <button class="btn btn btn-outline-success turn-green rounded-4 m-2"><i class="bi bi-house-door-fill"></i></button>
                                <div style="height: 90%; width: 100%;" class="d-flex justify-content-center align-items-center">
                                    <div class="m-2" style="width: 90%; height: 90.5%; background-color: #ffffff;">
                                        <div class="m-3" style="height: 100%;">
                                            <div class="d-flex justify-content-between" style="max-width: 30%;">
                                                <!-- Barra de herramientas -->
                                                <button class="button-control_deactivated" onclick="execCmd('bold', event)"><i class="bi bi-type-bold"></i></button>
                                                <button class="button-control_deactivated" onclick="execCmd('italic', event)"><i class="bi bi-type-italic"></i></button>
                                                <button class="button-control_deactivated" onclick="execCmd('underline', event)"><i class="bi bi-type-underline"></i></button>
                                                <span class="d-flex justify-content-center align-items-center mx-3">
                                                    <span class="turn-green rounded-circle me-1" onclick="changeFontSizeButton(-1)"><i class="bi bi-dash-circle-dotted"></i></span>
                                                    <input type="number" id="inputFontSize" class="form-control form-control-sm" aria-describedby="inputFontSize">
                                                    <span class="turn-green rounded-circle ms-1" onclick="changeFontSizeButton(1)"><i class="bi bi-plus-circle-dotted"></i></span>
                                                </span>
                                                <input class="turn-green" type="color" id="colorPicker">
                                                <!-- <button class="button-control_deactivated turn-green" onclick="changeFontColor()">Color de fuente</button> -->
                                            </div>
                                    
                                            <!-- Área editable -->
                                            <div id="editor" contenteditable="true" class="border border-1 p-2 my-2">
                                                
                                            </div>
                                    
                                            <!-- Botón para guardar -->
                                            <div class="d-flex justify-content-end">
                                                <button class="btn btn-success main-color-background" onclick="saveNote()">Guardar Nota</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <script src="/js/ajaxHandler.js"></script>
                            <script src="/js/sweetAlertHandler.js"></script>
                            <script src="/js/notebook.js"></script>
                        </body>
                        </html>
                    `);
                });
            } else {
                console.error('Error al leer el archivo:', err);
                return res.status(500).send('Error interno del servidor al leer la nota');
            }
        } else {
            // Enviar el contenido del archivo al cliente
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
                    <link rel="stylesheet" href="../css/style.css">
                    <title>NotasAPP | Notebook</title>
                </head>
                <body>
                    <div style="height: 100vh; width: 100vw; background-color: #c5f796;">
                        <button class="btn btn btn-outline-success turn-green rounded-4 m-2"><i class="bi bi-house-door-fill"></i></button>
                        <div style="height: 90%; width: 100%;" class="d-flex justify-content-center align-items-center">
                            <div class="m-2" style="width: 90%; height: 90.5%; background-color: #ffffff;">
                                <div class="m-3" style="height: 100%;">
                                    <div class="d-flex justify-content-between" style="max-width: 30%;">
                                        <!-- Barra de herramientas -->
                                        <button class="button-control_deactivated" onclick="execCmd('bold', event)"><i class="bi bi-type-bold"></i></button>
                                        <button class="button-control_deactivated" onclick="execCmd('italic', event)"><i class="bi bi-type-italic"></i></button>
                                        <button class="button-control_deactivated" onclick="execCmd('underline', event)"><i class="bi bi-type-underline"></i></button>
                                        <span class="d-flex justify-content-center align-items-center mx-3">
                                            <span class="turn-green rounded-circle me-1" onclick="changeFontSizeButton(-1)"><i class="bi bi-dash-circle-dotted"></i></span>
                                            <input type="number" id="inputFontSize" class="form-control form-control-sm" aria-describedby="inputFontSize">
                                            <span class="turn-green rounded-circle ms-1" onclick="changeFontSizeButton(1)"><i class="bi bi-plus-circle-dotted"></i></span>
                                        </span>
                                        <input class="turn-green" type="color" id="colorPicker">
                                        <!-- <button class="button-control_deactivated turn-green" onclick="changeFontColor()">Color de fuente</button> -->
                                    </div>
                            
                                    <!-- Área editable -->
                                    <div id="editor" contenteditable="true" class="border border-1 p-2 my-2">
                                        ${content}
                                    </div>
                            
                                    <!-- Botón para guardar -->
                                    <div class="d-flex justify-content-end">
                                        <button class="btn btn-success main-color-background" onclick="saveNote()">Guardar Nota</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <script src="/js/ajaxHandler.js"></script>
                    <script src="/js/sweetAlertHandler.js"></script>
                    <script src="/js/notebook.js"></script>
                </body>
                </html>
            `);
        }
    });
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
