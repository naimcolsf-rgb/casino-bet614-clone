// ==========================================================
// NOTA: Asegúrate de que 'auth' y 'db' estén definidas en tu index.html
// Ejemplo: const auth = firebase.auth(); y const db = firebase.firestore();
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
    // --- 1. LÓGICA DE INTERFAZ DE USUARIO (TABS) ---
    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    function switchTab(activeTab, activeForm, inactiveTab, inactiveForm) {
        // Manejar las clases de los botones (pestañas)
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');
        // Manejar las clases de los formularios (mostrar/ocultar)
        activeForm.classList.add('active');
        inactiveForm.classList.remove('active');
    }

    registerTab.addEventListener('click', function() {
        switchTab(registerTab, registerForm, loginTab, loginForm);
    });

    loginTab.addEventListener('click', function() {
        switchTab(loginTab, loginForm, registerTab, registerForm);
    });

    // --- 2. LÓGICA DE REGISTRO (FIREBASE AUTH + FIRESTORE) ---
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const dni = document.getElementById('reg-dni').value;

        if (password.length < 6) {
            alert("⚠️ La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                guardarDatosAdicionales(user.uid, username, dni, email); 
                alert("✅ ¡Registro exitoso! ¡Bienvenido!");
                registerForm.reset(); 
                switchTab(loginTab, loginForm, registerTab, registerForm); // Cambiar a la pestaña de login
            })
            .catch((error) => {
                let mensajeError = "❌ Error al registrarte: ";
                if (error.code === 'auth/email-already-in-use') {
                    mensajeError = "❌ El correo ya está registrado.";
                }
                alert(mensajeError);
            });
    });

    // --- 3. LÓGICA DE LOGIN (FIREBASE AUTH) ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passwordLogin').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // LOGIN EXITOSO
                alert("🎉 ¡Bienvenido de vuelta!");
                // Redirigir al usuario (o mostrarle el lobby/juegos)
                window.location.href = "/juegos.html"; // ASUMIMOS que tienes una página de juegos
            })
            .catch((error) => {
                let mensajeError = "❌ Error al iniciar sesión. ";
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                    mensajeError = "❌ Usuario o contraseña incorrectos.";
                } 
                alert(mensajeError);
            });
    });
});

// --- FUNCIÓN DE FIRESTORE (Saldo Inicial) ---
function guardarDatosAdicionales(userId, username, dni, email) {
    // La variable db debe estar definida globalmente
    db.collection("usuarios").doc(userId).set({
        username: username,
        dni: dni,
        email: email,
        saldo: 15000, 
        fechaRegistro: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Datos iniciales y saldo guardados.");
    })
    .catch((error) => {
        console.error("Error al guardar datos iniciales: ", error);
        alert("⚠️ Error al asignar saldo. Contacta soporte.");
    });
}