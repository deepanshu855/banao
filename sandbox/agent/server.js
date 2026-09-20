import app from "./src/app.js";

const PORT=process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Sync agent is running at port 3000");
})