import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActionTileProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  disabled?: boolean;
  badge?: number;
}

export const ActionTile = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  variant = 'primary',
  disabled = false,
  badge 
}: ActionTileProps) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-dark",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-light",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-full p-6 rounded-xl shadow-sm transition-all duration-200 active:scale-95",
        "flex flex-col items-center text-center gap-3",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant]
      )}
    >
      <div className="relative">
        <Icon className="h-8 w-8" />
        {badge !== undefined && badge > 0 && (
          <div className="absolute -top-2 -right-2 h-5 w-5 bg-offline text-white text-xs rounded-full flex items-center justify-center">
            {badge}
          </div>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        {description && (
          <p className="text-sm opacity-90 mt-1">{description}</p>
        )}
      </div>
    </button>
  );
};