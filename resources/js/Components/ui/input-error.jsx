import * as React from "react";
import { cn } from "@/lib/utils";

const InputError = React.forwardRef(({ className, message, ...props }, ref) => {
    if (!message) return null;
    return (
        <p
            ref={ref}
            className={cn("text-[10px] font-semibold text-rose-500 mt-1 animate-in fade-in-50 slide-in-from-top-1 duration-150", className)}
            {...props}
        >
            {message}
        </p>
    );
});
InputError.displayName = "InputError";

export { InputError };
