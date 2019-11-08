const bcrypt = require('bcryptjs')
const aws = require('aws-sdk')
const{S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

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
    },
    makeNewRace: async (req, res) => {
        const {name, date, location, distance, elevationChange, email, phone, comments, map, hostId, img, hostName} = req.body
        const db = req.app.get('db')

        let hostRaces = await db.make_new_race({name, date, location, distance, elevationChange, email, phone, comments, map, hostId, img, hostName})

        res.status(200).send(hostRaces)
    },
    getAllHostRaces: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        
        let allHostRaces = await db.get_hosts_races(id)
        res.status(200).send(allHostRaces)
    },
    deleteSpecificRace: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        // console.log('hit delete', req.params)
        
        let newRaces = await db.delete_race(id)
        res.status(200).send(newRaces)
    },
    editRace: async (req, res) => {
        // console.log('hit edit')
        const {raceImg, raceName, raceDate, raceLocation, raceDistance, raceElevationChange, raceHostPhone, raceComments, raceMap, id} = req.body

        const db = req.app.get('db')
        let newRaces = await db.edit_race({raceImg, raceName, raceDate, raceLocation, raceDistance, raceElevationChange, raceHostPhone, raceComments, raceMap, id})

        res.status(200).send(newRaces)
    },
    sendRaceRoute: (req, res) => {
        console.log('hit backend')
        aws.config = {
            region: 'us-west-1',
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        }
        const s3 = new aws.S3({signatureVersion: 'v4'})
        const fileName = req.query['file-name']
        const fileType = req.query['file-type']
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            // console.log('hit get signedurl', err, data)
            if(err){
                console.log(err)
                return res.end()
            }
            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3-us-west-1.amazonaws.com/${fileName}`
            }
            // console.log(fileName)
            console.log(returnData)
            return res.send(returnData)
        })
    }
}
