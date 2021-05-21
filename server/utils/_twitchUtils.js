import { promises as fs } from 'fs'
import axios              from 'axios'
// Note:
// For every other feature from Twitch, we need a User App Token;
// for everything else we can use a User App Token.
// https://dev.twitch.tv/docs/authentication#types-of-tokens

const getFileJson = async (path) => {
	try {
		await fs.access(path)
		return JSON.parse(await fs.readFile(path, { encoding: 'utf8' }))
	} catch (e) {
		return null
	}
}

export const getAppAccessTokens = async () =>
	await getFileJson('data/app-access-token.json')

export const getUserAccessTokens = async () =>
	await getFileJson('data/user-access-token.json')

export const getUserInfo = async () =>
	await getFileJson('data/user-info.json')

// type can be one of: 'user', 'app'
// token is the refresh token
export const refreshToken = async (type, token) => {
	if (!['app', 'user'].includes(type))
		return false

	const filePath = `data/${type}-access-token.json`
	try {
		const { data } = await axios.post(
			`https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${
				token
			}&client_id=${
				process.env.TWITCH_CLIENT_ID
			}&client_secret=${
				process.env.TWITCH_CLIENT_SECRET
			}`
		)
		data.expires_in = new Date(new Date().setSeconds(data.expires_in)).toISOString()
		await fs.writeFile(filePath, JSON.stringify(data), { encoding: 'utf8' })
		return true
	} catch (e) {
		console.warn(`Could not refresh a token of type ${type}`)
		return false
	}
}
