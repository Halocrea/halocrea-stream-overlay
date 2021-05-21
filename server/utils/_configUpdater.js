import { promises as fs } from 'fs'
import lockFile           from 'proper-lockfile'

const userConfigFilePath = 'data/user-config.json'

export default async function (prop, value) {
	try {
		const configRaw = await fs.readFile(userConfigFilePath, { encoding: 'utf8' })
		const config    = JSON.parse(configRaw)
		if (typeof prop === 'string') {
			if (!({}).hasOwnProperty.call(config, prop))
				return false
			config[prop] = value
		} else if (Array.isArray(prop) && Array.isArray(value) && prop.length === value.length) {
			prop.forEach((p, i) => {
				if (({}).hasOwnProperty.call(config, p))
					config[p] = value[i]
			})
		} else
			return false

		const release = await lockFile.lock(userConfigFilePath, { retries: 3 })
		await fs.writeFile(userConfigFilePath, JSON.stringify(config), { encoding: 'utf8' })
		release()
		return config
	} catch (err) {
		console.log(err)
		return false
	}
}
