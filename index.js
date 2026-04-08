const key = "08b6e6aaf2bb4c9ea21114bea49b7262"
const container = document.getElementById("container")
const btn = document.getElementById("btn")
const loader = document.getElementById("loader");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const themeToggle = document.getElementById("themeToggle");

if (btn) btn.style.display = 'none';

let page = 1;
let isLoading = false;
let allGames = [];

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

searchInput.addEventListener("input", render);
sortSelect.addEventListener("change", render);

async function fetchApi() {
    if (isLoading) return;
    isLoading = true;
    if (loader) loader.classList.add("active");

    const url = "https://api.rawg.io/api/games?key=" + key + "&page=" + page + "&page_size=9";
    try {
        const res = await fetch(url);
        const data = await res.json();

        allGames = allGames.concat(data.results);
        
        render();
        
        page++;
    } catch (e) {
        console.error("Failed to load games:", e);
    } finally {
        if (loader) loader.classList.remove("active");
        isLoading = false;
    }
}

function render() {
    const query = searchInput.value.toLowerCase().trim();
    const sortVal = sortSelect.value;
    
    let filteredGames = allGames.filter(game => game.name.toLowerCase().includes(query));
    
    filteredGames.sort((a, b) => {
        if (sortVal === "asc") return a.name.localeCompare(b.name);
        if (sortVal === "desc") return b.name.localeCompare(a.name);
        return 0;
    });

    container.innerHTML = filteredGames.map(game => {
        const imageUrl = game.background_image || 'https://via.placeholder.com/300x200/14141d/ffffff?text=No+Image';
        return `
            <div class="game">
                <div class="image-wrapper">
                    <img src="${imageUrl}" alt="${game.name}">
                </div>
                <div class="game-info">
                    <h1>${game.name}</h1>
                    <p>Released: ${game.released}</p>
                    <p>Rating: ${game.rating}</p>
                    <p>Genres: ${game.genres.map(genre => genre.name).join(", ")}</p>
                </div>
            </div>
        `;
    }).join('');
}

fetchApi()

window.addEventListener("scroll", () => {
    fetchApi();
});