// views/js/login.js
const newUser = () => {
    showLoadingModal();

    const mail = document.getElementById('sign-up_mail').value;
    const userName = document.getElementById('sign-up_userName').value;
    const password = document.getElementById('sign-up_password').value;

    const user = {
        email: mail,
        userName: userName,
        password: password,
        role: 'USER'
    }

    registerUser(
        user, 
        (res) => {
            console.log(res);
            showSuccessModal(res.message)
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}

const login = (admin) => {
    showLoadingModal();

    const userName = document.getElementById('sign-in_userName').value;
    const password = document.getElementById('sign-in_password').value;

    const user = {
        userName: userName,
        password: password,
        role: admin ? 'ADMIN' : 'USER'
    }

    loginRequest(
        user, 
        (res) => {
            console.log(res);
            sessionStorage.setItem('userData', res);
            closeModal();
            redirectNotes(res);
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}