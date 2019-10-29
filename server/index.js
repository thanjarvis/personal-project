require('dotenv').config({path: __dirname + "/../.env"})
const express = require('express')
const userCtrl = require('./controllers/ctrlUser')
const hostCtrl = require('./controllers/ctrlHost')
const app = express()
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))

//user endpoints
app.post('/registerUser', userCtrl.registerUser)
app.post('/loginUser', userCtrl.loginUser)


//host endpoints
app.post('/registerHost', hostCtrl.registerHost)
app.post('/loginHost', hostCtrl.loginHost)



//shared enpoints
app.post('/logout', userCtrl.logout)

const port = SERVER_PORT
app.listen(port, () => console.log(`server is running on port ${port}`))