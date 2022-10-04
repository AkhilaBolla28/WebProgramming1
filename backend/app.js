var express = require('express');
var app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://AkhilaBolla:Akhila%40289768@cluster0.cnv5wgk.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");

const User = mongoose.model("reactapp");
app.post("/register", async (req, res) => {
  const { name, email, profession, phoneNumber, address, password, confirmPassword } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      name,
      email,
      profession,
      phoneNumber,
      address,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const otp = `${Math.floor(1000 + Math.random()*9000)}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akhila28.bolla@gmail.com",
        pass: "ncswxekgefhkxpbx",
      },
    });
  
    var mailOptions = {
      from: "akhila28.bolla@gmail.com",
      to: user.email,
      subject: "Login OTP",
      html: `<p>Enter this OTP : ${otp} to Login into your account</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    await User.updateOne(
      {
        email: user.email,
      },
      {
        $set: {
          otp: otp,
        },
      }
    );
    res.json({status: "ok"});
  }else{
    res.json({ status: "error", error: "Invalid Password" });
  }
  
});


app.post("/login-otp", async (req, res) => {
  const { otp, email } = req.body;
  const user = await User.findOne({ email });
  if (await otp == user.otp) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }});

app.post("/changepassword", async (req, res) => {
  const {token,email, currentPassword, newPassword, confirmPassword } = req.body;
  const oldUser = await User.findOne({ email });
if (!oldUser) {
    return res.json({ status: "error" });
   }
  const secret = JWT_SECRET + oldUser.password;
    try {
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      await User.updateOne(
        {
          email: email,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );
      return res.json({ status: "ok" });
    } catch (error) {
      console.log(error);
      res.json({ status: "error2" });
    }
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});



app.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "akhila28.bolla@gmail.com",
        pass: "ncswxekgefhkxpbx",
      },
    });

    var mailOptions = {
      from: "akhila28.bolla@gmail.com",
      to:  oldUser.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: "ok" });
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );
    

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});
app.post("/editProfile", async (req, res) => {
  const { email, name, profession, phoneNumber, address } = req.body;

  try {
    const oldUser = await User.findOne({ email });
    console.log(User)
    if (oldUser) {
     const result = await User.updateOne(
      {email:email},{
        $set:{
        name:name,
        profession:profession,
        phoneNumber:phoneNumber,
        address:address},
      });
      console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`)
      res.send({ status: "ok" });
    }
   
  } catch (error) {
    res.send({ status: "error" });
  }
});
