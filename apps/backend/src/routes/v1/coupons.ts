import { Router } from "express";
import { isSellerAuthenticated } from "../../middlewares/seller";
import { isBuyerAuthenticated } from "../../middlewares/buyer";
import { SearchAllCouponSchema } from "../../types";
import express from 'express';
import client from '@repo/db/client';
export const CouponsRouter = Router();

const app = express();
app.use(isSellerAuthenticated)  

CouponsRouter.get("/home", (req,res)=>{
    res.json({message:"at Coupon Route"})
});

CouponsRouter.get("/all",  async (req,res) => { //despite begin buyer or a seller
    console.log("see all present the coupon"); 
    try {
        const parsedData = SearchAllCouponSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }
        const {buyerId , sellerId} = parsedData.data;

        
        if(buyerId || sellerId){
            const coupon = await client.coupons.findMany();
            if(!coupon || coupon.length === 0){
                res.status(200).json({ message: "No coupons available" });
            } else {
                res.status(200).json({message:"all avaliable coupon"})
            }
            console.log(coupon);
        }else {
            res.status(400).json({ message: "buyerId or sellerId required" });
        }
    } catch (error) {
        res.json(400).json({error})
    }
});
