const bcrypt = require("bcrypt");
const {v4:uuid} = require("uuid");
const path = require("path");
const {Op} = require('sequelize');

const Users = require("../models/Users_model");
const {sign_up_validation, sign_in_validation} = require("../validations/authorization_validation");
const jwt = require("../utils/jwt");
const Custom_Error = require("../utils/custom_error");

const sign_up = async (req, res, next) => {
  try {
    const {first_name, last_name, phone, email, password} = req.body;

    const file = req.files?.photo;

    const {error} = sign_up_validation(
      first_name,
      last_name,
      phone, email,
      password,
      file,
    );

    if (error) throw new Custom_Error(400, error.message);

    let user = await Users.findOne({
      where: {
        [Op.or]: [
          {phone: phone},
          {email: email},
        ]
      }
    });

    user = user?.dataValues;
    
    if (user) throw new Custom_Error(403, "This Phone or E-Mail has already been used");

    const hashed_password = await bcrypt.hash(password, 12);

    const photo = uuid() + path.extname(file.name);

    file.mv(process.cwd() + "/uploads/" + photo);

    const new_user = await Users.create({
      user_first_name: first_name,
      user_last_name: last_name,
      phone: phone,
      email: email,
      password: hashed_password,
      user_photo: photo,
    });

    await new_user.save()

    const token = jwt.sign({id: new_user.user_id});

    res.cookie("Token", token, {maxAge: 60 * 60 * 1000});

    res.status(201).json({message: "Successfully Sign-Up", data: new_user, token: token});
  } catch (error) {
    next(error)
  }
};

const sign_in = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const {error} = sign_in_validation(email,password);

    if (error) throw new Custom_Error(400, error.message);

    const user = Users.findOne({where: {email: email}});

    if (!user) throw new Custom_Error(403, "User not found");

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) throw new Custom_Error(403, "Wrong password");

    const token = jwt.sign({id: user.user_id});

    res.cookie("Token", token, {maxAge: 60 * 60 * 1000});

    res.status(200).json({message: "Successfully Sign-In", data: token});
  } catch (error) {
    next(error)
  }
};

module.exports = {sign_up, sign_in};
