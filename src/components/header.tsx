import logo from '../assets/logo.jpg';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export function Header({ onToggleDarkMode, isDarkMode }: HeaderProps) {
  return (
    <header className="h-20 flex items-center justify-between border-b border-gray-300 dark:border-gray-700 bg-light-background dark:bg-dark-background transition-colors duration-300 ease-in-out px-4 md:px-6">
      <div className="flex items-center">
        <img src={logo} className="w-12 md:w-16 py-2 rounded-xl" alt="Logo" />
      </div>

      <button
        type="button"
        onClick={onToggleDarkMode}
        className="p-2 md:py-3 md:px-3 rounded-full bg-light-button dark:bg-dark-button text-light-text dark:text-dark-text hover:bg-light-buttonHover dark:hover:bg-dark-buttonHover transition-colors duration-300 ease-in-out"
      >
        {/* Icones responsivos */}
        {isDarkMode ? (
          <Sun className="w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <Moon className="w-5 h-5 md:w-6 md:h-6" />
        )}
      </button>
    </header>
  );
}
