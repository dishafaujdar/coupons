import { Router } from "express";
export const SellerRoute = Router();

SellerRoute.get("/mycoupon/:userid" , (req,res)=>{    //his own coupons
    res.json({
        "messgae":"this is from user"
    });
});

SellerRoute.post("/mycoupon/mynewcoupon", (req,res)=>{         //can post new coupons
    res.json({
        "messgae":"this is from user"
    });
})

SellerRoute.delete("/mycoupon/:id", (req,res)=>{      //can delete coupon
    res.json({
        "messgae":"this is from user"
    });
})

SellerRoute.put("/mycoupon/updatemycoupon/:couponid", (req,res)=>{
    res.json({
        "messgae":"this is from user"
    });
})