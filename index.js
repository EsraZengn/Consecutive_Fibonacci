'use strict';

// OK   Create a 50x50 grid.
// OK   If you click a cell, all cells in the same row and column get +1.
// OK   If a cell was empty, it gets the value 1.
// OK   After every change, the cell lightens up (shortly) in yellow.

// If 5 consecutive numbers of the Fibonacci sequence are next to each other,
//  the cells lighten up (shortly) in green and
//  cells will be emptied afterwards.
// OK   JAVASCRIPT You can use a programming language that you find suited best.

{
  const ROW_NUMBER = 50;
  const COLUMN_NUMBER = 50;

  const setCellValue = (rowIndex, columnIndex) => {
    const cell = document.getElementById(`${rowIndex}_${columnIndex}`);
    const newVal = Number(cell.textContent) + 1;
    cell.textContent = newVal;

    cell.classList.remove('backgroundAnimatedYellow');
    void cell.offsetWidth;
    cell.classList.add('backgroundAnimatedYellow');
  };

  const incrementCells = (rowIndex, columnIndex) => {
    for (let i = 1; i <= 50; i++) {
      setCellValue(rowIndex, i); // increment the value of the cells that are in the same row as the clicked cell

      if (i !== rowIndex) {
        setCellValue(i, columnIndex); // increment the value of the cells that are in the same column as the clicked cell
      }
    }
  };

  const createTableCells = (table) => {
    for (let rowIndex = 1; rowIndex <= ROW_NUMBER; rowIndex++) {
      const row = document.createElement('tr');

      for (let columnIndex = 1; columnIndex <= COLUMN_NUMBER; columnIndex++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${rowIndex}_${columnIndex}`);
        row.appendChild(cell);

        cell.addEventListener('click', () => {
          incrementCells(rowIndex, columnIndex);
        });
      }

      table.appendChild(row);
    }
  };

  const main = () => {
    const root = document.getElementById('root');
    const table = document.createElement('table');
    root.appendChild(table);

    createTableCells(table);
  };

  window.onload = () => main();
}
