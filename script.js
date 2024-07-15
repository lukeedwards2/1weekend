document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm')
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0]
    const totalMonthlyEl = document.getElementById('totalMonthly')
    let totalMonthly = 0;
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const firstName = form.querySelector('[data-testid="firstNameInput"]').value
      const lastName = form.querySelector('[data-testid="lastNameInput"]').value
      const id = form.querySelector('[data-testid="idInput"]').value
      const title = form.querySelector('[data-testid="titleInput"]').value
      const annualSalary = parseFloat(form.querySelector('[data-testid="annualSalaryInput"]').value)
      
      addEmployee(firstName, lastName, id, title, annualSalary)
      
      form.reset()
    });
  
    function addEmployee(firstName, lastName, id, title, annualSalary) {
      const row = document.createElement('tr')
      
      row.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td>$${annualSalary.toLocaleString()}</td>
        <td><button class="deleteBtn">Delete</button></td>
      `;
      
      row.querySelector('.deleteBtn').addEventListener('click', () => {
        row.remove();
      });
  
      employeeTable.appendChild(row)
  
      updateTotalMonthly(annualSalary / 12)
    }
  
    function updateTotalMonthly(monthlySalary) {
      totalMonthly += monthlySalary
      totalMonthlyEl.textContent = `$${totalMonthly.toFixed(2)}`
  
      const footer = document.querySelector('footer')
      if (totalMonthly > 20000) {
        footer.classList.add('over-budget')
      } else {
        footer.classList.remove('over-budget')
      }
    }
  });