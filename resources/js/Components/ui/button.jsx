import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95 duration-100",
    {
        variants: {
            variant: {
                default: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/10",
                destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/10",
                outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
                secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
                ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600",
                link: "text-indigo-600 underline-offset-4 hover:underline",
                glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
            },
            size: {
                default: "h-11 px-4 py-2",
                sm: "h-9 rounded-md px-3 text-xs",
                lg: "h-12 rounded-lg px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
        <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export { Button, buttonVariants };
