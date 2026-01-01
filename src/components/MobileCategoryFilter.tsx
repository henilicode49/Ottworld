import { categories } from "@/data/apps";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const MobileCategoryFilter = ({ selectedCategory, onCategoryChange }: MobileCategoryFilterProps) => {
  const getIcon = (iconName: string): LucideIcon => {
    const icon = (Icons as unknown as Record<string, LucideIcon>)[iconName];
    return icon || Icons.Folder;
  };

  return (
    <div className="lg:hidden overflow-x-auto pb-2 -mx-4 px-4">
      <div className="flex gap-2">
        {categories.map((category) => {
          const IconComponent = getIcon(category.icon);
          const isSelected = selectedCategory === category.id;
          const isMature = category.id === "mature";

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200",
                isSelected
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "glass hover:bg-muted",
                isMature && !isSelected && "border-destructive/50 text-destructive/70"
              )}
            >
              <IconComponent className="h-4 w-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileCategoryFilter;
