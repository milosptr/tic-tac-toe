# Tic Tackity Toe

This project is a web-based Tic Tac Toe game built with React, TypeScript, Vite, and a Node.js/Express/Socket.IO backend.

## Game Description

Tic Tackity Toe is a classic two-player game where players take turns marking spaces in a 3x3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game. This implementation allows users to:

- Register with a nickname.
- See a list of available players and ongoing matches.
- Challenge other players to a game.
- Play Tic Tac Toe in real-time against an opponent.
- View match history (optional feature - confirm if implemented).

## Project Structure

The project is split between frontend (client) and backend (server) code:

- **`/` (Root Directory)**: Contains the configuration files for the frontend application.

- **`/src` (Frontend Source)**: This is where all the client-side code lives. It's organized into:

  - **Pages**: The application has three main pages:
    - **Welcome**: The first screen users see, where they register with a nickname to start playing.
    - **Dashboard**: The main hub where players see who's online, can challenge others, and view ongoing matches.
    - **Match**: Where the actual Tic Tac Toe game is played, showing the game board and player information.
  - **Components**: Reusable elements like buttons, the game board grid, player cards, and other UI pieces.
  - **Assets**: Images, icons, and other visual resources used throughout the app.
  - **Context**: Provides ways to share data (like user information) across different parts of the app.
  - **Services**: Handles communication with the server, particularly the real-time socket connections.
  - **Store**: Manages the application's state - keeping track of game data, user status, and other important information.
  - **Hooks**: Special functions that make common tasks easier, like connecting to the server or managing forms.
  - **Types**: Definitions that help ensure data is structured correctly throughout the application.

- **`/server`**: Contains the backend code that manages game rules, player connections, and real-time communication between players.

## Prerequisites

- Node.js (v18 or later recommended)
- pnpm (or npm/yarn)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/milosptr/tic-tac-toe
    cd tic-tac-toe
    ```

2.  **Install frontend dependencies:**

    ```bash
    pnpm install
    ```

3.  **Install backend dependencies:**

    ```bash
    cd server
    pnpm install
    cd ..
    ```

4.  **Run the development servers:**

    - **Backend:** Open a terminal and run:

      ```bash
      cd server
      pnpm start
      ```

      This will start the backend server (usually on port 4000, check server logs).

    - **Frontend:** Open another terminal and run:
      ```bash
      pnpm dev
      ```
      This will start the Vite development server (usually on port 3000).

5.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000` (or the port shown by Vite).

## Available Scripts

### Root Directory (Frontend)

- `pnpm dev`: Runs the Vite development server.
- `pnpm build`: Builds the frontend application for production.
- `pnpm lint`: Lints the frontend code using ESLint.
- `pnpm preview`: Serves the production build locally.

### `/server` Directory (Backend)

- `pnpm start`: Runs the backend server using `nodemon` and `ts-node` for development (with auto-reloading).
- `pnpm build`: Compiles the TypeScript backend code to JavaScript.

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Redux Toolkit, Socket.IO Client, Tailwind CSS
- **Backend:** Node.js, TypeScript, Express, Socket.IO, Redis (optional, based on `ioredis` dependency)
- **Package Manager:** pnpm
