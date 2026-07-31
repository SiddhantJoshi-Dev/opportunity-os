let opportunities = [];

async function loadOpportunities() {
  try {
    const response = await fetch("data/opportunities.json");

    if (!response.ok) {
      throw new Error("Could not load opportunities.");
    }

    opportunities = await response.json();

    displayOpportunities(opportunities);

  } catch (error) {
    console.error(error);

    const container = document.getElementById("opportunityList");

    if (container) {
      container.innerHTML = `
        <p>
          Unable to load opportunities right now.
          Please try again later.
        </p>
      `;
    }
  }
}


function displayOpportunities(list) {

  const container = document.getElementById("opportunityList");

  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {

    container.innerHTML = `
      <div class="opportunity-card">
        <h3>No opportunities found</h3>
        <p>
          Try changing your search or filters.
        </p>
      </div>
    `;

    return;
  }


  list.forEach(opportunity => {

    const card = document.createElement("div");

    card.className = "opportunity-card";

    card.innerHTML = `

      <h3>${opportunity.title}</h3>

      <p>
        <strong>${opportunity.organization}</strong>
      </p>

      <p>
        ${opportunity.description}
      </p>

      <div class="tags">

        <span>${opportunity.category}</span>

        <span>${opportunity.location}</span>

        <span>${opportunity.mode}</span>

      </div>

      <p>
        <strong>Eligibility:</strong>
        ${opportunity.eligibility}
      </p>

      <p>
        <strong>Deadline:</strong>
        ${opportunity.deadline}
      </p>

      <a
        href="${opportunity.url}"
        target="_blank"
        rel="noopener noreferrer"
        class="view-button"
      >
        View Official Opportunity ↗
      </a>

      <button
        onclick="saveOpportunity('${opportunity.title.replace(/'/g, "\\'")}')"
      >
        ⭐ Save
      </button>

    `;

    container.appendChild(card);

  });

}


function saveOpportunity(title) {

  let saved =
    JSON.parse(
      localStorage.getItem("savedOpportunities")
    ) || [];

  if (!saved.includes(title)) {

    saved.push(title);

    localStorage.setItem(
      "savedOpportunities",
      JSON.stringify(saved)
    );

    alert("Opportunity saved ⭐");

  } else {

    alert("Already saved!");

  }

}


function filterOpportunities() {

  const searchBox =
    document.getElementById("searchBox");

  const categoryFilter =
    document.getElementById("categoryFilter");

  const modeFilter =
    document.getElementById("modeFilter");


  const search =
    searchBox
      ? searchBox.value.toLowerCase().trim()
      : "";

  const category =
    categoryFilter
      ? categoryFilter.value
      : "All";

  const mode =
    modeFilter
      ? modeFilter.value
      : "All";


  const filtered =
    opportunities.filter(opportunity => {

      const matchesSearch =
        opportunity.title
          .toLowerCase()
          .includes(search) ||

        opportunity.organization
          .toLowerCase()
          .includes(search) ||

        opportunity.description
          .toLowerCase()
          .includes(search) ||

        opportunity.tags
          .join(" ")
          .toLowerCase()
          .includes(search);


      const matchesCategory =
        category === "All" ||
        opportunity.category === category;


      const matchesMode =
        mode === "All" ||
        opportunity.mode === mode;


      return (
        matchesSearch &&
        matchesCategory &&
        matchesMode
      );

    });


  displayOpportunities(filtered);

}


document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadOpportunities();

    const searchBox =
      document.getElementById("searchBox");

    const categoryFilter =
      document.getElementById("categoryFilter");

    const modeFilter =
      document.getElementById("modeFilter");


    if (searchBox) {

      searchBox.addEventListener(
        "input",
        filterOpportunities
      );

    }


    if (categoryFilter) {

      categoryFilter.addEventListener(
        "change",
        filterOpportunities
      );

    }


    if (modeFilter) {

      modeFilter.addEventListener(
        "change",
        filterOpportunities
      );

    }

  }
);
