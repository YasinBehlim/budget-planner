document.getElementById("budget-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get values from input fields
  const income = Number(document.getElementById("income").value) || 0;
  const rent = Number(document.getElementById("rent").value) || 0;
  const food = Number(document.getElementById("food").value) || 0;
  const transport = Number(document.getElementById("transport").value) || 0;
  const utilities = Number(document.getElementById("utilities").value) || 0;
  const others = Number(document.getElementById("others").value) || 0;

  // Calculate total expenses and remaining budget
  const totalExpenses = rent + food + transport + utilities + others;
  const remainingBudget = income - totalExpenses;

  // Display results
  document.getElementById("total-expenses").textContent = `Total Expenses: ${totalExpenses} PKR`;
  document.getElementById("remaining-budget").textContent = `Remaining Budget: ${remainingBudget} PKR`;

  // Create pie chart
  const ctx = document.getElementById('expenseChart').getContext('2d');

  // Destroy previous chart if exists
  if(window.expenseChartInstance) {
    window.expenseChartInstance.destroy();
  }

  window.expenseChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Rent', 'Food', 'Transport', 'Utilities', 'Others'],
      datasets: [{
        label: 'Expenses',
        data: [rent, food, transport, utilities, others],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
});
