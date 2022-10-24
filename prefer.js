const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const scaleOneList = document.getElementById('scale1-list');
const scaleTwoList = document.getElementById('scale2-list');
const scaleThreeList = document.getElementById('scale3-list');
const scaleFourList = document.getElementById('scale4-list');

// Items
let updatedOnLoad = false;

//  Arrays
let scaleOneListArray = [];
let scaleTwoListArray = [];
let scaleThreeListArray = [];
let scaleFourListArray = [];
let listArrays = [];

// Drag Functionality

let draggedItem;
let dragging = false;
let currentColumn;




// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('scaleOneItems')) {
    scaleOneListArray = JSON.parse(localStorage.scaleOneItems);
    scaleTwoListArray = JSON.parse(localStorage.scaleTwoItems);
    scaleThreeListArray = JSON.parse(localStorage.scaleThreeItems);
    scaleFourListArray = JSON.parse(localStorage.scaleFourItems);
  } else {
    scaleOneListArray = ['Loneliness', 'Fireworks'];
    scaleTwoListArray = ['Vacuum Cleaner', 'Food:Onions'];
    scaleThreeListArray = ['Activity:Watching TV', 'Food:Salmon'];
    scaleFourListArray = ['Location: Any Park'];
  }
}


// Set localStorage Arrays
function updateSavedColumns() {
    listArrays=[scaleOneListArray, scaleTwoListArray, scaleThreeListArray, scaleFourListArray];
    const arrayNames= ['scaleOne', 'scaleTwo', 'scaleThree', 'scaleFour'];
    arrayNames.forEach((arrayName, index) =>{
        localStorage.setItem(`${arrayName}Items`,JSON.stringify(listArrays[index]));
    });
}

//filter arrays to remove empty items

function filterArray(array){
    const filteredArray = array.filter(item => item !== null)
    return filteredArray;
}



// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {


  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  listEl.id= index;
  listEl.setAttribute('onfocusout',`updateItem(${index}, ${column})`);
  //Append
  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
    console.log(updatedOnLoad);
  // Check localStorage once
    if (!updatedOnLoad){
        getSavedColumns();
    }
  // scale1 Column
  scaleOneList.textContent = '';
  scaleOneListArray.forEach((scaleOneItem, index)=>{
    createItemEl(scaleOneList, 0, scaleOneItem, index);
  });
  scaleOneListArray = filterArray(scaleOneListArray);
  // scale2 Column
  scaleTwoList.textContent = '';
  scaleTwoListArray.forEach((scaleTwoItem, index)=>{
    createItemEl(scaleTwoList, 1, scaleTwoItem, index);
  });
  scaleTwoListArray = filterArray(scaleTwoListArray);
  // scale3 Column
  scaleThreeList.textContent = '';
  scaleThreeListArray.forEach((scaleThreeItem, index)=>{
    createItemEl(scaleThreeList, 2, scaleThreeItem, index);
  });
  scaleThreeListArray = filterArray(scaleThreeListArray);
  // scale4 Column
  scaleFourList.textContent = '';
  scaleFourListArray.forEach((scaleFourItem, index)=>{
    createItemEl(scaleFourList, 3, scaleFourItem, index);
  });
  scaleFourListArray = filterArray(scaleFourListArray);


  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  console.log(updatedOnLoad);
  updateSavedColumns();

}
//Update Item - Delete if needed or update

function updateItem(id, column){
    const selectedArray = listArrays[column];
    const selectedColumnEl = listColumns[column].children;
    if (!dragging) {
        if(!selectedColumnEl[id].textContent){
            delete selectedArray[id];
        } else {
            selectedArray[id] = selectedColumnEl[id].textContent;
        }
        updateDOM();
    }

}

//add to column list, reset

function addToColumn(column){
    const itemText = addItems[column].textContent;
    const selectedArray = listArrays[column];
    selectedArray.push(itemText);
    addItems[column].textContent = '';
    updateDOM();
}


//show add item input box
function showInputBox(column){
    addBtns[column].style.visibility = 'hidden';
    saveItemBtns[column].style.display = 'flex';
    addItemContainers[column].style.display = 'flex';
}

// hide item input box

function hideInputBox(column){
    addBtns[column].style.visibility = 'visible';
    saveItemBtns[column].style.display = 'none';
    addItemContainers[column].style.display = 'none';
    addToColumn(column);
}

// allow to reflect drag and drop

function rebuildArrays(){

    scaleOneListArray = [];
    for (let i = 0; i < scaleOneList.children.length; i++){
        scaleOneListArray.push(scaleOneList.children[i].textContent);
    }

    scaleTwoListArray = [];
    for (let i = 0; i < scaleTwoList.children.length; i++){
        scaleTwoListArray.push(scaleTwoList.children[i].textContent);
    }

    scaleThreeListArray = [];
    for (let i = 0; i < scaleThreeList.children.length; i++){
        scaleThreeListArray.push(scaleThreeList.children[i].textContent);
    }

    scaleFourListArray = [];
    for (let i = 0; i < scaleFourList.children.length; i++){
        scaleFourListArray.push(scaleFourList.children[i].textContent);
    }
    updateDOM();
}

// drag function
function drag(e){
    draggedItem = e.target;
    dragging = true;
}

// allow to drop function

function allowDrop(e){
    e.preventDefault();
}

// enter drop fundtion 

function dragEnter(column){
    listColumns[column].classList.add('over');
    currentColumn = column;
}

// drop function

function drop(e){
    e.preventDefault();
    // remove background color and padding
    listColumns.forEach((column) =>{
        column.classList.remove('over');
    });
    // add item to column 
    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);

    // dragging complete 
    dragging = false;
    rebuildArrays();
}


// OnLoad

updateDOM();

