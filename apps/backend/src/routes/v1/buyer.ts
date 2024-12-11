import { Router } from "express";
export const BuyerRoute = Router();

BuyerRoute.get("/getcoupons" , (req,res)=>{
    res.json({
        "messgae":"this is from user"
    });
});

BuyerRoute.get("/getcoupon/bulk?ids=[]", (req,res)=>{
    res.json({
        "messgae":"this is from user"
    });
})