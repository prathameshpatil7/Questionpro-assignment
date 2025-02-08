import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const authMiddleware = (requiredRole: "ADMIN" | "USER") => {
    return (req: Request, res: Response, next: NextFunction): void => { 
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
  
      try {
        const decoded: any = jwt.verify(token, JWT_SECRET!);
        req.body.user = { id: decoded.id, role: decoded.role };

        if (requiredRole && decoded.role !== requiredRole) {
          res.status(403).json({ message: "Unauthorized access" });
          return;
        }
  
        next();
      } catch (err) {
        res.status(401).json({ message: "Invalid token" });
      }
    };
  };
  

  