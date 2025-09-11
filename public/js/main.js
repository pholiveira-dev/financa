document.addEventListener('DOMContentLoaded', () => {

            // JavaScript para alternar entre as páginas
            const sidebarItems = document.querySelectorAll('.sidebar-item');
            const pages = document.querySelectorAll('.page-content');
            const pageTitle = document.getElementById('page-title');

            sidebarItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetPageId = e.currentTarget.getAttribute('data-page');

                    // Remove a classe 'active-page' de todas as páginas
                    pages.forEach(page => page.classList.remove('active-page'));
                    
                    // Adiciona a classe 'active-page' na página alvo
                    document.getElementById(targetPageId + '-page').classList.add('active-page');

                    // Atualiza o título da página
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

            // Fechar o modal ao clicar fora dele
            window.addEventListener('click', (e) => {
                if (e.target === transactionModal) {
                    transactionModal.classList.add('hidden');
                    transactionModal.classList.remove('flex');
                }
            });

            // Prevenir o formulário de ser enviado
            const transactionForm = document.getElementById('transaction-form');
            transactionForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Formulário de nova transação enviado! (Apenas um exemplo)');
                // Aqui você faria a requisição para o backend
                transactionModal.classList.add('hidden');
                transactionModal.classList.remove('flex');
            });
            
            // Dados de exemplo para os gráficos
            const categoryData = {
                labels: ['Moradia', 'Alimentação', 'Transporte', 'Lazer', 'Outros'],
                datasets: [{
                    label: 'Gastos por Categoria',
                    data: [30, 20, 15, 10, 25],
                    backgroundColor: [
                        '#818cf8',
                        '#60a5fa',
                        '#2dd4bf',
                        '#f87171',
                        '#fbbf24'
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
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: false,
                        }
                    }
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
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                },
            });
        });