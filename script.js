function getDOB() {
    // Get the DOB value from the input field
    const dobInput = document.getElementById('inputDob').value;

    // Validate if DOB is provided
    if (!dobInput) {
        alert('Please enter your Date of Birth.');
        return;
    }

    // Convert DOB input to a Date object
    const dob = new Date(dobInput);
    
    // Set the fixed target end date (November 7, 2026)
    const currentDate = new Date('2026-11-07');

    // Calculate age
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDifference = currentDate.getMonth() - dob.getMonth();

    // Adjust age if the birthday hasn't occurred yet by Nov 7 of that year
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dob.getDate())) {
        age--;
    }

    // Select the output element
    const resultElement = document.getElementById('currentAge');

    // Display the result conditionally using template literals (backticks)
    if (age >= 18) {
        resultElement.textContent = `Your age on Nov 7, 2026 will be ${age} years. You will be old enough to vote in the 2026 General Election!`;
    } else {
        resultElement.textContent = `Your age on Nov 7, 2026 will be ${age} years. You will not be old enough to vote in the 2026 General Election.`;
    }
}


function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}