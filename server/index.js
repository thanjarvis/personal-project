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
app.post('/api/registerUser', userCtrl.registerUser)
app.post('/api/loginUser', userCtrl.loginUser)


//host endpoints
app.post('/api/registerHost', hostCtrl.registerHost)
app.post('/api/loginHost', hostCtrl.loginHost)
app.post('/api/newRace', hostCtrl.makeNewRace)
app.get('/api/getAllHostRaces/:id', hostCtrl.getAllHostRaces)
app.delete('/api/deletSpecificRace/:id', hostCtrl.deleteSpecificRace)
app.put('/api/editRace', hostCtrl.editRace)



//shared enpoints
app.post('/logout', userCtrl.logout)

const port = SERVER_PORT
app.listen(port, () => console.log(`server is running on port ${port}`))