# 🎬 CinePalette

> **Discover movies through aesthetics and vibes.**

![Project Banner](https://via.placeholder.com/1200x400/0d0d0d/eab308?text=CinePalette+Preview) 
CinePalette is a modern movie discovery application that moves beyond standard genres. It allows users to find films based on "Vibes" (Aesthetics) and features a dynamic UI that adapts its color palette based on the movie poster being viewed.

Built with the latest web standards of 2026, including **Tailwind CSS v4** and **React 19**.

## ✨ Key Features

-   **🎨 Dynamic Color Extraction:** The interface physically changes color based on the dominant color of the movie poster using advanced canvas analysis.
-   **mood / Vibe Engine:** A curated discovery engine that maps abstract feelings (e.g., "Neon", "Vintage", "Dreamy") to complex TMDB queries.
-   **⚡ High Performance:** Implements `useDebounce` hooks for search and optimistic UI updates with Skeleton Loaders.
-   **📱 Fully Responsive:** Adaptive Grid Layout that works perfectly from Mobile to 4K Desktops.
-   **♾️ Smart Pagination:** "Load More" functionality that seamlessly appends data without layout shifts.

## 🛠️ Tech Stack

-   **Core:** React 19 (Vite), TypeScript
-   **Styling:** Tailwind CSS v4 (using the new CSS-first configuration)
-   **Data:** TMDB API (The Movie Database)
-   **State & Effects:** Custom Hooks (`useDebounce`)
-   **Routing:** React Router DOM v7
-   **Utils:** Fast Average Color (for image analysis), Lucide React (Icons)
-   **Code Quality:** ESLint (Flat Config), Prettier

## 🚀 Getting Started

### Prerequisites

You need a **TMDB API Key** (It's free).
1. Go to [The Movie DB](https://www.themoviedb.org/).
2. Sign up and request an API Key.

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/cinepalette.git](https://github.com/your-username/cinepalette.git)
    cd cinepalette
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_KEY=your_tmdb_api_key_here
    VITE_API_BASE_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)
    ```

4.  **Run the project**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
src/
├── components/      # UI & Feature Components (VibeSelector, MovieCard)
├── hooks/           # Custom Hooks (useDebounce)
├── pages/           # Page Views (Home, MovieDetails)
├── services/        # Axios & API Configuration
├── types/           # TypeScript Interfaces
└── utils/           # Helper functions (vibes.ts, imageHelper.ts)