const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(3, { message: "Name must be at least 3 chars." })
        .max(255, { message: "Name must not be more than 255 chars." }),
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .min(3, { message: "email must be at least 3 chars." })
        .max(255, { message: "email must not be more than 255 chars." })
        .email({ message: "Invalid Email Address" }),
    phone: z
        .string({ required_error: "phone is required" })
        .trim()
        .min(10, { message: "phone must be at least 10 chars." })
        .max(20, { message: "phone must not be more than 20 chars." }),
    password: z
        .string({ required_error: "Password required" })
        .min(6, { message: "Password must be at least 6 chars" })
        .max(1024, { message: "Password must not be more than 1024 chars" })
});

const signinSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .min(3, { message: "email must be at least 3 chars." })
        .max(255, { message: "email must not be more than 255 chars." })
        .email({ message: "Invalid Email Address" }),
    password: z
        .string({ required_error: "Password required" })
        .min(6, { message: "Password must be at least 6 chars" })
        .max(1024, { message: "Password must not be more than 1024 chars" })
});

module.exports = {
    signupSchema, signinSchema
};
