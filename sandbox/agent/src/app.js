import express from "express"
import morgan from "morgan"

import fs from "fs"

const app=express();

app.use(express.json());
app.use(morgan("dev"));

const WORKING_DIR= "/workspace"

app.get("/", (req, res)=>{
    res.send("Hello from sync agent")
})

app.get("/list-files", async(req, res)=>{

    const elements=await fs.promises.readdir(WORKING_DIR);

    res.status(200).json({
        message: "Elements in working directory",
        elements
    })
})

export default app;