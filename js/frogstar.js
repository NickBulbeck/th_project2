/* 
   OK: the easter egg.

   This file, and the functions at the bottom, return a random name (and corresponding email address)
   in the style of the Hitch-Hiker's Guide To The Galaxy. Original examples include Trin Tragula, Max
   Quordlepleen and, of course, Zaphod Beeblebrox. The other rule is that the name must be pronouncible in
   English. In principle this may give rise to the odd obscenity. But it's very rare. 

   The function and variable names adhere to good practice in no sense whatsoever. As Douglas Adams
   might have put it: they make intuitive sense in the same way that 5-dimensional geometry doesn't.

   So: how come it works no matter which page is currently displayed? Because the querySelectorAll
   method doesn't create a true array; it creates a live collection of nodes. "Live" means that they
   are passed by reference, not value, and are constantly updated whenever the DOM is itself updated
   for any reason. I think there are browsers that don't work like this, however, in which case it
   would likely break.

   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   When the button is double-clicked, the DOM is restored to its native state and the names
   and email addresses revert to normal.
   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   Remember: from a business requirements perspective, this adds value comparable to that of
   a tokomak reactor made entirely of geese. From a learning perspective, however, it was
   quite interesting.
*/
let zaphod = 0;
let freeStandingPrism = [];
const blub = document.getElementsByTagName("h2")[0];
let students = document.querySelectorAll('.student-details');


const vowels = ['a','e','i','o','u','ai','ee','ea','oo','ou','oa','oi'];
const openers = ['B','C','D','F','G','H','J','K','L','M','N','P','R','S','T','Qu',
                  'V','W','Y','Z','Br','Bl','Cr','Cl','Dr','Fr','Fl','Gl','Gr','Pr','Pl','St','Str',
                  'Sl','Tr','Th','Vr'];
const closers = ['b','ck','d','ff','g','j','l','m','rm','n','rn','p','lp','rp','r',
                  's','ts','rs','t','rt','ls','lt','rv','rx','rz','z','sh'
                  ,'dle','ble','ffle','x'];

const aVowel = () => {
  return vowels[Math.floor(Math.random() * vowels.length)];
}

const anOpener = () => {
  return openers[Math.floor(Math.random() * openers.length)];
}

const aCloser = () => {
  return closers[Math.floor(Math.random() * closers.length)];
}

// This function returns a random name. The reason for the for-loop is to increase the likelihood of a syllable ending
// in -ble, -dle or -fle (ie, length > 2 characters). I think we can all agree that those names are funnier.
// Hence lintilla and allitnil.

const beeblebrox = () => {
  let quordle = "";
  for (let i = 0; i < 10; i++) {
    quordle = aCloser();
    if (quordle.length > 2) {
      break;
    }
  }
  let lintilla = "";
  let allitnil = "";
  do {
    lintilla = aVowel() + aCloser();
  } while (lintilla.length > 3);
  do {
    allitnil = aVowel() + aCloser();
  } while (allitnil.length > 3);
  return anOpener() + lintilla + " " +
         anOpener() + aVowel() + quordle + anOpener().toLowerCase() + allitnil;
}

// This function takes in a name and converts it into an email address of the form forname.surname@... etc.
// The significance of the email address will be grasped by afficionados of the Hitch-Hiker Trilogy.
const dolmansaxlil = name => {
  let gargravarr = name.toLowerCase().replace(" ",".");
  gargravarr += "@dolmansaxlil.frogstar";
  return gargravarr;
}

// This function is an initial setup. It sets up a copy of the current student array
// when the Douglas Adams Button is single-clicked, so that the array can be returned
// to its previous state on double-click.
const hooloovoo = () => {
  // Set up freeStandingPrism as an array of all the real values. This is a true array,
  // with names and emails passed by value and not reference. We can then use it to store the 
  // original values in before we kakrafoon everyone.
  for (let i=0; i<students.length; i++) {
    let realname = students[i].querySelector('h3').textContent;
    let realEmail = students[i].querySelector('.email').textContent;
    let sourceDetails = [realname,realEmail];
    freeStandingPrism.push(sourceDetails);
  }
}


// This function replaces all the names in the document with Hitch-Hiker style alternatives (and emails likewise)
const kakrafoon = () => {
  blub.textContent = "Mostly Harmless";
  for (let i=0; i<students.length; i++) {
    let studentName = students[i].querySelector('h3');
    let studentEmail = students[i].querySelector('.email');
    let newName = beeblebrox();
    let newEmail = dolmansaxlil(newName);
    studentName.textContent = newName;
    studentEmail.textContent = newEmail;
  }
}

// This function basically undoes the effects of kakarafoon(); that is, it replaces all the 
// Hitch-Hiker style names/emails with the originals from the currently selected data list
const golgafrincham = () => {
  blub.textContent = "Students";
  for (let i=0; i<students.length; i++) {
    let name = freeStandingPrism[i][0];
    let email = freeStandingPrism[i][1];
    students[i].querySelector('h3').textContent = name;
    students[i].querySelector('.email').textContent = email;
  }
}

// This funcion creates the Douglas Adams button and appends it at the top of the page.
const trillian = () => {
  const pageHeaderDiv = document.querySelector('.page-header');
  const frogstarDiv = document.createElement('div');
  frogstarDiv.setAttribute('id','frogstarDiv');
  frogstarDiv.className = 'student-search';
  frogstarDiv.innerHTML = '<button id="douglasAdamsButton">Douglas Adams Button</button>';
  pageHeaderDiv.appendChild(frogstarDiv);
  const douglasAdamsButton = document.getElementById("douglasAdamsButton");
  douglasAdamsButton.addEventListener("click", () => {
    zaphod++;
    if (1 === zaphod) {
        clickTimer = setTimeout( () =>{
          kakrafoon();
          zaphod = 0;
      }, 185);
    } else if (zaphod === 2) {
        golgafrincham();
        zaphod = 0;
        clearTimeout(clickTimer);
    }
  });
}


// Create the Douglas Adams button
trillian()
// call hooloovoo to store the real names/emails so that we can restore them when the
// Douglas Adams Button is double-clicked:
hooloovoo();
// A hooloovoo, remember, is a super-intelligent shade of the colour blue.




