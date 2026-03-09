function calculateStatistics() {

    const input = document.getElementById("dataInput").value.trim();

    // Accept commas, semicolons, spaces, tabs, pipes as separators
    const numbers = input
    .split(/[\s,;|]+/)
    .map(v => v.trim())
    .filter(v => v !== "")
    .map(v => Number(v));

    // Validation
    if (numbers.length === 0) {
        alert("Please enter at least one number.");
        return;
    }

    if (numbers.some(isNaN)) {
        alert("Invalid input detected. Please enter numbers only, separated by commas, spaces, semicolons, or pipes ( | ).");
        return;
    }

    if (numbers.length < 2) {
        alert("Please enter at least two numbers for meaningful statistics.");
        return;
    }

    // ASCENDING ORDER
    numbers.sort((a, b) => a - b);
    document.getElementById("ascendingResult").textContent = numbers.join(", ");

    // RANGE
    const range = Math.max(...numbers) - Math.min(...numbers);
    document.getElementById("rangeResult").textContent = range;

    // MEAN
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / numbers.length;
    document.getElementById("meanResult").textContent = mean.toFixed(2);

    // MEDIAN
    const mid = Math.floor(numbers.length / 2);
    const median = numbers.length % 2 === 0
        ? (numbers[mid - 1] + numbers[mid]) / 2
        : numbers[mid];
    document.getElementById("medianResult").textContent = median;

    // MODE (all repeating numbers)
    const frequency = {};
    const modes = [];

    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
    });

    // collect numbers that appear 2 or more times
    for (let num in frequency) {
        if (frequency[num] >= 2) {
            modes.push(Number(num));
        }
    }

    document.getElementById("modeResult").textContent =
        modes.length === 0 ? "No Mode" : modes.join(", ");

    // POPULATION VARIANCE
    const varianceSum = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0);
    const populationVariance = varianceSum / numbers.length;
    document.getElementById("popVarianceResult").textContent = populationVariance.toFixed(2);

    // SAMPLE VARIANCE
    const sampleVariance = varianceSum / (numbers.length - 1);
    document.getElementById("sampleVarianceResult").textContent = sampleVariance.toFixed(2);

    // POPULATION STANDARD DEVIATION
    document.getElementById("popStdDevResult").textContent = Math.sqrt(populationVariance).toFixed(2);

    // SAMPLE STANDARD DEVIATION
    document.getElementById("sampleStdDevResult").textContent = Math.sqrt(sampleVariance).toFixed(2);
}