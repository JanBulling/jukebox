import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Loading } from "@/ui/icons";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary dark:bg-primary-dark text-white hover:opacity-80",
        accent: "bg-accent  dark:bg-accent-dark text-white hover:opacity-80",
        destructive: "bg-destructive text-white hover:opacity-80",
        info: "bg-info text-white hover:opacity-80",
        success: "bg-success text-white hover:opacity-80",
        outline:
          "border border-2 border-gray-500 hover:dark:bg-gray-900 hover:bg-gray-200",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-900",
        link: "text-primary hover:underline underline-offset-4 w-max",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, disabled, variant, size, loading, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loading className='mr-2 h-4 w-4 animate-spin' />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
