import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border border-input border-gray-400 bg-background px-3 py-2 text-sm shadow-sm transition-all",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-1 ",
          error && " text-destructive placeholder:text-destructive/50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
