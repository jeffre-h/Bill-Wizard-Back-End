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

// Creates a user 
app.post("/api/create_user", (req,res)=> {
    
    console.log("result", req.body)

    const udata = {
        "firstName": req.body.firstName, // primary key
        "lastName": req.body.lastName,
        "email": req.body.email,
        "ageTest": req.body.age,
        "password": req.body.password,
    }

    userData.push(udata)
    console.log("Final", udata)

    res.status(200).send({
        "status_code": 200,
        "message": "User added successfully",
        "user": udata
    })
})

app.listen(3000, ()=>{
    console.log("\nconnected to server at 3000\n")
})