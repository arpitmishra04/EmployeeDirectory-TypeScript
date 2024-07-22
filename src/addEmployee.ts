interface FileInput {
  files: FileList | null;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject
  ): void;
}

class EmployeeForm {
  private selectedFiles: FileList | null = null;

  constructor(
    private fileTag: FileInput,
    private preview: HTMLImageElement,
    private editBtn: HTMLButtonElement
  ) {
    this.init();
  }

  private init() {
    this.fileTag.addEventListener("change", () => {
      this.selectedFiles = this.fileTag.files;
      this.changeImage();
    });

    document.querySelectorAll("input").forEach((input) => {
      if (input.id !== "dob") {
        input.addEventListener("focusout", () =>
          this.validateInput(input as HTMLInputElement)
        );
      }
      input.addEventListener("input", () =>
        this.removeRequiredMessage(input as HTMLInputElement)
      );
    });

    const empNo = document.getElementById("empNo") as HTMLInputElement;
    empNo.addEventListener("keyup", () => this.validateEmployeeNumber());

    const mobileField = document.getElementById("mobile") as HTMLInputElement;
    mobileField.addEventListener("keyup", () => this.validatePhoneNumber());

    const emailField = document.getElementById("email") as HTMLInputElement;
    emailField.addEventListener("keyup", () => this.validateEmail());

    const firstNameField = document.getElementById(
      "firstName"
    ) as HTMLInputElement;
    firstNameField.addEventListener("keyup", () =>
      this.validateName("firstName", "requiredFName")
    );

    const lastNameField = document.getElementById(
      "lastName"
    ) as HTMLInputElement;
    lastNameField.addEventListener("keyup", () =>
      this.validateName("lastName", "requiredLName")
    );
  }

  private changeImage() {
    if (this.selectedFiles && this.selectedFiles[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.preview.setAttribute("src", e.target!.result as string);
      };
      reader.readAsDataURL(this.selectedFiles[0]);
    }
  }

  private validateInput(input: HTMLInputElement) {
    if (input.value.trim() === "") {
      input.style.borderColor = "red";
      if (input.nextElementSibling)
        input.nextElementSibling.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
      return false;
    } else {
      input.style.borderColor = "";
      if (input.nextElementSibling) input.nextElementSibling.innerHTML = "";
      return true;
    }
  }

  private removeRequiredMessage(input: HTMLInputElement) {
    if (input.value.trim() !== "") {
      input.style.borderColor = "";
      if (input.nextElementSibling) input.nextElementSibling.innerHTML = "";
    }
  }

  private validateEmployeeNumber() {
    const empInput = document.getElementById("empNo") as HTMLInputElement;
    const empnoErrorMessage = document.getElementById(
      "requiredField"
    ) as HTMLSpanElement;
    const employeeNumber = empInput.value; // Get the value of the email input field

    if (/^([a-zA-Z0-9]+)$/.test(employeeNumber)) {
      // Valid email format
      empInput.style.borderColor = "";
      empnoErrorMessage.innerHTML = "";
      return true;
    } else {
      // Invalid email format
      empInput.style.borderColor = "red";
      if (empInput.value == "") {
        empnoErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
      } else {
        empnoErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> Employee Number should not contain special symbols or spaces';
      }
      return false;
    }
  }

  private validatePhoneNumber() {
    const phone = document.getElementById("mobile") as HTMLInputElement;
    const phoneNumber = (document.getElementById("mobile") as HTMLInputElement)
      .value; // Get the value of the mobile input field
    const mobileErrorMessage = document.getElementById(
      "requiredMobile"
    ) as HTMLSpanElement;

    if (/^[0-9]+$/.test(phoneNumber)) {
      // Valid phone number format
      (
        document.getElementById("mobile") as HTMLInputElement
      ).style.borderColor = "";
      mobileErrorMessage.innerHTML = "";
      return true;
    } else {
      // Invalid phone number format
      (
        document.getElementById("mobile") as HTMLInputElement
      ).style.borderColor = "red";

      if (phone.value == "") {
        mobileErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
      } else {
        mobileErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> Invalid phone number';
      }
      return false;
    }
  }

