function fib(n) {
    const number = [1, 1];
    for (let i = 2; i < n + 1;i ++) {
        number.push(number[i - 2] + number[i - 1]); 
    }

    return number[n];
}

console.log(fib(5));

function isPrime(number) {
    for (let i = 2; i < number; i++ ) {
        console.log('iteration')
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

// Best case: number = 1 OR number = 2; it will be 0(1)
// Average case: 0(n)
// Worst case: number = 1,000,0..; it will be 0(n)

console.log(isPrime(5));
console.log(isPrime(9));