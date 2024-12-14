import z from "zod";
import { router } from "../routes/v1";

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
    CouponCode: z.string().toUpperCase().toLowerCase()
})

export const DeleteCouponsSchema = z.object({
    id: z.string()
})

export const SellerSchema = z.object({
    SellerId : z.string(),
})

export const BuyerSchema = z.object({
    BuyerId : z.string(),
})

declare global {
    namespace Express {
        export interface Request{
            role? : "seller" | "buyer";
            userId?: string;
        }
    }
}

