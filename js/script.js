/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*
   Personal design notes:
    At the start, need to set the current live student list.
     - the HTML yin by default
     - the other yins via an "API" set of json objects, accessed by the buttons
    The current live student list is worked on by:
     - the Douglas Adams button (which doesn't change it)
     - the search filter
     - the display-page function

*/


/*** 
   Global variables
   -  The name displayedStudentList is chosen to reflect the fact that I've built the app to use
      a variety of data sources. There are several different lists.
   
***/
let displayedStudentList = [];
let pageLength = 10; // In principle it could be changed!
const studentUl = document.querySelector('.student-list');

const numberOfPages = () => {
  let numberOfStudents = displayedStudentList.length;
  let pages = Math.floor(numberOfStudents / pageLength) + 1;
  return pages;
}


// Event-listeners for the buttons...
const dataStandard = () => {
  location.reload(true);
  displayedStudentList = document.querySelectorAll('li');
  showPage(displayedStudentList);
}
const data44 = () => {
  displayedStudentList = readDatabase(studentDB_44);
  showPage(displayedStudentList);
}
const data64 = () => {
  displayedStudentList = readDatabase(studentDB_64);
  showPage(displayedStudentList);
}

document.getElementById('dataStandard').addEventListener('click',
                                                          dataStandard,
                                                          false);
document.getElementById('data44').addEventListener('click',
                                                          data44,
                                                          false);
document.getElementById('data64').addEventListener('click',
                                                          data64,
                                                          false);


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const clearUl = () => {
  const oldList = studentUl.querySelectorAll("li");
  for (let i=0; i<oldList.length; i++) {
    const li = oldList[i];
    studentUl.removeChild(li);
  }
}

const showPage = (studentLiArray) => {
  clearUl();
  for (let i=0; i<studentLiArray.length; i++) {
    const li = studentLiArray[i];
    studentUl.appendChild(li);
  }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = () => {
  const parentDiv = document.querySelector('.page');
  const linkDiv = document.createElement('div');
  const linksUL = document.createElement('ul');
  parentDiv.appendChild(linkDiv);
  linkDiv.classList.add('pagination');
  linkDiv.appendChild(linksUL);
  let html = '<li><a href="#">1</a></li>';
  linksUL.innerHTML = html;
}

// NTS: This is done by setting up the ul in a variable, the huge page-class div in another,
// and append-child of the new div at the end. Actually, you may not need the div because
// the new yin is 

appendPageLinks();

