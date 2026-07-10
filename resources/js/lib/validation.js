import { z } from 'zod';

/**
 * Reusable helper to validate form data against a Zod schema.
 * Sets errors on Inertia form if validation fails.
 * 
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 * @param {object} data - The Inertia form data object
 * @param {function} setError - Inertia's setError function
 * @param {function} clearErrors - Inertia's clearErrors function
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateForm(schema, data, setError, clearErrors) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const formattedErrors = {};
        result.error.issues.forEach((err) => {
            const key = err.path[0];
            formattedErrors[key] = err.message;
        });
        if (setError) {
            // Atomically clear old errors for data fields and set new validation errors
            const clearedAndNewErrors = {};
            Object.keys(data).forEach((key) => {
                clearedAndNewErrors[key] = undefined;
            });
            Object.assign(clearedAndNewErrors, formattedErrors);
            setError(clearedAndNewErrors);
        }
        return false;
    }
    if (clearErrors) {
        clearErrors();
    }
    return true;
}

// Custom file validator for Brand Logo & Model Image
const imageFileSchema = z.any()
    .refine((file) => !file || file instanceof File, "Must be a valid file")
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
    .refine(
        (file) => !file || ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(file.type),
        "Only PNG, JPG, JPEG, GIF, and SVG formats are allowed"
    )
    .optional()
    .nullable();

// 1. Brand Schema
export const brandSchema = z.object({
    name: z.string().min(1, "Brand name is required").max(255, "Brand name must not exceed 255 characters"),
    logo: imageFileSchema,
    status: z.enum(['active', 'inactive'], {
        errorMap: () => ({ message: "Status must be active or inactive" })
    }),
});

// 2. Model Schema
export const modelSchema = z.object({
    brand_id: z.union([z.string().min(1, "Brand is required"), z.number()]),
    name: z.string().min(1, "Model name is required").max(255, "Model name must not exceed 255 characters"),
    variant: z.string().min(1, "Variant is required").max(255, "Variant must not exceed 255 characters"),
    on_road_price: z.coerce.number({
        invalid_type_error: "On-road price must be a number"
    }).min(0, "On-road price must be a positive number"),
    ex_showroom_price: z.union([
        z.string().length(0),
        z.coerce.number({
            invalid_type_error: "Ex-showroom price must be a number"
        }).min(0, "Ex-showroom price must be a positive number")
    ]).optional().nullable(),
    fuel_type: z.string().min(1, "Fuel type is required"),
    transmission: z.string().min(1, "Transmission is required"),
    image: imageFileSchema,
});

// 3. Inquiry Schema
export const inquirySchema = z.object({
    customer_name: z.string().min(1, "Customer name is required").max(255, "Customer name must not exceed 255 characters"),
    phone: z.string().min(1, "Phone number is required").max(20, "Phone number must not exceed 20 characters"),
    email: z.union([
        z.string().length(0),
        z.string().email("Invalid email address")
    ]).optional().nullable(),
    brand_id: z.union([z.string().min(1, "Brand is required"), z.number()]),
    model_id: z.union([z.string().min(1, "Model is required"), z.number()]),
    source: z.enum(['walk-in', 'phone', 'online'], {
        errorMap: () => ({ message: "Source must be walk-in, phone, or online" })
    }),
    notes: z.string().optional().nullable(),
});

// 4. Inquiry Status Update Schema
export const inquiryStatusSchema = z.object({
    status: z.enum(['New', 'Contacted', 'Estimate Sent', 'Negotiation', 'Converted', 'Lost'], {
        errorMap: () => ({ message: "Status must be New, Contacted, Estimate Sent, Negotiation, Converted, or Lost" })
    }),
});

// 5. Estimate Schema
export const estimateSchema = z.object({
    inquiry_id: z.union([z.string(), z.number()]),
    discount: z.union([
        z.string().length(0),
        z.coerce.number({
            invalid_type_error: "Discount must be a number"
        }).min(0, "Discount must be a positive number")
    ]).optional().nullable(),
    accessories_cost: z.union([
        z.string().length(0),
        z.coerce.number({
            invalid_type_error: "Accessories cost must be a number"
        }).min(0, "Accessories cost must be a positive number")
    ]).optional().nullable(),
    insurance: z.union([
        z.string().length(0),
        z.coerce.number({
            invalid_type_error: "Insurance premium must be a number"
        }).min(0, "Insurance premium must be a positive number")
    ]).optional().nullable(),
    rto_charges: z.union([
        z.string().length(0),
        z.coerce.number({
            invalid_type_error: "RTO charges must be a number"
        }).min(0, "RTO charges must be a positive number")
    ]).optional().nullable(),
});

// 6. Auth Login Schema
export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean().optional(),
});

// 7. Auth Register Schema
export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must not exceed 255 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

// 8. Auth Forgot Password Schema
export const forgotPasswordSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

// 9. Auth Reset Password Schema
export const resetPasswordSchema = z.object({
    token: z.string().min(1),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

// 10. Auth Confirm Password Schema
export const confirmPasswordSchema = z.object({
    password: z.string().min(1, "Password is required"),
});

// 11. Profile Update Schema
export const updateProfileSchema = z.object({
    name: z.string().min(1, "Name is required").max(255, "Name must not exceed 255 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address").optional(),
});

// 12. Profile Update Password Schema
export const updatePasswordSchema = z.object({
    current_password: z.string().min(1, "Current password is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

// 13. Profile Delete User Schema
export const deleteUserSchema = z.object({
    password: z.string().min(1, "Password is required to delete account"),
});
