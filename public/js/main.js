document.addEventListener('DOMContentLoaded', async () => {
    // Pega o ID do usuário do EJS e garante que seja um número.
    const userId = parseInt(window.USER_ID, 10);

    // Verificação de ID de usuário
    if (isNaN(userId)) {
        console.error('ID do usuário não definido. Redirecionando para login.');
        // Opcional: redirecionar para a página de login
        // window.location.href = '/login'; 
        return; 
    }

    // Elementos da página
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const pageContents = document.querySelectorAll('.page-content');
    const pageTitle = document.getElementById('page-title');
    
    // Modais e Botões de Abertura
    const transactionModal = document.getElementById('transaction-modal');
    const closeTransactionModalBtn = document.getElementById('closeTransactionModal');
    const transactionForm = document.getElementById('transaction-form');
    const transactionModalTitle = document.querySelector('#transaction-modal h3');
    const transactionSubmitBtn = document.querySelector('#transaction-form button[type="submit"]');

    const recurringModal = document.getElementById('recurring-modal');
    const closeRecurringModalBtn = document.getElementById('closeRecurringModal');
    const recurringForm = document.getElementById('recurring-form');
    const recurringModalTitle = document.querySelector('#recurring-modal h3');
    const recurringSubmitBtn = document.querySelector('#recurring-form button[type="submit"]');

    const accountModal = document.getElementById('account-modal');
    const closeAccountModalBtn = document.getElementById('closeAccountModal');
    const accountForm = document.getElementById('account-form');
    const accountModalTitle = document.querySelector('#account-modal h3');
    const accountSubmitBtn = document.querySelector('#account-form button[type="submit"]');

    const categoryModal = document.getElementById('category-modal');
    const closeCategoryModalBtn = document.getElementById('closeCategoryModal');
    const categoryForm = document.getElementById('category-form');
    const categoryModalTitle = document.getElementById('category-modal-title');
    const categorySubmitBtn = document.getElementById('category-submit-btn');

    // Funções de controle da UI
    const showPage = (pageId) => {
        pageContents.forEach(page => page.classList.add('hidden'));
        const pageElement = document.getElementById(`${pageId}-page`);
        if (pageElement) {
            pageElement.classList.remove('hidden');
        }
        
        const selectedItem = [...sidebarItems].find(item => item.dataset.page === pageId);
        if (selectedItem) {
            pageTitle.textContent = selectedItem.textContent.trim();
        }
        
        sidebarItems.forEach(item => item.classList.remove('active-page'));
        if (selectedItem) {
            selectedItem.classList.add('active-page');
        }
    };
    
    const toggleModal = (modal, show) => {
        if (modal) {
            if (show) {
                modal.classList.remove('hidden');
                setTimeout(() => {
                    const modalContent = modal.querySelector('.modal-content');
                    if (modalContent) modalContent.classList.add('show');
                }, 10);
            } else {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) modalContent.classList.remove('show');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300); // tempo da transição no css
            }
        }
    };

    // Event Listeners para a navegação
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.dataset.page;
            showPage(pageId);
        });
    });

    // Event listeners para os modais
    if (document.getElementById('addTransactionBtn')) {
        document.getElementById('addTransactionBtn').addEventListener('click', () => {
            transactionForm.reset();
            delete transactionForm.dataset.editId;
            transactionModalTitle.textContent = 'Nova Transação';
            transactionSubmitBtn.textContent = 'Salvar';
            toggleModal(transactionModal, true);
        });
    }
    if (closeTransactionModalBtn) closeTransactionModalBtn.addEventListener('click', () => toggleModal(transactionModal, false));
    
    if (document.getElementById('addRecurringBtn')) {
        document.getElementById('addRecurringBtn').addEventListener('click', () => {
            recurringForm.reset();
            delete recurringForm.dataset.editId;
            recurringModalTitle.textContent = 'Nova Despesa Recorrente';
            recurringSubmitBtn.textContent = 'Salvar';
            toggleModal(recurringModal, true);
        });
    }
    if (closeRecurringModalBtn) closeRecurringModalBtn.addEventListener('click', () => toggleModal(recurringModal, false));

    if (document.getElementById('addAccountBtn')) {
        document.getElementById('addAccountBtn').addEventListener('click', () => {
            accountForm.reset();
            delete accountForm.dataset.editId;
            accountModalTitle.textContent = 'Nova Conta';
            accountSubmitBtn.textContent = 'Salvar';
            toggleModal(accountModal, true);
        });
    }
    if (closeAccountModalBtn) closeAccountModalBtn.addEventListener('click', () => toggleModal(accountModal, false));
    
    if (document.getElementById('addCategoryBtn')) {
        document.getElementById('addCategoryBtn').addEventListener('click', () => {
            categoryForm.reset();
            delete categoryForm.dataset.editId;
            categoryModalTitle.textContent = 'Nova Categoria';
            categorySubmitBtn.textContent = 'Salvar';
            toggleModal(categoryModal, true);
        });
    }
    if (closeCategoryModalBtn) closeCategoryModalBtn.addEventListener('click', () => toggleModal(categoryModal, false));
    
    window.addEventListener('click', (e) => {
        if (e.target === transactionModal) toggleModal(transactionModal, false);
        if (e.target === recurringModal) toggleModal(recurringModal, false);
        if (e.target === accountModal) toggleModal(accountModal, false);
        if (e.target === categoryModal) toggleModal(categoryModal, false);
    });

    // Funções de requisição de dados
    const fetchData = async (endpoint, options = {}) => {
        try {
            const response = await fetch(endpoint, options);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro de API:', error.message);
            alert(`Erro na comunicação com o servidor: ${error.message}`);
            return null;
        }
    };
    
    // Funções de preenchimento de dados
    const renderAccounts = async () => {
        const accounts = await fetchData(`/api/accounts?user_id=${userId}`);
        const accountsSelects = [document.getElementById('transaction-account'), document.getElementById('recurring-account')];
        accountsSelects.forEach(select => {
            if (select) select.innerHTML = '';
        });
        if (accounts && accounts.length > 0) {
            accounts.forEach(acc => {
                const option = `<option value="${acc.account_id}">${acc.nome} (${acc.tipo})</option>`;
                accountsSelects.forEach(select => {
                    if (select) select.insertAdjacentHTML('beforeend', option);
                });
            });
        } else {
            const option = '<option disabled selected>Nenhuma conta disponível</option>';
            accountsSelects.forEach(select => {
                if (select) select.insertAdjacentHTML('beforeend', option);
            });
        }
    };

    const renderCategories = async () => {
        const categories = await fetchData('/api/categories');
        const categoriesSelects = [document.getElementById('transaction-category'), document.getElementById('recurring-category')];
        categoriesSelects.forEach(select => {
            if (select) select.innerHTML = '';
        });
        if (categories && categories.length > 0) {
            categories.forEach(cat => {
                const option = `<option value="${cat.categories_id}">${cat.nome}</option>`;
                categoriesSelects.forEach(select => {
                    if (select) select.insertAdjacentHTML('beforeend', option);
                });
            });
        } else {
            const option = '<option disabled selected>Nenhuma categoria disponível</option>';
            categoriesSelects.forEach(select => {
                if (select) select.insertAdjacentHTML('beforeend', option);
            });
        }
    };
    
    const renderTransactions = async () => {
        const transactions = await fetchData(`/api/transactions?user_id=${userId}`);
        const tableBody = document.getElementById('transactions-table-body');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
    
        if (transactions && transactions.length > 0) {
            transactions.forEach(tx => {
                const row = `<tr data-transaction-id="${tx.transaction_id}" class="table-row-hover">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${tx.descricao || tx.descrição || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ ${parseFloat(tx.valor).toFixed(2).replace('.', ',')}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.tipo === 'Entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${tx.tipo || 'N/A'}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.account_name || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.category_name || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.data ? new Date(tx.data).toLocaleDateString('pt-BR') : 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-indigo-600 hover:text-indigo-900 mr-4 edit-btn">Editar</button>
                        <button class="text-red-600 hover:text-red-900 delete-btn">Excluir</button>
                    </td>
                </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
    
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const transactionId = row.dataset.transactionId;
                    if (confirm('Tem certeza que deseja excluir esta transação?')) {
                        const result = await fetchData(`/api/transactions/${transactionId}`, { method: 'DELETE' });
                        if (result) {
                            renderTransactions();
                            renderDashboardSummary();
                            renderRecentTransactions();
                        }
                    }
                });
            });
            
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const transactionId = row.dataset.transactionId;
                    
                    const transactionToEdit = await fetchData(`/api/transactions/${transactionId}?user_id=${userId}`);
                    
                    if (transactionToEdit) {
                        transactionForm.dataset.editId = transactionId;
                        
                        document.getElementById('transaction-description').value = transactionToEdit.descricao || transactionToEdit.descrição;
                        document.getElementById('transaction-value').value = transactionToEdit.valor;
                        document.getElementById('transaction-type').value = transactionToEdit.tipo;
                        if (document.getElementById('transaction-date')) {
                            document.getElementById('transaction-date').value = transactionToEdit.data ? new Date(transactionToEdit.data).toISOString().split('T')[0] : '';
                        }
                        document.getElementById('transaction-account').value = transactionToEdit.account_id;
                        document.getElementById('transaction-category').value = transactionToEdit.category_id;
                        
                        transactionModalTitle.textContent = 'Editar Transação';
                        transactionSubmitBtn.textContent = 'Atualizar';
                        
                        toggleModal(transactionModal, true);
                    }
                });
            });
    
        } else {
            tableBody.innerHTML = '<tr><td colspan="7" class="px-6 py-4 text-center text-gray-500">Nenhuma transação encontrada.</td></tr>';
        }
    };

    const renderAccountsList = async () => {
        const accounts = await fetchData(`/api/accounts?user_id=${userId}`);
        const accountListDiv = document.getElementById('accounts-list');
        if (!accountListDiv) return;

        accountListDiv.innerHTML = '';
        if (accounts && accounts.length > 0) {
            accounts.forEach(acc => {
                const card = `<div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-500 transform transition-all duration-300 hover:scale-105" data-account-id="${acc.account_id}">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="text-xl font-bold text-gray-800">${acc.nome}</h4>
                        <div class="text-right text-sm font-medium">
                            <button class="text-indigo-600 hover:text-indigo-900 mr-2 edit-account-btn">Editar</button>
                            <button class="text-red-600 hover:text-red-900 delete-account-btn">Excluir</button>
                        </div>
                    </div>
                    <p class="text-gray-500 text-sm mb-2">${acc.tipo}</p>
                    <p class="text-gray-500 text-sm">Limite de crédito</p>
                    <h5 class="text-3xl font-semibold mt-1">R$ ${parseFloat(acc.limite).toFixed(2).replace('.', ',')}</h5>
                </div>`;
                accountListDiv.insertAdjacentHTML('beforeend', card);
            });

            document.querySelectorAll('.delete-account-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const card = e.target.closest('[data-account-id]');
                    const accountId = card.dataset.accountId;
                    if (confirm('Tem certeza que deseja excluir esta conta? Todas as transações associadas serão removidas.')) {
                        const result = await fetchData(`/api/accounts/${accountId}`, { method: 'DELETE' });
                        if (result) {
                            renderAccounts();
                            renderAccountsList();
                        }
                    }
                });
            });

            document.querySelectorAll('.edit-account-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const card = e.target.closest('[data-account-id]');
                    const accountId = card.dataset.accountId;
                    const accountToEdit = await fetchData(`/api/accounts/${accountId}?user_id=${userId}`);

                    if (accountToEdit) {
                        accountForm.dataset.editId = accountId;
                        document.getElementById('account-name').value = accountToEdit.nome;
                        document.getElementById('account-type').value = accountToEdit.tipo;
                        document.getElementById('account-limit').value = accountToEdit.limite;
                        
                        accountModalTitle.textContent = 'Editar Conta';
                        accountSubmitBtn.textContent = 'Atualizar';
                        toggleModal(accountModal, true);
                    }
                });
            });
        } else {
            accountListDiv.innerHTML = '<p class="text-center text-gray-500">Nenhuma conta encontrada. Adicione uma para começar.</p>';
        }
    };
    
    const renderRecurringExpenses = async () => {
        const recurringExpenses = await fetchData(`/api/recurring-expenses?user_id=${userId}`);
        const tableBody = document.getElementById('recurring-table-body');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        
        if (recurringExpenses && recurringExpenses.length > 0) {
            recurringExpenses.forEach(exp => {
                const row = `<tr data-recurring-expense-id="${exp.recurring_id}" class="table-row-hover">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${exp.descricao || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ ${parseFloat(exp.valor).toFixed(2).replace('.', ',')}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${exp.category_name || 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${exp.dia_vencimento ? new Date(exp.dia_vencimento).toLocaleDateString('pt-BR') : 'N/A'}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${exp.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                            ${exp.ativo ? 'Ativa' : 'Inativa'}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-indigo-600 hover:text-indigo-900 mr-4 edit-recurring-btn">Editar</button>
                        <button class="text-red-600 hover:text-red-900 delete-recurring-btn">Excluir</button>
                    </td>
                </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
    
            document.querySelectorAll('.delete-recurring-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const recurringId = row.dataset.recurringExpenseId;
                    if (confirm('Tem certeza que deseja excluir esta despesa recorrente?')) {
                        const result = await fetchData(`/api/recurring-expenses/${recurringId}`, { method: 'DELETE' });
                        if (result) {
                            renderRecurringExpenses();
                            renderUpcomingRecurringExpenses();
                        }
                    }
                });
            });
    
            document.querySelectorAll('.edit-recurring-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const row = e.target.closest('tr');
                    const recurringId = row.dataset.recurringExpenseId;
                    
                    const recurringToEdit = await fetchData(`/api/recurring-expenses/${recurringId}?user_id=${userId}`);
                    
                    if (recurringToEdit) {
                        recurringForm.dataset.editId = recurringId;
                        
                        document.getElementById('recurring-description').value = recurringToEdit.descricao;
                        document.getElementById('recurring-value').value = recurringToEdit.valor;
                        document.getElementById('recurring-due-date').value = recurringToEdit.dia_vencimento ? new Date(recurringToEdit.dia_vencimento).toISOString().split('T')[0] : '';
                        document.getElementById('recurring-account').value = recurringToEdit.account_id;
                        document.getElementById('recurring-category').value = recurringToEdit.category_id;
                        
                        recurringModalTitle.textContent = 'Editar Despesa Recorrente';
                        recurringSubmitBtn.textContent = 'Atualizar';
                        
                        toggleModal(recurringModal, true);
                    }
                });
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Nenhuma despesa recorrente encontrada.</td></tr>';
        }
    };
    
    const renderCategoriesList = async () => {
        const categories = await fetchData('/api/categories');
        const listDiv = document.getElementById('categories-list');
        if (!listDiv) return;

        listDiv.innerHTML = '';
        const noCategoriesMessage = document.getElementById('no-categories');
        if(noCategoriesMessage) noCategoriesMessage.classList.add('hidden');
    
        if (categories && categories.length > 0) {
            categories.forEach(cat => {
                const card = `<div class="bg-gray-50 p-4 rounded-lg flex justify-between items-center transform transition-all duration-300 hover:scale-[1.02]" data-category-id="${cat.categories_id}">
                    <div>
                        <h4 class="text-lg font-semibold text-gray-800">${cat.nome}</h4>
                        <p class="text-sm text-gray-500">${cat.tipo_gasto}</p>
                    </div>
                    <div class="text-right text-sm font-medium">
                        <button class="text-indigo-600 hover:text-indigo-900 mr-2 edit-category-btn">Editar</button>
                        <button class="text-red-600 hover:text-red-900 delete-category-btn">Excluir</button>
                    </div>
                </div>`;
                listDiv.insertAdjacentHTML('beforeend', card);
            });
    
            document.querySelectorAll('.edit-category-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const card = e.target.closest('[data-category-id]');
                    const categoryId = card.dataset.categoryId;
                    const categoryToEdit = await fetchData(`/api/categories/${categoryId}`);
                    if (categoryToEdit) {
                        categoryForm.dataset.editId = categoryId;
                        document.getElementById('category-name').value = categoryToEdit.nome;
                        document.getElementById('category-type').value = categoryToEdit.tipo_gasto;
                        categoryModalTitle.textContent = 'Editar Categoria';
                        categorySubmitBtn.textContent = 'Atualizar';
                        toggleModal(categoryModal, true);
                    }
                });
            });
    
            document.querySelectorAll('.delete-category-btn').forEach(button => {
                button.addEventListener('click', async (e) => {
                    const card = e.target.closest('[data-category-id]');
                    const categoryId = card.dataset.categoryId;
                    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
                        const result = await fetchData(`/api/categories/${categoryId}`, { method: 'DELETE' });
                        if (result) {
                            renderCategories();
                            renderCategoriesList();
                        }
                    }
                });
            });
    
        } else {
            if(noCategoriesMessage) noCategoriesMessage.classList.remove('hidden');
        }
    };

