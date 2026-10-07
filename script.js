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
    resultElement.textContent = `Your age on Nov 7, 2026 will be ${age} years old. You will be old enough to vote in the 2026 General Election!`;
  } else {
    resultElement.textContent = `Your age on Nov 7, 2026 will be ${age} years old. You will not be old enough to vote in the 2026 General Election.`;
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


// --- PARTY MATCHER QUIZ ---
const policyQuestions = [
  {
    statement: "Lowering the official voting age to 16 for General Elections.",
    partyAlignments: {
      TPM: "agree",
      Green: "agree",
      TOP: "agree",
      Labour: "neutral",
      National: "disagree",
      NZFirst: "disagree",
      ACT: "disagree"
    }
  },
  {
    statement: "Increasing taxes on high earners or wealth to fund public services and climate action.",
    partyAlignments: {
      Green: "agree",
      TPM: "agree",
      Labour: "neutral",
      TOP: "neutral",
      National: "disagree",
      NZFirst: "disagree",
      ACT: "disagree"
    }
  },
  {
    statement: "Cutting income tax rates across middle and lower income brackets.",
    partyAlignments: {
      ACT: "agree",
      National: "agree",
      TOP: "agree",
      NZFirst: "agree",
      Labour: "neutral",
      Green: "disagree",
      TPM: "disagree"
    }
  },
  {
    statement: "Prioritising local infrastructure, senior benefits, and stricter law & order policies.",
    partyAlignments: {
      NZFirst: "agree",
      National: "agree",
      ACT: "agree",
      Labour: "neutral",
      TOP: "neutral",
      Green: "disagree",
      TPM: "disagree"
    }
  },
  {
    statement: "Strengthening Treaty of Waitangi principles and expanding Kaupapa Māori governance initiatives.",
    partyAlignments: {
      TPM: "agree",
      Green: "agree",
      Labour: "agree",
      TOP: "neutral",
      National: "disagree",
      NZFirst: "disagree",
      ACT: "disagree"
    }
  }
];

let policyIndex = 0;

// All 7 requested parties initialized at 0
let partyScores = {
  TPM: 0,
  Labour: 0,
  Green: 0,
  TOP: 0,
  National: 0,
  NZFirst: 0,
  ACT: 0
};

// Full name mapping for the final result display
const partyNames = {
  TPM: "Te Pāti Māori",
  Labour: "the Labour Party",
  Green: "the Green Party",
  TOP: "The Opportunity Party (TOP)",
  National: "the National Party",
  NZFirst: "New Zealand First",
  ACT: "the ACT Party"
};

function loadPolicyQuestion() {
  const current = policyQuestions[policyIndex];
  document.getElementById("policy-statement").textContent = current.statement;
  document.getElementById("policy-progress").textContent = `Question ${policyIndex + 1} of ${policyQuestions.length}`;
}

function answerPolicy(userChoice) {
  const current = policyQuestions[policyIndex];

  // Award points if the user's choice matches the party's stance
  for (const [party, position] of Object.entries(current.partyAlignments)) {
    if (userChoice === position) {
      partyScores[party] += 1;
    }
  }

  policyIndex++;

  if (policyIndex < policyQuestions.length) {
    loadPolicyQuestion();
  } else {
    showPolicyResults();
  }
}

function showPolicyResults() {
  let topPartyKey = "";
  let highestScore = -1;

  for (const [party, score] of Object.entries(partyScores)) {
    if (score > highestScore) {
      highestScore = score;
      topPartyKey = party;
    }
  }

  const topPartyName = partyNames[topPartyKey] || topPartyKey;

  document.getElementById("policy-quiz-container").innerHTML = `
    <h3>Your Highest Alignment</h3>
    <p>Based on your choices, your policy preferences align closest with <strong>${topPartyName}</strong>!</p>
    <button type="button" class="next-btn" onclick="resetPolicyQuiz()">Take Quiz Again</button>
  `;
}

function resetPolicyQuiz() {
  policyIndex = 0;
  partyScores = { TPM: 0, Labour: 0, Green: 0, TOP: 0, National: 0, NZFirst: 0, ACT: 0 };
  
  // Re-inject the original quiz structure into the container
  document.getElementById("policy-quiz-container").innerHTML = `
    <p id="policy-statement" class="quiz-question"></p>
    <div class="quiz-options">
      <button type="button" class="quiz-btn" onclick="answerPolicy('agree')">Agree</button>
      <button type="button" class="quiz-btn" onclick="answerPolicy('neutral')">Neutral</button>
      <button type="button" class="quiz-btn" onclick="answerPolicy('disagree')">Disagree</button>
    </div>
    <p id="policy-progress" class="quiz-progress"></p>
  `;
  
  loadPolicyQuestion();
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("policy-statement")) {
    loadPolicyQuestion();
  }
});