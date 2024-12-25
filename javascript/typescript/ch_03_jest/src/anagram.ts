export function isAnagram(str1: string, str2: string) {
  return sortWord(str1) === sortWord(str2);
}

function sortWord(word: string) {
  const letterAry = word.split('');
  const result = letterAry.sort().join('');
  return result; 
}
