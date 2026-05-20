function dynamicWeirdFormat(value) {
    if (value === undefined || value === null) return "0";

    // Convert to string and remove existing commas to ensure clean parsing
    const stringValue = value.toString().replace(/,/g, "");

    // Parse as float to handle potential decimals, though standard rank is int
    const numberValue = parseFloat(stringValue);

    if (isNaN(numberValue)) return "0";

    return numberValue.toLocaleString();
}

export { dynamicWeirdFormat };