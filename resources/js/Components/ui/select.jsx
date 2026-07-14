import * as React from "react";
import { Select as RadixSelect } from "radix-ui";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

const Select = React.forwardRef(({ className, value, onChange, placeholder, disabled, name, id, children, ...props }, ref) => {
    // Recursively parse children to extract option values and labels
    const options = React.useMemo(() => {
        const list = [];
        const process = (c) => {
            React.Children.forEach(c, (child) => {
                if (!React.isValidElement(child)) return;
                
                // If it is an option element or has a value property
                if (child.type === "option" || child.props?.value !== undefined) {
                    list.push({
                        value: child.props.value === undefined ? "" : String(child.props.value),
                        label: child.props.children || child.props.label || String(child.props.value),
                    });
                } else if (child.type === React.Fragment || child.props?.children) {
                    process(child.props.children);
                }
            });
        };
        process(children);
        return list;
    }, [children]);

    // Ensure value is treated as a string, defaulting to empty string if undefined/null
    const radixValue = value !== undefined && value !== null ? String(value) : "";
    const currentOption = options.find((opt) => opt.value === radixValue);
    const isPlaceholder = radixValue === "" || (currentOption && currentOption.value === "");

    const handleValueChange = (newValue) => {
        if (onChange) {
            // Mimic standard HTML select event object structure
            onChange({
                target: {
                    name: name || id,
                    id: id,
                    value: newValue,
                },
            });
        }
    };

    return (
        <RadixSelect.Root
            value={radixValue}
            onValueChange={handleValueChange}
            disabled={disabled}
        >
            <RadixSelect.Trigger
                ref={ref}
                className={cn(
                    "flex h-11 w-full items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/40 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-150 shadow-sm text-left [&>span]:line-clamp-1",
                    isPlaceholder ? "text-slate-400 dark:text-slate-500 font-normal" : "text-slate-800 dark:text-slate-100 font-medium",
                    className
                )}
                {...props}
            >
                <RadixSelect.Value>
                    {currentOption ? currentOption.label : (placeholder || "Select...")}
                </RadixSelect.Value>
                <RadixSelect.Icon asChild>
                    <ChevronDown className="h-4.5 w-4.5 opacity-50 text-slate-550 dark:text-slate-400 flex-shrink-0 ml-2" />
                </RadixSelect.Icon>
            </RadixSelect.Trigger>

            <RadixSelect.Portal>
                <RadixSelect.Content 
                    className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
                    position="popper"
                    sideOffset={4}
                >
                    <RadixSelect.Viewport className="p-1 w-[var(--radix-select-trigger-width)] min-w-[120px]">
                        {options.map((opt) => (
                            <RadixSelect.Item
                                key={opt.value}
                                value={opt.value}
                                className={cn(
                                    "relative flex w-full cursor-default select-none items-center rounded-lg py-2.5 pl-8 pr-2.5 text-sm outline-none focus:bg-slate-100 dark:focus:bg-slate-900 focus:text-slate-950 dark:focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors duration-100",
                                    opt.value === radixValue && "font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
                                )}
                            >
                                <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
                                    <RadixSelect.ItemIndicator asChild>
                                        <Check className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                    </RadixSelect.ItemIndicator>
                                </span>
                                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                            </RadixSelect.Item>
                        ))}
                    </RadixSelect.Viewport>
                </RadixSelect.Content>
            </RadixSelect.Portal>
        </RadixSelect.Root>
    );
});
Select.displayName = "Select";

export { Select };
