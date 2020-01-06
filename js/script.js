/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


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






