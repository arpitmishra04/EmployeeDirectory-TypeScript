interface Employee {
  user: string;
  userDetails: string;
  location: string;
  department: string;
  role: string;
  empNo: string;
  status: string;
  joinDt: string;
}

let Data: Employee[] = JSON.parse(localStorage.getItem("EmployeeData") || "[]");

if (Data == null || Data.length == 0) {
  fetch("../empData.json")
    .then((response) => {
      return response.json();
    })
    .then((emp: Employee[]) => {
      Data = emp;
      return Data;
    });
}

let exportBtn = document.getElementById("export-btn") as HTMLButtonElement;

exportBtn.addEventListener("click", function () {
  let data = [];
  if (Array.isArray(Data)) {
    for (let item of Data) {
      let user = item.user;
      let email = item.userDetails;

      data.push({
        User: user,
        Email: email,
        Location: item.location,
        Department: item.department,
        Role: item.role,
        "Employee Number": item.empNo,
        Status: item.status,
        "Join Date": item.joinDt,
      });
    }

    // Convert data array to Excel file using SheetJS
    //@ts-ignore
    var wb = XLSX.utils.book_new();
    //@ts-ignore
    var ws = XLSX.utils.json_to_sheet(data);
    var headers = [
      "User",
      "Email",
      "Location",
      "Department",
      "Role",
      "Employee Number",
      "Status",
      "Join Date",
    ];
    //@ts-ignore
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" }); // Add headers
    //@ts-ignore
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    //@ts-ignore
    XLSX.writeFile(wb, "employee_data.xlsx");
  } else {
    console.error("emp is not an array");
  }
});
