/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
  REFACTORING - LATEST REQUIREMENTS
  1) Refactor the displayPage function to accept a List and a Page. This means I can do the search later.
  2) Refactor the page links thing to accept a list. Not sure you even need that - you only need the
     number of pages, really.
  3) Then, the search facility:
    - create the event-handler for keypress for the input field;
    - create the event-handler for submit for the button;
    - create an output list of students;
    - create a dummy item 0 that's created if the list is empty;
    - set up a call to show-page and setup links if it's not;
    - set up the Search Results heading and change the lettering on the
      button to "display all students"
    - set up the button to go back to setting up the whole page when it's
      clicked for a second time

*/


/*** 
    Global variables
***/ 
let pageLength = 10; 
let htmlStudentList = document.querySelectorAll('.student-item');

/***
    Utility functions...
     - numberOfPages() handles pageLength as a variable
***/

const numberOfPages = () => {
  let numberOfStudents = htmlStudentList.length;
  let pages = Math.floor(numberOfStudents / pageLength) + 1;
  return pages;
}



/*** 
   Create the `showPage` function to hide all of the items in the 
***/

const setUpPageData = () => {
  appendSearchThingy();
  appendPageLinks();
  hideLis();
  showPage(0,pageLength);
}

const hideLis = () => {
  for (let i=0; i<htmlStudentList.length; i++) {
    const li = htmlStudentList[i];
    li.style.display = 'none';
  }
}

const showPage = (startLi,endLi) => {
  hideLis();
  for (let i=startLi; i<endLi; i++) {
    const li = htmlStudentList[i];
    li.style.display = '';
  }
}


/*** 
   The `appendPageLinks function` generates, appends, and adds
   functionality to the pagination buttons.
***/
const appendPageLinks = () => {
  // wee function to remove the 'active' class from all links when one of them is clicked
  const clearLinkClasses = () => {
    links = linksUL.querySelectorAll('a');
    for (let i=0; i<links.length; i++) {
      links[i].className = '';
    }
  }
  // wee function to respond to a click on the list of links
  const onClickingLink = (event) => {
    clearLinkClasses(); // Remove the 'active' class from all links
    const target = event.target; // The target is specifically an <a> element, not its parent <li>
    target.className = 'active'; // add the 'active' class to the link just clicked
    const pageIndex = parseInt(event.target.textContent) -1;
    const firstLi = pageIndex * pageLength;
    let lastLi = firstLi + pageLength;
    // Can live without this next bit, but it saves a console error:
    if (lastLi >= htmlStudentList.length) { 
      lastLi = htmlStudentList.length;      
    }
    showPage(firstLi,lastLi);
  }
  // And now the actual code to set up the page links - this is run
  // just once, called from setUpPageData()
  const page = document.querySelector('.page');
  const linkDiv = document.createElement('div');
  const linksUL = document.createElement('ul');
  page.appendChild(linkDiv);
  linkDiv.classList.add('pagination');
  linkDiv.appendChild(linksUL);
  for (let i=0; i<numberOfPages(); i++) { 
    let link = document.createElement('li');
    let pageNumber = i+1;
    link.innerHTML = '<a href="#">' + pageNumber + '</a>';
    linksUL.appendChild(link);
  }
  // Set the link for page 1 to 'active':
  linksUL.firstChild.firstChild.className = 'active';
  linksUL.addEventListener('click',onClickingLink,false);
}

const appendSearchThingy = () => { // Well, **I like** the name.
  const pageHeaderDiv = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  searchDiv.innerHTML = '<input id="search" type="text" placeholder="Enter search text">' +
                        '<button id="searchButton">Display search results</button>' +
                        '<button id="douglasAdamsButton">Douglas Adams Button</button>';
  pageHeaderDiv.appendChild(searchDiv);
}     


// Finally, running the code once the page has loaded.


// Firstly: I got fed up of constantly scrolling down on my MacBook Air screen!
if (window.screen.height < 1000) {
  pageLength = 5;
}
setUpPageData();






