function getDOB() {
  const dobInput = document.getElementById('inputDob').value;

  if (!dobInput) {
    alert('Please enter your Date of Birth.');
    return;
  }

  const dob = new Date(dobInput);
  const currentDate = new Date('2026-11-07');

  let age = currentDate.getFullYear() - dob.getFullYear();
  const monthDifference = currentDate.getMonth() - dob.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < dob.getDate())) {
    age--;
  }

  const resultElement = document.getElementById('currentAge');

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

document.addEventListener("DOMContentLoaded", function () {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
});