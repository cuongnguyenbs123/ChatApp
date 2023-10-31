const express = require("express");
const app = express();
const cors = require('cors')
const userRouter = require("./routers/userRouter");
const chatRouter = require("./routers/chatRouter");
const messageRouter = require("./routers/messageRouter");
var bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

let corsOptions = { 
  origin : ['http://localhost:5000','http://localhost:5173'], 
} 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//app enable all cors
app.use(cors())

app.use("/api/users",userRouter);
app.use("/api/chats",chatRouter);
app.use("/api/messages",messageRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});