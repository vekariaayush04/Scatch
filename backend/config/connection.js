const mongoose = require('mongoose')

function connection () {
    try {
        mongoose.connect("mongodb://localhost:27017")
        .then(()=>{
            console.log("connected succesfully");
        })
    } catch (error) {
        console.log("error" + error);
    }
}

module.exports = {
    connection
}