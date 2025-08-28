const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');
const filterCategory = document.getElementById('filter-category');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function renderExpenses(filter = 'All') {
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        if (filter === 'All' || expense.category === filter) {
            const li = document.createElement('li');
            li.classList.add('expense-item');
            li.innerHTML = `
                ${expense.name} - ₹${expense.amount} (${expense.category})
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
            total += Number(expense.amount);
        }
    });

    totalAmount.textContent = total;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    saveToLocalStorage();
    renderExpenses(filterCategory.value);
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;
    const category = document.getElementById('expense-category').value;

    expenses.push({ name, amount, category });
    saveToLocalStorage();
    renderExpenses(filterCategory.value);

    expenseForm.reset();
});

filterCategory.addEventListener('change', () => {
    renderExpenses(filterCategory.value);
});

// Initial render
renderExpenses();
