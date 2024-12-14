import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const isSellerAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"]
    const token = header?.split(" ")[1];

    if (!token) {
        res.status(403).json({message: "Unauthorized"})
        return
    }

    try {
        const decoded = jwt.verify(token, "disha11") as { role: string, userId: string }
        if (decoded.role !== "Seller") {
            res.status(403).json({message: "Unauthorized"})
            return
        }
        } catch(e) {
        res.status(401).json({message: "Unauthorized"})
        return
    }
}