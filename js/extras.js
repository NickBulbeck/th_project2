/* This file holds the code to create the surplus-to-requirements div
   at the top of the page by which the user can select from three
   sources of student data:
   - the list provided in index.html, which is the actual project,
   - the students from examples/44students.html, albeit stored as an array of objects in data.js
   - the students from examples/46students.html, also stored as an array of objects in data.js
   
   The idea is to showcase DOM manipulation and traversal using different sources of data.
   Equally importantly, the idea is to have fun!

   The file is titled "extras.js" rather than, say, "dataSelect.js", to distinguish it clearly
   from the actual requirements. Obviously, "extras" isn't a proper filename.
*/

// Event-listeners for the buttons...
const dataStandard = () => {
  document.location.reload(true);
  unprocessedStudentArray = Array.from(unprocessedStudentList);
  setUpPageData();
}
const data44 = () => {
  unprocessedStudentList = readDatabase(studentDB_44);
  setUpPageData();
}
const data64 = () => {
  unprocessedStudentList = readDatabase(studentDB_64);
  setUpPageData();
}

// set up the top div...
const extras_createDiv = () => {
  const parentDiv = document.querySelector('.page');
  const initialPageHeaderDiv = document.querySelector('.page-header');
  const dataSelectDiv = document.createElement('DIV');
  dataSelectDiv.className = 'page-header cf';
  const h2 = document.createElement('h2');
  h2.textContent = 'Choose a dataset:';
  dataSelectDiv.appendChild(h2);
  const studentSearchDiv = document.createElement('div');
  studentSearchDiv.className = 'student-search';
  studentSearchDiv.innerHTML = 
    '<button id="dataStandard">Standard Unit 2 challenge</button>' +
    '<button id="data44">44 Students</button>' +
    '<button id="data64">64 Students</button>';
  dataSelectDiv.appendChild(studentSearchDiv);
  dataSelectDiv.style.paddingBottom = '1rem';
  dataSelectDiv.style.borderBottom = '2px #404040 solid';
  parentDiv.insertBefore(dataSelectDiv,initialPageHeaderDiv);
}
extras_createDiv();
// add the event listeners...

document.getElementById('dataStandard').addEventListener('click',
                                                          dataStandard,
                                                          false);
document.getElementById('data44').addEventListener('click',
                                                          data44,
                                                          false);
document.getElementById('data64').addEventListener('click',
                                                          data64,
                                                          false);




