import { Router } from "express";
import { SignupSchema , SigninSchema } from "../../types/index.js";
import client from "@repo/db/client";
import jwt from "jsonwebtoken";

export const router = Router();

router.post("/signup" , async (req,res) => {
    try {
        const {username , password , role} = SignupSchema.parse(req.body);
        if(role === "seller"){}
    } catch (error) {
        
    }
})


router.post("/signin" , (req,res) => {
    
})