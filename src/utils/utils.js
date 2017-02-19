export default function parseString(str) {
    const classMatch = /[A-Z][a-z]+/g;
    const capsMatch = /[A-Z][A-Z]+/g; //CLessen zle
    const lowMatch = /(( |_)[a-z]+)(?= |[A-Z]|_)/g;
    let words = [];

    const regexList = [classMatch, capsMatch, lowMatch]
    for (let i = 0; i < regexList.length; i++) {
        const matches = str.match(regexList[0]);
        if (matches) {
            words = words.concat(matches)
        }
    }

    return words;
}

export default function parseString2(str) {
    // camel case
    str = str.replace(/[a-z][A-Z]/g, chars => `${chars[0]} ${chars[1]}`);

    // snake case
    str = str.replace(/_/g, ' ');

    // Class prefix 'C' + 'Class'
    str = str.replace(/C[A-Z][a-z]+/g, chars => ' ' + chars.substr(1));

    const words = testString.split(' ');

    return words;
}

export default function parseString3(str) {
  const words = []
  let startIndex = 0
  
  
  for (let i = 0; i < str.length - 1; i++) {
    
    if (str[i].match(/[a-z]/) && str[i + 1].match(/[A-Z]/)) {
      if (startIndex !== i) {
        words.push(str.substr(startIndex, i + 1 - startIndex))
        startIndex = i + 1
      }
    }
  }
  
  return words
}

const testString = 'CLesenFlaumig_falshGeshrieben worte einfachUndSCHELL';
