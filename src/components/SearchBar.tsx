import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockApps } from "@/data/apps";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({ value, onChange, placeholder = "Search apps..." }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const suggestions = value.length > 0
    ? mockApps
        .filter((app) =>
          app.name.toLowerCase().includes(value.toLowerCase()) ||
          app.category.toLowerCase().includes(value.toLowerCase()) ||
          app.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()))
        )
        .slice(0, 6)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (appId: string) => {
    setShowSuggestions(false);
    navigate(`/app/${appId}`);
  };

  const handleClear = () => {
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0].id);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          setIsFocused(true);
          setShowSuggestions(true);
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pl-12 pr-10 h-14 text-base bg-muted/30 border-border/50 focus:border-primary focus:bg-muted/50 rounded-xl"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      
      {/* Search Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl border border-border/50 overflow-hidden z-50 animate-fade-in">
          {suggestions.map((app) => (
            <button
              key={app.id}
              onClick={() => handleSuggestionClick(app.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
            >
              <img
                src={app.icon}
                alt={app.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{app.name}</p>
                <p className="text-xs text-muted-foreground truncate">{app.category} • {app.vendorName}</p>
              </div>
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      )}
      
      <div className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl transition-opacity ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default SearchBar;
