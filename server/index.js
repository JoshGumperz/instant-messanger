const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require('path');
const routes = require('./routes');
const { route } = require("./routes");
const app = express();


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const PORT = process.env.PORT || 3001
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log(err)
    })

app.use('/api', routes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => { console.log(`Backend server now running on port http://localhost:${PORT}`) })