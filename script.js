async function loadLatestOpportunities() {

    const container = document.getElementById("latestOpportunities");

    if (!container) return;

    try {

        const response = await fetch("data/opportunities.json");
        const data = await response.json();

        container.innerHTML = "";

        data.slice(0,6).forEach(item => {

            container.innerHTML += `
                <div class="card">
                    <h3>${item.title}</h3>

                    <p>${item.description}</p>

                    <span class="tag">${item.organization}</span>
                    <span class="tag">${item.category}</span>

                    <br><br>

                    <a href="${item.url}" target="_blank">
                        Apply →
                    </a>
                </div>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

function searchOpportunities(){

    window.location.href =
        "explore.html?q=" +
        document.getElementById("searchInput").value;

}

loadLatestOpportunities();
