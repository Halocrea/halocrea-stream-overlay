import { promises as fs } from 'fs'

export const getTokens = async () => {
	const tokens = await fs.readFile('data/token.json', { encoding: 'utf8' })
	return JSON.parse(tokens)
}

export const getUserInfo = async () => {
	try {
		const userinfo = await fs.readFile('data/userinfo.json', { encoding: 'utf8' })
		return JSON.parse(userinfo)
	} catch (e) {
		// file probably doesn't exist
		return {}
	}
}
