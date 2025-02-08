import express from "express";
import cors from "cors";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
