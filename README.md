# Tic-Tac-Toe

A modern, TypeScript-based tic-tac-toe game rendered on HTML5 Canvas with a sleek UI and smooth animations.

## 🎮 [Play the Game Live](https://manuelbv.github.io/tic-tac-toe/)

Try it now at: **https://manuelbv.github.io/tic-tac-toe/**

## Features

- 🎮 Two-player gameplay (X vs O)
- 🎨 Beautiful canvas-based rendering
- 🏆 Win detection for rows, columns, and diagonals
- 🔄 Restart functionality
- 👁️ Hover preview for moves
- 📱 Responsive design
- ⚡ Lightning-fast Vite dev server
- 📦 Optimized production build

## Tech Stack

- **TypeScript** - Type-safe development
- **Vite** - Modern build tool with fast HMR
- **HTML5 Canvas** - Game rendering
- **Vanilla CSS** - Styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tic-tac-toe
```

2. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` to play the game.

### Build for Production

Create an optimized production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Deploy to GitHub Pages

Deploy the game to GitHub Pages:
```bash
npm run deploy
```

This will build the project and publish it to the `gh-pages` branch.

## How to Play

1. **X** always goes first
2. Click on any empty cell to place your mark
3. Players alternate turns
4. First player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
5. If all cells are filled with no winner, the game is a tie
6. Click **Restart Game** to start a new game

## Project Structure

```
tic-tac-toe/
├── src/
│   ├── game/
│   │   ├── Board.ts           # Game state and logic
│   │   ├── Game.ts            # Game controller
│   │   └── Player.ts          # Type definitions
│   ├── rendering/
│   │   └── CanvasRenderer.ts  # Canvas drawing operations
│   ├── utils/
│   │   └── helpers.ts         # Utility functions
│   ├── styles/
│   │   └── main.css           # Styling
│   └── main.ts                # Entry point
├── index.html                 # HTML template
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Architecture

The game follows the **Model-View-Controller (MVC)** pattern:

- **Model** (`Board.ts`): Manages game state, validates moves, and detects wins
- **View** (`CanvasRenderer.ts`): Handles all canvas drawing operations
- **Controller** (`Game.ts`): Coordinates user input, game flow, and rendering

## Canvas Rendering

The game uses HTML5 Canvas for rendering:

- **Grid**: Dark gray lines forming a 3x3 grid
- **X Marks**: Blue diagonal lines with rounded caps
- **O Marks**: Red circles
- **Hover Preview**: Semi-transparent preview of the next move
- **Win Line**: Green line drawn through winning marks
- **Game Over Text**: Centered text displaying the winner

## License

MIT License - feel free to use this project for learning or personal projects.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Future Enhancements

- Single-player mode with AI opponent
- Score tracking across multiple rounds
- Animations for mark placement
- Sound effects
- Different themes and color schemes
- Online multiplayer
