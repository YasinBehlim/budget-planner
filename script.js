let transactions = [];

// Add transaction row dynamically
document.getElementById("add-transaction").addEventListener("click", () => {
  const tbody = document.querySelector("#transaction-table tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <input type="text" class="category" placeholder="Category (Income/Savings/Expense)" required>
    </td>
    <td>
      <input type="number" class="amount" placeholder="Amount" required>
    </td>
    <td>
      <button class="delete-row">Delete</button>
    </td>
  `;

  tbody.appendChild(row);

  // Delete row functionality
  row.querySelector(".delete-row").addEventListener("click", () => {
    row.remove();
  });
});

// Calculate budget
document.getElementById("calculate-budget").addEventListener("click", () => {
  const categories = document.querySelectorAll(".category");
  const amounts = document.querySelectorAll(".amount");

  transactions = [];
  let totalIncome = 0;
  let totalExpenses = 0;
  let totalSavings = 0;

  categories.forEach((cat, index) => {
    const name = cat.value.trim();
    const amount = Number(amounts[index].value) || 0;

    if(name.toLowerCase() === "income") {
      totalIncome += amount;
    } else if(name.toLowerCase() === "savings") {
      totalSavings += amount;
      totalExpenses += amount; // consider savings as planned expense
    } else {
      totalExpenses += amount;
    }

    transactions.push({ name, amount });
  });

  const remaining = totalIncome - totalExpenses;

  // Update dashboard
  document.getElementById("total-income").textContent = totalIncome + " PKR";
  document.getElementById("total-expenses").textContent = totalExpenses + " PKR";
  document.getElementById("remaining-budget").textContent = remaining + " PKR";
  document.getElementById("total-savings").textContent = totalSavings + " PKR";

  // Generate pie chart
  const ctx = document.getElementById("expenseChart").getContext("2d");
  if(window.expenseChartInstance) window.expenseChartInstance.destroy();

  const labels = transactions.map(t => t.name);
  const data = transactions.map(t => t.amount);

  window.expenseChartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#4BC0C0','#9966FF','#FF9F40','#C9CBCF','#8AC926']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        datalabels: {
          color: 'white',
          formatter: (value, context) => {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}: ${value}`;
          },
          font: { weight: 'bold', size: 12 }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
});
