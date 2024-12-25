export function fizzBuzz(num:number) {
  const result = [];
  for(let i = 1; i <=num; i += 1) {
    const mod3 = i % 3 === 0;
    const mod5 = i % 5 === 0;
    if(mod3 && mod5) {
      result.push('fizzbuzz');
    } else if(mod3) {
      result.push('fizz');
    } else if(mod5) {
      result.push('buzz');
    } else {
      result.push(i.toString());
    }
  }
  return result;
  
}
