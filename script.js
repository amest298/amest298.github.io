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
    statement: "Free public transport should be provided for all students and young people under 25.",
    partyAlignments: {
      Green: "agree",
      TPM: "agree",
      Labour: "agree",
      TOP: "neutral",
      National: "disagree",
      NZFirst: "disagree",
      ACT: "disagree"
    }
  },
  {
    statement: "The government should increase mental health funding and place free counselors in all secondary schools.",
    partyAlignments: {
      Green: "agree",
      TPM: "agree",
      Labour: "agree",
      TOP: "agree",
      NZFirst: "neutral",
      National: "neutral",
      ACT: "disagree"
    }
  },
  {
    statement: "Strict environmental rules should be placed on farming and industry to reach net-zero carbon emissions faster.",
    partyAlignments: {
      Green: "agree",
      TPM: "agree",
      TOP: "agree",
      Labour: "agree",
      NZFirst: "disagree",
      National: "disagree",
      ACT: "disagree"
    }
  },
  {
    statement: "Tougher sentences and youth justice reforms are needed to reduce youth crime and ram raids.",
    partyAlignments: {
      ACT: "agree",
      National: "agree",
      NZFirst: "agree",
      Labour: "neutral",
      TOP: "neutral",
      Green: "disagree",
      TPM: "disagree"
    }
  },
  {
    statement: "Income tax rates should be lowered so workers keep more of their earnings.",
    partyAlignments: {
      ACT: "agree",
      National: "agree",
      NZFirst: "agree",
      TOP: "neutral",
      Labour: "disagree",
      Green: "disagree",
      TPM: "disagree"
    }
  },
  {
    statement: "Rent controls or caps on rent increases should be introduced to make housing affordable for young renters.",
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
    statement: "Government spending should be significantly reduced to pay down public debt and lower inflation.",
    partyAlignments: {
      ACT: "agree",
      National: "agree",
      NZFirst: "agree",
      TOP: "neutral",
      Labour: "disagree",
      Green: "disagree",
      TPM: "disagree"
    }
  }
];

let policyIndex = 0;

// All 7 parties initialized at 0
let partyScores = {
  TPM: 0,
  Labour: 0,
  Green: 0,
  TOP: 0,
  National: 0,
  NZFirst: 0,
  ACT: 0
};

// Full name mapping for results display
const partyNames = {
  TPM: "Te Pāti Māori",
  Labour: "The Labour Party",
  Green: "The Green Party",
  TOP: "The Opportunity Party (TOP)",
  National: "The National Party",
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
  const sortedParties = Object.entries(partyScores).sort((a, b) => b[1] - a[1]);
  const topThree = sortedParties.slice(0, 3);

  let resultsHTML = `
    <h3>Your Top 3 Party Alignments</h3>
    <ol class="results-list">
  `;

  topThree.forEach(([partyKey, score]) => {
    const name = partyNames[partyKey] || partyKey;
    resultsHTML += `<li><strong>${name}</strong> (${score} match${score === 1 ? '' : 'es'})</li>`;
  });

  resultsHTML += `
    </ol>
    <br>
    <button type="button" class="next-btn" onclick="resetPolicyQuiz()">Take Quiz Again</button>
  `;

  document.getElementById("policy-quiz-container").innerHTML = resultsHTML;
}

function resetPolicyQuiz() {
  policyIndex = 0;
  partyScores = { TPM: 0, Labour: 0, Green: 0, TOP: 0, National: 0, NZFirst: 0, ACT: 0 };
  
  // Re-inject the original quiz UI structure
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