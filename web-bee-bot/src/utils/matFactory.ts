import { LearningMat, GridCell } from '../types';

export const createDefaultMat = (): LearningMat => {
  const gridSize = 6;
  const cells: GridCell[][] = [];
  
  for (let y = 0; y < gridSize; y++) {
    cells[y] = [];
    for (let x = 0; x < gridSize; x++) {
      cells[y][x] = {
        position: { x, y },
        type: 'empty',
        isHighlighted: false,
      };
    }
  }
  
  // Set target position
  cells[4][4] = {
    position: { x: 4, y: 4 },
    type: 'target',
    content: '🎯',
    isHighlighted: false,
  };
  
  return {
    id: 'default-mat',
    name: 'Simple Grid',
    description: 'A basic 6x6 grid to practice movement commands',
    gridSize,
    cells,
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 4, y: 4 },
    difficulty: 'beginner',
    theme: 'custom',
  };
};

export const createAlphabetMat = (): LearningMat => {
  const gridSize = 6;
  const cells: GridCell[][] = [];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  for (let y = 0; y < gridSize; y++) {
    cells[y] = [];
    for (let x = 0; x < gridSize; x++) {
      const letterIndex = y * gridSize + x;
      if (letterIndex < letters.length) {
        cells[y][x] = {
          position: { x, y },
          type: 'letter',
          content: letters[letterIndex],
          isHighlighted: false,
        };
      } else {
        cells[y][x] = {
          position: { x, y },
          type: 'empty',
          isHighlighted: false,
        };
      }
    }
  }
  
  // Set target to letter 'Z'
  const targetY = Math.floor(25 / gridSize);
  const targetX = 25 % gridSize;
  
  return {
    id: 'alphabet-mat',
    name: 'Alphabet Adventure',
    description: 'Learn letters while programming Bee-Bot!',
    gridSize,
    cells,
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: targetX, y: targetY },
    difficulty: 'intermediate',
    theme: 'alphabet',
  };
};

export const createNumberMat = (): LearningMat => {
  const gridSize = 6;
  const cells: GridCell[][] = [];
  
  for (let y = 0; y < gridSize; y++) {
    cells[y] = [];
    for (let x = 0; x < gridSize; x++) {
      const number = y * gridSize + x + 1;
      if (number <= 36) {
        cells[y][x] = {
          position: { x, y },
          type: 'number',
          content: number.toString(),
          isHighlighted: false,
        };
      } else {
        cells[y][x] = {
          position: { x, y },
          type: 'empty',
          isHighlighted: false,
        };
      }
    }
  }
  
  // Set target to number 36
  const targetY = Math.floor(35 / gridSize);
  const targetX = 35 % gridSize;
  
  return {
    id: 'number-mat',
    name: 'Number Journey',
    description: 'Practice counting and sequencing with numbers!',
    gridSize,
    cells,
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: targetX, y: targetY },
    difficulty: 'intermediate',
    theme: 'numbers',
  };
};

export const createCommunityMat = (): LearningMat => {
  const gridSize = 6;
  const cells: GridCell[][] = [];
  
  const communityPlaces = [
    '🏠', '🏫', '🏥', '🚗', '🌳', '🏪',
    '🚌', '🎠', '🏖️', '🏟️', '🎭', '🏛️',
    '🚦', '📮', '🏦', '⛽', '🏪', '🎪',
    '🏨', '🏰', '🗼', '🌉', '🎡', '🎢',
    '🏕️', '🏜️', '🏔️', '🌋', '🏝️', '🏄',
    '🚁', '🚢', '🚂', '🚀', '🛸', '🎯'
  ];
  
  for (let y = 0; y < gridSize; y++) {
    cells[y] = [];
    for (let x = 0; x < gridSize; x++) {
      const index = y * gridSize + x;
      cells[y][x] = {
        position: { x, y },
        type: 'custom',
        content: communityPlaces[index],
        isHighlighted: false,
      };
    }
  }
  
  return {
    id: 'community-mat',
    name: 'Community Explorer',
    description: 'Explore different places in your community!',
    gridSize,
    cells,
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 5, y: 5 },
    difficulty: 'advanced',
    theme: 'community',
  };
};

export const createShapeMat = (): LearningMat => {
  const gridSize = 6;
  const cells: GridCell[][] = [];
  
  const shapes = [
    '🔴', '🔵', '🟡', '🟢', '🟣', '🟠',
    '⭐', '💎', '🔶', '🔷', '💠', '🔸',
    '🔹', '🟥', '🟦', '🟨', '🟩', '🟪',
    '🟫', '⚫', '⚪', '🟤', '🟡', '🟢',
    '🔴', '🔵', '🟡', '🟢', '🟣', '🟠',
    '⭐', '💎', '🔶', '🔷', '💠', '🎯'
  ];
  
  for (let y = 0; y < gridSize; y++) {
    cells[y] = [];
    for (let x = 0; x < gridSize; x++) {
      const index = y * gridSize + x;
      cells[y][x] = {
        position: { x, y },
        type: 'custom',
        content: shapes[index],
        isHighlighted: false,
      };
    }
  }
  
  return {
    id: 'shape-mat',
    name: 'Shape Safari',
    description: 'Learn about shapes and colors!',
    gridSize,
    cells,
    startPosition: { x: 0, y: 0 },
    targetPosition: { x: 5, y: 5 },
    difficulty: 'beginner',
    theme: 'shapes',
  };
};

export const getAllMats = (): LearningMat[] => {
  return [
    createDefaultMat(),
    createAlphabetMat(),
    createNumberMat(),
    createCommunityMat(),
    createShapeMat(),
  ];
};