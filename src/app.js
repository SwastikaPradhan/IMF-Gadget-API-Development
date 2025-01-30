const express = require("express");
const userRouter = require("./routes/users.js");
const gadgetRouter = require("./routes/gadgets");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/user",userRouter);
app.use("/gadget",gadgetRouter);

app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to the IMF Gadget API Developemt ! 🚀",
        version:"2.2.2"

    });
});



app.use((err,req,res,next)=>{
    console.log(err.stack);

    res.status(500).json({
        error:"Something went wrong on the server",
    })
})
const PORT = process.env.PORT || 3000;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})