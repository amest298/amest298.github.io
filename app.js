const newPeriodFormEl = document.getElementsByTagName("form")[0];
const startDateInputEl = document.getElementById("start-date");
const endDateInputEl = document.getElementById("end-date");
const pastPeriodContainer = document.getElementById("past-periods");

// Add the storage key as an app-wide constant
const STORAGE_KEY = "period-tracker";

// Listen to form submissions.
newPeriodFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const startDate = startDateInputEl.value;
  const endDate = endDateInputEl.value;
  if (checkDatesInvalid(startDate, endDate)) {
    return;
  }
  storeNewPeriod(startDate, endDate);
  renderPastPeriods();
  newPeriodFormEl.reset();
});

function checkDatesInvalid(startDate, endDate) {
  if (!startDate || !endDate || startDate > endDate) {
    newPeriodFormEl.reset();
    return true;
	
  }
  return false;
}

function storeNewPeriod(startDate, endDate) {
  const periods = getAllStoredPeriods();
  periods.push({ startDate, endDate });
  periods.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(periods));
}

function getAllStoredPeriods() {
  const data = window.localStorage.getItem(STORAGE_KEY);
  const periods = data ? JSON.parse(data) : [];
  console.dir(periods);
  console.log(periods);
  return periods;
}

function renderPastPeriods() {
  const pastPeriodHeader = document.createElement("h2");
  const pastPeriodList = document.createElement("ul");
  const periods = getAllStoredPeriods();
  if (periods.length === 0) {
	  pastPeriodHeader.textContent = "No past periods";
    return;
  }
  pastPeriodContainer.textContent = "";
  pastPeriodHeader.textContent = "Past periods";
  periods.forEach((period) => {
    const periodEl = document.createElement("li");
    periodEl.textContent = `From ${formatDate(
      period.startDate,
    )} to ${formatDate(period.endDate)}`;
    pastPeriodList.appendChild(periodEl);
  });

  pastPeriodContainer.appendChild(pastPeriodHeader);
  pastPeriodContainer.appendChild(pastPeriodList);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}

renderPastPeriods();

const newcycleFormEl = document.getElementsByTagName("form")[0];
const startDateInputEl = document.getElementById("start-date");
const endDateInputEl = document.getElementById("end-date");
const pastcycleContainer = document.getElementById("past-cycles");

// Add the storage key as an app-wide constant
const STORAGE_KEY = "cycle-tracker";

// Listen to form submissions.
newcycleFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const startDate = startDateInputEl.value;
  const endDate = endDateInputEl.value;
  if (checkDatesInvalid(startDate, endDate)) {
    return;
  }
  storeNewcycle(startDate, endDate);
  renderPastcycles();
  newcycleFormEl.reset();
});

function checkDatesInvalid(startDate, endDate) {
  if (!startDate || !endDate || startDate > endDate) {
    newcycleFormEl.reset();
    return true;
	
  }
  return false;
}

function storeNewcycle(startDate, endDate) {
  const cycles = getAllStoredcycles();
  cycles.push({ startDate, endDate });
  cycles.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cycles));
}

function getAllStoredcycles() {
  const data = window.localStorage.getItem(STORAGE_KEY);
  const cycles = data ? JSON.parse(data) : [];
  console.dir(cycles);
  console.log(cycles);
  return cycles;
}

function renderPastcycles() {
  const pastcycleHeader = document.createElement("h2");
  const pastcycleList = document.createElement("ul");
  const cycles = getAllStoredcycles();
  if (cycles.length === 0) {
	  pastcycleHeader.textContent = "No past cycles";
    return;
  }
  pastcycleContainer.textContent = "";
  pastcycleHeader.textContent = "Past cycles";
  cycles.forEach((cycle) => {
    const cycleEl = document.createElement("li");
    cycleEl.textContent = `From ${formatDate(
      cycle.startDate,
    )} to ${formatDate(cycle.endDate)}`;
    pastcycleList.appendChild(cycleEl);
  });

  pastcycleContainer.appendChild(pastcycleHeader);
  pastcycleContainer.appendChild(pastcycleList);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { timeZone: "UTC" });
}

renderPastcycles();

