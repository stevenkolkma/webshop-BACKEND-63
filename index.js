const express = require("express");
const productRouter = require("./routers/products");
const categoryRouter = require("./routers/categories");
const userRouter = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
