require('dotenv').config()
const express  = require("express");
const cors = require("cors");
const app = express();
 const PORT = process.env.PORT || 8000;

const connectedDB = require("./utils/db");
const authRouter  = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/service-router");
const adminRouter = require("./router/admin-router");
const errorMiddleware = require('./middlewares/error-middleware');


// tackles cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
app.use(cors(corsOptions));

app.use(express.json());

app.use(authRouter);
app.use(contactRouter);
app.use("/api/data",serviceRouter);
app.use("/api/admin",adminRouter);

app.use(errorMiddleware);
connectedDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });
});