  private validateEmail() {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const emailErrorMessage = document.getElementById(
      "requiredEmail"
    ) as HTMLSpanElement;
    const email = emailInput.value; // Get the value of the email input field

    if (
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email)
    ) {
      // Valid email format
      emailInput.style.borderColor = "";
      emailErrorMessage.innerHTML = "";
      return true;
    } else {
      // Invalid email format
      emailInput.style.borderColor = "red";
      if (emailInput.value == "") {
        emailErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
      } else {
        emailErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> Invalid email format';
      }
      return false;
    }
  }

  private validateName(inputField: string, errorMessageId: string) {
    const nameInput = document.getElementById(inputField) as HTMLInputElement;
    const nameErrorMessage = document.getElementById(
      errorMessageId
    ) as HTMLSpanElement;
    const name = nameInput.value.trim();

    if (/^([a-zA-Z]+)$/.test(name)) {
      // Valid name format
      nameInput.style.borderColor = "";
      nameErrorMessage.innerHTML = "";
      return true;
    } else {
      // Invalid name format
      nameInput.style.borderColor = "red";
      if (nameInput.value == "") {
        nameErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
      } else {
        nameErrorMessage.innerHTML =
          '<i class="fa-solid fa-triangle-exclamation"></i> Invalid Name format';
      }
      return false;
    }
  }

  private validateImage() {
    const fileInput = document.getElementById(
      "uploadImage"
    ) as HTMLInputElement;
    const uploadedFile = fileInput.files![0];
    const imageContainer = document.getElementById(
      "profilepic"
    ) as HTMLImageElement;

    if (!uploadedFile) {
      // If no image is selected, display error message and apply styling
      const employeeInfoContainer = document.getElementsByClassName(
        "personal-information"
      )[0] as HTMLDivElement;

      const imgContainer = document.getElementsByClassName(
        "left-wrapper"
      )[0] as HTMLDivElement;
      const imgWrapper = document.getElementsByClassName(
        "img-wrapper"
      )[0] as HTMLDivElement;

      imgContainer.classList.add("left-wrapper-validation");
      imgWrapper.classList.add("img-wrapper-validation");
      employeeInfoContainer.classList.add("personal-information-validation");
      this.editBtn.innerHTML = "Upload Profile Picture";
      this.editBtn.classList.add("Edit-btn-validation");
      return false;
    } else {
      // If an image is selected, clear error message and styling
      imageContainer.style.borderColor = "";
      return true;
    }
  }

  public addEmployee() {
    // Logic to add employee
    const empNo = (document.getElementById("empNo") as HTMLInputElement).value;
    const firstName = (document.getElementById("firstName") as HTMLInputElement)
      .value;
    const lastName = (document.getElementById("lastName") as HTMLInputElement)
      .value;
    const dob = (document.getElementById("dob") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const mobile = (document.getElementById("mobile") as HTMLInputElement)
      .value;
    const joiningDate = (
      document.getElementById("joiningDate") as HTMLInputElement
    ).value;
    const location = (document.getElementById("location") as HTMLInputElement)
      .value;
    const jobTitle = (document.getElementById("jobTitle") as HTMLInputElement)
      .value;
    const department = (
      document.getElementById("department") as HTMLInputElement
    ).value;
    const assignManager = (
      document.getElementById("assignManager") as HTMLInputElement
    ).value;
    const assignProject = (
      document.getElementById("assignProject") as HTMLInputElement
    ).value;

    // Validate all fields
    const empNoValid = this.validateInput(
      document.getElementById("empNo") as HTMLInputElement
    );
    const firstNameValid = this.validateInput(
      document.getElementById("firstName") as HTMLInputElement
    );
    const lastNameValid = this.validateInput(
      document.getElementById("lastName") as HTMLInputElement
    );
    const emailValid = this.validateInput(
      document.getElementById("email") as HTMLInputElement
    );
    const mobileValid = this.validateInput(
      document.getElementById("mobile") as HTMLInputElement
    );
    const joiningDateValid = this.validateInput(
      document.getElementById("joiningDate") as HTMLInputElement
    );

    // Validate image
    const imageValid = this.validateImage();

    // If any field is invalid, return early
    if (
      !empNoValid ||
      !firstNameValid ||
      !lastNameValid ||
      !emailValid ||
      !mobileValid ||
      !joiningDateValid ||
      !imageValid
    ) {
      return;
    }

    // This triggers upload functionality
    readURL(empNo);

    // Clear any existing error messages
    document.querySelectorAll(".required-error").forEach((element) => {
      element.innerHTML = "";
    });

    // Show required field messages for empty fields
    if (empNo.trim() === "") {
      (document.getElementById("empNo") as HTMLInputElement).style.borderColor =
        "red";
      (document.getElementById("requiredField") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }
    if (firstName.trim() === "") {
      (
        document.getElementById("firstName") as HTMLInputElement
      ).style.borderColor = "red";
      (document.getElementById("requiredFName") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }
    if (lastName.trim() === "") {
      (
        document.getElementById("lastName") as HTMLInputElement
      ).style.borderColor = "red";
      (document.getElementById("requiredLName") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }
    if (email.trim() === "") {
      (document.getElementById("email") as HTMLInputElement).style.borderColor =
        "red";
      (document.getElementById("requiredEmail") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }

    if (email.trim() === "") {
      (document.getElementById("email") as HTMLInputElement).style.borderColor =
        "red";
      (document.getElementById("requiredEmail") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }
    if (mobile.trim() === "") {
      (
        document.getElementById("mobile") as HTMLInputElement
      ).style.borderColor = "red";
      (document.getElementById("requiredMobile") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }
    if (joiningDate.trim() === "") {
      (
        document.getElementById("joiningDate") as HTMLInputElement
      ).style.borderColor = "red";
      (document.getElementById("requiredJDate") as HTMLSpanElement).innerHTML =
        '<i class="fa-solid fa-triangle-exclamation"></i> This field is required';
    }

    // If any required field is empty, return early
    if (
      empNo.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      joiningDate.trim() === ""
    ) {
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

    let arrayFromLocalStorage = JSON.parse(
      localStorage.getItem("EmployeeData") || "[]"
    );
    arrayFromLocalStorage.push(employee);
    localStorage.setItem("EmployeeData", JSON.stringify(arrayFromLocalStorage));
    const addEmployeeBtn = document.getElementById(
      "addEmployeeBtn"
    ) as HTMLButtonElement;
    addEmployeeBtn.disabled = true;
    this.showToast();
  }

  public cancel() {
    (document.getElementById("addEmployeeForm") as HTMLFormElement).reset();
  }

  public showToast() {
    let toastBox = document.getElementById("toastBox") as HTMLDivElement;
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

// Initialize EmployeeForm
const fileTag = document.getElementById("uploadImage") as HTMLInputElement;
const preview = document.getElementById("profilepic") as HTMLImageElement;
const editBtn = document.getElementById("Edit-btn") as HTMLButtonElement;

const employeeForm = new EmployeeForm(fileTag, preview, editBtn);

document
  .getElementById("addEmployeeBtn")!
  .addEventListener("click", (event) => {
    event.preventDefault();
    employeeForm.addEmployee();
  });

document.getElementById("cancelBtn")!.addEventListener("click", () => {
  employeeForm.cancel();
  location.href = "../HTML/employee.html";
});

function readURL(empNo: string) {
  const fileInput = document.getElementById("uploadImage") as HTMLInputElement;
  const preview = document.getElementById("profilepic") as HTMLImageElement;

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      localStorage.setItem(`imgData_${empNo}`, e.target!.result as string); // Use empNo in the key
      preview.setAttribute("src", e.target!.result as string); // Set the preview image source
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}
