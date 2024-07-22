"use strict";
let filterByLetterHolder = document.querySelector(".search-by-letter-container");
let FilterByLetterResponse = "";
for (let i = 0; i < 26; i++) {
    FilterByLetterResponse += `
        <button id=${String.fromCharCode(65 + i)} class="search-by-letter">${String.fromCharCode(65 + i)}</button>
        `;
}
if (filterByLetterHolder)
    filterByLetterHolder.innerHTML = FilterByLetterResponse;
window.addEventListener("load", function () {
    const table = document.getElementById("table");
    let filterIcon = document.getElementById("filter-img");
    filterIcon.src = "../Assets/Images/Interface/filter-black.svg";
    const buttons = document.querySelectorAll(".search-by-letter");
    buttons.forEach((button) => {
        button.dataset.originalColor =
            button.style.backgroundColor || "";
        button.dataset.Color = button.style.color || "";
        button.addEventListener("click", handleButtonClick);
    });
    let temp = "";
    const filterStatus = document.getElementById("filter-status");
    function handleButtonClick(event) {
        const target = event.target;
        let letter = target.textContent;
        if (temp !== letter) {
            temp = letter || "";
        }
        else {
            filterIcon.src = "../Assets/Images/Interface/filter-black.svg";
            target.style.backgroundColor = "#80808020";
            target.style.color = "black";
            temp = "";
            const employeeTable = new EmployeeTable(empData);
            filterStatus.style.display = "none";
            table.style.display = "table";
            employeeTable.renderTable();
            return;
        }
        filterStatus.style.display = "none";
        filterIcon.src = "../Assets/Images/Interface/filter.svg";
        buttons.forEach((button) => {
            button.style.backgroundColor =
                button.dataset.originalColor || "";
            button.style.color = button.dataset.Color || "";
        });
        target.style.backgroundColor = "red";
        target.style.color = "white";
        let count = 0;
        let filterEmployee = empData.filter((emp) => {
            return emp.user.charAt(0).toUpperCase() === (letter === null || letter === void 0 ? void 0 : letter.toLocaleUpperCase());
        });
        count = filterEmployee.length;
        if (count == 0) {
            table.style.display = "none";
            filterStatus.style.display = "block";
        }
        else {
            table.style.display = "table";
            const employeeTable = new EmployeeTable(filterEmployee);
            employeeTable.renderTable();
        }
    }
});
//# sourceMappingURL=filterByLetter.js.map