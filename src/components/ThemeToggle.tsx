import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-lg glass hover:bg-white/20 transition-all duration-200 btn-glow"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
    </button>
  );
};
