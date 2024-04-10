import React from "react";
import { cn } from "@/utils";
import { Loading } from "@/ui/icons";

type InputProps = {
  icon?: React.ReactElement;
  right?: React.ReactNode;
  loading?: boolean;
  error?: string;
  description?: string;
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & InputProps
>(({ icon, right, error, loading, description, className, ...props }, ref) => (
  <>
    {description && (
      <p className='text-xs mb-1 dark:text-gray-300 text-gray-600'>
        {description}
      </p>
    )}
    <div
      className={cn(
        "flex h-10 items-center overflow-hidden rounded-md border bg-transparent text-sm focus:outline-none focus-within:border-2",
        error
          ? "border-destructive text-destructive"
          : "border-gray-500 dark:text-gray-200 text-gray-900",
        className
      )}
    >
      {icon && <div className='ml-2'>{icon}</div>}
      <input
        disabled={loading || props.disabled}
        ref={ref}
        className={cn(
          "disabled:disabled block h-full w-full flex-1 appearance-none bg-transparent px-4 focus:outline-none disabled:cursor-not-allowed",
          error
            ? "text-destructive placeholder-destructive/60"
            : "placeholder-gray-400 dark:placeholder-gray-700"
        )}
        {...props}
      />
      {loading && <Loading className='mr-2' />}
      {right && !loading && <div className='mr-2 px-1'>{right}</div>}
    </div>
    {error && <p className='text-xs mt-1 text-destructive'>{error}</p>}
  </>
));
Input.displayName = "Input";

export { Input };
