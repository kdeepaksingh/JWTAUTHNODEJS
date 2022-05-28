const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Generating Token here

//  HERE I AM GENERATING THE TOKENS
userSchema.methods.generateAuthToken = async function() {
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() }, "fdsaafafgadgadsagasadfsafsafdasfddsadfaf");
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        res.send("the Error Part " + error);
        console.log("The Error Pat " + error);
    }
}

// userSchema.methods.generateAuthToken = async function() {
//     try {
//         console.log(this._id);
//         const token = jwt.sign({_id:this._id.toString()},"fdsaafafgadgadsagasadfsafsafdasfddsadfaf");
//         this.token = this.token.concat({token:token});
//         console.log(token);
//         await this.save();
//         return token;
//     } catch (error) {
//         res.send(`The Error Part In Generating Token ${error}`);
//         console.log("Error in Generate Token");
//     }
// }

// Hashing password here 

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // console.log(`password  ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10)
        this.cpassword = await bcrypt.hash(this.password, 10)
        // console.log(`Hashing password  ${this.password}`);
        this.cpassword = undefined;
    }
    next();
});

const userModel = new mongoose.model("User", userSchema);

module.exports = userModel;