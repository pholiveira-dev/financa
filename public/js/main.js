document.addEventListener('DOMContentLoaded', async () => {
    const userId = window.USER_ID;

    // Elementos da página
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const pageContents = document.querySelectorAll('.page-content');
    const pageTitle = document.getElementById('page-title');

    // Modais e Botões de Abertura
    const addTransactionBtn = document.getElementById('addTransactionBtn');
    const transactionModal = document.getElementById('transaction-modal');
    const closeTransactionModalBtn = document.getElementById('closeTransactionModal');
    const transactionForm = document.getElementById('transaction-form');

    const addRecurringBtn = document.getElementById('addRecurringBtn');
    const recurringModal = document.getElementById('recurring-modal');
    const closeRecurringModalBtn = document.getElementById('closeRecurringModal');
    const recurringForm = document.getElementById('recurring-form');

    // Funções de controle da UI
    const showPage = (pageId) => {
        pageContents.forEach(page => page.classList.add('hidden'));
        document.getElementById(`${pageId}-page`).classList.remove('hidden');
        pageTitle.textContent = sidebarItems.find(item => item.dataset.page === pageId).textContent.trim();
        sidebarItems.forEach(item => item.classList.remove('active-page', 'bg-indigo-600', 'text-white'));
        document.querySelector(`[data-page="${pageId}"]`).classList.add('active-page', 'bg-indigo-600', 'text-white');
    };
    
    const toggleModal = (modal, show) => {
        modal.classList.toggle('hidden', !show);
    };

    // Event Listeners para a navegação
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.dataset.page;
            showPage(pageId);
        });
    });

    // Event Listeners para os modais
    addTransactionBtn.addEventListener('click', () => toggleModal(transactionModal, true));
    closeTransactionModalBtn.addEventListener('click', () => toggleModal(transactionModal, false));
    addRecurringBtn.addEventListener('click', () => toggleModal(recurringModal, true));
    closeRecurringModalBtn.addEventListener('click', () => toggleModal(recurringModal, false));
    window.addEventListener('click', (e) => {
        if (e.target === transactionModal) toggleModal(transactionModal, false);
        if (e.target === recurringModal) toggleModal(recurringModal, false);
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
        accountsSelects.forEach(select => select.innerHTML = '');
        if (accounts && accounts.length > 0) {
            accounts.forEach(acc => {
                const option = `<option value="${acc.account_id}">${acc.nome} (${acc.tipo})</option>`;
                accountsSelects.forEach(select => select.insertAdjacentHTML('beforeend', option));
            });
        } else {
            const option = '<option disabled selected>Nenhuma conta disponível</option>';
            accountsSelects.forEach(select => select.insertAdjacentHTML('beforeend', option));
        }
    };

    const renderCategories = async () => {
        const categories = await fetchData('/api/categories');
        const categoriesSelects = [document.getElementById('transaction-category'), document.getElementById('recurring-category')];
        categoriesSelects.forEach(select => select.innerHTML = '');
        if (categories && categories.length > 0) {
            categories.forEach(cat => {
                const option = `<option value="${cat.categories_id}">${cat.nome}</option>`;
                categoriesSelects.forEach(select => select.insertAdjacentHTML('beforeend', option));
            });
        } else {
            const option = '<option disabled selected>Nenhuma categoria disponível</option>';
            categoriesSelects.forEach(select => select.insertAdjacentHTML('beforeend', option));
        }
    };
    
    const renderTransactions = async () => {
        const transactions = await fetchData(`/api/transactions?user_id=${userId}`);
        const tableBody = document.getElementById('transactions-table-body');
        tableBody.innerHTML = '';
        if (transactions && transactions.length > 0) {
            transactions.forEach(tx => {
                const row = `<tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${tx.descricao}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.valor}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.tipo}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.account_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tx.category_id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                </tr>`;
                tableBody.insertAdjacentHTML('beforeend', row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="6" class="px-6 py-4 text-center text-gray-500">Nenhuma transação encontrada.</td></tr>';
        }
    };

    // Submissão dos Formulários
    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            user_id: userId,
            descricao: document.getElementById('transaction-description').value,
            valor: parseFloat(document.getElementById('transaction-value').value),
            tipo: document.getElementById('transaction-type').value,
            account_id: parseInt(document.getElementById('transaction-account').value),
            category_id: parseInt(document.getElementById('transaction-category').value)
        };
        const result = await fetchData('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (result) {
            toggleModal(transactionModal, false);
            transactionForm.reset();
            renderTransactions(); // Recarrega a lista
        }
    });

    recurringForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            user_id: userId,
            descricao: document.getElementById('recurring-description').value,
            valor: parseFloat(document.getElementById('recurring-value').value),
            dia_vencimento: parseInt(document.getElementById('recurring-due-day').value),
            account_id: parseInt(document.getElementById('recurring-account').value),
            category_id: parseInt(document.getElementById('recurring-category').value)
        };
        const result = await fetchData('/api/recurring-expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (result) {
            toggleModal(recurringModal, false);
            recurringForm.reset();
            // Lógica para recarregar despesas recorrentes aqui
        }
    });

    // Inicialização
    await renderAccounts();
    await renderCategories();
    await renderTransactions();
});