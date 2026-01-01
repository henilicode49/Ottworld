import { cn } from "@/lib/utils";
import { categories, Category } from "@/data/apps";
import { useApp } from "@/context/AppContext";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategorySidebar = ({ selectedCategory, onCategoryChange }: CategorySidebarProps) => {
  const getIcon = (iconName: string): LucideIcon => {
    const icon = (Icons as unknown as Record<string, LucideIcon>)[iconName];
    return icon || Icons.Folder;
  };

  const { apps } = useApp();

  const getCategoryCount = (categoryId: string) => {
    // Only count approved apps
    const approvedApps = apps.filter(app => app.status === 'approved');

    if (categoryId === 'all') {
      return approvedApps.length;
    }
    if (categoryId === 'mature') {
      return approvedApps.filter(app => app.isMature).length;
    }
    return approvedApps.filter(app => app.category.toLowerCase() === categoryId.toLowerCase()).length;
  };

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="glass rounded-2xl p-4 sticky top-24">
        <h3 className="font-display font-semibold text-lg mb-4 px-2">Categories</h3>
        <nav className="space-y-1">
          {categories.map((category) => {
            const IconComponent = getIcon(category.icon);
            const isSelected = selectedCategory === category.id;
            const isMature = category.id === "mature";
            const count = getCategoryCount(category.id);

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                  isMature && !isSelected && "text-destructive/70 hover:text-destructive"
                )}
              >
                <IconComponent className={cn(
                  "h-5 w-5",
                  isSelected && "text-primary",
                  isMature && !isSelected && "text-destructive/70"
                )} />
                <span className="flex-1 text-left">{category.name}</span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isSelected
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default CategorySidebar;
