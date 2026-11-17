
const jobs = [
  { title: "Frontend Developer", department: "Engineering", type: "Full-time" },
  { title: "UI/UX Designer", department: "Design", type: "Remote" },
  { title: "Python Developer", department: "Technology", type: "Full-time" }
];

const candidates = [
  { name: "Aarav Sharma", job: "Frontend Developer", date: "12 Nov 2026", status: "Applied" },
  { name: "Priya Singh", job: "UI/UX Designer", date: "13 Nov 2026", status: "Screening" },
  { name: "Rahul Kumar", job: "Python Developer", date: "14 Nov 2026", status: "Interview" },
  { name: "Ananya Verma", job: "Frontend Developer", date: "15 Nov 2026", status: "Selected" },
  { name: "Rohan Gupta", job: "UI/UX Designer", date: "16 Nov 2026", status: "Applied" }
];

const jobsList = document.getElementById("jobsList");
const candidateTable = document.getElementById("candidateTable");

// Show job openings
function displayJobs() {
  jobsList.innerHTML = "";

  jobs.forEach(function(job) {
    jobsList.innerHTML += `
      <div class="job-item">
        <div class="job-symbol">${job.title.charAt(0)}</div>
        <div class="job-info">
          <strong>${job.title}</strong>
          <small>${job.department} • ${job.type}</small>
        </div>
        <span class="open-label">● Open</span>
      </div>
    `;
  });

  document.getElementById("totalJobs").textContent = jobs.length;
}

// Show candidates
function displayCandidates(list = candidates) {
  candidateTable.innerHTML = "";

  if (list.length === 0) {
    candidateTable.innerHTML =
      `<tr><td colspan="5" class="empty-message">No candidates found.</td></tr>`;
    return;
  }

  list.forEach(function(candidate) {
    const initials = candidate.name
      .split(" ")
      .map(word => word[0])
      .join("");

    const statusClass = candidate.status.toLowerCase();

    candidateTable.innerHTML += `
      <tr>
        <td>
          <div class="candidate-name">
            <div class="candidate-avatar">${initials}</div>
            ${candidate.name}
          </div>
        </td>
        <td>${candidate.job}</td>
        <td>${candidate.date}</td>
        <td>
          <span class="status status-${statusClass}">
            ${candidate.status}
          </span>
        </td>
        <td>
          <select class="status-select"
            onchange="updateStatus('${candidate.name}', this.value)">
            <option ${candidate.status === "Applied" ? "selected" : ""}>Applied</option>
            <option ${candidate.status === "Screening" ? "selected" : ""}>Screening</option>
            <option ${candidate.status === "Interview" ? "selected" : ""}>Interview</option>
            <option ${candidate.status === "Selected" ? "selected" : ""}>Selected</option>
          </select>
        </td>
      </tr>
    `;
  });
}

// Update candidate status
function updateStatus(name, newStatus) {
  const candidate = candidates.find(function(person) {
    return person.name === name;
  });

  if (candidate) {
    candidate.status = newStatus;
    updateDashboard();
    displayCandidates();
  }
}

// Update dashboard numbers
function updateDashboard() {
  const total = candidates.length;
  const applied = candidates.filter(c => c.status === "Applied").length;
  const screening = candidates.filter(c => c.status === "Screening").length;
  const interviews = candidates.filter(c => c.status === "Interview").length;
  const selected = candidates.filter(c => c.status === "Selected").length;

  document.getElementById("totalApplicants").textContent = total;
  document.getElementById("totalInterviews").textContent = interviews;
  document.getElementById("totalSelected").textContent = selected;

  document.getElementById("pipelineTotal").textContent = total;
  document.getElementById("appliedCount").textContent = applied;
  document.getElementById("screeningCount").textContent = screening;
  document.getElementById("interviewCount").textContent = interviews;
  document.getElementById("selectedCount").textContent = selected;
}

// Show and hide add job form
function showJobForm() {
  document.getElementById("jobForm").classList.toggle("hidden");
}

// Add new job
document.getElementById("jobForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const title = document.getElementById("jobTitle").value.trim();
  const department = document.getElementById("jobDepartment").value.trim();
  const type = document.getElementById("jobType").value.trim();

  if (title && department && type) {
    jobs.unshift({ title: title, department: department, type: type });

    displayJobs();
    this.reset();
    this.classList.add("hidden");
  }
});

// Search candidates
document.getElementById("searchInput").addEventListener("input", function() {
  const searchText = this.value.toLowerCase();

  const filteredCandidates = candidates.filter(function(candidate) {
    return candidate.name.toLowerCase().includes(searchText) ||
      candidate.job.toLowerCase().includes(searchText) ||
      candidate.status.toLowerCase().includes(searchText);
  });

  displayCandidates(filteredCandidates);
});

// Start dashboard
displayJobs();
displayCandidates();
updateDashboard();
