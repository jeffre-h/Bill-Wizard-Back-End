// to run: npm start 
const express = require("express")
const mongoose = require("mongoose")
const app = express()

// imports for storing images 
const multer = require("multer")
const upload = multer()
const fse = require('fs-extra')
const sharp = require('sharp')

const path = require('path')
fse.ensureDirSync(path.join("public", "uploaded-photos"))

// schemas
const User = require("./schemas/user")
const Receipt = require("./schemas/receipt")
const Friendship = require("./schemas/friendship")

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
        app.post("/api/createUser", upload.single("image"), async (req, res) => {
            
            let user = await User.findOne( {email: req.body.email} )
            if (user) { // email is already in use
                res.send("email is already in use")
            } else {
                console.log("result", req.body)
                let data = User(req.body)

                if (req.file) {
                    const photofilename = `${Date.now()}.jpg`
                    await sharp(req.file.buffer).resize(844, 456).jpeg({ quality: 60 }).toFile(path.join("public", "uploaded-photos", photofilename))
                    data.image = photofilename
                    console.log(data)
                }
    
                try {
                    let dataToStore = await data.save()
                    res.status(200).json(dataToStore)
                } catch (error) {
                    res.status(400).json({
                        'status': error.message
                    })
                }
            }
        })

        // Create a receipt
        app.post("/api/createReceipt", upload.single("image"), async (req, res) => {
            console.log("result", req.body)
            let data = Receipt(req.body)

            if (req.file) {
                const photofilename = `${Date.now()}.jpg`
                await sharp(req.file.buffer).resize(844, 456).jpeg({ quality: 60 }).toFile(path.join("public", "uploaded-photos", photofilename))
                data.image = photofilename
                console.log(data);
            }

            try {
                let dataToStore = await data.save()
                res.status(200).json(dataToStore)
            } catch (error) {
                res.status(400).json({
                    'status': error.message
                })
            }
        })

        // Create a friendship
        app.post("/api/createFriendship", async (req,res) => {
            // note: user who initiates friend request will be set as friend1

            let case1 = await Friendship.findOne({$and: [{friend1: req.body.friend1}, {friend2: req.body.friend2}] })
            let case2 = await Friendship.findOne({$and: [{friend1: req.body.friend2}, {friend2: req.body.friend1}] })
            if (case1 || case2) { // friendship already exists
                res.send("friendship already exists")
            } else {
                console.log("result", req.body)
                let data = Friendship(req.body)

                try {
                    let dataToStore = await data.save()
                    res.status(200).json(dataToStore)
                } catch (error) {
                    res.status(400).json({
                        'status': error.message
                    })
                }
            }
        })

        // Log in
        app.post("/api/logIn", async (req, res) => {

            let user = await User.findOne({ email: req.body.email });

            if (user) {
                res.send("Correct password.");
            }
            else {
                res.send("Incorrect password or email.");
            }
        })

        // Load user's receipts content
        app.post("/api/loadReceiptContent", async (req, res) => {

            let user = await User.findOne({ email: req.body.email })

            // if user email exists then it is valid, load content for that user
            if (user) {
                // retrieve all receipts associated to the user
                const receipts = await Receipt.find({ payerEmail: req.body.email })
                console.log(receipts)
                res.json(receipts)
            }
            else {
                console.log("user does not exist")
            }
            
        })

        // Load user's friendships content
        app.post("/api/loadFriendshipContent", async (req,res) => {
            let user = await User.findOne({ email: req.body.email })

            if (user) {
                const friendships = await Friendship.find({$or: [{friend1: req.body.email},{friend2: req.body.email}] })
                console.log(friendships)
                res.json(friendships)
            } else {
                console.log("user does not exist")
            }
        })

        // grab user first and last name
        app.post("/api/grabUserInfo", async (req, res) => {

            const user = await User.findOne({ email: req.body.email });
            if(user.email == req.body.email){
                res.json({first_name:user.firstName,last_name:user.lastName});
            }
            else{
                res.send("User does not exist");
            }
            
        })

    } else {
        console.log(error.message);
    }
})


app.listen(3000, () => {
    console.log("\nconnected to server at 3000\n")
})