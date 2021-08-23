// 1 x 2 x 3 x 4 x 5 x 6 x 7 x 8 x 9 x 10 x 11 x 12 x 13 x 14 x 15 x 16 x 17 x 18

function factorial(n) {
    if(n < 1) return 0;
    if(n == 1) return 1;
    let prod = 1;
    for(let i = 2; i <= n; i++) {
        prod = prod * i;
    }
    console.log({n, prod});
    return prod;
}

module.exports = { factorial };
