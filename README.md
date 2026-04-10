# 🎮 GameVerse — Advanced Game Finder

A frontend web application that lets you explore thousands of games from around the world — search, sort, and discover your next favorite game with a sleek cyberpunk UI.

---

## 📌 Overview

GameVerse fetches live data from the [RAWG Video Games API](https://rawg.io/apidocs) and displays it in an interactive card-based UI. Users can search games by name, sort alphabetically, toggle between dark and light mode, and browse an infinite scroll of games.

---

## ✨ Features

- 🔍 **Real-Time Search** — Filter games by name as you type
- 🔤 **Sort** — Sort games A→Z, Z→A, or keep the default order
- 🌓 **Dark / Light Mode** — Toggle between themes with one click
- ♾️ **Infinite Scroll** — New games automatically load as you scroll down
- 🃏 **Game Cards** — Each card shows the game cover image, name, release date, rating, and genres
- ⚡ **Loading Spinner** — Visual feedback while data is being fetched

---

## 🗂️ Project Structure

```
gameverse/
├── index.html      # App markup and layout
├── index.css       # Styling for cards, header, loader, theme, etc.
└── index.js        # All application logic (DOM, API calls, state, render)
```

---

## ⚙️ How It Works

### Data Loading

On page load, `fetchApi()` fetches games from the RAWG API using your API key, page number, and a page size of 9:

```
https://api.rawg.io/api/games?key=YOUR_KEY&page=1&page_size=9
```

New results are appended to the `allGames` array and the UI re-renders after each fetch.

### State Management

| Variable | Purpose |
|---|---|
| `allGames` | Master list of all fetched games, grows with each scroll |
| `page` | Tracks current page number for pagination |
| `isLoading` | Prevents duplicate API calls while a fetch is in progress |

### Search & Sort

`render()` reads the search input and selected sort value, filters and sorts `allGames`, then rebuilds the card grid via `innerHTML`. Both work together simultaneously.

| Sort Value | Behavior |
|---|---|
| `default` | Original API order |
| `asc` | Alphabetical A → Z |
| `desc` | Alphabetical Z → A |

### Infinite Scroll

A `scroll` event listener on `window` calls `fetchApi()` whenever the user scrolls. The `isLoading` flag ensures only one request runs at a time, preventing duplicate fetches.

### Theme Toggle

Clicking the 🌓 button toggles the `light-mode` class on `<body>`. All colors are driven by CSS custom properties (`--bg-primary`, `--bg-card`, `--text-primary`), so the entire theme switches instantly.

---

## 🚀 Getting Started

No build tools or dependencies required. Just open `index.html` in your browser.

```bash
# Clone or download the project
git clone https://github.com/your-username/gameverse.git

# Open in browser
open index.html
# or just double-click index.html in your file explorer
```

> ⚠️ Requires an internet connection to fetch data from the RAWG API.



## 🔌 API Reference

This project uses the free [RAWG Video Games Database API](https://rawg.io/apidocs).

| Endpoint | Used For |
|---|---|
| `/api/games?key=...&page=...&page_size=9` | Loading paginated game results |

**Fields used from each game object:**

| Field | Displayed As |
|---|---|
| `name` | Game title |
| `background_image` | Card cover image |
| `released` | Release date |
| `rating` | Star rating score |
| `genres` | Comma-separated genre list |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| HTML | App structure and layout |
| CSS | Styling, theming, animations |
| JavaScript | DOM manipulation, API calls, state |
| RAWG API | Live game data source |
| Google Fonts (Outfit) | Typography |



## 📄 License

This project is open source and free to use for learning and personal projects.
