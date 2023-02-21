const { factorial } = require('../src/factorial');

test('find factorial of 0', () => {
    expect(factorial(0)).toBe(0);
})

test('find factorial of 1', () => {
    expect(factorial(1)).toBe(1);
})

test('find factorial of 2', () => {
    expect(factorial(2)).toBe(2);
})

test('find factorial of 3', () => {
    expect(factorial(3)).toBe(6);
})

test('find factorial of 10', () => {
    expect(factorial(20)).toBe(2432902008176640000);
})