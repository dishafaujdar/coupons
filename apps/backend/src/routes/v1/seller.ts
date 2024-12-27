import { Router } from "express";
import axios from "axios";
import puppeteer from 'puppeteer';
export const SellerRoute = Router();
import { isSellerAuthenticated } from "../../middlewares/seller";
import { CouponsSchema , DeleteCouponsSchema, UrlSchema, UpdateCouponsSchema } from "../../types";
import express from 'express';
import client from '@repo/db/client';
const app = express();
app.use(isSellerAuthenticated)

// SellerRoute.get("/home", isSellerAuthenticated ,  (req,res)=>{
//     res.json(req.userId)
// })


//his own coupons
SellerRoute.get("/:userId" , isSellerAuthenticated , async (req,res)=>{    
    try {
        const {userId} = req.params;

        if(!userId){
            console.log(JSON.stringify(userId))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if (userId){
            const showCoupons = await client.coupons.findMany({
                where:{
                    CreatorId: userId
                },
            });
            if(!showCoupons){
                res.status(403).json({message:"No coupon with such SellerId"})
            } else {
                res.json({showCoupons});
                return
            }
        }
    } catch (error) {
        res.status(400).json({error});
    }
});

//can post new coupons
SellerRoute.post("/MyNewCoupon", isSellerAuthenticated, async (req, res) => {
    try {
        const userId = req.userId;  

        // Check if both manual data and URL are provided
        const parsedData = CouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        // If manual data is provided
        if (parsedData.success && parsedData.data) {
            const coupon = await client.coupons.create({
                data: {
                    Name: parsedData.data.Name,
                    Description: parsedData.data.Description,
                    CreatorId: userId || "",
                    RedeemCode: parsedData.data.RedeemCode,
                    platform: parsedData.data.Platform,
                },
            });
            res.json({ couponId: coupon.id });
            return;
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
});

//can delete coupon 
// instead of using CouponCode try deleting it using the couponid
SellerRoute.delete("/CouponCode", isSellerAuthenticated , async (req,res)=>{      
    console.log("delete your coupons");
    try {
        const parsedData = DeleteCouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if(parsedData.data){
            const coupon = await client.coupons.delete({
                where:{
                    id: parsedData.data.id
                },
            });
            res.status(200).json({message : "coupon has deleted succefully" , coupon});
            return
        } else {
            res.status(403).json({message : "Please provide right CouponCode to delete"});
            return
        }

    } catch (error) {
        res.status(400).json({error})
    }
})

// instead of using CouponCode try updating it using the couponid
SellerRoute.put("/UpdateMyCoupon", isSellerAuthenticated , async (req,res)=>{
    console.log("update your coupons");
    try {
        const parsedData = UpdateCouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if(parsedData.data){
            const coupon = await client.coupons.update({
                where:{ id: parsedData.data.id },
                data:{
                    Name: parsedData.data.Name,
                    Description: parsedData.data.Description,
                    RedeemCode: parsedData.data.CouponCode
                }
            });
             const rmcoupon =  await client.coupons.delete({
                where:{id: parsedData.data.id},
            })
            res.status(200).json({message : "coupon has updated succefully" , coupon});
            return
        } 
        
        else {
            res.status(403).json({message : "Please provide right CouponCode to update"});
            return
        }


    } catch (error) {
        res.status(400).json({error})
    }
})