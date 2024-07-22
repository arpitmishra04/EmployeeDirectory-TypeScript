"use strict";
class DropdownHandler {
    constructor(dropdownId, dropdownTxtId, dropdownTxt, countSelect, resetBtn, applyBtn) {
        this.countSelect = countSelect;
        this.resetBtn = resetBtn;
        this.applyBtn = applyBtn;
        this.changed = false;
        this.count = 0;
        this.dropdownElement = document.getElementById(dropdownId);
        this.dropdownTxtElement = document.getElementById(dropdownTxtId);
        this.dropdownTxt = dropdownTxt;
        this.dropdownElement.addEventListener("change", this.handleDropdownChange.bind(this));
        DropdownHandler.totalDropdowns++;
        this.updateTotalCount();
    }
    handleDropdownChange() {
        this.resetBtn.disabled = false;
        this.resetBtn.style.display = "block";
        this.applyBtn.disabled = false;
        this.applyBtn.style.display = "block";
        const checkboxes = this.dropdownElement.querySelectorAll("input[type='checkbox']");
        let count = 0;
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                count++;
            }
        });
        if (this.changed && count === 0) {
            DropdownHandler.activeDropdowns--;
            this.changed = false;
            this.updateTotalCount();
        }
        else if (!this.changed && count > 0) {
            DropdownHandler.activeDropdowns++;
            this.changed = true;
            this.updateTotalCount();
        }
        this.count = count;
        this.dropdownTxtElement.innerHTML =
            count === 0
                ? `${this.dropdownTxt} <i class="fa-solid fa-chevron-down"></i>`
                : `${count} Selected`;
    }
    updateTotalCount() {
        this.countSelect.innerHTML = `${DropdownHandler.activeDropdowns}`;
    }
}
DropdownHandler.totalDropdowns = 0;
DropdownHandler.activeDropdowns = 0;
class Filter {
    constructor(applyBtn) {
        this.applyBtn = applyBtn;
        this.applyBtn.addEventListener("click", this.applyFilter.bind(this));
    }
    applyFilter() {
        const tableRows = document.querySelectorAll("#table tbody tr");
        const selectedStatus = this.getSelection("#status-dropdown input[type='checkbox']");
        const selectedLocations = this.getSelection("#location-dropdown input[type='checkbox']");
        const selectedDepartments = this.getSelection("#department-dropdown input[type='checkbox']");
        tableRows.forEach((row) => {
            const statusCell = row.querySelector("td:nth-child(7) button#status");
            const locationCell = row.querySelector("td:nth-child(3)");
            const departmentCell = row.querySelector("td:nth-child(4)");
            let displayRow = true;
            if (statusCell &&
                selectedStatus.length > 0 &&
                !selectedStatus.includes(statusCell.innerHTML)) {
                if (statusCell.innerHTML !== "Inactive" ||
                    !selectedStatus.includes("Inactive")) {
                    displayRow = false;
                }
            }
            if (locationCell &&
                selectedLocations.length > 0 &&
                !selectedLocations.includes(locationCell.innerHTML)) {
                displayRow = false;
            }
            if (departmentCell &&
                selectedDepartments.length > 0 &&
                !selectedDepartments.includes(departmentCell.innerHTML)) {
                displayRow = false;
            }
            row.style.display = displayRow ? "" : "none";
        });
    }
    getSelection(selector) {
        const selectedOptions = [];
        document
            .querySelectorAll(selector)
            .forEach((checkbox) => {
            if (checkbox.checked) {
                selectedOptions.push(checkbox.value);
            }
        });
        return selectedOptions;
    }
}
document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll("#status-dropdown input[type='checkbox']")
        .forEach((checkbox) => {
        checkbox.checked = false;
    });
    document
        .querySelectorAll("#location-dropdown input[type='checkbox']")
        .forEach((checkbox) => {
        checkbox.checked = false;
    });
    document
        .querySelectorAll("#department-dropdown input[type='checkbox']")
        .forEach((checkbox) => {
        checkbox.checked = false;
    });
    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", function () {
        location.reload();
    });
    const applyBtn = document.getElementById("apply");
    const countSelect = document.getElementById("count-selection");
    let count = 0;
    new DropdownHandler("status-dropdown", "statusDropdownTxt", "Status", countSelect, resetBtn, applyBtn);
    new DropdownHandler("location-dropdown", "locationDropdownTxt", "Location", countSelect, resetBtn, applyBtn);
    new DropdownHandler("department-dropdown", "departmentDropdownTxt", "Department", countSelect, resetBtn, applyBtn);
    new Filter(applyBtn);
});
//# sourceMappingURL=filterByCategories.js.map