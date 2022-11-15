const express = require("express");
const productRouter = require("express");
const categoryRouter = require("express");
const userRouter = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
