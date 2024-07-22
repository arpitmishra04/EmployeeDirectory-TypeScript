interface ElementWithMatches extends Element {
  matches(selector: string): boolean;
}

class Dropdown {
  private inputField: HTMLInputElement;
  private cancelBtn: HTMLButtonElement;
  private dropdownContent: HTMLDivElement;

  constructor() {
    this.inputField = document.getElementById("assign-employees") as HTMLInputElement;
    this.cancelBtn = document.getElementById("cancel") as HTMLButtonElement;
    this.dropdownContent = document.querySelector(".dropdown-content") as HTMLDivElement;

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.inputField.addEventListener("focus", () => {
      this.dropdownContent.classList.add("show");
    });

    window.addEventListener("click", (event: Event) => {
      if (!(event.target as ElementWithMatches)?.matches("#assign-employees")) {
        this.dropdownContent.classList.remove("show");
      }
    });

    this.dropdownContent.addEventListener("click", (event: Event) => {
      event.stopPropagation();
    });

    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      '.dropdown-content input[type="checkbox"]'
    );
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
