// to run: npm start 
const express = require("express")
const mongoose = require("mongoose")
const app = express()

const User = require("./schemas/user")
const Receipt = require("./schemas/receipt")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// FOR DB
require('dotenv').config();
const DB_KEY = process.env.DB_KEY;

// console.log(process.env);


var { mongodbConnect } = module.exports = {
    mongodbConnect: DB_KEY
};
// connect to mongoose
mongoose.set('strictQuery', true);
mongoose.connect(mongodbConnect, (error) => {
    if (!error) {
        console.log("connected to mongodb\n");

        // Create a user 
        app.post("/api/createUser", async (req, res) => {
            console.log("result", req.body)
            let data = User(req.body);

            try {
                let dataToStore = await data.save()
                res.status(200).json(dataToStore)
            } catch (error) {
                res.status(400).json({
                    'status': error.message
                })
            }
        })

        // Create a receipt
        app.post("/api/createReceipt", async (req, res) => {
            console.log("result", req.body)
            let data = Receipt(req.body)

            try {
                let dataToStore = await data.save()
                res.status(200).json(dataToStore)
            } catch (error) {
                res.status(400).json({
                    'status': error.message
                })
            }
        })

        // Log in
        app.post("/api/logIn", async(req,res) => {
            
            const user = await User.findOne({ email: req.body.email });
        
            if(user.password == req.body.password){
                res.send("Correct password.")
            }
            else{
                res.send("Incorrect password or email.");
            }
        })

    } else {
        console.log(error.message);
    }
})


app.listen(3000, () => {
    console.log("\nconnected to server at 3000\n")
})