interface ButtonWithDataset extends HTMLButtonElement {
  dataset: {
    originalColor: string;
    Color: string;
  };
}

let filterByLetterHolder = document.querySelector<HTMLDivElement>(
  ".search-by-letter-container"
);

let FilterByLetterResponse = "";
for (let i = 0; i < 26; i++) {
  FilterByLetterResponse += `
        <button id=${String.fromCharCode(
          65 + i
        )} class="search-by-letter">${String.fromCharCode(65 + i)}</button>
        `;
}

if (filterByLetterHolder)
  filterByLetterHolder.innerHTML = FilterByLetterResponse;

window.addEventListener("load", function () {
  const table = document.getElementById("table") as HTMLTableElement;
  let filterIcon = document.getElementById("filter-img") as HTMLImageElement;
  filterIcon.src = "../Assets/Images/Interface/filter-black.svg";
  const buttons =
    document.querySelectorAll<HTMLButtonElement>(".search-by-letter");
  buttons.forEach((button) => {
    (button as ButtonWithDataset).dataset.originalColor =
      button.style.backgroundColor || "";
    (button as ButtonWithDataset).dataset.Color = button.style.color || "";
    button.addEventListener("click", handleButtonClick);
  });

  let temp = "";
  const filterStatus = document.getElementById(
    "filter-status"
  ) as HTMLDivElement;

  function handleButtonClick(event: Event) {
    const target = event.target as HTMLButtonElement;
    let letter = target.textContent;
    if (temp !== letter) {
      temp = letter || "";
    } else {
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
        (button as ButtonWithDataset).dataset.originalColor || "";
      button.style.color = (button as ButtonWithDataset).dataset.Color || "";
    });

    target.style.backgroundColor = "red";
    target.style.color = "white";
    let count = 0;

    let filterEmployee = empData.filter((emp) => {
      return emp.user.charAt(0).toUpperCase() === letter?.toLocaleUpperCase();
    });

    count = filterEmployee.length;
    if (count == 0) {
      table.style.display = "none";
      filterStatus.style.display = "block";
    } else {
      table.style.display = "table";
      const employeeTable = new EmployeeTable(filterEmployee);
      employeeTable.renderTable();
    }
  }
});
