import * as React from "react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            type="checkbox"
            className={cn(
                "h-4 w-4 shrink-0 rounded border border-slate-200 text-indigo-600 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 shadow-sm",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
