import e, { Router } from "express";
import { SellerRoute } from "./seller";
import { CouponsRouter } from "./coupons";
import { BuyerRoute } from "./buyer";
import { SignupSchema , SigninSchema } from "../../types/index";
import client from "@repo/db/client";
import jwt from "jsonwebtoken";
import cors from "cors";
export const router = Router();
import express from "express";
const app = express();
app.use(cors())
app.use(express.json()); 


// router.post("/signup" , async (req,res)=>{
//     res.json({message:"you're at signup"})
// })
/*
    {
        "username":"daskj",
        "password":"2233",
        "role":"seller"
    }
*/

router.post("/signup" , async (req,res) => {
    try {
        console.log(req.body)

        const {username , password , role} = SignupSchema.parse(req.body);
        if(role === "Seller") {
            const user = await client.user.create({
                data:{
                    username,
                    password,
                    role: "Seller"
                },
            });
            res.status(200).json({SellerId: user.id});
            return;
        } else if (role === "Buyer") {
            const user = await client.user.create({
                data:{
                    username,
                    password,
                    role: "Buyer",
                },
            });
            res.status(200).json({BuyerId: user.id});
            return;
        } else {
            res.status(400).json({ error: "Invalid role" });
            return;
        }        
    } catch (error) {
        res.status(400).json({error})
        return;
    }
});

router.post("/signin" , async (req,res) => {
    try {
        const {username, password} = SigninSchema.parse(req.body);
        const user = await client.user.findUnique({
            where:{username},
            select: {
                id: true,
                username: true,
                password: true,
                role: true
            },
        });
        if(user){
            if(user.password === password){
                const token = jwt.sign({UserId: user.id , role: user.role}, "disha11");
                res.json({
                    token
                })
            } else {
                res.status(400).json({ message: "Invalid username or password" });
                return;
            } 
        } else {
            res.status(400).json({ message: "User not found" });
            return;
        }
    } catch (error) {
        res.status(404).json({error})
        return;
    }
});



router.use("/MyCoupon" , SellerRoute )
router.use("/GetCoupons" , BuyerRoute)
router.use("/Coupon" , CouponsRouter)