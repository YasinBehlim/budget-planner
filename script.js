// THEME
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
    <td><input placeholder="Category"></td>
    <td><input type="number" class="amount"></td>
    <td><button onclick="this.closest('tr').remove()">❌</button></td>
  `;
  document.getElementById("rows").appendChild(row);
}

// CALCULATE
function calculate() {
  const rows = document.querySelectorAll("#rows tr");
  let income = 0, expenses = 0, savings = 0;

  const breakdown = [];

  rows.forEach(r => {
    const name = r.children[0].querySelector("input").value;
    const val = Number(r.children[1].querySelector("input").value || 0);

    if (name.toLowerCase() === "income") income += val;
    else if (name.toLowerCase() === "savings") savings += val;
    else {
      expenses += val;
      breakdown.push({ name, val });
    }
  });

  document.getElementById("income").textContent = income + " PKR";
  document.getElementById("expenses").textContent = expenses + " PKR";
  document.getElementById("savings").textContent = savings + " PKR";
  document.getElementById("remaining").textContent = (income - expenses - savings) + " PKR";

  renderBars(breakdown, income);
}

// BARS
function renderBars(items, income) {
  const bars = document.getElementById("bars");
  bars.innerHTML = "";

  items.forEach(i => {
    const percent = income ? Math.round((i.val / income) * 100) : 0;

    bars.innerHTML += `
      <div class="bar">
        <div class="bar-label">
          <span>${i.name}</span>
          <span>${percent}%</span>
        </div>
        <div class="bar-bg">
          <div class="bar-fill" style="width:${percent}%"></div>
        </div>
      </div>
    `;
  });
}
