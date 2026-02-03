// THEME TOGGLE
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  toggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
};

// ADD ROW
function addRow() {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><input placeholder="Expense Category"></td>
    <td><input type="number" class="amount"></td>
    <td><button onclick="this.closest('tr').remove()">❌</button></td>
  `;
  document.getElementById("rows").appendChild(row);
}

// CALCULATE
function calculate() {
  const rows = document.querySelectorAll("#rows tr");
  let income = 0;
  let expenses = 0;
  let breakdown = [];

  rows.forEach(row => {
    const name = row.children[0].querySelector("input").value.trim();
    const value = Number(row.children[1].querySelector("input").value || 0);

    if (name.toLowerCase() === "income") {
      income += value;
    } else {
      expenses += value;
      breakdown.push({ name, value });
    }
  });

  const savings = income - expenses;
  const savingsPercent = income ? Math.round((savings / income) * 100) : 0;

  document.getElementById("income").textContent = income + " PKR";
  document.getElementById("expenses").textContent = expenses + " PKR";
  document.getElementById("savings").textContent = savings + " PKR";
  document.getElementById("savingsPercent").textContent = savingsPercent + "%";

  renderBars(breakdown, income);
}

// PROGRESS BARS
function renderBars(items, income) {
  const bars = document.getElementById("bars");
  bars.innerHTML = "";

  items.forEach(item => {
    const percent = income ? Math.round((item.value / income) * 100) : 0;

    bars.innerHTML += `
      <div class="bar">
        <div class="bar-label">
          <span>${item.name}</span>
          <span>${percent}%</span>
        </div>
        <div class="bar-bg">
          <div class="bar-fill" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  });
}
