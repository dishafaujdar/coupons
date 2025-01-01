import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json()); 

declare global {
    namespace Express {
        export interface Request {
            userRole?: "Seller" | "Buyer";
            userId?: string;
        }
    }
}

export const isSellerAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header?.split(" ")[1];
    
    if (!token) {
        console.log("No token found");
        res.status(403).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, "disha11") as { userRole: string; userId: string };
        if (decoded.userRole !== "Seller") {
            console.log("Role is not seller");
            res.status(403).json({ message: "Access restricted to Sellers only" });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (e) {
        console.log("Token verification failed");
        res.status(401).json({ message: "Unauthorized" });
    }
};
