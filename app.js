let grid;
const form = document.querySelector('#sudoku');
const table = form.querySelector('.grid');

/**
 *  Check if each nimber from the grid is working
 */
function check(grid, row, col, num) {
  var i;

  for (i = 0; i <= 8; i++) {
    if (i != row && grid[i][col] == num) {
      return false;
    }
  }

  for (i = 0; i <= 8; i++) {
   if (i != col && grid[row][i] == num) {
      return false;
    }
  }

  return true;
}

/**
 * Parse sudoku's grid to resolve it
 * @param  {array} matrix grid
 * @return {Boolean}   
 */
function parseGrid(grid) {
  let row;
  let col;
  let num;

  // parse each row of the grid
  for (row = 0; row <= 8; row++) {
    // parse each column of the grid
    for (col = 0; col <= 8; col++) {
      // console.log('SWEEP', row, col);
      // empty string spotted
      if (!grid[row][col]) {
         // generate numbers for each input
        for (num = 1; num <= 9; num++) {
          if (check(grid, row, col, num)) {
            grid[row][col] = num;
            if (parseGrid(grid)) { 
              return true; 
            } else {
              grid[row][col] = "";
            }
          }
        }

        return false;
      }
    }
  }

  return true;
}


/**
 * Get values from the form
 * @return {array} matrix grid
 */
function getDefaultValue() {
  const inputsList = form.querySelectorAll('.grid__cell input');
  const holder = [];

  for (i = 0; i < inputsList.length; i++) {
    //get the form values
    holder[i] = form[i].value;
    grid = [];
    k = -1;

    // from 1 dimensional to matrix
    for (j = 0; j < holder.length; j++) {
      // Découpage toutes les 9 entrées de holder pour créer un nouveau tableau dans matrix
      if (j % 9 === 0) {
        k++;
        grid[k] = [];        
      }
      grid[k].push(holder[j]);
    }
  }

  return grid;
}

/**
 * Display numbers into the HTML
 * @param  {[type]} form selector
 * @param  {array} matrix grid
 */
function displayNumbers(form, grid) {
  //display the solved sudoku numbers
  let z = 0;
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < grid[i].length; j++) {      
      //display the solved sudoku numbers
      form[z].value = grid[i][j];
      z++;
    }
  }
}

/**
 * Create HTML template for Sudoku
 * @param  {Boolean} readonly attributes
 */
function createGrid(readonly = true) {
  const tbody = document.createElement('tbody');

  table.appendChild(tbody);

  for (i = 0; i < 9; i++) {
    let tr = document.createElement('tr');

    tr.classList.add('grid__row');
    tbody.appendChild(tr);

    for (j = 0; j < 9; j++) {    
      let input = document.createElement('input');        
      let td = document.createElement('td');
      const minAttr = document.createAttribute('min');
      minAttr.value = 1;
      const maxAttr = document.createAttribute('max');
      maxAttr.value = 9;
      const readonly = document.createAttribute('readonly');

      td.classList.add("grid__cell");
      tr.appendChild(td);

      input.type = 'number';
      if (readonly === true) {
        input.setAttributeNode(readonly);
      }

      input.setAttributeNode(minAttr);
      input.setAttributeNode(maxAttr);

      td.appendChild(input);
    }
  }
}

/**
 *  Core handler
 */

function solveGrid() {
  getDefaultValue();

  parseGrid(grid);

  displayNumbers(form, grid);
}


/**
 *  Events list handler
 */
function eventsHandler() {
  document.querySelector('#solve')
  .addEventListener('click', solveGrid);

  document.querySelector('#erase')
  .addEventListener('click', () => {
    table.innerHTML = '';
    createGrid(false);
  });

  document.querySelector('#reset')
  .addEventListener('click', () => {
    document.location = '';
  });
}

function init() {
  eventsHandler();
}

init();

