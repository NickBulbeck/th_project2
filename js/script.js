/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/*** 
    Global variables
***/ 
let pageLength = 10; // In principle it could be changed!
let unprocessedStudentList = document.querySelectorAll('.student-item');
// Since that is not an array, and we need the .slice method, we need to make an array from it:
let unprocessedStudentArray = Array.from(unprocessedStudentList);
let paginatedStudentArray = [];

/***
    Utility functions...
***/

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
  appendSearchThingy();
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
  const clearLinkClasses = () => {
    links = linksUL.querySelectorAll('a');
    for (let i=0; i<links.length; i++) {
      links[i].className = '';
    }
  }
  const onClickingLink = (event) => {
    clearLinkClasses();
    const target = event.target;
    console.log(target);
    target.className = 'pagination-li-live';
    const pageIndex = parseInt(event.target.textContent) -1;
    const pageToDisplay = paginatedStudentArray[pageIndex];
    showPage(pageToDisplay);
  }
  const parentDiv = document.querySelector('.page');
  const linkDiv = document.createElement('div');
  const linksUL = document.createElement('ul');
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

const appendSearchThingy = () => {
  const pageHeaderDiv = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  searchDiv.innerHTML = '<input id="search" type="text" placeholder="Enter search text">' +
                        '<button id="douglasAdamsButton">Douglas Adams Button</button>';
  pageHeaderDiv.appendChild(searchDiv);
}     


// Finally, running the code once the page has loaded.


// Firstly: I got fed up of constantly scrolling down on my laptop, whose screen is 
// significantly smaller than that of our Mac! So, on a smaller screen, I've gone for
// setting 5 items per page instead of 10. It's also a good test of the code.
// (Besides, it seemed a shame to set up a variable and then not vary it.)
if (window.screen.height < 1000) {
  pageLength = 5;
}
setUpPageData();


/*
  Still to do:
  - refactor so that displayPage doesn't set up a secondary array, but uses the parameters
      stated in the instructions. The secondary array is not a better idea. However, I COULD
      use it in frogstar.js. Probably not, though.
  - refactor so that the page is displayed in a much simpler way.
  - add a submit button to the search box
  - set up keypress event-handler for the input box

*/
