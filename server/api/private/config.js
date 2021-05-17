import cookieParser from 'cookie-parser'
import express      from 'express'
import jwt          from 'express-jwt'

import { getUserInfo } from '../../utils/_twitchUtils'

require('dotenv').config()
const cors = require('cors')

// Create app
const app = express()

// Install middleware
app.use(cookieParser())

// JWT middleware
app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['sha1', 'RS256', 'HS256']
	})
)

// fetching the latest follower and latest subscriber
app.get('/user-info', cors(), async (req, res) => {
	const userInfoRaw = await getUserInfo()
	res.status(200).json(userInfoRaw)
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/private-config')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/private-config',
	handler: app
}
