My personal webpage
=======
# 🌍 Personal Page

This is a web application that lets users discover and listen to online radio stations from all over the world, and is also my personal site.

It focuses on **simplicity, discovery, and performance**, providing a smooth listening experience with modern web technologies.

---

## ✨ Features

- 🎲 **Random Radio Discovery**
  - Start listening to a random radio station with one click
  - Shuffle to instantly discover a new station

- ❤️ **Favorite Stations**
  - Save favorite stations locally
  - Favorites are persisted using `localStorage`
  - Favorite stations are highlighted and easily accessible
  - Random mode prioritizes favorites when available

- 🌍 **Browse by Country**
  - Explore radio stations by country
  - Dedicated pages for each country

- 🎶 **Browse by Genre**
  - Explore radio stations by music genre
  - Dedicated pages for each genre

- 🎧 **Persistent Audio Player**
  - Audio keeps playing while navigating between pages
  - Play, pause, volume control
  - Graceful handling of unavailable streams

- 🌗 **Light & Dark Mode**
  - Toggle between light and dark themes
  - Theme preference is persisted in `localStorage`
  - Tailwind `dark:` utilities used throughout the app

- ⏳ **Loading States**
  - Visual loaders for all async page requests
  - Clear feedback during data fetching

---

## 🛠️ Technologies Used

### Frontend
- **Nuxt 3**
  - Hybrid rendering (SSR + client-side navigation)
  - File-based routing
- **Vue 3**
  - Composition API
  - `<script setup>`
- **Tailwind CSS**
  - Utility-first styling
  - Dark mode with class strategy
- **Pinia**
  - Global state management
  - Player, favorites, and theme state

### Backend / Data
- **Nuxt Server Routes (Nitro)**
  - Acts as a proxy layer
  - Normalizes and filters external API data
- **Radio Browser API**
  - Open, free directory of global radio stations

### Other
- **HTML5 Audio API**
  - Native audio streaming
- **LocalStorage**
  - Persist favorites and theme preference
- **Vite**
  - Fast development server and bundler

---

## 📁 Project Structure

```
├─ app.vue
├─ layouts/
│  └─ default.vue
├─ pages/
│  ├─ index.vue
│  ├─ stations.vue
│  ├─ favorites.vue
│  ├─ countries.vue
│  ├─ country/[code].vue
│  ├─ genres.vue
│  └─ genre/[slug].vue
├─ components/
│  ├─ station/
│  │  └─ StationCard.vue
│  ├─ player/
│  │  └─ PlayerBar.vue
│  └─ ui/
│     └─ Loader.vue
├─ stores/
│  ├─ player.ts
│  ├─ favorites.ts
│  └─ theme.ts
├─ server/
│  └─ api/
│     ├─ stations.get.ts
│     ├─ countries.get.ts
│     └─ genres.get.ts
├─ assets/
│  └─ css/
│     └─ main.css
├─ public/
│  └─ avatar.jpg
```

---

## 🚀 Running the Project Locally

### Requirements
- Node.js **18+**
- npm

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

Open:
```
http://localhost:3000
```
>>>>>>> 50f5390 (Initial commit)
