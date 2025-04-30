const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));

const resorRoutes = require("./routes/resorRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(resorRoutes);
app.use(userRoutes);

app.listen(port, () => console.log(`Example listening on port ${port}`));
