import { Router } from "express";
export const SellerRoute = Router();
import { isSellerAuthenticated } from "../../middlewares/seller";
import { CouponsSchema , SellerSchema } from "../../types";
import express from 'express';
import client from '@repo/db/client';
const app = express();
app.use(isSellerAuthenticated)

SellerRoute.get("/home", (req,res)=>{
    res.json({message:"at SellerRoute"})
})

//his own coupons
SellerRoute.get("/:userid" , isSellerAuthenticated , async (req,res)=>{    
    console.log("all your coupons");
    try {
        const parsedData = SellerSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if (parsedData.data.SellerId){
            const showCoupons = await client.coupons.findMany({
                where:{
                    CreatorId: parsedData.data.SellerId
                },
            });
            if(!showCoupons){
                res.sendStatus(403).json({message:"no coupon with such SellerId"})
            } else {
                res.json({showCoupons});
                return
            }
        }
    } catch (error) {
        res.sendStatus(400).json({error});
    }
});

//can post new coupons
SellerRoute.post("/MyNewCoupon", isSellerAuthenticated , async (req,res)=>{         
    console.log("create new coupons");
    try {
        const userId = req.userId!;
        console.log("User ID from JWT:", userId);

        const parsedData = CouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if(!parsedData.data.CouponCode){
            const coupon = await client.coupons.create({
                data:{
                    Name: parsedData.data.Name,
                    Description: parsedData.data.Description,
                    CouponCode: parsedData.data.CouponCode,
                    CreatorId: userId
                },
            });
            res.json({couponId : coupon.id});
            return
        }
    } catch (error) {
        res.sendStatus(400).json({error})
    }
})

//can delete coupon 
// instead of using CouponCode try deleting it using the couponid
SellerRoute.delete("/:CouponCode", isSellerAuthenticated , async (req,res)=>{      
    console.log("delete your coupons");
    try {
        const parsedData = CouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if(parsedData.data.CouponCode){
            const coupon = await client.coupons.findUnique({
                where:{
                    CouponCode: parsedData.data.CouponCode
                },
            });
            res.sendStatus(200).json({message : "coupon has deleted succefully" , coupon});
            return
        } else {
            res.sendStatus(403).json({message : "Please provide right CouponCode to delete"});
            return
        }

    } catch (error) {
        res.sendStatus(400).json({error})
    }
})

// instead of using CouponCode try updating it using the couponid
SellerRoute.put("/UpdateCyCoupon/:couponid", isSellerAuthenticated , async (req,res)=>{
    console.log("update your coupons");
    try {
        const parsedData = CouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if(parsedData.data.CouponCode){
            const coupon = await client.coupons.findUnique({
                where:{
                    CouponCode: parsedData.data.CouponCode
                },
            });
            res.sendStatus(200).json({message : "coupon has updated succefully" , coupon});
            return
        } else {
            res.sendStatus(403).json({message : "Please provide right CouponCode to update"});
            return
        }

    } catch (error) {
        res.sendStatus(400).json({error})
    }
})