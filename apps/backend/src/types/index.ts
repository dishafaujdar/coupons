import z from "zod";

export const SignupSchema = z.object({
    username : z.string(),
    password : z.string(),
    role : z.enum(["buyer","seller"])
})

export const SigninSchema = z.object({
    username : z.string(),
    password : z.string(),
})

export const CouponsSchema = z.object({
    Name    : z.string(),
    Description : z.string(),
})