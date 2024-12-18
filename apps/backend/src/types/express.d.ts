
declare module "userid" {
    interface Request{
        userId?: string;
        role? : "seller" | "buyer";
    }
}