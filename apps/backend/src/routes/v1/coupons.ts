import { Router } from "express";

export const CouponsRouter = Router();

CouponsRouter.post("/",(req,res) => {
    res.json({
        "messgae":"this is from user"
    })
})

CouponsRouter.get("/all",(req,res) => {   //despite begin buyer or a seller
    res.json({
        "messgae":"this is from user"
    })
})

CouponsRouter.get("/:sellerid",(req,res) => {           // use sellerusername instead of id easy to search
    res.json({
        "messgae":"this is from user"
    })
})