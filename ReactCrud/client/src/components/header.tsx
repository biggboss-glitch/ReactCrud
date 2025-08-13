import { useTheme } from "@/lib/theme-provider";
import { Moon, Sun, Bell, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <ListTodo className="text-white w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">TaskFlow</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-primary border-b-2 border-primary px-1 pb-4 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-1 pb-4 text-sm font-medium">
                Projects
              </a>
              <a href="#" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 px-1 pb-4 text-sm font-medium">
                Analytics
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-slate-600">JS</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
