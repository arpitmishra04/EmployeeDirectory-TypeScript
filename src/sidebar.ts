interface SidebarElements {
  sidebar: HTMLElement;
  handle: HTMLImageElement;
  content: HTMLElement;
}

class Sidebar {
  private sidebar: HTMLElement;
  private handle: HTMLImageElement;
  private content: HTMLElement;

  constructor(elements: SidebarElements) {
    this.sidebar = elements.sidebar;
    this.handle = elements.handle;
    this.content = elements.content;
    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.handle.addEventListener("click", () => {
      this.toggleSidebar();
    });
  }

  private toggleSidebar() {
    this.sidebar.classList.toggle("close");
    this.content.classList.toggle("content-width");
  }
}

// Initialize the sidebar
const sidebarElements: SidebarElements = {
  sidebar: document.getElementById("sidebar") as HTMLElement,
  handle: document.getElementById("handle") as HTMLImageElement,
  content: document.getElementById("content") as HTMLElement,
};

const sidebar = new Sidebar(sidebarElements);
