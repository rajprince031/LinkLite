const User = require("../models/user_model");
const { v4: uuidV4 } = require("uuid");
const { setUser, getUser } = require("../service/user_auth");

//SIGNUP HANDLER

async function handleSignUpRequest(req, res) {
  const data = req.body;
  let newUser = new User(data);
  newUser = await newUser.save();
  return res.status(201).json({
    status: true,
    msg: "New User created successfully",
    id: newUser._id,
  });
}

//LOGIN HANDLER

async function handleLoginRequest(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Required field are missing" });
    const findOneUser = await User.findOne({ email });
    if (!findOneUser) return res.status(404).json({ error: "User not found" });
    const validateUser = findOneUser.authenticate(password);
    if (!validateUser)
      return res.status(401).json({ error: "Password was Incorrect" });

    findOneUser.encryptPassword = findOneUser.salt = undefined;
    const authToken = setUser(findOneUser); // set jwt token
    return res
      .status(200)
      .json({ success: true, msg: "Login Successfully", authToken, user:findOneUser });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error", err });
  }
}

// USER PROFILE

async function handleUserProfile(req, res) {
  const authToken = req.headers.authorization;
  const validateUser = getUser(authToken);
  if (!validateUser) return res.status(401).json({ error: "User not found" });
  const userProfile = await User.findById({ _id: validateUser._id });
  userProfile.encryptPassword = userProfile.salt = undefined;
  return res.status(200).json({ status: true, userProfile });
}

//UPDATE PROFILE

async function handleProfileUpdate(req, res) {
  try {
    const {firstName, lastName, email } = req.body;
    const {_id} = req.user;
    const findOne = await User.findById(_id);
    if (!findOne) return res.status(401).json({ error: "User not found" });
    if(!firstName.trim() || !email.trim()) return res.status(400).json({error : 'firstName and email are required'})

    firstName.trim() && (findOne.firstName = firstName);
    lastName.trim() && (findOne.lastName = lastName);
    email.trim() && (findOne.email = email);

    await findOne.save();

    findOne.encryptPassword = findOne.salt = undefined;
    console.log("Print kr  : ",findOne)
    return res.status(200).json({msg:"Profile Updated Successfully", "user":findOne});
  } catch (error) {
    return res.status(500).json({ error });
  }
}

//Change Password

async function handleChangePassword(req, res) {
  const { password, newPassword} = req.body;
  const {_id} = req.user;
  const findOne = await User.findById(_id);
  const validateUser = findOne.authenticate(password);
  if (!validateUser)
    return res.status(400).json({ error: "Old Password Incorrect" });
  findOne.password = newPassword;
  await findOne.save();
  return res.status(200).json({ msg: "Password Upated successfully" });
}

module.exports = {
  handleLoginRequest,
  handleSignUpRequest,
  handleUserProfile,
  handleProfileUpdate,
  handleChangePassword,
};
