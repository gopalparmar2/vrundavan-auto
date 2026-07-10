import * as React from "react";
import {
    Dialog as HeadlessDialog,
    DialogPanel as HeadlessDialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { cn } from "@/lib/utils";

const Dialog = ({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) => {
    const close = () => {
        if (closeable) {
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
        <Transition show={show} as={React.Fragment} leave="duration-200">
            <HeadlessDialog
                as="div"
                id="modal"
                className="fixed inset-0 z-50 flex transform items-center overflow-y-auto px-4 py-6 transition-all sm:px-0 justify-center"
                onClose={close}
            >
                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-all" />
                </TransitionChild>

                <TransitionChild
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <HeadlessDialogPanel
                        className={cn(
                            "mb-6 transform overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-0 shadow-xl transition-all sm:mx-auto sm:w-full dark:bg-slate-900 dark:border-slate-800",
                            maxWidthClass
                        )}
                    >
                        {children}
                    </HeadlessDialogPanel>
                </TransitionChild>
            </HeadlessDialog>
        </Transition>
    );
};
Dialog.displayName = "Dialog";

export { Dialog };
