export type Direction = 'north' | 'south' | 'east' | 'west';

export type Command = 'forward' | 'backward' | 'turnLeft' | 'turnRight' | 'pause';

export interface Position {
  x: number;
  y: number;
}

export interface BeeBot {
  position: Position;
  direction: Direction;
  isMoving: boolean;
  isExecuting: boolean;
}

export interface GridCell {
  position: Position;
  content?: string;
  type: 'empty' | 'target' | 'obstacle' | 'number' | 'letter' | 'custom';
  isHighlighted: boolean;
}

export interface LearningMat {
  id: string;
  name: string;
  description: string;
  gridSize: number;
  cells: GridCell[][];
  startPosition: Position;
  targetPosition: Position;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  theme: 'alphabet' | 'numbers' | 'community' | 'shapes' | 'custom';
}

export interface GameState {
  currentMat: LearningMat;
  beeBot: BeeBot;
  commands: Command[];
  currentCommandIndex: number;
  isPlaying: boolean;
  isExecuting: boolean;
  score: number;
  level: number;
}

export interface User {
  id: string;
  name: string;
  age: number;
  progress: {
    completedMats: string[];
    totalScore: number;
    badges: string[];
    currentLevel: number;
  };
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  classes: string[];
  students: User[];
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  children: User[];
}