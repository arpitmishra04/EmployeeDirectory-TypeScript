"use strict";
class SortableTable {
    constructor(elements) {
        this.table = elements.table;
        this.ascending = true;
        this.setupTableHeaderListeners();
    }
    setupTableHeaderListeners() {
        const headers = this.table.querySelectorAll('th');
        headers.forEach((header, index) => {
            header.addEventListener('click', () => this.sortTable(index));
        });
    }
    sortTable(colIndex) {
        var _a;
        let switching = true;
        while (switching) {
            switching = false;
            let shouldSwitch = false;
            const rows = Array.from(this.table.rows).slice(1);
            let i = 0;
            for (; i < rows.length - 1; i++) {
                const x = this.getValue(rows[i].getElementsByTagName('td')[colIndex]);
                const y = this.getValue(rows[i + 1].getElementsByTagName('td')[colIndex]);
                if (this.ascending ? x.localeCompare(y) > 0 : x.localeCompare(y) < 0) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                (_a = rows[i].parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
        this.ascending = !this.ascending;
    }
    getValue(cell) {
        const h4 = cell.querySelector('h4');
        return h4 ? h4.innerText.toLowerCase() : cell.innerText.toLowerCase();
    }
}
const sortableTableElements = {
    table: document.getElementById('table'),
};
const sortableTable = new SortableTable(sortableTableElements);
//# sourceMappingURL=tableSort.js.map