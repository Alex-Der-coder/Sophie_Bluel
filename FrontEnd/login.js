// Écoutez l'événement de soumission du formulaire d'authentification
const loginForm = document.getElementById('loginForm');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Effacez les messages d'erreur précédents
    emailError.textContent = '';
    passwordError.textContent = '';

    // Obtenez la valeur de l'email à partir du champ de saisie
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    // Obtenez la valeur du mot de passe (vous pouvez ajouter un champ de saisie pour le mot de passe de la même manière)
    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    // Envoyez la requête d'authentification
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json(); // Authentification réussie
        } else if (response.status === 401) {
            emailError.textContent = 'Utilisateur incorrect';
            passwordError.textContent = 'Mot de passe invalide';
            throw new Error('Erreur 401 : Invalid user or password Forbidden acces');
        } else {
            throw new Error('Erreur inattendue : ' + response.status);
        }
    })
    .then(data => {
        const token = data.token; // Obtenez le jeton d'authentification
        console.log('Authentification réussie !', token);

        // Redirigez l'utilisateur vers index.html avec le token dans l'URL
        const redirectUrl = `index.html?token=${token}`;
        localStorage.setItem('token', token);
        window.location.href = redirectUrl; // Redirection (décommentez si nécessaire)
    })
    .catch(error => {
        console.error(error.message);
    });
});