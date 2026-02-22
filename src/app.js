// apps.js 


const express = require("express");
const itemsRoutes = require("./routes/items.routes");
const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});

app.use("/items", itemsRoutes);


app.use((req, res, next) => {
    const error = new Error("Route Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err.message);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    });
});










module.exports = app;
