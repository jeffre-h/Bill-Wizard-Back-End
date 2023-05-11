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
fse.ensureDirSync(path.join("public","uploaded-photos"))

const User = require("./schemas/user")
const Receipt = require("./schemas/receipt")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// FOR DB
require('dotenv').config();
const DB_KEY = process.env.DB_KEY;

// console.log(process.env);

// 
// function ourCleanup(req, res, next) {
//     if (typeof req.body.location != "string") req.body.location = ""
//     if (typeof req.body.when != "string") req.body.when = ""
//     if (typeof req.body.subTotal != "string") req.body.subTotal = ""
//     if (typeof req.body.tax != "string") req.body.tax = ""
//     if (typeof req.body.tip != "string") req.body.tip = ""
//     if (typeof req.body.payerEmail != "string") req.body.payerEmail = ""
//     if (typeof req.body.split != "boolean") req.body.split = ""
//     if (typeof req.body._id != "string") req.body._id = ""
  
//     req.cleanData = {
//       location: sanitizeHTML(req.body.location.trim(), { allowedTags: [], allowedAttributes: {} }),
//       when: sanitizeHTML(req.body.when.trim(), { allowedTags: [], allowedAttributes: {} }),
//       subTotal: sanitizeHTML(req.body.subTotal.trim(), { allowedTags: [], allowedAttributes: {} }),
//       tax: sanitizeHTML(req.body.tax.trim(), { allowedTags: [], allowedAttributes: {} }),
//       tip: sanitizeHTML(req.body.tip.trim(), { allowedTags: [], allowedAttributes: {} }),
//       payerEmail: sanitizeHTML(req.body.payerEmail.trim(), { allowedTags: [], allowedAttributes: {} }),
//       split: sanitizeHTML(req.body.split.trim(), { allowedTags: [], allowedAttributes: {} }),
//     }
  
//     next()
//   }

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
        app.post("/api/createReceipt", upload.single("photo"), ourCleanup, async (req, res) => {
            console.log("result", req.body)
            let data = Receipt(req.body)

            if (req.file) {
                const photofilename = `${Date.now()}.jpg`
                await sharp(req.file.buffer).resize(844, 456).jpeg({ quality: 60 }).toFile(path.join("public", "uploaded-photos", photofilename))
                data.photo = photofilename    
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