function closestDivisors(n) {
    let closestPair;
    let minDiff = Infinity;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        let j = Math.round(n / i);
        let diff = Math.abs(i - j);
        if (diff < minDiff) {
            minDiff = diff;
            closestPair = [i, j];
        }
    }
    return closestPair;
}

export { closestDivisors };