import { Request, Response } from "express";
import prisma from "../config/database";

export const getAvailableGroceries = async (_req: Request, res: Response) => {
  try {
    const items = await prisma.groceryItem.findMany({
      where: { quantity: { gt: 0 } }, 
    });

    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching grocery items" });
  }
};
export const placeOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = req.body; 
      const { items } = req.body; // eg. { items: [{ groceryItemId: 1, quantity: 2 }, ...] }
  
      const groceryItems = await prisma.groceryItem.findMany({
        where: { id: { in: items.map((i: any) => i.groceryItemId) } },
      });
  
      // Check inventory
      for (const item of items) {
        const grocery = groceryItems.find((g) => g.id === item.groceryItemId);
        if (!grocery || grocery.quantity < item.quantity) {
          res.status(400).json({ error: `Item ${grocery?.name} is out of stock` });
          return; 
        }
      }
  
      // Create Order
      const order = await prisma.order.create({
        data: {
          userId: user.id,
          items: {
            create: items.map((item: any) => ({
              groceryItemId: item.groceryItemId,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: true },
      });
  
      // Reduce inventory
      for (const item of items) {
        await prisma.groceryItem.update({
          where: { id: item.groceryItemId },
          data: { quantity: { decrement: item.quantity } },
        });
      }
  
      res.status(201).json(order);
      return; 
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Error placing order" });
      return; 
    }
  };
  
