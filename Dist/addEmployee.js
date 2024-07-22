"use strict";
class EmployeeForm {
    constructor(fileTag, preview, editBtn) {
        this.fileTag = fileTag;
        this.preview = preview;
        this.editBtn = editBtn;
        this.selectedFiles = null;
        this.init();
    }
    init() {
        this.fileTag.addEventListener("change", () => {
            this.selectedFiles = this.fileTag.files;
            this.changeImage();
        });
        document.querySelectorAll("input").forEach((input) => {
            if (input.id !== "dob") {
                input.addEventListener("focusout", () => this.validateInput(input));
            }
            input.addEventListener("input", () => this.removeRequiredMessage(input));
        });
        const empNo = document.getElementById("empNo");
        empNo.addEventListener("keyup", () => this.validateEmployeeNumber());
        const mobileField = document.getElementById("mobile");
        mobileField.addEventListener("keyup", () => this.validatePhoneNumber());
        const emailField = document.getElementById("email");
        emailField.addEventListener("keyup", () => this.validateEmail());
        const firstNameField = document.getElementById("firstName");
        firstNameField.addEventListener("keyup", () => this.validateName("firstName", "requiredFName"));
        const lastNameField = document.getElementById("lastName");
        lastNameField.addEventListener("keyup", () => this.validateName("lastName", "requiredLName"));
    }
    changeImage() {
        if (this.selectedFiles && this.selectedFiles[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.preview.setAttribute("src", e.target.result);
            };
            reader.readAsDataURL(this.selectedFiles[0]);
        }
    }
    validateInput(input) {
        if (input.value.trim() === "") {
            input.style.borderColor = "red";
            if (input.nextElementSibling)
                input.nextElementSibling.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
            return false;
        }
        else {
            input.style.borderColor = "";
            if (input.nextElementSibling)
                input.nextElementSibling.innerHTML = "";
            return true;
        }
    }
    removeRequiredMessage(input) {
        if (input.value.trim() !== "") {
            input.style.borderColor = "";
            if (input.nextElementSibling)
                input.nextElementSibling.innerHTML = "";
        }
    }
    validateEmployeeNumber() {
        const empInput = document.getElementById("empNo");
        const empnoErrorMessage = document.getElementById("requiredField");
        const employeeNumber = empInput.value;
        if (/^([a-zA-Z0-9]+)$/.test(employeeNumber)) {
            empInput.style.borderColor = "";
            empnoErrorMessage.innerHTML = "";
            return true;
        }
        else {
            empInput.style.borderColor = "red";
            if (empInput.value == "") {
                empnoErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
            }
            else {
                empnoErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> Employee Number should not contain special symbols or spaces';
            }
            return false;
        }
    }
    validatePhoneNumber() {
        const phone = document.getElementById("mobile");
        const phoneNumber = document.getElementById("mobile")
            .value;
        const mobileErrorMessage = document.getElementById("requiredMobile");
        if (/^[0-9]+$/.test(phoneNumber)) {
            document.getElementById("mobile").style.borderColor = "";
            mobileErrorMessage.innerHTML = "";
            return true;
        }
        else {
            document.getElementById("mobile").style.borderColor = "red";
            if (phone.value == "") {
                mobileErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
            }
            else {
                mobileErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> Invalid phone number';
            }
            return false;
        }
    }
    validateEmail() {
        const emailInput = document.getElementById("email");
        const emailErrorMessage = document.getElementById("requiredEmail");
        const email = emailInput.value;
        if (/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)) {
            emailInput.style.borderColor = "";
            emailErrorMessage.innerHTML = "";
            return true;
        }
        else {
            emailInput.style.borderColor = "red";
            if (emailInput.value == "") {
                emailErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
            }
            else {
                emailErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> Invalid email format';
            }
            return false;
        }
    }
    validateName(inputField, errorMessageId) {
        const nameInput = document.getElementById(inputField);
        const nameErrorMessage = document.getElementById(errorMessageId);
        const name = nameInput.value.trim();
        if (/^([a-zA-Z]+)$/.test(name)) {
            nameInput.style.borderColor = "";
            nameErrorMessage.innerHTML = "";
            return true;
        }
        else {
            nameInput.style.borderColor = "red";
            if (nameInput.value == "") {
                nameErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
            }
            else {
                nameErrorMessage.innerHTML =
                    '<i class="fa-solid fa-triangle-exclamation"></i> Invalid Name format';
            }
            return false;
        }
    }
    validateImage() {
        const fileInput = document.getElementById("uploadImage");
        const uploadedFile = fileInput.files[0];
        const imageContainer = document.getElementById("profilepic");
        if (!uploadedFile) {
            const employeeInfoContainer = document.getElementsByClassName("personal-information")[0];
            const imgContainer = document.getElementsByClassName("left-wrapper")[0];
            const imgWrapper = document.getElementsByClassName("img-wrapper")[0];
            imgContainer.classList.add("left-wrapper-validation");
            imgWrapper.classList.add("img-wrapper-validation");
            employeeInfoContainer.classList.add("personal-information-validation");
            this.editBtn.innerHTML = "Upload Profile Picture";
            this.editBtn.classList.add("Edit-btn-validation");
            return false;
        }
        else {
            imageContainer.style.borderColor = "";
            return true;
        }
    }
    addEmployee() {
        const empNo = document.getElementById("empNo").value;
        const firstName = document.getElementById("firstName")
            .value;
        const lastName = document.getElementById("lastName")
            .value;
        const dob = document.getElementById("dob").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile")
            .value;
        const joiningDate = document.getElementById("joiningDate").value;
        const location = document.getElementById("location")
            .value;
        const jobTitle = document.getElementById("jobTitle")
            .value;
        const department = document.getElementById("department").value;
        const assignManager = document.getElementById("assignManager").value;
        const assignProject = document.getElementById("assignProject").value;
        const empNoValid = this.validateInput(document.getElementById("empNo"));
        const firstNameValid = this.validateInput(document.getElementById("firstName"));
        const lastNameValid = this.validateInput(document.getElementById("lastName"));
        const emailValid = this.validateInput(document.getElementById("email"));
        const mobileValid = this.validateInput(document.getElementById("mobile"));
        const joiningDateValid = this.validateInput(document.getElementById("joiningDate"));
        const imageValid = this.validateImage();
        if (!empNoValid ||
            !firstNameValid ||
            !lastNameValid ||
            !emailValid ||
            !mobileValid ||
            !joiningDateValid ||
            !imageValid) {
            return;
        }
        readURL(empNo);
        document.querySelectorAll(".required-error").forEach((element) => {
            element.innerHTML = "";
        });
        if (empNo.trim() === "") {
            document.getElementById("empNo").style.borderColor =
                "red";
            document.getElementById("requiredField").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (firstName.trim() === "") {
            document.getElementById("firstName").style.borderColor = "red";
            document.getElementById("requiredFName").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (lastName.trim() === "") {
            document.getElementById("lastName").style.borderColor = "red";
            document.getElementById("requiredLName").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (email.trim() === "") {
            document.getElementById("email").style.borderColor =
                "red";
            document.getElementById("requiredEmail").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (email.trim() === "") {
            document.getElementById("email").style.borderColor =
                "red";
            document.getElementById("requiredEmail").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (mobile.trim() === "") {
            document.getElementById("mobile").style.borderColor = "red";
            document.getElementById("requiredMobile").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (joiningDate.trim() === "") {
            document.getElementById("joiningDate").style.borderColor = "red";
            document.getElementById("requiredJDate").innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
        }
        if (empNo.trim() === "" ||
            firstName.trim() === "" ||
            lastName.trim() === "" ||
            email.trim() === "" ||
            joiningDate.trim() === "") {
            return;
        }
        const employee = {
            user: `${firstName} ${lastName}`,
            userDetails: email,
            location: location,
            department: department,
            role: jobTitle,
            empNo: empNo,
            status: "Active",
            joinDt: joiningDate,
        };
        let arrayFromLocalStorage = JSON.parse(localStorage.getItem("EmployeeData") || "[]");
        arrayFromLocalStorage.push(employee);
        localStorage.setItem("EmployeeData", JSON.stringify(arrayFromLocalStorage));
        const addEmployeeBtn = document.getElementById("addEmployeeBtn");
        addEmployeeBtn.disabled = true;
        this.showToast();
    }
    cancel() {
        document.getElementById("addEmployeeForm").reset();
    }
    showToast() {
        let toastBox = document.getElementById("toastBox");
        let toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Employee Added Successfully';
        toastBox.appendChild(toast);
        setTimeout(() => {
            toast.style.display = "none";
            location.href = "../HTML/employee.html";
        }, 5000);
    }
}
const fileTag = document.getElementById("uploadImage");
const preview = document.getElementById("profilepic");
const editBtn = document.getElementById("Edit-btn");
const employeeForm = new EmployeeForm(fileTag, preview, editBtn);
document
    .getElementById("addEmployeeBtn")
    .addEventListener("click", (event) => {
    event.preventDefault();
    employeeForm.addEmployee();
});
document.getElementById("cancelBtn").addEventListener("click", () => {
    employeeForm.cancel();
    location.href = "../HTML/employee.html";
});
function readURL(empNo) {
    const fileInput = document.getElementById("uploadImage");
    const preview = document.getElementById("profilepic");
    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            localStorage.setItem(`imgData_${empNo}`, e.target.result);
            preview.setAttribute("src", e.target.result);
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
}
//# sourceMappingURL=addEmployee.js.map