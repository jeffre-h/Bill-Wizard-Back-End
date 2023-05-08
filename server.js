const express = require("express")

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// temp
app.get("/", async (req,res) => {
    res.send("home sweet home ...")
    console.log("root..")
})
app.get("/api", async (req,res) => {
    res.send("this subd stores all the api's ...")
    console.log("api...")
})

const userData = [] 

// Create a user 
app.post("/api/createUser", (req,res)=> {
    
    console.log("result", req.body)

    const uData = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "ageTest": req.body.age,
        "password": req.body.password,
    }

    userData.push(uData)
    console.log("Final", uData)

    res.status(200).send({
        "status_code": 200,
        "message": "User added successfully",
        "user": uData
    })

    // Add db code here.
})

// Create a receipt
app.post("/api/createReceipt", (req,res)=> {
    
    console.log("result", req.body)

    const receiptData = {
        "location": req.body.location,
        "when": req.body.when,
        "subTotal": req.body.subTotal,
        "tax": req.body.tax,
        "tip": req.body.tip,
    }

    userData.push(receiptData)
    console.log("Final", receiptData)

    res.status(200).send({
        "status_code": 200,
        "message": "Receipt added successfully",
        "bill": receiptData
    })

    // Add db code here.
})

// Authentication



app.listen(3000, ()=>{
    console.log("\nconnected to server at 3000\n")
})