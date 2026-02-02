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
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        datalabels: {
          color: 'white',
          formatter: (value, context) => {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}: ${value}`;
          },
          font: {
            weight: 'bold',
            size: 14
          }
        }
      }
    },
    plugins: [ChartDataLabels]
});
