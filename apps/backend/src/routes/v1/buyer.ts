import { Router } from "express";
import { isBuyerAuthenticated } from "../../middlewares/buyer";
import { BuyerSchema , SellerSchema , SearchCouponSchema} from "../../types";
import express from 'express';
import client from '@repo/db/client';
export const CouponsRouter = Router();

const app = express();
app.use(isBuyerAuthenticated)  

export const BuyerRoute = Router();

BuyerRoute.get("/home", (req,res)=>{
    res.json({message:"at BuyerRoute"})
})

BuyerRoute.post("/:buyerId", isBuyerAuthenticated, async (req,res)=>{
    console.log("to see all coupons");
    try {
        const buyerID = req.params.buyerId
        const parsedData = BuyerSchema.safeParse({buyerid : buyerID});
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }
        if(parsedData.data.BuyerId){
            const coupon = await client.coupons.findMany();
            res.status(200).json({message:"All avalibale coupons" , coupon})
        }else {
            res.status(403).json({message:"Please provide valid buyerId"})
        }
    } catch (error) {
        res.status(400).json({error})
    }
});

BuyerRoute.get("/:CouponName", isBuyerAuthenticated, async (req,res)=>{
    console.log("see specific coupons");
    try {
        const CouponName = req.params.CouponName

        const parsedData = SearchCouponSchema.safeParse({CouponName : CouponName});
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }
        if(parsedData.data.Name){
            const coupon = await client.coupons.findMany({
                where:{
                    Name: parsedData.data.Name
                }
            });
            res.status(200).json({message:"All avalibale coupons" , coupon})
        }else{
            res.status(403).json({message:"Please provide valid buyerId"})
        }
    } catch (error) {
            res.status(400).json({error})
    }
})

BuyerRoute.get("/:SellerName", isBuyerAuthenticated, async (req,res)=>{
    console.log("see specific coupons");
    try {
        const username = req.params.SellerName

        const parsedData = SellerSchema.safeParse({username : username});
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }
        if(parsedData.data.username){
            const coupon = await client.user.findMany({
                where:{
                    username: parsedData.data.username
                }
            });
            res.status(200).json({message:"All avalibale coupons" , coupon})
        }else{
            res.status(403).json({message:"Please provide valid buyerId"})
        }
    } catch (error) {
            res.status(400).json({error})
    }
})