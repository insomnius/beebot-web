import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, RotateCcw, RotateCw, Pause, Play, Trash2, RotateCcw as Reset } from 'lucide-react';
import { Command } from '../types';

interface CommandPanelProps {
  commands: Command[];
  onAddCommand: (command: Command) => void;
  onRemoveCommand: (index: number) => void;
  onClearCommands: () => void;
  onExecuteCommands: () => void;
  onResetGame: () => void;
  isPlaying: boolean;
  currentCommandIndex: number;
}

const CommandPanel: React.FC<CommandPanelProps> = ({
  commands,
  onAddCommand,
  onRemoveCommand,
  onClearCommands,
  onExecuteCommands,
  onResetGame,
  isPlaying,
  currentCommandIndex,
}) => {
  const commandButtons = [
    { command: 'forward' as Command, icon: ArrowUp, label: 'Forward', color: 'bg-bee-green', emoji: '⬆️' },
    { command: 'backward' as Command, icon: ArrowDown, label: 'Backward', color: 'bg-bee-red', emoji: '⬇️' },
    { command: 'turnLeft' as Command, icon: RotateCcw, label: 'Turn Left', color: 'bg-bee-blue', emoji: '⬅️' },
    { command: 'turnRight' as Command, icon: RotateCw, label: 'Turn Right', color: 'bg-bee-blue', emoji: '➡️' },
    { command: 'pause' as Command, icon: Pause, label: 'Pause', color: 'bg-bee-orange', emoji: '⏸️' },
  ];

  const getCommandEmoji = (command: Command) => {
    switch (command) {
      case 'forward': return '⬆️';
      case 'backward': return '⬇️';
      case 'turnLeft': return '⬅️';
      case 'turnRight': return '➡️';
      case 'pause': return '⏸️';
      default: return '❓';
    }
  };

  const getCommandLabel = (command: Command) => {
    switch (command) {
      case 'forward': return 'Forward';
      case 'backward': return 'Backward';
      case 'turnLeft': return 'Turn Left';
      case 'turnRight': return 'Turn Right';
      case 'pause': return 'Pause';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-bee-blue">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-bee-black font-kid mb-2">
          Command Center 🎮
        </h3>
        <p className="text-sm text-gray-600 font-kid">
          Drag or tap buttons to program Bee-Bot!
        </p>
      </div>

      {/* Command Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {commandButtons.map(({ command, icon: Icon, label, color, emoji }) => (
          <motion.button
            key={command}
            onClick={() => onAddCommand(command)}
            disabled={isPlaying}
            className={`${color} hover:opacity-80 text-white font-bold py-4 px-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 border-2 border-white disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: isPlaying ? 1 : 1.05 }}
            whileTap={{ scale: isPlaying ? 1 : 0.95 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">{emoji}</span>
              <span className="text-xs font-kid">{label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Command List */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-bold text-bee-black font-kid">
            Your Program 📝
          </h4>
          <span className="text-sm text-gray-600 font-kid">
            {commands.length} commands
          </span>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-3 min-h-[120px] border-2 border-gray-300">
          {commands.length === 0 ? (
            <div className="text-center text-gray-500 py-8 font-kid">
              <div className="text-4xl mb-2">🤖</div>
              <div>No commands yet!</div>
              <div className="text-sm">Add some commands above</div>
            </div>
          ) : (
            <div className="space-y-2">
              {commands.map((command, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg border-2 transition-all duration-200 ${
                    index === currentCommandIndex && isPlaying
                      ? 'bg-bee-yellow border-bee-black scale-105'
                      : 'bg-white border-gray-300'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCommandEmoji(command)}</span>
                    <span className="font-bold text-bee-black font-kid">
                      {getCommandLabel(command)}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveCommand(index)}
                    disabled={isPlaying}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-3">
        <motion.button
          onClick={onExecuteCommands}
          disabled={isPlaying || commands.length === 0}
          className="w-full bg-bee-green hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-green-700 disabled:cursor-not-allowed font-kid text-lg"
          whileHover={{ scale: isPlaying || commands.length === 0 ? 1 : 1.05 }}
          whileTap={{ scale: isPlaying || commands.length === 0 ? 1 : 0.95 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <Play size={20} />
            <span>{isPlaying ? 'Running...' : 'Go Bee-Bot!'}</span>
          </div>
        </motion.button>

        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={onClearCommands}
            disabled={isPlaying || commands.length === 0}
            className="bg-bee-orange hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 border-2 border-orange-700 disabled:cursor-not-allowed font-kid"
            whileHover={{ scale: isPlaying || commands.length === 0 ? 1 : 1.05 }}
            whileTap={{ scale: isPlaying || commands.length === 0 ? 1 : 0.95 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Trash2 size={16} />
              <span>Clear</span>
            </div>
          </motion.button>

          <motion.button
            onClick={onResetGame}
            disabled={isPlaying}
            className="bg-bee-blue hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200 border-2 border-blue-700 disabled:cursor-not-allowed font-kid"
            whileHover={{ scale: isPlaying ? 1 : 1.05 }}
            whileTap={{ scale: isPlaying ? 1 : 0.95 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Reset size={16} />
              <span>Reset</span>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-3 bg-bee-yellow rounded-lg border-2 border-bee-black">
        <h5 className="font-bold text-bee-black text-sm mb-2 font-kid">
          💡 Programming Tips:
        </h5>
        <ul className="text-xs text-bee-black space-y-1 font-kid">
          <li>• Plan your route before starting</li>
          <li>• Use turns to change direction</li>
          <li>• Test your program step by step</li>
          <li>• Don't forget to reach the target! 🎯</li>
        </ul>
      </div>
    </div>
  );
};

export default CommandPanel;