document.addEventListener('DOMContentLoaded', function() {
    const loginTab = document.getElementById('tab-login');
    const registerTab = document.getElementById('tab-register');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Función para cambiar de pestaña
    function switchTab(activeTab, activeForm, inactiveTab, inactiveForm) {
        // 1. Manejar las clases de los botones (pestañas)
        activeTab.classList.add('active');
        inactiveTab.classList.remove('active');

        // 2. Manejar las clases de los formularios (mostrar/ocultar)
        activeForm.classList.add('active');
        inactiveForm.classList.remove('active');
    }

    // Evento al hacer clic en la pestaña de Registro
    registerTab.addEventListener('click', function() {
        switchTab(registerTab, registerForm, loginTab, loginForm);
    });

    // Evento al hacer clic en la pestaña de Login
    loginTab.addEventListener('click', function() {
        switchTab(loginTab, loginForm, registerTab, registerForm);
    });
});