function calculateStatistics() {

    // Ascending order of numbers
    let input = document.getElementById("dataInput").value;
    let numbers = input
    .split(/[,\s]+/)
    .filter(num => num !== "")
    .map(Number);

    numbers.sort((a, b) => a - b);
    document.getElementById("ascendingResult").textContent = numbers.join(", ");

    // RANGE
    let range = Math.max(...numbers) - Math.min(...numbers);

    document.getElementById("rangeResult").textContent = range;

    // MEAN

    let sum = numbers.reduce((a, b) => a + b, 0);
    let mean = sum / numbers.length;

    document.getElementById("meanResult").textContent = mean.toFixed(2);

    // MEDIAN

    numbers.sort((a,b)=>a-b);

    let median;
    let mid = Math.floor(numbers.length / 2);

    if(numbers.length % 2 === 0){
        median = (numbers[mid - 1] + numbers[mid]) / 2;
    }else{
        median = numbers[mid];
    }

    document.getElementById("medianResult").textContent = median;  
    
    // MODE

    let frequency = {};
    let maxFreq = 0;
    let modes = [];

    // Count frequency
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });

    // Find all modes
    for (let num in frequency) {
        if (frequency[num] === maxFreq) {
            modes.push(num);
        }
    }

    // If every number appears once → No Mode
    if (maxFreq === 1) {
        document.getElementById("modeResult").textContent = "No Mode";
    } else {
        document.getElementById("modeResult").textContent = modes.join(", ");
    }

    // Population Variance

    let varianceSum = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0);
    let populationVariance = varianceSum / numbers.length;

    document.getElementById("popVarianceResult").textContent = populationVariance.toFixed(2);

    // Sample Variance

    let sampleVariance = varianceSum / (numbers.length - 1);

    document.getElementById("sampleVarianceResult").textContent = sampleVariance.toFixed(2);

    // Population Standard Deviation

    let populationStdDev = Math.sqrt(populationVariance);

    document.getElementById("popStdDevResult").textContent = populationStdDev.toFixed(2);

    // Sample Standard Deviation

    let sampleStdDev = Math.sqrt(sampleVariance);

    document.getElementById("sampleStdDevResult").textContent = sampleStdDev.toFixed(2);

}