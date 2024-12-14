import { Router } from "express";
import { isSellerAuthenticated } from "../../middlewares/seller";
import { CouponsSchema } from "../../types";
import express from 'express';
import client from '@repo/db/client';
export const CouponsRouter = Router();

const app = express();
app.use(isSellerAuthenticated)  

export const BuyerRoute = Router();



BuyerRoute.get("/home", (req,res)=>{
    res.json({message:"at BuyerRoute"})
})

BuyerRoute.get("/" , (req,res)=>{
    res.json({
        "messgae":"this is from user"
    });
});

BuyerRoute.get("/bulk?ids=[]", (req,res)=>{
    res.json({
        "messgae":"this is from user"
    });
})