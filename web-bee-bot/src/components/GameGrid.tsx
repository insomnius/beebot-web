import React from 'react';
import { motion } from 'framer-motion';
import { LearningMat, BeeBot, Position } from '../types';

interface GameGridProps {
  mat: LearningMat;
  beeBot: BeeBot;
  currentCommandIndex: number;
  isExecuting: boolean;
}

const GameGrid: React.FC<GameGridProps> = ({ mat, beeBot, currentCommandIndex, isExecuting }) => {
  const getDirectionArrow = (direction: string) => {
    switch (direction) {
      case 'north': return '⬆️';
      case 'south': return '⬇️';
      case 'east': return '➡️';
      case 'west': return '⬅️';
      default: return '➡️';
    }
  };

  const getCellBackground = (cell: any, position: Position) => {
    if (position.x === beeBot.position.x && position.y === beeBot.position.y) {
      return 'bg-bee-yellow border-4 border-bee-black';
    }
    
    if (cell.type === 'target') {
      return 'bg-bee-green border-4 border-green-700';
    }
    
    if (cell.type === 'obstacle') {
      return 'bg-bee-red border-4 border-red-700';
    }
    
    if (cell.type === 'letter') {
      return 'bg-blue-100 border-2 border-blue-300';
    }
    
    if (cell.type === 'number') {
      return 'bg-purple-100 border-2 border-purple-300';
    }
    
    return 'bg-white border-2 border-gray-300';
  };

  const getCellContent = (cell: any, position: Position) => {
    if (position.x === beeBot.position.x && position.y === beeBot.position.y) {
      return (
        <div className="flex flex-col items-center justify-center">
          <div className="bee-robot">
            {getDirectionArrow(beeBot.direction)}
          </div>
          <div className="text-xs text-bee-black font-bold mt-1">
            Bee-Bot
          </div>
        </div>
      );
    }
    
    if (cell.content) {
      return (
        <div className="text-2xl font-bold">
          {cell.content}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-bee-blue">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-bee-black font-kid mb-2">
          {mat.name}
        </h3>
        <p className="text-sm text-gray-600 font-kid">
          {mat.description}
        </p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <span className="text-xs bg-bee-yellow px-2 py-1 rounded-full text-bee-black font-bold">
            {mat.difficulty}
          </span>
          <span className="text-xs bg-bee-blue px-2 py-1 rounded-full text-white font-bold">
            {mat.theme}
          </span>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <div className="bg-bee-yellow px-4 py-2 rounded-lg border-2 border-bee-black">
          <div className="text-center">
            <div className="text-sm font-bold text-bee-black">Start</div>
            <div className="text-xs text-bee-black">Position</div>
          </div>
        </div>
        <div className="mx-4 flex items-center">
          <div className="w-8 h-1 bg-bee-black"></div>
          <div className="text-bee-black mx-2">→</div>
          <div className="w-8 h-1 bg-bee-black"></div>
        </div>
        <div className="bg-bee-green px-4 py-2 rounded-lg border-2 border-green-700">
          <div className="text-center">
            <div className="text-sm font-bold text-white">Target</div>
            <div className="text-xs text-white">Goal</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div 
          className="grid gap-1 p-4 bg-gray-100 rounded-lg border-4 border-bee-black"
          style={{
            gridTemplateColumns: `repeat(${mat.gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${mat.gridSize}, 1fr)`,
          }}
        >
          {mat.cells.map((row, y) =>
            row.map((cell, x) => (
              <motion.div
                key={`${x}-${y}`}
                className={`grid-cell ${getCellBackground(cell, { x, y })}`}
                style={{ width: '64px', height: '64px' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isExecuting && currentCommandIndex === (y * mat.gridSize + x) ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {getCellContent(cell, { x, y })}
              </motion.div>
            ))
          )}
        </div>
      </div>

      <div className="text-center mt-4">
        <div className="inline-flex items-center space-x-2 bg-bee-yellow px-4 py-2 rounded-lg border-2 border-bee-black">
          <span className="text-sm font-bold text-bee-black">Bee-Bot Status:</span>
          <span className={`text-sm font-bold ${beeBot.isMoving ? 'text-bee-green' : 'text-bee-blue'}`}>
            {beeBot.isMoving ? 'Moving...' : 'Ready'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameGrid;