const express = require("express");
const app = express();
var cors = require('cors')
const userRouter = require("./routers/userRouter");

const port = process.env.PORT || 3000;


var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use(cors())

app.use("/api/users",userRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});