const renderDashboardSummary = async () => {
        // Passo 1: Obter o valor total de entradas através da nova API
        const totalEntradasData = await fetchData(`/api/transactions/total-entradas/${userId}`);
        const totalIncomeValue = totalEntradasData ? parseFloat(totalEntradasData.total_entradas) : 0;
        
        // Passo 2: Buscar todas as transações para calcular saldo e saídas
        const transactions = await fetchData(`/api/transactions?user_id=${userId}`);
        
        if (transactions) {
            let totalBalance = 0;
            let totalExpensesMonth = 0;
            
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

            transactions.forEach(tx => {
                const value = parseFloat(tx.valor);
                
                if (tx.tipo === 'Entrada') {
                    totalBalance += value;
                } else if (tx.tipo === 'Saída') {
                    totalBalance -= value;
                }

                if (tx.data) {
                    const txDate = new Date(tx.data);
                    if (txDate >= startOfMonth) {
                        // A soma de entradas por mês não será mais feita aqui
                        // pois a nova API já retorna o valor.
                        if (tx.tipo === 'Saída') {
                            totalExpensesMonth += value;
                        }
                    }
                }
            });
            
            // Passo 3: Atualizar os elementos do DOM
            if (document.getElementById('total-balance')) {
                document.getElementById('total-balance').textContent = `R$ ${totalBalance.toFixed(2).replace('.', ',')}`;
            }
            if (document.getElementById('total-income')) {
                document.getElementById('total-income').textContent = `R$ ${totalIncomeValue.toFixed(2).replace('.', ',')}`;
            }
            if (document.getElementById('total-expenses')) {
                document.getElementById('total-expenses').textContent = `R$ ${totalExpensesMonth.toFixed(2).replace('.', ',')}`;
            }
        }
    };
    
    const renderRecentTransactions = async () => {
        const transactions = await fetchData(`/api/transactions?user_id=${userId}`);
        const tableBody = document.getElementById('recent-transactions-table-body');
        const noTransactionsMessage = document.getElementById('no-recent-transactions');
        
        if (!tableBody || !noTransactionsMessage) return;

        tableBody.innerHTML = '';
        noTransactionsMessage.classList.add('hidden');

        if (transactions && transactions.length > 0) {
            const recent = transactions
                .filter(tx => tx.data)
                .sort((a, b) => new Date(b.data) - new Date(a.data))
                .slice(0, 5);
            
            if (recent.length > 0) {
                recent.forEach(tx => {
                    const description = tx.descricao || tx.descrição || 'N/A';
                    const accountName = tx.account_name || tx.account || 'N/A';
                    
                    const row = `<tr class="table-row-hover">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${description}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ ${parseFloat(tx.valor).toFixed(2).replace('.', ',')}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${tx.tipo === 'Entrada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                ${tx.tipo || 'N/A'}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${accountName}</td>
                    </tr>`;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            } else {
                noTransactionsMessage.classList.remove('hidden');
            }
        } else {
            noTransactionsMessage.classList.remove('hidden');
        }
    };
    
    const renderUpcomingRecurringExpenses = async () => {
        const recurringExpenses = await fetchData(`/api/recurring-expenses?user_id=${userId}`);
        const tableBody = document.getElementById('upcoming-recurring-table-body');
        const noRecurringMessage = document.getElementById('no-upcoming-recurring');
        
        if (!tableBody || !noRecurringMessage) return;

        tableBody.innerHTML = '';
        noRecurringMessage.classList.add('hidden');
    
        if (recurringExpenses && recurringExpenses.length > 0) {
            const upcoming = recurringExpenses
                .filter(exp => exp.ativo && exp.dia_vencimento)
                .sort((a, b) => {
                    const dateA = new Date(a.dia_vencimento);
                    const dateB = new Date(b.dia_vencimento);
                    return dateA - dateB;
                })
                .slice(0, 5);
    
            if (upcoming.length > 0) {
                upcoming.forEach(exp => {
                    const row = `<tr class="table-row-hover">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${exp.descricao || 'N/A'}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ ${parseFloat(exp.valor).toFixed(2).replace('.', ',')}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${exp.dia_vencimento ? new Date(exp.dia_vencimento).toLocaleDateString('pt-BR') : 'N/A'}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${exp.category_name || 'N/A'}</td>
                    </tr>`;
                    tableBody.insertAdjacentHTML('beforeend', row);
                });
            } else {
                noRecurringMessage.classList.remove('hidden');
            }
        } else {
            noRecurringMessage.classList.remove('hidden');
        }
    };
    
    // Submissão de Formulários
    if (transactionForm) {
        transactionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const isEdit = transactionForm.dataset.editId;
            
            const data = {
                descricao: document.getElementById('transaction-description').value,
                valor: parseFloat(document.getElementById('transaction-value').value),
                tipo: document.getElementById('transaction-type').value,
                account_id: parseInt(document.getElementById('transaction-account').value),
                category_id: parseInt(document.getElementById('transaction-category').value)
            };
            if (document.getElementById('transaction-date')) {
                data.data = document.getElementById('transaction-date').value;
            }
        
            let result;
            if (isEdit) {
                result = await fetchData(`/api/transactions/${isEdit}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                data.user_id = userId;
                result = await fetchData('/api/transactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
            
            if (result) {
                toggleModal(transactionModal, false);
                transactionForm.reset();
                delete transactionForm.dataset.editId;
                
                transactionModalTitle.textContent = 'Nova Transação';
                transactionSubmitBtn.textContent = 'Salvar';
                
                // Recarrega todas as tabelas e o resumo do dashboard
                renderTransactions();
                renderDashboardSummary();
                renderRecentTransactions();
            }
        });
    }

    if (accountForm) {
        accountForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const isEdit = accountForm.dataset.editId;
            const accountType = document.getElementById('account-type').value;
            
            let accountLimit = null;
            if (accountType === 'Crédito') {
                const limitValue = document.getElementById('account-limit').value;
                accountLimit = limitValue ? parseFloat(limitValue) : null;
            }
            
            const data = {
                nome: document.getElementById('account-name').value,
                tipo: accountType,
                limite: accountLimit,
                user_id: userId
            };
            
            let result;
            if (isEdit) {
                result = await fetchData(`/api/accounts/${isEdit}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                result = await fetchData('/api/accounts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
            
            if (result) {
                toggleModal(accountModal, false);
                accountForm.reset();
                delete accountForm.dataset.editId;
                
                renderAccountsList();
                renderAccounts();
            }
        });
    }

    if (recurringForm) {
        recurringForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const isEdit = recurringForm.dataset.editId;

            const data = {
                descricao: document.getElementById('recurring-description').value,
                valor: parseFloat(document.getElementById('recurring-value').value),
                dia_vencimento: document.getElementById('recurring-due-date').value,
                account_id: parseInt(document.getElementById('recurring-account').value),
                category_id: parseInt(document.getElementById('recurring-category').value)
            };

            let result;
            if (isEdit) {
                result = await fetchData(`/api/recurring-expenses/${isEdit}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                data.user_id = userId;
                result = await fetchData('/api/recurring-expenses', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            if (result) {
                toggleModal(recurringModal, false);
                recurringForm.reset();
                delete recurringForm.dataset.editId;
                
                recurringModalTitle.textContent = 'Nova Despesa Recorrente';
                recurringSubmitBtn.textContent = 'Salvar';

                renderRecurringExpenses();
                renderUpcomingRecurringExpenses();
            }
        });
    }

    if (categoryForm) {
        categoryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const isEdit = categoryForm.dataset.editId;

            const data = {
                nome: document.getElementById('category-name').value,
                tipo_gasto: document.getElementById('category-type').value
            };
            
            let result;
            if (isEdit) {
                result = await fetchData(`/api/categories/${isEdit}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                result = await fetchData('/api/categories', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            if (result) {
                toggleModal(categoryModal, false);
                categoryForm.reset();
                delete categoryForm.dataset.editId;
                
                categoryModalTitle.textContent = 'Nova Categoria';
                categorySubmitBtn.textContent = 'Salvar';

                renderCategories();
                renderCategoriesList();
            }
        });
    }

    // Inicialização da página
    const initialize = async () => {
        const activeItem = document.querySelector('.side-item-active-page');

        if(activeItem) {
            showPage(activeItem.dataset.page);
        }
        else {
            showPage('dashboard');
        }
    
        await renderAccounts();
        await renderCategories();
        await renderDashboardSummary();
        await renderRecentTransactions();
        await renderUpcomingRecurringExpenses();
    };

    initialize();
});