const bcrypt = require('bcryptjs')

module.exports = {
    registerHost: async (req, res) => {
        const {username, email, password} = req.body
        const db = req.app.get('db')

        let foundHost = await db.find_host(username)
        foundHost=foundHost[0]
        if(foundHost){
            res.status(409).send('there is already an account for this username')
        }else{
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            let newHost = await db.register_host(username, email, hash)
            let host = newHost[0]
            req.session.host = {
                id: host.host_id,
                username: host.username,
                email: host.email
            }
            res.status(200).send(req.session.host)
        }
    },

    loginHost: async (req, res) => {
        const {username, email, password} = req.body
        const db = req.app.get('db')

        let foundHost = await db.find_host(username)
        host = foundHost[0]

        if(host === undefined){
            res.status(401).send('user account not found')
        }
        let result = bcrypt.compareSync(password, host.password)
        if(!result){
            res.status(403).send('wrong password')
        }
        req.session.host = {
            id: host.host_id,
            username: host.username,
            email: host.email
        }
        res.status(200).send(req.session.host)
    }
}