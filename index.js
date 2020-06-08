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

  const getCellValue = (cellId) => {
    const cell = document.getElementById(cellId);
    return Number(cell.textContent);
  };

  const setCellValue = (rowIndex, columnIndex) => {
    const cell = document.getElementById(`${rowIndex}_${columnIndex}`);
    const newVal = Number(cell.textContent) + 1;
    cell.textContent = newVal;

    cell.classList.remove('backgroundAnimatedYellow', 'backgroundAnimatedGreen');
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

  const isPerfectSquare = (number) => Math.sqrt(number) % 1 === 0;

  const isFibonacci = (cellId) => {
    const n = getCellValue(cellId);

    const a = 5 * Math.pow(n, 2) + 4;
    const b = 5 * Math.pow(n, 2) - 4;

    return n !== 0 && (isPerfectSquare(a) || isPerfectSquare(b));
  };

  const isAdjacentFibonacci = (cellId, adjacentCellId) => {
    const nextNumber = getCellValue(adjacentCellId);
    const number = getCellValue(cellId);

    if (nextNumber === 1 && number === 1) {
      return true;
    } else if (nextNumber - number > 0 && nextNumber - number <= number) {
      return true;
    } else {
      return false;
    }
  };

  const clearCells = (fibonacciArray) => {
    fibonacciArray.map((cellId) => {
      const cell = document.getElementById(cellId);

      cell.classList.remove('backgroundAnimatedGreen');
      void cell.offsetWidth;
      cell.classList.add('backgroundAnimatedGreen');

      setTimeout(() => (cell.textContent = ''), 4000);
    });
  };

  const checkFibonacciSequence = (rowIndex, columnIndex) => {
    for (let k = 1; k <= ROW_NUMBER; k++) {
      // check columns for each row
      if (k !== rowIndex) {
        if (isFibonacci(`${k}_${columnIndex}`)) {
          let fibArr = [];
          fibArr.push(`${k}_${columnIndex}`);

          for (let i = columnIndex - 1; i >= columnIndex - 4; i--) {
            if (i > 0) {
              if (fibArr.length < 5) {
                if (isFibonacci(`${k}_${i}`) && isAdjacentFibonacci(`${k}_${i}`, `${k}_${i + 1}`)) {
                  if (fibArr.filter((cellId) => getCellValue(cellId) === 1).length < 2) {
                    fibArr.push(`${k}_${i}`);
                  }
                } else {
                  break;
                }
              } else {
                clearCells(fibArr);
                fibArr = [];
              }
            }
          }

          if (fibArr.length > 0) {
            for (let j = columnIndex + 1; j <= columnIndex + 4; j++) {
              if (fibArr.length < 5) {
                if (isFibonacci(`${k}_${j}`) && isAdjacentFibonacci(`${k}_${j - 1}`, `${k}_${j}`)) {
                  fibArr.push(`${k}_${j}`);
                } else {
                  break;
                }
              } else {
                clearCells(fibArr);
                fibArr = [];
              }
            }
          } 
        }
      } else {
        // check row of the clicked cell
        //console.log(rowIndex, columnIndex);
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
          checkFibonacciSequence(rowIndex, columnIndex);
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
