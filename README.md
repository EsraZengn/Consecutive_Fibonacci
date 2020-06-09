# Lessonup_TA

## Description:

Create a 50x50 grid. If you click a cell, all cells in the same row and column get +1. If a cell was empty, it gets the value 1. After every change, the cell lightens up (shortly) in yellow. If 5 consecutive numbers of the Fibonacci sequence are next to each other, the cells lighten up (shortly) in green and cells will be emptied afterwards. You can use a programming language that you find suited best.

## How to run:

You can clone the repository to your local machine and run and test the application by opening index.html in your browser.

## Code explanation:

1. Html, css and Javascript are used to develope the application.
2. First, a table is created with 50 rows and 50 columns.
3. An eventListener function is appended to each cell of the table for the click event. When a cell is clicked;

- Increment cell values
  All cells in the same row and column get +1.
  If cell is empty, it gets the value 1.
  After every change, the cell whose value changed lightens up for 2 seconds in yellow.

- Find and delete five consecutive Fibonacci numbers
  When a cell is clicked, the value of the cells who are on the same row and the column are also changed . So Fibonacci sequences are searched for the following cases:
  . For every row other than clicked cell's row, check the previous four columns and next four columns of the clicked cell for Fibonacci sequences
  . Check the whole row of the clicked cell for the Fibonacci sequences
  If there are cells with Fibonacci sequence, they lighten up for 2 seconds in green and will be emptied afterwards.

