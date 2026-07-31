const opportunities = [
  {
    title: "AI Innovation Hackathon",
    category: "Hackathons",
    location: "Online",
    deadline: "2026-08-15",
    description: "Build an AI-powered solution to solve a real-world problem."
  },
  {
    title: "Student Startup Challenge",
    category: "Competitions",
    location: "India",
    deadline: "2026-08-25",
    description: "Present your startup idea and compete with student innovators."
  },
  {
    title: "Future Leaders Scholarship",
    category: "Scholarships",
    location: "India",
    deadline: "2026-09-10",
    description: "A scholarship opportunity for ambitious students."
  },
  {
    title: "Google Developer Program",
    category: "Tech Programs",
    location: "Online",
    deadline: "2026-09-20",
    description: "Learn, build projects and connect with the developer community."
  }
];

function displayOpportunities(list) {
  const container = document.getElementById("opportunityList");

  if (!container) return;

  container.innerHTML = "";

  list.forEach(opportunity => {
    const card = document.createElement("div");

    card.className = "opportunity-card";

    card.innerHTML = `
      <h3>${opportunity.title}</h3>

      <p>${opportunity.description}</p>

      <div class="tags">
        <span>${opportunity.category}</span>
        <span>${opportunity.location}</span>
      </div>

      <p>
        <strong>Deadline:</strong>
        ${opportunity.deadline}
      </p>

      <button onclick="saveOpportunity('${opportunity.title}')">
        ⭐ Save
      </button>
    `;

    container.appendChild(card);
  });
}

function searchOpportunities() {
  const searchBox = document.getElementById("searchBox");

  if (!searchBox) return;

  const query = searchBox.value.toLowerCase();

  const filtered = opportunities.filter(opportunity =>
    opportunity.title.toLowerCase().includes(query) ||
    opportunity.category.toLowerCase().includes(query) ||
    opportunity.description.toLowerCase().includes(query)
  );

  displayOpportunities(filtered);
}

function saveOpportunity(title) {
  let saved = JSON.parse(localStorage.getItem("savedOpportunities")) || [];

  if (!saved.includes(title)) {
    saved.push(title);
    localStorage.setItem("savedOpportunities", JSON.stringify(saved));

    alert("Opportunity saved ⭐");
  } else {
    alert("Already saved!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayOpportunities(opportunities);
});

function filterCategory(category) {

  if (category === "All") {
    displayOpportunities(opportunities);
    return;
  }

  const filtered = opportunities.filter(opportunity =>
    opportunity.category === category
  );

  displayOpportunities(filtered);
}

