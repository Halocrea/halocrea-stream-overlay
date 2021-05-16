import { promises as fs } from 'fs'
import express            from 'express'

require('dotenv').config()

const cors               = require('cors')
const app                = express()
const userConfigFilePath = 'data/userConfig.json'

// get the public config
app.get('/', cors(), async (req, res) => {
	const configRaw = await fs.readFile(userConfigFilePath, { encoding: 'utf8' })
	const config    = JSON.parse(configRaw)
	res.status(200).json(config)
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/public-twitch')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/public-config',
	handler: app
}
