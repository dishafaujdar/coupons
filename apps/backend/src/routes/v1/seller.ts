import { Router } from "express";
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
            res.status(401).json({message: "Validation failed"})
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
                    SiteLink: parsedData.data.SiteLink,
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

//can delete coupon const [EditName, setEditName] = useState('')
  // const [EditDescription, setEditDescription] = useState('')
  // const [EditRedeemCode, setEditRedeemCode] = useState('')
  // const [EditPlatform, setEditPlatform] = useState('')

// instead of using CouponCode try deleting it using the couponid
SellerRoute.delete("/:parsedId", isSellerAuthenticated , async (req,res)=>{      
    console.log("delete your coupons");
    try {
        const {parsedId} = req.params;
        console.log("Received parsedId:", parsedId); 
        if(!parsedId){
            console.log(JSON.stringify(parsedId))
            res.status(400).json({message: "Validation failed"})
            return
        }
        if(parsedId){
            const coupon = await client.coupons.delete({
                where:{
                    id: parsedId
                },
            });
            res.status(200).json({message : "Coupon has deleted succefully" , coupon});
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
SellerRoute.put("/:RedeemCode", isSellerAuthenticated , async (req,res)=>{
    console.log("update your coupons");
    try {
        
        const {RedeemCode} = req.params
        const parsedData = CouponsSchema.safeParse(req.body);
        if(!parsedData.success){
            console.log(JSON.stringify(parsedData))
            res.status(400).json({message: "Validation failed"})
            return
        }

        if(RedeemCode){
            const coupon = await client.coupons.update({
                where:{ id: RedeemCode },
                data:{
                    Name: parsedData.data.Name,
                    Description: parsedData.data.Description,
                    RedeemCode: RedeemCode
                }
            });
             const rmcoupon =  await client.coupons.delete({
                where:{id: RedeemCode},
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