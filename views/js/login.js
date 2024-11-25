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
            sessionStorage.setItem('userData', res);
            closeModal();
            console.log(res);
            console.log(sessionStorage.getItem('userData'));
            window.location.href = '/notes';
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}