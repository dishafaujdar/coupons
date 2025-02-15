import { Router } from "express";
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


router.post("/signup" , async (req,res) => {
    try {
        const {username , password , userRole} = SignupSchema.parse(req.body);
        if(userRole === "Seller" || userRole === "Buyer") {
            const user = await client.user.create({
                data:{
                    username,
                    password,
                    userRole: userRole 
                },
            });
            const SignupToken = jwt.sign({userId: user.id , userRole: user.userRole},"disha11",{expiresIn: "1h"})
            res.status(200).json({
                userId: user.id,
                SignupToken,
                userRole: user.userRole,
                username,
            });
            return;
        }else {
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
                userRole: true
            },
        });
        if(user){
            if(user.password === password){
                const SigninToken = jwt.sign({userId: user.id , userRole: user.userRole},"disha11",{expiresIn:"1h"})
                res.status(200).json({
                    SigninToken,
                    userId: user.id,
                    userRole: user.userRole
                })
                console.log(SigninToken);
                
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