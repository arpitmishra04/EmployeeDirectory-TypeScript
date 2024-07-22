"use strict";
class Sidebar {
    constructor(elements) {
        this.sidebar = elements.sidebar;
        this.handle = elements.handle;
        this.content = elements.content;
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.handle.addEventListener("click", () => {
            this.toggleSidebar();
        });
    }
    toggleSidebar() {
        this.sidebar.classList.toggle("close");
        this.content.classList.toggle("content-width");
    }
}
const sidebarElements = {
    sidebar: document.getElementById("sidebar"),
    handle: document.getElementById("handle"),
    content: document.getElementById("content"),
};
const sidebar = new Sidebar(sidebarElements);
//# sourceMappingURL=sidebar.js.map