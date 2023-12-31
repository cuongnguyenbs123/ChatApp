const userModel = require("../model/account");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");


const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user)
      return res.status(400).json("User with the given email already exists");

    if (!name || !email || !password)
      return res.status(400).json("All fields are required ...");

    if (validator.isEmail(email) === false)
      return res.status(400).json("Invalid email");

    if (validator.isStrongPassword(password))
      return res.status(400).json("Password not strong enoungh");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("User does not exits");
    const isValidPassword = await bcrypt.compare(password, user.password);      
    if (!isValidPassword) return res.status(400).json("Invalid password");
    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token ,message:"Login successful"});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async(req,res)=>{
    try{
        const id = req.params.id;
        let user = await userModel.findById(id); 
        if(!user) return res.status(200).json("User does not exits");
        else return res.status(200).json({ _id: user._id, name: user.name, email:user.email });
    }catch(error){
        console.log(error);
        res.status(500).json(error);    
    }
};


const getUser = async(req,res)=>{
  try{
      let users = await userModel.find(); 
      users = users.map((user)=>{
        return { _id: user._id, name: user.name, email:user.email};
      })
      return res.status(200).json(users);
  }catch(error){
      console.log(error);
      res.status(500).json(error);    
  }
}

module.exports = { registUser,loginUser,findUser,getUser};
