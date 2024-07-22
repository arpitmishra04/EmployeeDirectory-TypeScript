"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let empData = JSON.parse(localStorage.getItem("EmployeeData") || "[]");
class EmployeeTable {
    constructor(data) {
        this.count = 0;
        this.data = data;
        this.attachEventListeners();
    }
    generateTableRows() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data.length == 0 || this.data == null) {
                yield fetch("../empData.json")
                    .then((response) => {
                    return response.json();
                })
                    .then((emp) => {
                    this.data = emp;
                    localStorage.setItem("EmployeeData", JSON.stringify(emp));
                    return this.populateTable();
                });
            }
            return this.populateTable();
        });
    }
    populateTable() {
        let resData = "";
        for (const data of this.data) {
            const imgURL = localStorage.getItem(`imgData_${data.empNo}`) ||
                "../Assets/Images/user.png";
            resData += `
        <tr data-empNo="${data.empNo}">
          <td><input type="checkbox" class="rowCheckbox" /></td>
          <td>
            <div id="user-name">
              <div id="user-img">
                <img src="${imgURL}" />
              </div>
              <div id="user-details">
                <h4>${data.user}</h4>
                <h6>${data.userDetails}</h6>
              </div>
            </div>
          </td>
          <td>${data.location}</td>
          <td>${data.department}</td>
          <td>${data.role}</td>
          <td>${data.empNo}</td>
          <td><button id="status" class="${data.status}">${data.status}</button></td>
          <td>${data.joinDt}</td>
          <td class="elipse">&#8943;
            <div class="elipse-details">
              <h6><a href="employee.html">View Details</a></h6>
              <h6><a href="employee.html">Edit</a></h6>
              <h6><a href="employee.html">Delete</a></h6>
            </div>
          </td>
        </tr>`;
        }
        return resData;
    }
    renderTable() {
        const tableContainer = document.querySelector("#data-output");
        if (!tableContainer)
            return;
        let resData = this.generateTableRows();
        resData.then((data) => {
            tableContainer.innerHTML = data;
        });
    }
    showToast() {
        let toastBox = document.getElementById("toastBox"), toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${this.count} Employees deleted`;
        toastBox.appendChild(toast);
        let selectAllCheckbox = document.getElementById("selectAll");
        selectAllCheckbox.checked = false;
        setTimeout(() => {
            toast.style.display = "none";
        }, 5000);
        this.count = 0;
    }
    attachEventListeners() {
        const dataTable = document.getElementById("table");
        const deleteButton = document.getElementById("delete-operation-btn");
        const selectAllCheckbox = document.getElementById("selectAll");
        function handleCheckboxChange() {
            const checkboxes = Array.from(dataTable.querySelectorAll('input[type="checkbox"]:not(#selectAll)'));
            const allChecked = checkboxes.every((checkbox) => checkbox.checked);
            selectAllCheckbox.checked = allChecked;
        }
        selectAllCheckbox.addEventListener("change", () => {
            const checkboxes = Array.from(dataTable.querySelectorAll('input[type="checkbox"]:not(#selectAll)'));
            checkboxes.forEach((checkbox) => (checkbox.checked = selectAllCheckbox.checked));
        });
        deleteButton.addEventListener("click", () => {
            var _a;
            const empDetails = document.getElementsByClassName("rowCheckbox");
            const data = localStorage.getItem("EmployeeData") || "[]";
            let datares = JSON.parse(data);
            let temp = 0;
            for (let i = 0; i < empDetails.length; i++) {
                if (empDetails[i].checked &&
                    ((_a = empDetails[i].closest("tr")) === null || _a === void 0 ? void 0 : _a.style.display) !==
                        "none") {
                    datares.splice(i - temp, 1);
                    temp += 1;
                    this.count++;
                }
            }
            localStorage.setItem("EmployeeData", JSON.stringify(datares));
            this.data = datares;
            handleCheckboxChange();
            if (this.count == 0)
                return;
            this.renderTable();
            this.showToast();
        });
        dataTable.querySelectorAll(".rowCheckbox").forEach((checkbox) => {
            checkbox.addEventListener("change", handleCheckboxChange);
        });
        const elipseDetailsBox = document.getElementsByClassName("elipse-details");
        let elipseClickCheck = false;
        document.addEventListener("click", (event) => {
            elipseClickCheck = !elipseClickCheck;
            const elipseElements = document.querySelectorAll(".elipse");
            for (let i = 0; i < elipseElements.length; i++) {
                if (elipseClickCheck) {
                    if (elipseElements[i].contains(event.target)) {
                        elipseDetailsBox[i].style.display = "block";
                    }
                }
                else {
                    elipseDetailsBox[i].style.display = "none";
                }
            }
        });
    }
}
const employeeTable = new EmployeeTable(empData);
employeeTable.renderTable();
//# sourceMappingURL=table.js.map