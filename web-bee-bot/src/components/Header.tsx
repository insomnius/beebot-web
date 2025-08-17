import React from 'react';
import { Trophy, Users, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-[--color-bee-yellow] border-b-4 border-[--color-bee-black] shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bee-robot">
              🐝
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[--color-bee-black] font-kid">
                Web Bee-Bot
              </h1>
              <p className="text-sm text-[--color-bee-black] opacity-80">
                Learn to code with your friendly robot friend!
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-[--color-bee-black] hover:text-[--color-bee-orange] transition-colors duration-200">
              <BookOpen size={20} />
              <span className="font-kid">Lessons</span>
            </button>
            <button className="flex items-center space-x-2 text-[--color-bee-black] hover:text-[--color-bee-orange] transition-colors duration-200">
              <Trophy size={20} />
              <span className="font-kid">Progress</span>
            </button>
            <button className="flex items-center space-x-2 text-[--color-bee-black] hover:text-[--color-bee-orange] transition-colors duration-200">
              <Users size={20} />
              <span className="font-kid">Classroom</span>
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="bg-[--color-bee-blue] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 font-kid">
              Sign In
            </button>
            <button className="bg-[--color-bee-green] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 font-kid">
              Start Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;