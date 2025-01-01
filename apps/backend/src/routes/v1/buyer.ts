import { Router } from "express";
import { isBuyerAuthenticated } from "../../middlewares/buyer";
import { SellerSchema, SearchCouponSchema, UpvoteSchema } from "../../types";
import express from "express";
import client from "@repo/db/client";
export const CouponsRouter = Router();

const app = express();
app.use(isBuyerAuthenticated);

export const BuyerRoute = Router();

BuyerRoute.get("/home", (req, res) => {
  res.json({ message: "at BuyerRoute" });
});

BuyerRoute.post("/buyerId/bulk", isBuyerAuthenticated, async (req, res) => {
  console.log("to see all coupons of seller");
  try {
    // const userIdString = (req.query.ids ?? "[]") as string;
    // const userIds = (userIdString).slice(1, userIdString?.length - 1).split(",");
    const parsedData = SellerSchema.safeParse(req.body);
    if (!parsedData.success) {
      console.log(JSON.stringify(parsedData));
      res.status(400).json({ message: "Validation failed" });
      return;
    }

    console.log("user id", req.userId);

    const coupon = await client.coupons.findMany({
      where: {
        id: req.userId,
      },
      select: {
        id: true,
        RedeemCode: true,
        Name: true,
      },
    });
    res.json({
      coupons: coupon.map((m) => ({
        userId: m.id,
        coupon: m.RedeemCode,
        couponName: m.Name,
      })),
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});

BuyerRoute.get("/:Name", isBuyerAuthenticated, async (req, res) => {
  console.log("Fetching specific coupons");
  try {
      const { Name } = req.params; // Extract Name from params
      console.log("Name to search:", Name);

      // Validate the input
      const parsedData = SearchCouponSchema.safeParse({ name: Name });
      if (!parsedData.success) {
          console.log("Validation Error:", JSON.stringify(parsedData));
          res.status(400).json({ message: "Validation failed", error: parsedData.error });
          return;
      }

      // Query the database for coupons
      const coupon = await client.coupons.findMany({
          where: {
              Name: {
                  contains: parsedData.data.name, // Partial match
                  mode: "insensitive", // Case-insensitive search
              },
          },
      });

      // Handle the result
      if (coupon.length === 0) {
          res.status(404).json({ message: "No coupons found with the given name" });
          return;
      }

      res.status(200).json({ message: "Coupons retrieved successfully", coupon });
  } catch (error) {
      console.error("Error fetching coupons:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

BuyerRoute.post("/upvote", isBuyerAuthenticated, async (req, res) => {
  console.log("at upvote");
  try {
    const parsedData = UpvoteSchema.safeParse(req.body);
    if (!parsedData.success) {
      console.log(JSON.stringify(parsedData));
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    
    if(parsedData.success){
        const response = await client.like.create({
            data:{
                userId: parsedData.data.userId,
                couponId: parsedData.data.couponId
            },
        })
        console.log(response);
    }else{
        res.status(403).json({message : "userId || couponId is not valid"})
    }

  } catch (error) {
    res.status(400).json({error})
  }
});

BuyerRoute.post("/downvote", isBuyerAuthenticated, async (req, res) => {
  try {

    const parsedData = UpvoteSchema.safeParse(req.body);
    console.log("at downvote");
    
    if (!parsedData.success) {
      console.log(JSON.stringify(parsedData));
      res.status(400).json({ message: "Validation failed" });
      return;
    }
    
    if(parsedData.success){
        const response = await client.like.delete({
            where:{
                userId_couponId:{
                    userId: parsedData.data.userId,
                    couponId: parsedData.data.couponId
                }
            },
        })
        console.log(response);
    }else{
        res.status(403).json({message : "userId || couponId is not valid"})
    }

  } catch (error) {
    res.status(400).json({error})
  }
});