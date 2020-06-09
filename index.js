'use strict';
{
  const ROW_NUMBER = 50;
  const COLUMN_NUMBER = 50;

  const getCellNumber = (cellId) => {
    const cell = document.getElementById(cellId);
    return Number(cell.textContent);
  };

  const setCellNumber = (rowIndex, columnIndex) => {
    const cell = document.getElementById(`${rowIndex}_${columnIndex}`);
    const newVal = Number(cell.textContent) + 1;
    cell.textContent = newVal;

    cell.classList.remove('backgroundAnimatedYellow', 'backgroundAnimatedGreen');
    void cell.offsetWidth;
    cell.classList.add('backgroundAnimatedYellow');
  };

  const incrementCells = (rowIndex, columnIndex) => {
    for (let i = 1; i <= 50; i++) {
      setCellNumber(rowIndex, i); // increment the value of the cells that are in the same row as the clicked cell

      if (i !== rowIndex) {
        setCellNumber(i, columnIndex); // increment the value of the cells that are in the same column as the clicked cell
      }
    }
  };

  const isPerfectSquare = (number) => Math.sqrt(number) % 1 === 0;

  const isFibonacci = (cellId) => {
    const number = getCellNumber(cellId);

    const caseOne = 5 * Math.pow(number, 2) + 4;
    const caseTwo = 5 * Math.pow(number, 2) - 4;

    return number !== 0 && (isPerfectSquare(caseOne) || isPerfectSquare(caseTwo));
  };

  const isAdjacentFibonacci = (cellId, adjacentCellId) => {
    const nextNumber = getCellNumber(adjacentCellId);
    const number = getCellNumber(cellId);

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

      setTimeout(() => (cell.textContent = ''), 3000);
    });
  };

  const insertCellIdToFibonacciArray = (rowIndex, columnIndex, fibArr) => {
    if (getCellNumber(`${rowIndex}_${columnIndex}`) === 1) {
      if (fibArr.filter((cellId) => getCellNumber(cellId) === 1).length < 2) {
        fibArr.push(`${rowIndex}_${columnIndex}`);
      }
    } else {
      fibArr.push(`${rowIndex}_${columnIndex}`);
    }
    return fibArr;
  };

  // This function checks four columns before the clicked cell's column  to find and delete
  // five consecutive fibonacci numbers
  const checkPreviousColumnsForFibonacci = (rowIndex, clickedColumnIndex, fibArr) => {
    for (
      let columnIndex = clickedColumnIndex - 1;
      columnIndex >= clickedColumnIndex - 4;
      columnIndex--
    ) {
      if (columnIndex > 0) {
        if (fibArr.length < 5) {
          if (
            isFibonacci(`${rowIndex}_${columnIndex}`) &&
            isAdjacentFibonacci(`${rowIndex}_${columnIndex}`, `${rowIndex}_${columnIndex + 1}`)
          ) {
            fibArr = insertCellIdToFibonacciArray(rowIndex, columnIndex, fibArr);
          } else {
            break;
          }
        } else {
          clearCells(fibArr);
          fibArr = [];
        }
      }
    }
    return fibArr;
  };

  // This function checks four columns after the clicked cell's column  to find and delete
  // five consecutive fibonacci numbers
  const checkNextColumnsForFibonacci = (rowIndex, clickedColumnIndex, fibArr) => {
    for (
      let columnIndex = clickedColumnIndex + 1;
      columnIndex <= clickedColumnIndex + 4;
      columnIndex++
    ) {
      if (fibArr.length < 5) {
        if (
          isFibonacci(`${rowIndex}_${columnIndex}`) &&
          isAdjacentFibonacci(`${rowIndex}_${columnIndex - 1}`, `${rowIndex}_${columnIndex}`)
        ) {
          fibArr = insertCellIdToFibonacciArray(rowIndex, columnIndex, fibArr);
        } else {
          break;
        }
      } else {
        clearCells(fibArr);
        fibArr = [];
      }
    }
    return fibArr;
  };

  // This function checks the row of the clicked cell to find and delete
  // five consecutive fibonacci numbers
  const checkSameRowForFibonacci = (rowIndex) => {
    const cells = [];
    for (let columnIndex = 1; columnIndex <= COLUMN_NUMBER; columnIndex++) {
      cells.push(`${rowIndex}_${columnIndex}`);
    }

    cells.reduce((fibArr, cell) => {
      if (fibArr.length === 0) {
        if (isFibonacci(cell)) fibArr.push(cell);
      } else if (isFibonacci(cell) && isAdjacentFibonacci(fibArr[fibArr.length - 1], cell)) {
        if (getCellNumber(cell) === 1) {
          if (fibArr.filter((cellId) => getCellNumber(cellId) === 1).length < 2) {
            fibArr.push(cell);
          } else {
            fibArr.shift();
            fibArr.push(cell);
          }
        } else {
          fibArr.push(cell);
        }
      } else {
        fibArr = [];
      }

      if (fibArr.length === 5) {
        clearCells(fibArr);
        fibArr = [];
      }

      return fibArr;
    }, []);
  };

  const findAndDeleteConsecutiveFibonacci = (clickedRowIndex, clickedColumnIndex) => {
    for (let rowIndex = 1; rowIndex <= ROW_NUMBER; rowIndex++) {
      // check four columns before and four columns after the clicked cell for each row for fibonacci sequence EXCEPT the clicked row.
      if (rowIndex !== clickedRowIndex) {
        if (isFibonacci(`${rowIndex}_${clickedColumnIndex}`)) {
          let fibArr = [];
          fibArr.push(`${rowIndex}_${clickedColumnIndex}`);

          fibArr = checkPreviousColumnsForFibonacci(rowIndex, clickedColumnIndex, fibArr);

          if (fibArr.length > 0) {
            fibArr = checkNextColumnsForFibonacci(rowIndex, clickedColumnIndex, fibArr);
          }

          if (fibArr.length === 5) {
            clearCells(fibArr);
            fibArr = [];
          }
        }
      } else {
        // check the same row of the clicked cell for fibonacci sequence.
        checkSameRowForFibonacci(clickedRowIndex);
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
          findAndDeleteConsecutiveFibonacci(rowIndex, columnIndex);
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
