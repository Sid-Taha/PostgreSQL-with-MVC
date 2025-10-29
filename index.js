const express = require('express')
const {globalmiddleware} = require('./middlewares/globalmiddleware')
const bookRoute = require("./routes/book.route")

const app = express()
const PORT = 8000
 
// ----------------------- middleware
app.use(globalmiddleware)

// ----------------------- Routes
app.use("/", bookRoute)


app.listen(PORT, ()=>{console.log("server is running on port 8000")})