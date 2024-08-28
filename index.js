// backend/index.js
import express from "express";
import cors from "cors";
import mysql from "mysql";
import ProdouctRouter from "./routes/product.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Manually define __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'dist')));

const db = mysql.createConnection({
  host: "biyazspeduczy8759y5p-mysql.services.clever-cloud.com",
  user: "utd1gwfhpw4dkd2o",
  password: "JuJOx67qi1PnouTTLNiB",
  database: "biyazspeduczy8759y5p",
});

db.connect((error) => {
  if (error) throw error;
  console.log("MySQL Connected...");
});

app.use("/product", ProdouctRouter);
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(8081, () => {
  console.log("Server Connected!");
});

