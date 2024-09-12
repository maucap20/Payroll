// Global data array to store employee information
let employees = [];

// Get references to button elements
const addEmployeesBtn = document.querySelector("#add-employees-btn");
const resetEmployeesBtn = document.querySelector("#reset-employees-btn");

/* ****************************************************************** */
/*  displayAverageSalary()                                            */
/*                                                                    */
/*  Calculates and displays the average salary of employees in the    */
/*  employeesArray, rounded to the nearest unit. Uses a simple        */
/*  sum-and-divide algorithm.                                         */
const displayAverageSalary = (employeesArray) => {
  let sum = 0;

  for (const employee of employeesArray) {
    sum += employee.salary;
  }

  const averageSalary = Math.round(sum / employeesArray.length);
  console.log(
    `The average employee salary among our ${employeesArray.length} employees is $${averageSalary}`
  );
};

/* ****************************************************************** */
/*  getRandomEmployee()                                               */
/*                                                                    */
/*  Selects a random employee from the global employees array using a */
/*  random number to compute an index for the array.                  */
const getRandomEmployee = (employeesArray) => {
  const randomIndex = Math.floor(Math.random() * employeesArray.length);
  const selectedEmployee = employeesArray[randomIndex];

  console.log(
    `Congratulations to ${selectedEmployee.firstName} ${selectedEmployee.lastName}, our randomly selected employee! Woohoo!`
  );
  console.log(
    `${selectedEmployee.firstName}, our evil director of HR has selected you for something mysterious... BWA-HAH-HAH-HAHAAAH!`
  );
};

/* ****************************************************************** */
/*  displaySeparatorLine()                                            */
/*                                                                    */
/*  Logs a line of '=' as a visual separator in the console.          */
const displaySeparatorLine = () => {
  console.log("================================");
};

/* ****************************************************************** */
/*  collectEmployees()                                                */
/*                                                                    */
/*  Populates the global employees array with data from the user.     */
const collectEmployees = () => {
  let continueAddingEmployees = true;

  while (continueAddingEmployees) {
    const newEmployee = {
      firstName: prompt("Employee's First Name:"),
      lastName: prompt("Employee's Last Name:"),
      salary: "",
    };

    while (isNaN(parseFloat(newEmployee.salary))) {
      newEmployee.salary = Number(
        prompt(
          "Please enter Employee's Salary as a numeric value, without a currency symbol:"
        )
      );
    }

    employees.push(newEmployee);
    continueAddingEmployees = confirm(
      "Do you want to continue adding employees?"
    );
  }

  return employees;
};

/* ****************************************************************** */
/*  resetEmployeeData()                                               */
/*                                                                    */
/*  Clears the global employees array and then starts data entry.     */
const resetEmployeeData = () => {
  employees = [];
  trackEmployeeData();
};

/* ****************************************************************** */
/*  trackEmployeeData()                                               */
/*                                                                    */
/*  Handles the employee data flow: collecting, displaying, and       */
/*  processing employee information.                                  */
const trackEmployeeData = () => {
  const employees = collectEmployees();

  console.table(employees);
  displayAverageSalary(employees);
  displaySeparatorLine();
  getRandomEmployee(employees);

  employees.sort((a, b) => a.lastName.localeCompare(b.lastName));

  displayEmployees(employees);
};

/* ****************************************************************** */
/*  displayEmployees()                                                */
/*                                                                    */
/*  Displays employee data in an HTML table.                          */
const displayEmployees = (employeesArray) => {
  const employeeTable = document.querySelector("#employee-table");
  employeeTable.innerHTML = "";

  employeesArray.forEach((employee) => {
    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = employee.firstName;
    newTableRow.appendChild(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = employee.lastName;
    newTableRow.appendChild(lastNameCell);

    const salaryCell = document.createElement("td");
    salaryCell.textContent = employee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    newTableRow.appendChild(salaryCell);

    employeeTable.appendChild(newTableRow);
  });
};

// Add event listeners to buttons
addEmployeesBtn.addEventListener("click", trackEmployeeData);
resetEmployeesBtn.addEventListener("click", resetEmployeeData);
