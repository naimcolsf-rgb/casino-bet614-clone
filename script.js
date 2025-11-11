// SIMULACIÓN DE SALDO EN LOCALSTORAGE
const balanceDisplay = document.getElementById('monedero-valor');
const depositBtn = document.querySelector('.deposit-btn');
const tabButtons = document.querySelectorAll('.tab-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const gameCards = document.querySelectorAll('.game-card');
const searchInput = document.querySelector('.search-input'); 

// Constantes de Sidebar (para responsividad)
const sidebar = document.querySelector('.sidebar');
const sidebarToggleBtn = document.getElementById('sidebar-toggle');


// Cargar saldo guardado o usar el valor inicial
let userBalance = parseFloat(localStorage.getItem('stakeCloneBalance')) || 191.81;

/**
 * Actualiza la visualización del saldo en la interfaz y LocalStorage.
 */
function updateBalanceDisplay() {
    balanceDisplay.textContent = `ARS ${userBalance.toFixed(2)}`;
    localStorage.setItem('stakeCloneBalance', userBalance.toFixed(2));
}

/**
 * Simula una transacción (depósito/retiro) con prompts.
 */
function simulateTransaction(amount) {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount === 0) {
        alert("Cantidad no válida.");
        return;
    }
    if (userBalance + numericAmount < 0) {
        alert("Saldo insuficiente para esta operación.");
        return;
    }
    userBalance += numericAmount;
    updateBalanceDisplay();
    alert(`Transacción exitosa: ${numericAmount > 0 ? 'Depósito' : 'Retiro'} de ARS ${Math.abs(numericAmount).toFixed(2)}. Saldo actual: ARS ${userBalance.toFixed(2)}`);
}

depositBtn.addEventListener('click', () => {
    const transactionType = confirm("Presione Aceptar para DEPOSITAR o Cancelar para RETIRAR.");
    const promptMessage = transactionType ? "Ingrese la cantidad a depositar:" : "Ingrese la cantidad a retirar:";
    let amount = prompt(promptMessage);

    if (amount !== null) {
        amount = parseFloat(amount);
        if (transactionType) {
            simulateTransaction(amount); // Depósito
        } else {
            simulateTransaction(-amount); // Retiro
        }
    }
});


// LÓGICA DE PESTAÑAS (Casino/Deportes)
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        // Aquí iría la lógica de cambio de contenido
        console.log(`Pestaña ${button.dataset.tab} activada.`);
    });
});


// LÓGICA DE FILTRADO DE JUEGOS POR CATEGORÍA
function filterGames(filter) {
    gameCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (filter === 'all' || cardCategory === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Resetear la barra de búsqueda al usar filtros de categoría
        searchInput.value = ''; 

        filterGames(filter);
    });
});


// LÓGICA DE BÚSQUEDA DINÁMICA
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    // Desactivar filtros de categoría mientras se busca
    filterButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');
    
    gameCards.forEach(card => {
        const gameTitleElement = card.querySelector('.game-title');
        if (!gameTitleElement) return;

        const gameTitle = gameTitleElement.textContent.toLowerCase();
        
        if (searchTerm === '' || gameTitle.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});


// LÓGICA DE RESPONSIVIDAD Y TOGGLE DEL SIDEBAR
function updateSidebarButtonText() {
    if (sidebar.classList.contains('collapsed')) {
        sidebarToggleBtn.innerHTML = '&gt;'; // Flecha a la derecha (Abrir)
    } else {
        sidebarToggleBtn.innerHTML = '&lt;'; // Flecha a la izquierda (Cerrar)
    }
}

sidebarToggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    updateSidebarButtonText();
});

// Inicializar el estado colapsado si la pantalla es menor a 1024px (pero no móvil)
if (window.innerWidth < 1024 && window.innerWidth > 600) {
    sidebar.classList.add('collapsed');
}

// Inicializar el saldo y el botón del sidebar
updateBalanceDisplay();
updateSidebarButtonText();