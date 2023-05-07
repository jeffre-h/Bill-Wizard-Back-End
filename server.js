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
// post api
app.post("/api/create_user", (req,res)=> {
    
    console.log("result", req.body)

    const udata = {
        "user_name": req.body.user_name, // primary key
        "name": req.body.name,
        "amount_owed": req.body.amount_owed
    }

    userData.push(udata)
    console.log("Final", udata)

    res.status(200).send({
        "status_code": 200,
        "message": "Product added successfully",
        "user": udata
    })
})

app.listen(3000, ()=>{
    console.log("\nconnected to server at 3000\n")
})