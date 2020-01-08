/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*
  REFACTORING - LATEST REQUIREMENTS

  3) Then, the search facility:
    - create a dummy item 0 that's created if the list is empty;
    - extend appendPageLinks and searchResultThingy to delete any existing 
      ones before rendering any;
*/


/*** 
    Global variables
***/ 

// The number of list items displayed on the screen. See also checkForSmallScreen().
// It could be made dynamically variable using the window resize event, for instance,
// in a future release. It defaults to 10 as per the Project 2 starting requirements.
let pageLength = 10;
// The definitive list of student <li> elements as supplied in index.html for the
// Project 2 challenge. In practice, this data would be read in from a database.
// But that's in a later unit of the course!
// The alternative list is the result of a search.
let htmlStudentList = document.querySelectorAll('.student-item');
let searchResultsList = document.querySelectorAll('.search-output');

/***
    Utility functions...
     - numberOfPages() handles pageLength as a variable, which I introduced for
       small screens (like my laptop) where 10 items is too many.
***/
// 
const numberOfPages = (list) => {
  let numberOfStudents = list.length;
  let pages = Math.floor(numberOfStudents / pageLength) + 1;
  return pages;
}
// More, shorter, pages is perhaps a better user experience on a small laptop screen:
const checkForSmallScreen = () => {
  if (window.screen.height < 1000) {
    pageLength = 5;
  }
}

/*** 
  Need some appropriate comments here.
***/

const setUpPageData = () => {
  checkForSmallScreen();
  appendSearchThingy();
  appendPageLinks(htmlStudentList);
  showPage(htmlStudentList,1);
}

const showPage = (list,pageNumber) => {
  firstHideAllTheLis();
  const numberOfStudents = list.length;
  const startLi = (pageNumber -1) * pageLength;
  let endLi = startLi + pageLength;
  // This next if-loop isn't absolutely necessary, but it does save an untidy
  // potential console error when selecting the final page (which will typically
  // be incomplete). This is why endLi is a 'let', not a 'const'.
  if (endLi > numberOfStudents) {
    endLi = numberOfStudents;
  }
  nowDisplaySelectedLis(list,startLi,endLi);
}

const firstHideAllTheLis = () => {
  for (let i=0; i<htmlStudentList.length; i++) {
    const li = htmlStudentList[i];
    li.style.display = 'none';
  }
}

const nowDisplaySelectedLis = (list,startLi,endLi) => {
  for (let i=startLi; i<endLi; i++) {
    const li = list[i];
    li.style.display = '';
  }
}


/*** 
   The `appendPageLinks function` generates, appends, and adds
   functionality to the pagination buttons.
***/
const appendPageLinks = (activeList) => {
  // appendPageLinks uses the 'activeList' parameter because the app may be paginating a list of search
  // results which, by definition, is only a subset of the full list of students.
  //
  // First, a wee utility function that clears the 'active' class from all the links
  const clearLinkClasses = () => {
    links = linksUL.querySelectorAll('a');
    for (let i=0; i<links.length; i++) {
      links[i].className = '';
    }
  }
  // The click-event handler:
  const onClickingLink = (event) => {
    clearLinkClasses(); // Remove the 'active' class from all links
    const target = event.target; // The target is specifically an <a> element, not its parent <li>
    target.className = 'active'; // add the 'active' class to the link just clicked
    const pageNumber = parseInt(event.target.textContent);
    showPage(activeList,pageNumber);
  }
  // And now the actual code to set up the page links - this is run in just one
  // circumstance, called from setUpPageData() which in turn runs when the page loads.
  const page = document.querySelector('.page');
  const linkDiv = document.createElement('div');
  const linksUL = document.createElement('ul');
  page.appendChild(linkDiv);
  linkDiv.classList.add('pagination');
  linkDiv.appendChild(linksUL);
  for (let i=0; i<numberOfPages(activeList); i++) { 
    let link = document.createElement('li');
    let pageNumber = i+1;
    link.innerHTML = '<a href="#">' + pageNumber + '</a>';
    linksUL.appendChild(link);
  }
  // Set the link for page 1 to 'active':
  linksUL.firstChild.firstChild.className = 'active';
  linksUL.addEventListener('click',onClickingLink,false);
}

// Add the search thingy
const appendSearchThingy = () => { 
  const pageHeaderDiv = document.querySelector('.page-header');
  const searchDiv = document.createElement('div');
  searchDiv.className = 'student-search';
  searchDiv.innerHTML = '<input id="searchField" type="text" placeholder="Enter search text">' +
                        '<button id="searchButton">Display search results</button>' +
                        '<button id="douglasAdamsButton">Douglas Adams Button</button>';
  pageHeaderDiv.appendChild(searchDiv);
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click',onClickingSearchButton,false);
  const searchField = document.getElementById('searchField');
  searchField.addEventListener('input',onEnteringSearchText,false);
}     

// Search event-handlers and utility functions
const onClickingSearchButton = (event) => {
  if (event.target.textContent.search('results') >= 0) {
    event.target.textContent = 'Display all students';
    appendPageLinks(searchResultsList);
    showPage(searchResultsList,1);
    event.target.previousElementSibling.value = '';
  } else {
    // event.target.textContent = 'Display search results';
    // appendPageLinks(htmlStudentList);
    // showPage(htmlStudentList,1);
    setUpPageData();
  }
}
const onEnteringSearchText = (event) => {
  const searchText = event.target.value.toLowerCase();
  const searchButton = event.target.nextElementSibling;
  for (i=0; i<htmlStudentList.length; i++) {
    const li = htmlStudentList[i]
    const h3 = li.getElementsByTagName('h3')[0].textContent.toLowerCase();
    li.className = 'student-item cf';
    if (h3.search(searchText) >= 0) {
      li.className = 'search-output student-item cf';
    }
  }
  searchResultsList = document.querySelectorAll('.search-output');
  const results = searchResultsList.length;
  if (results === 1) {
    searchButton.textContent = 'Display 1 search result';
  } else {
    searchButton.textContent = `Display ${results} search results`;
  }
}

// This isn't working yet:
// const formatEmptySearchResultsList = () => {
//   const ul = document.querySelector('.student-list');
//   const blankLi = document.createElement('li');
//   blankLi.setAttribute('id','noSearchResults');
//   blankLi.className = 'student-item';
//   blankLi.style.display = 'none';
//   const blankDiv = document.createElement('div');
//   blankDiv.className = 'student-item cf student-details'
//   blankDiv.innerHTML = '<h3>No results found matching your search</h3>';
//   blankLi.appendChild(blankDiv);
//   ul.insertBefore(blankLi,ul.firstChild);
// }


// Finally, run the code once the page has loaded.

setUpPageData();






