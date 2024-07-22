class DropdownHandler {
  private dropdownElement: HTMLSelectElement;
  private dropdownTxtElement: HTMLParagraphElement;
  private changed: boolean = false;
  private dropdownTxt: string;
  private count: number = 0; // Track number of checkboxes selected for this dropdown
  private static totalDropdowns: number = 0; // Track total number of dropdowns
  private static activeDropdowns: number = 0; // Track number of active dropdowns

  constructor(
    dropdownId: string,
    dropdownTxtId: string,
    dropdownTxt: string,
    private countSelect: HTMLParagraphElement,
    private resetBtn: HTMLButtonElement,
    private applyBtn: HTMLButtonElement
  ) {
    this.dropdownElement = document.getElementById(
      dropdownId
    ) as HTMLSelectElement;
    this.dropdownTxtElement = document.getElementById(
      dropdownTxtId
    ) as HTMLParagraphElement;
    this.dropdownTxt = dropdownTxt;
    this.dropdownElement.addEventListener(
      "change",
      this.handleDropdownChange.bind(this)
    );

    // Increment the total number of dropdowns
    DropdownHandler.totalDropdowns++;
    // Update the count displayed for all dropdowns
    this.updateTotalCount();
  }

  private handleDropdownChange() {
    this.resetBtn.disabled = false;
    this.resetBtn.style.display = "block";
    this.applyBtn.disabled = false;
    this.applyBtn.style.display = "block";

    const checkboxes = this.dropdownElement.querySelectorAll<HTMLInputElement>(
      "input[type='checkbox']"
    );
    let count = 0;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        count++;
      }
    });

    // If none of the checkboxes are selected and the dropdown was previously counted as active,
    // decrement the count of active dropdowns
    if (this.changed && count === 0) {
      DropdownHandler.activeDropdowns--;
      this.changed = false;
      // Update the count displayed for all dropdowns
      this.updateTotalCount();
    }
    // If at least one checkbox is selected and the dropdown was not changed before,
    // increment the count of active dropdowns and set the changed flag to true
    else if (!this.changed && count > 0) {
      DropdownHandler.activeDropdowns++;
      this.changed = true;
      // Update the count displayed for all dropdowns
      this.updateTotalCount();
    }

    // Update the count of selected checkboxes for this dropdown
    this.count = count;

    // Update the dropdown text to show the number of selected checkboxes
    this.dropdownTxtElement.innerHTML =
      count === 0
        ? `${this.dropdownTxt} <i class="fa-solid fa-chevron-down"></i>`
        : `${count} Selected`;
  }

  private updateTotalCount() {
    // Update the count displayed for all dropdowns
    this.countSelect.innerHTML = `${DropdownHandler.activeDropdowns}`;
  }
}

class Filter {
  constructor(private applyBtn: HTMLButtonElement) {
    this.applyBtn.addEventListener("click", this.applyFilter.bind(this));
  }

  private applyFilter() {
    const tableRows =
      document.querySelectorAll<HTMLTableRowElement>("#table tbody tr");
    const selectedStatus = this.getSelection(
      "#status-dropdown input[type='checkbox']"
    );
    const selectedLocations = this.getSelection(
      "#location-dropdown input[type='checkbox']"
    );
    const selectedDepartments = this.getSelection(
      "#department-dropdown input[type='checkbox']"
    );

    tableRows.forEach((row) => {
      const statusCell = row.querySelector<HTMLButtonElement>(
        "td:nth-child(7) button#status"
      );
      const locationCell = row.querySelector("td:nth-child(3)");
      const departmentCell = row.querySelector("td:nth-child(4)");

      let displayRow = true;

      if (
        statusCell &&
        selectedStatus.length > 0 &&
        !selectedStatus.includes(statusCell.innerHTML)
      ) {
        if (
          statusCell.innerHTML !== "Inactive" ||
          !selectedStatus.includes("Inactive")
        ) {
          displayRow = false;
        }
      }

      if (
        locationCell &&
        selectedLocations.length > 0 &&
        !selectedLocations.includes(locationCell.innerHTML)
      ) {
        displayRow = false;
      }

      if (
        departmentCell &&
        selectedDepartments.length > 0 &&
        !selectedDepartments.includes(departmentCell.innerHTML)
      ) {
        displayRow = false;
      }

      row.style.display = displayRow ? "" : "none";
    });
  }

  private getSelection(selector: string): string[] {
    const selectedOptions: string[] = [];
    document
      .querySelectorAll<HTMLInputElement>(selector)
      .forEach((checkbox) => {
        if (checkbox.checked) {
          selectedOptions.push(checkbox.value);
        }
      });
    return selectedOptions;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Uncheck checkboxes by default
  document
    .querySelectorAll<HTMLInputElement>(
      "#status-dropdown input[type='checkbox']"
    )
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  document
    .querySelectorAll<HTMLInputElement>(
      "#location-dropdown input[type='checkbox']"
    )
    .forEach((checkbox) => {
      checkbox.checked = false;
    });
  document
    .querySelectorAll<HTMLInputElement>(
      "#department-dropdown input[type='checkbox']"
    )
    .forEach((checkbox) => {
      checkbox.checked = false;
    });

  const resetBtn = document.getElementById("reset") as HTMLButtonElement;
  resetBtn.addEventListener("click", function () {
    location.reload();
  });

  const applyBtn = document.getElementById("apply") as HTMLButtonElement;
  const countSelect = document.getElementById(
    "count-selection"
  ) as HTMLParagraphElement;
  let count = 0;
  new DropdownHandler(
    "status-dropdown",
    "statusDropdownTxt",
    "Status",
    countSelect,
    resetBtn,
    applyBtn
  );
  new DropdownHandler(
    "location-dropdown",
    "locationDropdownTxt",
    "Location",
    countSelect,
    resetBtn,
    applyBtn
  );
  new DropdownHandler(
    "department-dropdown",
    "departmentDropdownTxt",
    "Department",
    countSelect,
    resetBtn,
    applyBtn
  );
  new Filter(applyBtn);
});
