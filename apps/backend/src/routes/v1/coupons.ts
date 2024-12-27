import { Router } from "express";
import { isSellerAuthenticated } from "../../middlewares/seller";
import express from 'express';
import client from '@repo/db/client';
export const CouponsRouter = Router();

const app = express();
app.use(isSellerAuthenticated)  

CouponsRouter.get("/home", (req,res)=>{
    res.json({message:"at Coupon Route"})
});

CouponsRouter.get("/:Id", async (req, res) => {
    console.log("Fetching all available coupons...");
  
    try {
      const { Id } = req.params;
  
      if (Id) {
        const coupons = await client.coupons.findMany();
        if (!coupons || coupons.length === 0) {
          res.status(200).json({ message: "No coupons available" });
        } else {
          res.status(200).json(coupons);
        }
        console.log(coupons);
      } else {
        res.status(400).json({ message: "buyerId or sellerId required" });
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  export default CouponsRouter;

