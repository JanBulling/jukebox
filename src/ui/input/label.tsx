import React from "react";

import { cn } from "@/utils";

type Props = {
  required?: boolean;
  error?: string;
};

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement> & Props
>(({ required, error, className, children, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-none",
      required && "flex items-center gap-1",
      className
    )}
    {...props}
  >
    {children}
    {required && <span className='text-sm text-destructive'>*</span>}
  </label>
));
Label.displayName = "Label";

export { Label };
