/*
  This file functions as a data-access layer, based on the idea that database.js
  stands in for a database.
  The functions in this file read the "database" and turn an array of objects into an array
  of <li> elements.

*/

// This function takes a single object from database.js and turns it into a list item
// as set out in the unaltered index.html
const objectToStudentLi = (student) => {
  const li = document.createElement('li');
  li.classList = 'student-item cf';
  let html = '<div class="student-details">' +
             '<img class="avatar" src="' + student.imgURL + '">' +
             '<h3>' + student.name + '</h3>' +
             '<span class="email">' + student.email + '</span>' +
             '</div>' +
             '<div class="joined-details">' +
             '<span class="date">Joined ' + student.joined + '</span>' +
             '</div>';
  li.innerHTML = html;
  return li;
}

// This function reads an array of objects from database.js and turns it into an array
// of list items formatted like the <ul> in the unaltered index.html
const readDatabase = (pseudoDatabase) => {
  let studentLiArray = [];
  for (let i=0; i<pseudoDatabase.length; i++) {
    let li = objectToStudentLi(pseudoDatabase[i]);
    studentLiArray.push(li);
  }
  return studentLiArray;
}