const key = "08b6e6aaf2bb4c9ea21114bea49b7262"
const container = document.getElementById("container")
const btn = document.getElementById("btn")
let pagesize = 9;

async function fetchApi(k) {
    const url = "https://api.rawg.io/api/games?key=" + key + "&page_size=" + k;
    const res = await fetch(url);
    const data = await res.json();
    container.innerHTML = '';

    data.results.forEach(game => {
        const div = document.createElement("div");
        div.classList.add("game");
        
        const imageUrl = game.background_image || 'https://via.placeholder.com/300x200/14141d/ffffff?text=No+Image';

        div.innerHTML = `
            <div class="image-wrapper">
                <img src="${imageUrl}" alt="${game.name}">
            </div>
            <div class="game-info">
                <h1>${game.name}</h1>
            </div>
        `;
        container.appendChild(div);
    });
}
btn.addEventListener("click",()=>{
    pagesize += 9
    fetchApi(pagesize)
})
fetchApi(pagesize)