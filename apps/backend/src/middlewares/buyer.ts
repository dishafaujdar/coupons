import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export const isBuyerAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];

    if (!token) {
        console.log("No token found");
        res.status(403).json({ message: "Unauthorized" });
        return
    }

    try {
        const decoded = jwt.verify(token, "disha11") as { role: string, userId: string };
        if (decoded.role !== "Buyer") {
            console.log("Role is not buyer");
            res.status(403).json({ message: "Unauthorized" });
            return
        }
        
        // Check if userId is being decoded properly
        console.log("Decoded UserId:", decoded.userId);
        req.userId = decoded.userId; // Ensure it's set on the request object
        next();
    } catch (e) {
        console.log("Token verification failed");
        res.status(401).json({ message: "Unauthorized" });
        return
    }
};