import express, { urlencoded } from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.get("/api/sandbox/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "This is the health route"
  });
});

export default app;