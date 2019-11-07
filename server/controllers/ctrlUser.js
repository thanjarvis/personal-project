const bcrypt = require('bcryptjs')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    registerUser: async (req, res) => {
        const {username, email, password} = req.body
        const db = req.app.get('db')

        let foundUser = await db.find_user(username)
        foundUser=foundUser[0]
        if(foundUser){
            res.status(409).send('there is already an account with this username')
        }else{
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            let newUser = await db.user_register(username, email, hash)
            let user = newUser[0]
            // console.log(user)
            req.session.user = {
                id: user.user_id,
                username: user.username,
                email: user.email
            }
            res.status(200).send(req.session.user)

        }

    },

    loginUser: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        let foundUser = await db.find_user(username)
        foundUser = foundUser[0]

        if(!foundUser){
            res.status(401).send('user account not found')
        }
        let result = bcrypt.compareSync(password, foundUser.password)
        if(!result){
            res.send(403).send('wrong password')
        }
        req.session.user = {
            id: foundUser.user_id,
            username: foundUser.username,
            email: foundUser.email
        }
        res.status(200).send(req.session.user)

    },
    logout: async (req, res) => {
        req.session.destroy
        res.sendStatus(200)
    },
    getAllRaces: async(req, res) => {
        const db = req.app.get('db')
        let allRaces = await db.get_all_races()

        res.status(200).send(allRaces)
    },
    getUserRaces: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        let userRaces = await db.get_user_races(id)
        res.status(200).send(userRaces)
    },
    getSpecificRace: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params

        let selectedRace = await db.get_specific_race(id)
        res.status(200).send(selectedRace)
    },
    getSearchedRaces: async (req, res) => {
        const db = req.app.get('db')
        const {search} = req.params
        let searchedRaces = await db.get_searched_races(search)
        res.status(200).send(searchedRaces)
    },
    pay: async (req, res) => {
        const db = req.app.get('db')
        const {token:{id}, amount, raceId, userId} = req.body
        // let foundRace = await db.find_race_registration(userId, raceId)
    
        stripe.charges.create(
            {
                amount: amount,
                currency: 'usd',
                source: id,
                description: 'Race Registration Fee'
            },
            (err, charge) => {
                if(err){
                    console.log(err)
                    res.status(500).send(err)
                }else{
                    console.log('payment succesful')
                    db.register_for_race(userId, raceId)
                    return res.status(200).send(charge)  
                }
            }
        )
    },
    verifyRegistration: async (req, res) => {
        const db = req.app.get('db')
        const {raceId, userId} = req.body
        let foundRegistration = await db.find_race_registration(userId, raceId)
        res.status(200).send(foundRegistration)
    }
    
    

    
}