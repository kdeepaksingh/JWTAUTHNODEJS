const express = require('express');
const app = express();
require('./db/conn');
const userModel = require('./model/registers');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs/dist/bcrypt');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(cors());
// app.use(cookieParser());
app.use(express.json());  // we are not using this method then data will not saved in db only id will be save
app.use(bodyParser.json());  // we are not using this method then data will not saved in db only id will be save


app.get("/", (req, res) => {
    res.send("heelo jwttoken");
});

app.post('/register', async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password === cpassword) {
            const registerUser = new userModel({
                fullName: req.body.fullName,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: req.body.password,
                cpassword: req.body.cpassword,
            });

            console.log("the Success part" + registerEmployee);
            const token = await registerUser.generateAuthToken();
            console.log("the Token part" + token);

            // console.log("token fuctin inside post register");
            // const token = await registerUser.generateAuthToken();
            // console.log("registered token in"+token);

            const registeredUser = await registerUser.save();
            res.status(200).send("User Register Successfully!!");
            console.log(registeredUser);

        } else {
            res.send("password and Confirm passwords are not matching!!")
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await userModel.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, useremail.password);
        if (isMatch) {
            res.status(200).send("User Login Successfully!!");
            console.log("user Login successfully!!");
        } else {
            console.log("Password are not matching");
        }

    } catch (error) {
        res.status(400).send("Envalid User Login Email");
    }
});

app.listen(port, () => {
    console.log(`Server is Listning The Port No ${port}`);
})
