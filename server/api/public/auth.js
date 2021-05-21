import { promises as fs } from 'fs'
import axios              from 'axios'
import cookieParser       from 'cookie-parser'
import express            from 'express'
import jsonwebtoken       from 'jsonwebtoken'
import jwt                from 'express-jwt'
import { getTmiClient }   from '../../tmi/tmiClient'

require('dotenv').config()

// Create app
const app = express()

// Install middleware
app.use(cookieParser())
app.use(express.json())

// JWT middleware
app.use(
	jwt({
		secret: process.env.JWT_SECRET,
		algorithms: ['sha1', 'RS256', 'HS256']
	}).unless({
		path: ['/api/auth/login', '/api/auth/refresh']
	})
)

// Refresh tokens
const refreshTokens    = {}
const tokensFilePath     = 'data/user-access-token.json'
const userInfoFilePath   = 'data/user-info.json'
const userConfigFilePath = 'data/user-config.json'
// -- Routes --

// [POST] /login
app.post('/login', async (req, res) => {
	const { email, password }   = req.body
	const { twitchRes, openId } = req.body // if we're setting the Twitch authorizations while logging in

	const login = openId && openId.email ? openId.email : email
	if (login !== process.env.LOGIN_EMAIL || password !== process.env.LOGIN_PWD)
		return res.status(401).send('Invalid username or password')

	if (twitchRes) // saving the tokens if necessary
		await fs.writeFile(tokensFilePath, JSON.stringify(twitchRes), { encoding: 'utf8' })

	// if user has enabled the Twitch features,
	// we must check the authorization tokens
	const userConfig = await fs.readFile(userConfigFilePath, { encoding: 'utf8' })
	if (JSON.parse(userConfig).useTwitchFeatures) {
		// whether or not twitch authorization has been sent, we need it to continue
		const tokens = await fs.readFile(tokensFilePath, { encoding: 'utf8' })

		// getting user info like userId (channelId)
		try {
			const { data } = await axios.get('https://id.twitch.tv/oauth2/validate', {
				headers: { Authorization: `OAuth ${JSON.parse(tokens).access_token}` }
			})
			if (openId) {
				data.preferred_username = openId.preferred_username
				data.picture            = openId.picture
				await fs.writeFile(userInfoFilePath, JSON.stringify(data), { encoding: 'utf8' })
			}
		} catch (e) {
			console.warn(e)
		}

		await getTmiClient()
	}

	const expiresIn    = parseInt(process.env.TOKEN_DURATION)
	const refreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
	const accessToken  = jsonwebtoken.sign(
		{
			username: process.env.LOGIN_EMAIL,
			name    : 'User-' + process.env.LOGIN_EMAIL,
			scope   : ['user-role']
		},
		process.env.JWT_SECRET,
		{ expiresIn }
	)

	refreshTokens[refreshToken] = {
		accessToken,
		user: {
			username: process.env.LOGIN_EMAIL,
			name    : 'User-' + process.env.LOGIN_EMAIL
		}
	}

	res.json({
		token: {
			accessToken,
			refreshToken
		}
	})
})

app.post('/refresh', (req, res) => {
	const { refreshToken } = req.body

	if (refreshToken in refreshTokens) {
		const user      = refreshTokens[refreshToken].user
		const expiresIn = process.env.TOKEN_DURATION
		const newRefreshToken = Math.floor(Math.random() * (1000000000000000 - 1 + 1)) + 1
		delete refreshTokens[refreshToken]
		const accessToken = jsonwebtoken.sign(
			{
				user : user.username,
				name : 'User ' + user.username,
				scope: user.scope
			},
			process.env.JWT_SECRET,
			{ expiresIn }
		)

		refreshTokens[newRefreshToken] = {
			accessToken,
			user
		}

		res.json({
			token: {
				accessToken,
				refreshToken: newRefreshToken
			}
		})
	} else {
		console.log('error in /api/auth')
		res.sendStatus(401)
	}
})

// [GET] /user
app.get('/user', (req, res) => {
	res.json({ user: req.user })
})

// [POST] /logout
app.post('/logout', (_req, res) => {
	res.json({ status: 'OK' })
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/auth')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/auth',
	handler: app
}
