interface EmployeeData {
  user: string;
  userDetails: string;
  location: string;
  department: string;
  role: string;
  empNo: string;
  status: string;
  joinDt: string;   
}

let empData: EmployeeData[] = JSON.parse(
  localStorage.getItem("EmployeeData") || "[]"
);

class EmployeeTable {
  private data: EmployeeData[];
  private count = 0;
  constructor(data: EmployeeData[]) {
    this.data = data;
    this.attachEventListeners();
  }

  private async generateTableRows() {
    //console.log("inside generate table");
    //console.log(this.data.length);

    if (this.data.length == 0 || this.data == null) {
      await fetch("../empData.json")
        .then((response) => {
          //console.log(response);
          return response.json();
        })
        .then((emp: EmployeeData[]) => {
          //console.log("in promise");
          this.data = emp;

          localStorage.setItem("EmployeeData", JSON.stringify(emp));
          return this.populateTable();
        });
    }

    return this.populateTable();
  }

  public populateTable() {
    let resData = "";
    for (const data of this.data) {
      const imgURL =
        localStorage.getItem(`imgData_${data.empNo}`) ||
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

  public renderTable(): void {
    const tableContainer =
      document.querySelector<HTMLTableElement>("#data-output");
    if (!tableContainer) return;
    let resData = this.generateTableRows();
    resData.then((data) => {
      tableContainer.innerHTML = data;
    });

    // Attach event listeners every time the table is rendered
    
  }

  public showToast() {
    let toastBox = document.getElementById("toastBox") as HTMLDivElement,
      toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${this.count} Employees deleted`;
    toastBox.appendChild(toast);
    let selectAllCheckbox = document.getElementById(
      "selectAll"
    ) as HTMLInputElement;
    selectAllCheckbox.checked = false;
    setTimeout(() => {
      toast.style.display = "none";
    }, 5000);
    this.count = 0;
  }

  private attachEventListeners(): void {
    const dataTable = document.getElementById("table") as HTMLTableElement;
    const deleteButton = document.getElementById(
      "delete-operation-btn"
    ) as HTMLButtonElement;
    const selectAllCheckbox = document.getElementById(
      "selectAll"
    ) as HTMLInputElement;

    function handleCheckboxChange() {
      const checkboxes = Array.from(
        dataTable.querySelectorAll<HTMLInputElement>(
          'input[type="checkbox"]:not(#selectAll)'
        )
      );
      const allChecked = checkboxes.every((checkbox) => checkbox.checked);
      selectAllCheckbox.checked = allChecked;
    }

    selectAllCheckbox.addEventListener("change", () => {
      const checkboxes = Array.from(
        dataTable.querySelectorAll<HTMLInputElement>(
          'input[type="checkbox"]:not(#selectAll)'
        )
      );
      checkboxes.forEach(
        (checkbox) => (checkbox.checked = selectAllCheckbox.checked)
      );
    });

    deleteButton.addEventListener("click", () => {
      const empDetails = document.getElementsByClassName("rowCheckbox");
      const data = localStorage.getItem("EmployeeData") || "[]";
      let datares = JSON.parse(data);
      let temp = 0;

      for (let i = 0; i < empDetails.length; i++) {
        if (
          (empDetails[i] as HTMLInputElement).checked &&
          (empDetails[i] as HTMLInputElement).closest("tr")?.style.display !==
            "none"
        ) {
          //console.log(1);
          datares.splice(i - temp, 1);
          temp += 1;
          this.count++;
        }
      }
      localStorage.setItem("EmployeeData", JSON.stringify(datares));
      this.data=datares;

      handleCheckboxChange();
      if (this.count == 0) return;
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
          if (elipseElements[i].contains(event.target as Node)) {
            (elipseDetailsBox[i] as HTMLElement).style.display = "block";
          }
        } else {
          (elipseDetailsBox[i] as HTMLElement).style.display = "none";
        }
      }
    });
  }
}

const employeeTable = new EmployeeTable(empData);
employeeTable.renderTable();
