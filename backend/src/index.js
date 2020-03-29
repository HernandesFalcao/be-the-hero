const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const _port = 3333;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes(express));

app.listen(_port, () => console.info(`Application running on port ${_port}`));
