import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef(({ className, required = false, children, ...props }, ref) => (
    <label
        ref={ref}
        className={cn(
            "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5",
            className
        )}
        {...props}
    >
        {children}
        {required && <span className="text-rose-500 ms-1">*</span>}
    </label>
));
Label.displayName = "Label";

export { Label };
