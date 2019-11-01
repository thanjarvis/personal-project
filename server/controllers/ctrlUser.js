const bcrypt = require('bcryptjs')

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
        // console.log('hit search')
        // console.log(search)
        let searchedRaces = await db.get_searched_races(search)
        // console.log('hit db query')
        res.status(200).send(searchedRaces)
        // console.log(searchedRaces)
    }

    
}