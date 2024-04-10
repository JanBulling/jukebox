import { cn } from "@/utils";
import { Loader2, LucideIcon, icons } from "lucide-react";

type IconProps = {
  icon: keyof typeof icons;
  size?: string | number;
  light?: boolean;
  strokeWidth?: number;
};

function Icon({
  icon,
  className,
  size = 20,
  light,
  strokeWidth,
  ...props
}: IconProps & React.HTMLAttributes<SVGSVGElement>) {
  const ICON = icons[icon] as LucideIcon;

  if (light)
    return (
      <div className='light-bg rounded-sm p-1'>
        <ICON
          size={+size - 4}
          className={cn(className)}
          strokeWidth={strokeWidth ?? 2}
          {...props}
        />
      </div>
    );

  return (
    <ICON
      size={size}
      className={className}
      strokeWidth={strokeWidth ?? 2}
      {...props}
    />
  );
}

type LoaderProps = {
  size?: string | number;
};

function Loader({
  className,
  size = 20,
  ...props
}: LoaderProps & React.HTMLAttributes<SVGSVGElement>) {
  return <Loader2 size={size} className={cn("animate-spin", className)} />;
}

export { Icon, Loader as Loading };
