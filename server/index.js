const express = require("express");
const app = express();
var cors = require('cors')
const userRouter = require("./routers/userRouter");
var bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app enable all cors
app.use(cors())

app.use("/api/users",userRouter);




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});