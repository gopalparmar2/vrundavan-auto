import * as React from "react";
import { Dialog as RadixDialog } from "radix-ui";
import { cn } from "@/lib/utils";

const Dialog = ({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) => {
    const handleOpenChange = (open) => {
        if (!open && closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    return (
        <RadixDialog.Root open={show} onOpenChange={handleOpenChange}>
            <RadixDialog.Portal>
                {/* Translucent backdrop overlay */}
                <RadixDialog.Overlay 
                    className="fixed inset-0 z-50 bg-slate-950/60 transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" 
                />
                
                {/* Centering wrapper */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <RadixDialog.Content
                        className={cn(
                            "relative z-50 w-full overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-xl transition-all outline-none p-0 dark:bg-slate-950 dark:border-slate-800 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-[5%] data-[state=open]:slide-in-from-top-[5%] duration-200",
                            maxWidthClass
                        )}
                    >
                        {children}
                    </RadixDialog.Content>
                </div>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
};
Dialog.displayName = "Dialog";

export { Dialog };
