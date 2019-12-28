/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Global variables
   -  The name unprocessedStudentList is chosen to reflect the fact that I've built the app to use
      a variety of data sources. There are several different lists.
   
***/ 
let pageLength = 10; // In principle it could be changed!
const studentUl = document.querySelector('.student-list');
let unprocessedStudentList = document.querySelectorAll('.student-item');
// Since that is not an array, and we need the .slice method, we need to make an array from it:
let unprocessedStudentArray = Array.from(unprocessedStudentList);
let paginatedStudentArray = [];

const numberOfPages = () => {
  let numberOfStudents = unprocessedStudentList.length;
  let pages = Math.floor(numberOfStudents / pageLength) + 1;
  return pages;
}

/***
    Functions to establish the array of students ready for displaying
***/

const createPaginatedStudentArray = (unprocessedArray, pageLength) => {
  let processedArray = [];
  for (let i=0; i<unprocessedArray.length; i+=pageLength) {
    let pageArray = unprocessedArray.slice(i,i+pageLength);
    processedArray.push(pageArray)
  }
  return processedArray;
}

/*** 
   Create the `showPage` function to hide all of the items in the 
***/

const setUpPageData = () => {
  paginatedStudentArray = createPaginatedStudentArray(unprocessedStudentArray,pageLength);
  appendPageLinks();
  showPage(paginatedStudentArray[0]);
}

const hideLis = () => {
  for (let i=0; i<unprocessedStudentList.length; i++) {
    const li = unprocessedStudentList[i];
    li.style.display = 'none';
  }
}

const showPage = (studentLiArray) => {
  hideLis();
  for (let i=0; i<studentLiArray.length; i++) {
    const li = studentLiArray[i];
    li.style.display = '';
  }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = () => {
  const onClickingLink = (event) => {
    const target = event.target;
    const pageIndex = parseInt(event.target.textContent) -1;
    const pageToDisplay = paginatedStudentArray[pageIndex];
    showPage(pageToDisplay);
  }
  const parentDiv = document.querySelector('.page');
  const oldPageLinks = document.querySelector('.pagination');
  const linkDiv = document.createElement('div');
  const linksUL = document.createElement('ul');
  if (oldPageLinks) {
    parentDiv.removeChild(oldPageLinks);
  }
  parentDiv.appendChild(linkDiv);
  linkDiv.classList.add('pagination');
  linkDiv.appendChild(linksUL);
  for (let i=0; i<numberOfPages(); i++) {
    let link = document.createElement('li');
    let pageNumber = i+1;
    link.innerHTML = '<a href="#">' + pageNumber + '</a>';
    linksUL.appendChild(link);
  }
  linksUL.addEventListener('click',onClickingLink,false);
}

// Finally, running the code once the page has loaded.


// Firstly: I got fed up of constantly scrolling down on my laptop, whose screen is 
// significantly smaller than that of our Mac!
if (window.screen.height < 1000) {
  pageLength = 5;
}

setUpPageData();

console.log('height: ' + window.screen.height + '; width: ' + window.screen.width);

/*
  Still to do:
   - update event handlers on the link buttons to display stuff
   - update the showPage function so that it horses li's conditionally and sets display.none
   - better still, do the removing of stuff in the extras.js file
   - further update it so that 
*/
