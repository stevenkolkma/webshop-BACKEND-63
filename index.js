const express = require("express");
const productRouter = require("./routers/products");
const categoryRouter = require("./routers/categories");
const userRouter = require("express");
const loginRouter = require("./routers/auth")
const app = express();
const cors = require("cors");
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
