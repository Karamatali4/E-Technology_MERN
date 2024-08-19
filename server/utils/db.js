

const mongoose = require("mongoose");

const URL = `mongodb+srv://${process.env.USERNAMEPASSWORD}@cluster0.qcpbsjv.mongodb.net/${process.env.MYDATABASE}?retryWrites=true&w=majority&appName=Cluster0`;
// const URL = process.env.mongodburl

const connectedDB = async() => {

    try {
        
       await mongoose.connect(URL);
        console.log("Connected Successfully...");
    } catch (error) {
        console.error("connection failed..");
        process.exit(0);
    }

}

module.exports = connectedDB; 
