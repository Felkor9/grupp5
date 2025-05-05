const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));

const connectionMongoDB = require("./connectionMongoDB");
connectionMongoDB();

const recensionerRoutes = require("./routes/recensionerRoutes");

const resorRoutes = require("./routes/resorRoutes");
const bokningarRoutes = require("./routes/bokningarRoutes");
const userRoutes = require("./routes/userRoutes");

const destinationRoutes = require("./routes/destinationRoutes");

app.use(resorRoutes);
app.use(destinationRoutes);

app.use(userRoutes);

app.use(bokningarRoutes);
app.use(recensionerRoutes);

app.listen(port, () => console.log(`Example listening on port ${port}`));
