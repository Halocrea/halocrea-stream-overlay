import axios           from 'axios'
import express         from 'express'

import updateConfig from '../../utils/_configUpdater'

require('dotenv').config()

const app = express()
app.use(express.json())

app.post('/:code', async ({ params }, res) => {
	if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
		await updateConfig('showTwitchAlerts', false)
		return res.status(420).send('Cannot use Twitch features without the Client ID nor the Client Secret. Please check the Readme to make sure you set things properly.')
	}
	try {
		const { data } = await axios.post(
			`https://id.twitch.tv/oauth2/token?client_id=${
				process.env.TWITCH_CLIENT_ID
			}&client_secret=${
				process.env.TWITCH_CLIENT_SECRET
			}&code=${
				params.code
			}&grant_type=authorization_code&redirect_uri=${
				process.env.BASE_URL
			}/oauth2_return`
		)

		data.expires_in = new Date(new Date().setSeconds(data.expires_in)).toISOString()
		res.json(data)
	} catch (e) {
		console.warn(e)
		res.status(500).send(e + '')
	}
})

// Error handler
app.use((err, _req, res, next) => {
	console.log('error in /api/twitch-oauth2')
	console.log(err)
	res.status(401).send(err + '')
})

// -- export app --
export default {
	path: '/api/twitch-oauth2',
	handler: app
}
