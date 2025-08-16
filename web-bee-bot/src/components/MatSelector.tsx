import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Target, Award } from 'lucide-react';
import { LearningMat } from '../types';
import { getAllMats } from '../utils/matFactory';

interface MatSelectorProps {
  selectedMat: LearningMat;
  onMatChange: (mat: LearningMat) => void;
  currentScore: number;
  currentLevel: number;
}

const MatSelector: React.FC<MatSelectorProps> = ({
  selectedMat,
  onMatChange,
  currentScore,
  currentLevel,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const allMats = getAllMats();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-bee-green';
      case 'intermediate': return 'bg-bee-orange';
      case 'advanced': return 'bg-bee-red';
      default: return 'bg-gray-400';
    }
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'alphabet': return '🔤';
      case 'numbers': return '🔢';
      case 'community': return '🏘️';
      case 'shapes': return '🔷';
      case 'custom': return '🎯';
      default: return '🎮';
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'alphabet': return 'bg-blue-100 border-blue-300';
      case 'numbers': return 'bg-purple-100 border-purple-300';
      case 'community': return 'bg-green-100 border-green-300';
      case 'shapes': return 'bg-pink-100 border-pink-300';
      case 'custom': return 'bg-gray-100 border-gray-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-bee-blue">
      {/* Progress Section */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-bee-black font-kid mb-4">
          Your Progress 📊
        </h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-bee-yellow rounded-lg p-3 border-2 border-bee-black">
            <div className="flex items-center justify-center space-x-2">
              <Star className="text-bee-black" size={20} />
              <div>
                <div className="text-lg font-bold text-bee-black font-kid">{currentScore}</div>
                <div className="text-xs text-bee-black font-kid">Points</div>
              </div>
            </div>
          </div>
          
          <div className="bg-bee-blue rounded-lg p-3 border-2 border-blue-700">
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="text-white" size={20} />
              <div>
                <div className="text-lg font-bold text-white font-kid">{currentLevel}</div>
                <div className="text-xs text-white font-kid">Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1 font-kid">
            <span>Level {currentLevel}</span>
            <span>Level {currentLevel + 1}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-gray-300">
            <div 
              className="bg-bee-green h-full rounded-full transition-all duration-500"
              style={{ width: `${(currentScore % 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Current Mat Display */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-bee-black font-kid mb-3">
          Current Challenge 🎯
        </h4>
        
        <div className={`p-4 rounded-lg border-2 ${getThemeColor(selectedMat.theme)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{getThemeIcon(selectedMat.theme)}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(selectedMat.difficulty)}`}>
              {selectedMat.difficulty}
            </span>
          </div>
          <h5 className="font-bold text-bee-black font-kid text-lg mb-1">
            {selectedMat.name}
          </h5>
          <p className="text-sm text-gray-600 font-kid">
            {selectedMat.description}
          </p>
        </div>
      </div>

      {/* Mat Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-bold text-bee-black font-kid">
            Choose a Challenge 🎮
          </h4>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-bee-blue hover:text-blue-700 font-bold font-kid"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="space-y-2">
          {allMats.slice(0, isExpanded ? allMats.length : 3).map((mat) => (
            <motion.button
              key={mat.id}
              onClick={() => onMatChange(mat)}
              className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                mat.id === selectedMat.id
                  ? 'border-bee-yellow bg-bee-yellow shadow-lg scale-105'
                  : 'border-gray-300 bg-white hover:border-bee-blue hover:bg-blue-50'
              }`}
              whileHover={{ scale: mat.id === selectedMat.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getThemeIcon(mat.theme)}</span>
                  <div>
                    <div className="font-bold text-bee-black font-kid">{mat.name}</div>
                    <div className="text-xs text-gray-600 font-kid">{mat.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${getDifficultyColor(mat.difficulty)}`}>
                    {mat.difficulty}
                  </span>
                  {mat.id === selectedMat.id && (
                    <Award className="text-bee-yellow" size={16} />
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-bee-yellow rounded-lg p-4 border-2 border-bee-black">
        <h5 className="font-bold text-bee-black text-sm mb-3 font-kid">
          🏆 Recent Achievements:
        </h5>
        <div className="space-y-2">
          {currentScore >= 100 && (
            <div className="flex items-center space-x-2 text-xs text-bee-black">
              <Star size={14} />
              <span className="font-kid">First Steps - Complete your first challenge!</span>
            </div>
          )}
          {currentScore >= 300 && (
            <div className="flex items-center space-x-2 text-xs text-bee-black">
              <Trophy size={14} />
              <span className="font-kid">Programming Pro - Complete 3 challenges!</span>
            </div>
          )}
          {currentLevel >= 2 && (
            <div className="flex items-center space-x-2 text-xs text-bee-black">
              <Target size={14} />
              <span className="font-kid">Level Up - Reached level {currentLevel}!</span>
            </div>
          )}
          {currentScore === 0 && (
            <div className="text-xs text-bee-black font-kid text-center py-2">
              Start playing to earn achievements! 🎯
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatSelector;