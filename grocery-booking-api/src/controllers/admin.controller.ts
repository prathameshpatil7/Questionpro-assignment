import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/database";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password, role } = req.body;
  
      if (!email || !password || !role) {
        res.status(400).json({ error: "Email, password, and role are required" });
        return; 
      }
  
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ error: "User already exists" });
        return; 
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      });
  
      res.status(201).json({ message: "User registered successfully", userId: user.id });
      return; 
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
      return; 
    }
  };
  

  export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
        return; 
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return; 
      }
  
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token });
      return; 
    } catch (error) {
      res.status(500).json({ error: "Error logging in" });
      return; 
    }
  };
  



export const addGroceryItem = async (req: Request, res: Response) => {
  try {
    const { name, price, quantity } = req.body;

    const newItem = await prisma.groceryItem.create({
      data: { name, price, quantity },
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error adding grocery item" });
  }
};

export const getGroceryItems = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.groceryItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching grocery items" });
  }
};

export const updateGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const updatedItem = await prisma.groceryItem.update({
      where: { id: parseInt(id) },
      data: { name, price, quantity },
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error updating grocery item" });
  }
};

export const deleteGroceryItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.groceryItem.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Grocery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting grocery item" });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          user: {
            select: { id: true, email: true },
          },
          items: {
            include: {
              groceryItem: {
                select: { id: true, name: true, price: true }, 
              },
            },
          },
        },
      });
  
      res.json(orders);
      return; 
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Error fetching orders" });
      return;
    }
  };
  