"use strict";
let Data = JSON.parse(localStorage.getItem("EmployeeData") || "[]");
if (Data == null || Data.length == 0) {
    fetch("../empData.json")
        .then((response) => {
        return response.json();
    })
        .then((emp) => {
        Data = emp;
        return Data;
    });
}
let exportBtn = document.getElementById("export-btn");
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
        var wb = XLSX.utils.book_new();
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
        XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "employee_data.xlsx");
    }
    else {
        console.error("emp is not an array");
    }
});
//# sourceMappingURL=export.js.map