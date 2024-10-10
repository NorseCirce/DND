// Function to roll 4d6 and calculate sum after dropping lowest roll
function rollAndSum() {
    // Roll 4 six-sided dice
    let rolls = [];
    for (let i = 0; i < 4; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1); // Roll a dice (1-6)
    }

    // Find the lowest roll
    let minRoll = Math.min(...rolls);

    // Calculate sum of the rolls after dropping the lowest roll
    let sum = rolls.reduce((total, roll) => total + roll, 0) - minRoll;

    return { rolls, sum };
}

// Function to update the numbers in front of each image with the calculated sum
function updateDiceImages() {
    // Select all dice containers
    let diceContainers = document.querySelectorAll('.dice-container');

    // Iterate over each dice container and update the sum number
    diceContainers.forEach((container) => {
        let sumNumber = container.querySelector('.sum-number');
        let result = rollAndSum();
        sumNumber.textContent = result.sum; // Update text content to display the sum

        // Store dice rolls in data attribute for later use
        container.dataset.diceRolls = JSON.stringify(result.rolls);
    });
}

// Function to handle clicking on sum-number
function handleSumNumberClick() {
    // Retrieve dice rolls from data attribute
    let diceRolls = JSON.parse(this.parentNode.dataset.diceRolls);

    // Show popup with dice rolls
    let message = `Dice Rolled: ${diceRolls.join(', ')}\n`;
    message += `Sum (without lowest): ${this.textContent}`;
    alert(message);
}

// Add event listener to each sum-number for click event
document.addEventListener('DOMContentLoaded', function() {
    let sumNumbers = document.querySelectorAll('.sum-number');
    sumNumbers.forEach(sumNumber => {
        sumNumber.addEventListener('click', handleSumNumberClick);
    });
});

// Function to handle the roll button click
function handleRollButtonClick() {
    updateDiceImages();
}

// Add event listener to the roll button
let rollButton = document.getElementById('rollButton');
rollButton.addEventListener('click', handleRollButtonClick);

// Initial update of dice images when the page loads
updateDiceImages();
