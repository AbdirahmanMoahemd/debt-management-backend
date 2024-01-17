import express from "express";
import dotenv from "dotenv";
import DatabaseConection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import borrowersRoutes from "./routes/borrowersRoutes.js";

dotenv.config();
const app = express();
DatabaseConection();
 

app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/customers', borrowersRoutes)

 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
