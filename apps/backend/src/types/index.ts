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
    Name    : z.string(),
    Description : z.string(),
    CouponCode: z.string().toUpperCase().toLowerCase()
})

export const DeleteCouponsSchema = z.object({
    id: z.string()
})

export const SellerSchema = z.object({
    SellerId : z.string(),
    username : z.string()
})

export const BuyerSchema = z.object({
    BuyerId : z.string(),
})

export const SearchCouponSchema = z.object({
    Name : z.string(),
})

declare global {
    namespace Express {
        export interface Request{
            role? : "seller" | "buyer";
            userId?: string;
        }
    }
}

