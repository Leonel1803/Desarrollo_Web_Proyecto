// views/js/image_util.js
//Subida de portada
const dropArea = document.getElementById('dropArea');
const preview = document.getElementById('preview');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => e.preventDefault());
    dropArea.addEventListener(eventName, e => e.stopPropagation());
});

// Cambiar el estilo cuando se arrastra sobre el área
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove('dragover');
    });
});

// Manejar el evento de soltar
dropArea.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length) {
        const file = files[0];

        // Verifica si el archivo es una imagen
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function(event) {
                const img = document.createElement('img');
                img.id = 'notePortrait'
                img.src = event.target.result;
                preview.innerHTML = '';
                preview.appendChild(img);
            };
        } else {
            alert("Por favor, suelta solo imágenes.");
        }
    }
});