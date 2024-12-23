import z from "zod";

export const SignupSchema = z.object({
    username : z.string(),
    password : z.string(),
    role : z.enum(["Buyer","Seller"])
})

export const SigninSchema = z.object({
    username : z.string(),
    password : z.string(),
})

export const CouponsSchema = z.object({
    Name: z.string(),
    Description : z.string(),
    CouponCode: z.string().toUpperCase().toLowerCase(),
    Platform: z.enum(["PhonePe","GooglePay"])
})

export const UpdateCouponsSchema = z.object({
    Name: z.string(),
    Description : z.string(),
    CouponCode: z.string().toUpperCase().toLowerCase(),
    id: z.string()
})

export const DeleteCouponsSchema = z.object({
    id: z.string()
})

export const SellerSchema = z.object({
    userId : z.string(),
})

export const BuyerSchema = z.object({
    BuyerId : z.string(),
})

export const SearchCouponSchema = z.object({
    name : z.string(),
})

export const SearchAllCouponSchema = z.object({
    sellerId : z.string() || "",
    buyerId : z.string() || "",
})

declare global {
    namespace Express {
        export interface Request{
            role? : "Seller" | "Buyer";
            userId?: string;
        }
    }
}

