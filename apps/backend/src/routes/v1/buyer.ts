import { Router } from "express";
import { isBuyerAuthenticated } from "../../middlewares/buyer";
import { SellerSchema, SearchCouponSchema, UpvoteSchema } from "../../types";
import express from "express";
import client from "@repo/db/client";
export const CouponsRouter = Router();

const app = express();
app.use(isBuyerAuthenticated);

export const BuyerRoute = Router();

BuyerRoute.get("/:Name", isBuyerAuthenticated, async (req, res) => {
  console.log("Fetching specific coupons");
  try {
    const { Name } = req.params; 

    console.log("Name to search:", Name);
    const parsedData = SearchCouponSchema.safeParse({ name: Name });
    if (!parsedData.success) {
      console.log("Validation Error:", JSON.stringify(parsedData));
      res
        .status(400)
        .json({ message: "Validation failed", error: parsedData.error });
      return;
    }

    const coupon = await client.coupons.findMany({
      where: {
        Name: {
          contains: parsedData.data.name, 
          mode: "insensitive", 
        },
      },
    });

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
      console.log("Validation failed:", parsedData.error);
      res
        .status(400)
        .json({ message: "Validation failed", errors: parsedData.error });
      return;
    }

    const { userId, couponId } = parsedData.data;

    const existingLike = await client.like.findFirst({
      where: { userId, couponId },
    });

    if (existingLike) {
      res
        .status(409)
        .json({ message: "User has already upvoted this coupon." });
      return;
    }

    if(!existingLike){
      const response = await client.like.create({
        data: {
          userId,
          couponId,
        },
      });

    // await client.like.update({
    //   where:{id:couponId},
    //   data:{likes : {increment:1}}
    // });

    // await client.coupons.update({
    //   where: { id: couponId },
    //   data: { dislike: { decrement: 1 } },
    // });

    console.log("Upvote successful:", response);
    res
      .status(200)
      .json({ message: "Upvote added successfully", like: response });
    return;
  }
  } catch (error) {
    console.error("Error during upvote:", error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
});

BuyerRoute.post("/downvote", isBuyerAuthenticated, async (req, res) => {
  try {
    const parsedData = UpvoteSchema.safeParse(req.body);
    console.log("at downvote");

    if (!parsedData.success) {
      console.log("Validation failed:", JSON.stringify(parsedData.error));
      res.status(400).json({ message: "Validation failed", errors: parsedData.error });
      return;
    }

    const { userId, couponId } = parsedData.data;

    const existingDislike = await client.dislike.findFirst({
      where: { userId, couponId },
    });

    if (existingDislike) {
      res
        .status(409)
        .json({ message: "User has already downvoted this coupon." });
      return;
    }

    if (!existingDislike) {
      await client.dislike.create({
        data: {
            userId,
            couponId,
        },
      });

      // await client.coupons.update({
      //   where: { id: couponId },
      //   data: { dislikes: { increment: 1 } },
      // });
      // console.log("Downvote added for user:", userId, "coupon:", couponId);

      // await client.coupons.update({
      //   where: { id: couponId },
      //   data: { likes: { decrement: 1 } },
      // });

      console.log("Downvote removed for user:", userId, "coupon:", couponId);
      res.status(200).json({ message: "Downvote removed successfully" });
      return;
    }


    // Add a new downvote
    const response = await client.dislike.create({
      data: {
        userId,
        couponId,
      },
    });

    console.log("Downvote added for user:", userId, "coupon:", couponId);
    res.status(200).json({ message: "Downvote successful", dislike: response });
    return;
  } catch (error) {
    console.error("Error during downvote:", error);
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
});
