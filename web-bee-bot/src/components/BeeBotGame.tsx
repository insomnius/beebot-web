import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import GameGrid from './GameGrid';
import CommandPanel from './CommandPanel';
import MatSelector from './MatSelector';
import { GameState, LearningMat, Command, Position, Direction } from '../types';
import { createDefaultMat } from '../utils/matFactory';

const BeeBotGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const defaultMat = createDefaultMat();
    return {
      currentMat: defaultMat,
      beeBot: {
        position: defaultMat.startPosition,
        direction: 'east',
        isMoving: false,
        isExecuting: false,
      },
      commands: [],
      currentCommandIndex: 0,
      isPlaying: false,
      isExecuting: false,
      score: 0,
      level: 1,
    };
  });

  const [selectedMat, setSelectedMat] = useState<LearningMat>(gameState.currentMat);

  const addCommand = (command: Command) => {
    if (gameState.isPlaying) return;
    
    setGameState(prev => ({
      ...prev,
      commands: [...prev.commands, command],
    }));
    
    // Play sound effect
    playCommandSound(command);
  };

  const removeCommand = (index: number) => {
    if (gameState.isPlaying) return;
    
    setGameState(prev => ({
      ...prev,
      commands: prev.commands.filter((_, i) => i !== index),
    }));
  };

  const clearCommands = () => {
    if (gameState.isPlaying) return;
    
    setGameState(prev => ({
      ...prev,
      commands: [],
    }));
  };

  const executeCommands = async () => {
    if (gameState.commands.length === 0) {
      toast('Add some commands first! 🐝');
      return;
    }

    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      isExecuting: true,
      currentCommandIndex: 0,
    }));

    for (let i = 0; i < gameState.commands.length; i++) {
      await executeCommand(gameState.commands[i], i);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay between commands
    }

    // Check if Bee-Bot reached the target
    const finalPosition = gameState.beeBot.position;
    const targetPosition = gameState.currentMat.targetPosition;
    
    if (finalPosition.x === targetPosition.x && finalPosition.y === targetPosition.y) {
      toast.success('Great job! You reached the target! 🎉');
      setGameState(prev => ({
        ...prev,
        score: prev.score + 100,
        level: prev.level + 1,
      }));
    } else {
      toast('Oops! Bee-Bot didn\'t reach the target. Try again! 🤔');
    }

    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      isExecuting: false,
    }));
  };

  const executeCommand = async (command: Command, index: number) => {
    setGameState(prev => ({
      ...prev,
      currentCommandIndex: index,
    }));

    const newBeeBot = { ...gameState.beeBot };
    
    switch (command) {
      case 'forward':
        newBeeBot.position = getNextPosition(newBeeBot.position, newBeeBot.direction);
        break;
      case 'backward':
        newBeeBot.position = getNextPosition(newBeeBot.position, getOppositeDirection(newBeeBot.direction));
        break;
      case 'turnLeft':
        newBeeBot.direction = getLeftDirection(newBeeBot.direction);
        break;
      case 'turnRight':
        newBeeBot.direction = getRightDirection(newBeeBot.direction);
        break;
      case 'pause':
        // Do nothing, just wait
        break;
    }

    // Check bounds
    if (isValidPosition(newBeeBot.position, gameState.currentMat.gridSize)) {
      setGameState(prev => ({
        ...prev,
        beeBot: newBeeBot,
      }));
    }
  };

  const getNextPosition = (position: Position, direction: Direction): Position => {
    switch (direction) {
      case 'north':
        return { x: position.x, y: position.y - 1 };
      case 'south':
        return { x: position.x, y: position.y + 1 };
      case 'east':
        return { x: position.x + 1, y: position.y };
      case 'west':
        return { x: position.x - 1, y: position.y };
    }
  };

  const getOppositeDirection = (direction: Direction): Direction => {
    switch (direction) {
      case 'north': return 'south';
      case 'south': return 'north';
      case 'east': return 'west';
      case 'west': return 'east';
    }
  };

  const getLeftDirection = (direction: Direction): Direction => {
    switch (direction) {
      case 'north': return 'west';
      case 'west': return 'south';
      case 'south': return 'east';
      case 'east': return 'north';
    }
  };

  const getRightDirection = (direction: Direction): Direction => {
    switch (direction) {
      case 'north': return 'east';
      case 'east': return 'south';
      case 'south': return 'west';
      case 'west': return 'north';
    }
  };

  const isValidPosition = (position: Position, gridSize: number): boolean => {
    return position.x >= 0 && position.x < gridSize && position.y >= 0 && position.y < gridSize;
  };

  const playCommandSound = (command: Command) => {
    // Simple sound feedback - in a real app, you'd use actual audio files
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      beeBot: {
        ...prev.beeBot,
        position: prev.currentMat.startPosition,
        direction: 'east',
      },
      commands: [],
      currentCommandIndex: 0,
      isPlaying: false,
      isExecuting: false,
    }));
  };

  const changeMat = (mat: LearningMat) => {
    setSelectedMat(mat);
    setGameState(prev => ({
      ...prev,
      currentMat: mat,
      beeBot: {
        ...prev.beeBot,
        position: mat.startPosition,
        direction: 'east',
      },
      commands: [],
      currentCommandIndex: 0,
      isPlaying: false,
      isExecuting: false,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-bee-yellow"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-bee-black font-kid mb-2">
            Welcome to Bee-Bot World! 🐝
          </h2>
          <p className="text-lg text-gray-600 font-kid">
            Help Bee-Bot reach the target by giving it commands!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Mat Selector */}
          <div className="lg:col-span-1">
            <MatSelector
              selectedMat={selectedMat}
              onMatChange={changeMat}
              currentScore={gameState.score}
              currentLevel={gameState.level}
            />
          </div>

          {/* Center Panel - Game Grid */}
          <div className="lg:col-span-1">
            <GameGrid
              mat={gameState.currentMat}
              beeBot={gameState.beeBot}
              currentCommandIndex={gameState.currentCommandIndex}
              isExecuting={gameState.isExecuting}
            />
          </div>

          {/* Right Panel - Commands */}
          <div className="lg:col-span-1">
            <CommandPanel
              commands={gameState.commands}
              onAddCommand={addCommand}
              onRemoveCommand={removeCommand}
              onClearCommands={clearCommands}
              onExecuteCommands={executeCommands}
              onResetGame={resetGame}
              isPlaying={gameState.isPlaying}
              currentCommandIndex={gameState.currentCommandIndex}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BeeBotGame;