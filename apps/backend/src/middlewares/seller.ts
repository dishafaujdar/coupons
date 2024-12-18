import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        export interface Request {
            role?: "Seller" | "Buyer";
            UserId?: string;
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
        const decoded = jwt.verify(token, "disha11") as { role: string; UserId: string };

        if (decoded.role !== "Seller") {
            console.log("Role is not seller");
            res.status(403).json({ message: "Unauthorized" });
            return;
        }

        req.userId = decoded.UserId;

        console.log("Assigned req.userId:", req.UserId);
        next();
    } catch (e) {
        console.log("Token verification failed");
        res.status(401).json({ message: "Unauthorized" });
    }
};
