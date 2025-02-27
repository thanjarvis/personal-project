require('dotenv').config({path: __dirname + "/../.env"})
const path = require('path')
const express = require('express')
const userCtrl = require('./controllers/ctrlUser')
const hostCtrl = require('./controllers/ctrlHost')
const app = express()
const session = require('express-session')
const massive = require('massive')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(express.json())

//used to host
app.use( express.static( `${__dirname}/../build` ) );


app.use(session({
    resave:false,
    saveUninitialized: true,
    secret: SESSION_SECRET
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

//user endpoints
app.post('/api/registerUser', userCtrl.registerUser)
app.post('/api/loginUser', userCtrl.loginUser)
app.get('/api/getAllRaces', userCtrl.getAllRaces)
app.get('/api/getUserRaces/:id', userCtrl.getUserRaces)
app.get('/api/getSpecificRace/:id', userCtrl.getSpecificRace)
app.get('/api/getSearchedRaces/:search', userCtrl.getSearchedRaces)
app.post('/api/pay', userCtrl.pay)
app.post('/api/verifyRegistration', userCtrl.verifyRegistration)

//host endpoints
app.post('/api/registerHost', hostCtrl.registerHost)
app.post('/api/loginHost', hostCtrl.loginHost)
app.post('/api/newRace', hostCtrl.makeNewRace)
app.get('/api/getAllHostRaces/:id', hostCtrl.getAllHostRaces)
app.delete('/api/deletSpecificRace/:id', hostCtrl.deleteSpecificRace)
app.put('/api/editRace', hostCtrl.editRace)
app.get('/api/signs3', hostCtrl.sendRaceRoute)



//shared endpoints
app.post('/logout', userCtrl.logout)

//used for hosting
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

const port = SERVER_PORT
app.listen(port, () => console.log(`server is running on port ${port}`))