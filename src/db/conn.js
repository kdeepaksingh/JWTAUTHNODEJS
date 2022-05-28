const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/jwtAuthDb", {

}).then(() => {
    console.log("Mongodb Database Connection Established Successfully!")
}).catch((err) => {
    console.log("Error in Mongodb Database Connection" + err)
});

module.exports = mongoose;