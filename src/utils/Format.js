function dynamicWeirdFormat(num) {
    const numStr = num.toString();

    if (numStr.length <= 3) return numStr;  // small numbers, no commas

    let firstPart = numStr.slice(0, 1);    // first digit
    let secondPart = numStr.slice(1, 5);   // next four digits
    let remaining = numStr.slice(5);       // rest of digits

    // Insert commas for remaining digits in groups of 3
    let remainingFormatted = '';
    while (remaining.length > 3) {
        remainingFormatted += remaining.slice(0, 3) + ',';
        remaining = remaining.slice(3);
    }
    remainingFormatted += remaining; // add last part

    let result = firstPart + ',' + secondPart;
    if (remainingFormatted) result += ',' + remainingFormatted;

    return result;
}

export { dynamicWeirdFormat };