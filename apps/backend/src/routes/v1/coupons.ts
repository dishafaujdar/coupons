import { Router } from "express";
import { isSellerAuthenticated } from "../../middlewares/seller";
import { CouponsSchema } from "../../types";
import express from 'express';
import client from '@repo/db/client';
export const CouponsRouter = Router();

const app = express();
app.use(isSellerAuthenticated)  

CouponsRouter.get("/home", (req,res)=>{
    res.json({message:"at Coupon Route"})
})

CouponsRouter.post("/CreateCoupon", isSellerAuthenticated , async (req,res) => {
    console.log("post the coupon"); 
})

CouponsRouter.get("/all",(req,res) => { //despite begin buyer or a seller
    res.json({
        "messgae":"this is from user"
    })
})

CouponsRouter.get("/:sellerid",(req,res) => { // use sellerusername instead of id easy to search
    res.json({
        "messgae":"this is from user"
    })
})