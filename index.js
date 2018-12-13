require('dotenv').config()
const express = require('express')
const { json } = require('body-parser')
const massive = require('massive')
const controller = require('./product_controller')

const app = express()
app.use(json())

// database connecting
massive(process.env.CONNECTION_STRING)
.then(db => {
    app.set("db", db)
    console.log("Connected to database")
})
.catch(err => console.log("Error while connecting to database", err))

// end points
app.get("/api/products", controller.getAll)
app.get("/api/products/:id", controller.getOne)
app.put("/api/products/:id", controller.update)
app.post("/api/products", controller.create)
app.delete("/api/products/:id", controller.remove)

app.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}...`))