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

    let userName, password;

    if(!admin){
        userName = document.getElementById('sign-in_userName').value;
        password = document.getElementById('sign-in_password').value;
    }
    else{
        userName = document.getElementById('sign-in_userName_admin').value;
        password = document.getElementById('sign-in_password_admin').value; 
    }

    const user = {
        userName: userName,
        password: password,
        role: admin ? 'ADMIN' : 'USER'
    }

    loginRequest(
        user, 
        (res) => {
            setUserSessionStorage(res);
            closeModal();
            console.log(res);
            console.log(getUserSessionStorage());
            admin ? window.location.href = '/admin' : window.location.href = '/notes';
        },
        (err) => {
            showErrorModal(err); 
        }
    );
}