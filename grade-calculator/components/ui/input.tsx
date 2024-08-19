import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    startAdornment?: React.ReactNode
    endAdornment?: React.ReactNode
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startAdornment, endAdornment, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {endAdornment && (
          <span className="absolute right-0 pr-3 text-sm text-muted-foreground">
            {endAdornment}
          </span>
        )}
        <input
          type={type}
          className={cn(
            'h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            endAdornment ? 'pr-10' : '',
            startAdornment ? 'pl-10' : '',
            className,
          )}
          ref={ref}
          {...props}
        />
        {startAdornment && (
          <span className="absolute left-0 pl-3 text-sm text-muted-foreground">
            {startAdornment}
          </span>
        )}
      </div>
    );
  }
)
Input.displayName = "Input"

export { Input }
