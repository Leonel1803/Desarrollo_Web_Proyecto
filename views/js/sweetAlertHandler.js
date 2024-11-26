// views/js/sweetAlertHandler.js
"use strict"

const closeModal = () => {
    Swal.close();
}

const showLoadingModal = () => {
    Swal.fire({
        title: 'Cargando...',
        html: 'Por favor espera un momento.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

const showSuccessModal = (msg) => {
    Swal.fire({
        icon: "success",
        title: "Excelente",
        text: msg,
    });
}

const showErrorModal = (err) => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err,
    });
}