const { User } = require("../model/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sanitizeUser } = require("../services/common");

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();
        req.login(sanitizeUser(doc), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizeUser(doc), process.env.JWT_SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({id:doc.id,role:doc.role});
          }
        });
      }
    );
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.loginUser = async (req, res) => {
  // try {
  //   const user = await User.findOne(
  //     { email: req.body.email },
  //   ).exec();
  //   // TODO: this is just temporary, we will use strong password auth
  //   console.log({user})
  //   if (!user) {
  //     res.status(401).json({ message: 'no such user email' });
  //   } else if (user.password === req.body.password) {
  //       // TODO: We will make addresses independent of login
  //     res.status(200).json({id:user.id, role:user.role});
  //   } else {
  //     res.status(401).json({ message: 'invalid credentials' });
  //   }
  // } catch (err) {
  //   res.status(400).json(err);
  // }become redundant
  // res.json(req.user); //special object makes passport when user authorized
  const user=req.user;
  res
    .cookie("jwt", user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({id:user.id,role:user.role});
};

exports.checkAuth = async (req, res) => {
  if(req.user){
    res.json(req.user);
  }else{
    res.sendStatus(401)
  }
};
