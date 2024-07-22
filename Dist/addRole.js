"use strict";
class Dropdown {
    constructor() {
        this.inputField = document.getElementById("assign-employees");
        this.cancelBtn = document.getElementById("cancel");
        this.dropdownContent = document.querySelector(".dropdown-content");
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.inputField.addEventListener("focus", () => {
            this.dropdownContent.classList.add("show");
        });
        window.addEventListener("click", (event) => {
            var _a;
            if (!((_a = event.target) === null || _a === void 0 ? void 0 : _a.matches("#assign-employees"))) {
                this.dropdownContent.classList.remove("show");
            }
        });
        this.dropdownContent.addEventListener("click", (event) => {
            event.stopPropagation();
        });
        const checkboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", () => {
                console.log("Checkbox state changed:", checkbox.checked);
            });
        });
        this.cancelBtn.addEventListener("click", () => {
            location.href = "../HTML/roles.html";
        });
    }
}
const dropdown = new Dropdown();
//# sourceMappingURL=addRole.js.map