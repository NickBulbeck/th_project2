const vowels = ['a','e','i','o','u','ai','ee','ea','oo','ou','oa','eu','oi'];
const openers = ['B','C','D','F','G','H','J','K','L','M','N','P','R','S','T','Qu',
                  'V','W','Y','Z','Br','Bl','Cr','Cl','Dr','Fr','Fl','Gl','Gr','Pr','Pl','St','Str',
                  'Sl','Tr','Th','Vr','Zr'];
const closers = ['b','ck','d','ff','g','j','ck','l','m','rm','n','rn','p','lp','rp','r',
                  's','ts','rs','t','rt','ls','lt','rv','lv','w','rw','rx','lx','rz','z','lz','sh'
                  ,'dle','ble','ffle','x'];

aVowel = () => {
  return vowels[Math.floor(Math.random() * vowels.length)];
}

anOpener = () => {
  return openers[Math.floor(Math.random() * openers.length)];
}

aCloser = () => {
  return closers[Math.floor(Math.random() * closers.length)];
}

beeblebrox = () => {
  let quordle = "";
  for (let i = 0; i < 10; i++) {
    quordle = aCloser();
    if (quordle.length > 2) {
      break;
    }
  }
  return anOpener() + aVowel() + aCloser() + " " +
         anOpener() + aVowel() + quordle + anOpener().toLowerCase() + aVowel() + aCloser();
}

console.log(beeblebrox());