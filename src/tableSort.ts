interface SortableTableElements {
  table: HTMLTableElement;
}

class SortableTable {
  private table: HTMLTableElement;
  private ascending: boolean;

  constructor(elements: SortableTableElements) {
    this.table = elements.table;
    this.ascending = true;
    this.setupTableHeaderListeners();
  }

  private setupTableHeaderListeners() {
    const headers = this.table.querySelectorAll('th');
    headers.forEach((header, index) => {
      header.addEventListener('click', () => this.sortTable(index));
    });
  }

  public sortTable(colIndex: number) {
    let switching = true;
    while (switching) {
      switching = false;
      let shouldSwitch = false;
      const rows = Array.from(this.table.rows).slice(1); // Exclude the header row
      let i = 0; // Declare i outside the loop
      for (; i < rows.length - 1; i++) { // Move the declaration out of the loop
        const x = this.getValue(rows[i].getElementsByTagName('td')[colIndex]);
        const y = this.getValue(rows[i + 1].getElementsByTagName('td')[colIndex]);
        if (this.ascending ? x.localeCompare(y) > 0 : x.localeCompare(y) < 0) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    this.ascending = !this.ascending;
  }

  private getValue(cell: HTMLTableCellElement): string {
    const h4 = cell.querySelector('h4');
    return h4 ? h4.innerText.toLowerCase() : cell.innerText.toLowerCase();
  }
}

// Initialize the sortable table
const sortableTableElements: SortableTableElements = {
  table: document.getElementById('table') as HTMLTableElement,
};

const sortableTable = new SortableTable(sortableTableElements);
