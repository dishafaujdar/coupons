import express from "express";
import { router } from './routes/v1'
import cors from "cors";

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/v1" , router);

const PORT = 3000
app.listen(process.env.PORT || PORT , ()=>`Server running on ${PORT}`) 
