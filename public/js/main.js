// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {

    // Lógica para alternar entre as páginas e modais
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const pages = document.querySelectorAll('.page-content');
    const pageTitle = document.getElementById('page-title');

    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPageId = e.currentTarget.getAttribute('data-page');
            pages.forEach(page => page.classList.remove('active-page'));
            document.getElementById(targetPageId + '-page').classList.add('active-page');
            pageTitle.textContent = e.currentTarget.textContent.trim();
        });
    });

    // Lógica do Modal
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const transactionModal = document.getElementById('transaction-modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');

    addTransactionBtn.addEventListener('click', () => {
        transactionModal.classList.remove('hidden');
        transactionModal.classList.add('flex');
    });

    closeModalBtn.addEventListener('click', () => {
        transactionModal.classList.add('hidden');
        transactionModal.classList.remove('flex');
    });

    cancelModalBtn.addEventListener('click', () => {
        transactionModal.classList.add('hidden');
        transactionModal.classList.remove('flex');
    });

    window.addEventListener('click', (e) => {
        if (e.target === transactionModal) {
            transactionModal.classList.add('hidden');
            transactionModal.classList.remove('flex');
        }
    });

    // Lógica para enviar o formulário de transação
    const transactionForm = document.getElementById('transaction-form');

    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Coleta os dados do formulário
        const tipo = document.querySelector('input[name="transaction-type"]:checked').value;
        const valor = parseFloat(document.getElementById('transaction-value').value);
        const descricao = document.getElementById('transaction-description').value;

        // **Ajuste para enviar os IDs obrigatórios**
        const transactionData = {
            user_id: 1,      // Exemplo: use um ID de usuário que exista no seu banco
            category_id: 1,  // Exemplo: use um ID de categoria que exista no seu banco
            account_id: 1,   // Exemplo: use um ID de conta que exista no seu banco
            tipo,
            valor,
            descricao
        };

        try {
            // Envia os dados para o back-end usando a Fetch API
            const response = await fetch('/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionData),
            });

            // Verifica a resposta do servidor
            if (response.ok) {
                const result = await response.json();
                console.log('Transação criada com sucesso:', result);
                alert('Transação criada com sucesso!');
                transactionForm.reset(); // Limpa o formulário
                transactionModal.classList.add('hidden'); // Fecha o modal
            } else {
                const errorData = await response.json();
                console.error('Erro ao criar transação:', errorData);
                alert('Erro ao criar transação: ' + (errorData.error || 'Ocorreu um erro desconhecido.'));
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível se conectar ao servidor.');
        }
    });

    // Dados de exemplo para os gráficos
    const categoryData = {
        labels: ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Outros'],
        datasets: [{
            label: 'Gastos por Categoria',
            data: [30, 20, 15, 10, 25],
            backgroundColor: [
                '#818cf8', '#60a5fa', '#2dd4bf', '#f87171', '#fbbf24'
            ],
            hoverOffset: 4
        }]
    };

    const incomeExpenseData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Entradas',
            data: [1200, 1500, 1300, 1700, 1600, 2000],
            borderColor: '#22c55e',
            backgroundColor: '#22c55e',
            tension: 0.4
        }, {
            label: 'Saídas',
            data: [800, 1000, 950, 1100, 1200, 1400],
            borderColor: '#ef4444',
            backgroundColor: '#ef4444',
            tension: 0.4
        }]
    };

    // Configuração e renderização dos gráficos
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: categoryData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' }, title: { display: false } }
        },
    });

    const incomeExpenseCtx = document.getElementById('incomeExpenseChart').getContext('2d');
    new Chart(incomeExpenseCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Entradas',
                data: [1200, 1500, 1300, 1700, 1600, 2000],
                backgroundColor: '#22c55e'
            }, {
                label: 'Saídas',
                data: [-800, -1000, -950, -1100, -1200, -1400],
                backgroundColor: '#ef4444'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' }, title: { display: false } },
            scales: { x: { stacked: true }, y: { stacked: true } }
        },
    });
});